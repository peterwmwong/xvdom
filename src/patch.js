let rendererFunc;
let rendererFirstArg;

function rerenderProp(rArg/* [parentNode, node, prevValue] */, value){
  rArg[0][rArg[1]] = value;
}

function applyProp(node, prop, propValue, values){
  if(prop[0] === '$'){
    const actualProp = prop.slice(1);
    node[actualProp] = values[propValue];
    values.push(rerenderProp, [node, actualProp]);
  }
  else{
    node[prop] = propValue;
  }
}

function applyProps(node, props, values){
  for(let key in props){
    applyProp(node, key, props[key], values);
  }
}

function createAddChildren(parentNode, vchildren, values){
  const length = vchildren.length;
  for(let i=0; i<length; ++i){
    parentNode.appendChild(createNodeFromValueOrReference(vchildren[i], values, parentNode));
  }
}

function createElement({el, props, children}, values){
  const node = document.createElement(el);
  if(props)    applyProps(node, props, values);
  if(children) createAddChildren(node, children, values);
  return node;
}

function rerenderTextNodeValue(rArg/* [parentNode, node, prevValue] */, value){
  if(typeof value === 'string'){
    if(rArg[2] !== value){
      rArg[1].nodeValue = value;
      rArg[2] = value;
    }
  }
  else{
    rerenderValue(rArg, value);
  }
}

function rerenderValue(rArg/* [parentNode, node, prevValue] */, value){
  const newNode = createNodeFromValue(value);
  rArg[0].replaceChild(newNode, rArg[1]);
  rArg[1] = newNode;
  rArg[2] = value;
  setRerenderFuncForValue(rArg);
}


// TODO(pwong): Provide a way for the user to choose/customize rerendering an Array
// This function is an example of a fast array rerendering that assumes no additions or removals
// function rerenderArrayValue(rArg, arrayValue){
//   const keyMap = rArg[1];
//   let i = arrayValue.length;
//   let value, node;
//
//   while(i--){
//     value = arrayValue[i];
//     node  = keyMap[value.key];
//     if(node.xvdom__spec) rerender(node, value.values);
//   }
//
//   rArg[3] = arrayValue;
//   rendererFunc = rerenderArrayValue;
//   rendererFirstArg = rArg;
// }

// O( MAX(prevArrayValue.length, arrayValue.length) + NumOfRemovals )
function rerenderArrayValue(rArg, arrayValue){
  const length       = arrayValue.length;
  const newKeyMap    = {};
  const keysToRemove = {};
  const [parentNode, keyMap, beforeFirstNode, prevArrayValue] = rArg;
  let value, cursorValue, node, key;
  let i=0, cursorIndex=0;
  let cursorNode = beforeFirstNode ? beforeFirstNode.nextSibling : parentNode.firstChild;

  for(; i<length && (cursorValue=prevArrayValue[cursorIndex]); ++i){
    value = arrayValue[i];
    key   = value.key;
    node  = keyMap[key];

    if(node){
      // Skip over the previous elements that don't match the current element we're trying to insert.
      // TODO(pwong): Check if cursorValue.key is in arrayValue before removing AND advancing
      //              Usecase: adding one to the beginning, should only be 1 insertBefore
      while(cursorValue && cursorValue.key !== key){
        keysToRemove[cursorValue.key] = true;
        cursorValue                   = prevArrayValue[++cursorIndex];
      }

      if(cursorValue && cursorValue.key !== key) parentNode.insertBefore(node, cursorNode);
      if(node.xvdom__spec) rerender(node, value.values);
      ++cursorIndex;
    }
    else{
      node = createNodeFromValue(value);
      parentNode.insertBefore(node, cursorNode);
    }

    newKeyMap[key] = node;
    cursorNode = node.nextSibling;
  }

  // If there are more NEW elements than OLD elements, add the rest of the NEW elements
  while(i<length){
    value = arrayValue[i++];
    key   = value.key;
    node  = keyMap[key] || createNodeFromValue(value);

    parentNode.insertBefore(node, cursorNode);

    delete keysToRemove[key];
    newKeyMap[key] = node;
    cursorNode = node.nextSibling;
  }

  // If there are more OLD elements than NEW elements, remove the rest of the OLD elements
  while(cursorIndex<prevArrayValue.length){
    parentNode.removeChild(keyMap[prevArrayValue[cursorIndex++].key]);
  }

  // Remove all elements that were skipped over and never reattached
  for(key in keysToRemove){
    parentNode.removeChild(keyMap[key]);
  }

  rendererFunc = rerenderArrayValue;
  rArg[1] = newKeyMap;
  rArg[3] = arrayValue;
  rendererFirstArg = rArg;
}

function setRerenderFuncForValue(rArg /*[parentNode, node, value]*/){
  rendererFunc = typeof rArg[2] === 'string' ? rerenderTextNodeValue : rerenderValue;
  rendererFirstArg = rArg;
}

function createNodeFromValue(value){
  if(typeof value === 'string') return document.createTextNode(value);

  const node = createElement(value.template, value.values);
  if(value.values) node.xvdom__spec = value;
  return node;
}

function createAndRegisterFromArrayValue(parentNode, arrayValue, values){
  const length          = arrayValue.length;
  const frag            = document.createDocumentFragment();
  const keyMap          = {};
  const beforeFirstNode = parentNode.lastChild;
  let node, value, i=0;

  while(i<length){
    value = arrayValue[i++];
    node  = createNodeFromValue(value);
    frag.appendChild(keyMap[value.key] = node);
  }

  rendererFunc     = rerenderArrayValue;
  rendererFirstArg = [parentNode, keyMap, beforeFirstNode, arrayValue];
  values.push(rendererFunc, rendererFirstArg);
  return frag;
}

function createAndRegisterNodeFromValue(value, parentNode, values){
  if(value instanceof Array) return createAndRegisterFromArrayValue(parentNode, value, values);

  let node = createNodeFromValue(value);
  setRerenderFuncForValue([parentNode, node, value]);
  values.push(rendererFunc, rendererFirstArg);
  return node;
}

/*
  vnode     : number valueRef | {el, props, children} vnode
  values    : Array<any>
  paretNode : Node
*/
function createNodeFromValueOrReference(vnode, values, parentNode){
  switch(typeof vnode){
    case 'object': return createElement(vnode, values);
    case 'string': return document.createTextNode(vnode);
    default:       return createAndRegisterNodeFromValue(values[vnode], parentNode, values);
  }
}

function initialPatch(node, spec){
  node.appendChild(createNodeFromValueOrReference(spec.template, spec.values));
  node.xvdom__spec = spec;
}

function rerender(node, values){
  const oldValues = node.xvdom__spec.values;
  const length    = oldValues.length/3;
  let newValue;

  for(let i=0, j=length; i<length; ++i, ++j){
    newValue         = values[i];
    rendererFunc     = oldValues[j];
    rendererFirstArg = oldValues[++j];

    if(newValue !== oldValues[i]){
      rendererFunc(rendererFirstArg, newValue);
      oldValues[i]   = newValue;
      oldValues[j-1] = rendererFunc;
      oldValues[j]   = rendererFirstArg;
    }
  }
}

export default function(node, spec){
  if(node.xvdom__spec){
    // Only rerender if there are dynamic values
    if(spec.values) rerender(node, spec.values);
  }
  else initialPatch(node, spec);
}
