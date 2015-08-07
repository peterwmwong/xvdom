function applyPropValue(node, prop, value){
  node[prop] = value;
  return applyPropValue.bind(null, node, prop);
}

function applyProp(node, prop, propValue, values){
  if(prop[0] === '$'){
    const actualProp = prop.slice(1);
    applyPropValue(node, actualProp, values[propValue]);
    values.push(applyPropValue.bind(null, node, actualProp));
  }
  else{
    applyPropValue(node, prop, propValue);
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

function rerenderTextNodeValue(parentNode, node, prevValue, value){
  if(typeof value === 'string'){
    if(prevValue !== value) node.textContent = value;
    return rerenderTextNodeValue.bind(null, parentNode, node, value);
  }
  return rerenderValue(parentNode, node, prevValue, value);
}

function rerenderValue(parentNode, node, prevValue, value){
  const newNode = createNodeFromValue(value);
  parentNode.replaceChild(newNode, node);
  return getRerenderFuncForValue(value).bind(null, parentNode, newNode, value);
}


//TODO(pwong): maybe prevArrayValue could just be previous list of keys

// O( MAX(prevArrayValue.length, arrayValue.length) + NumOfRemovals )
function rerenderArrayValue(parentNode, keyMap, beforeFirstNode, prevArrayValue, arrayValue){
  const length = arrayValue.length;
  if(length === 0) return;

  const newKeyMap    = {};
  const keysToRemove = {};
  let i=0, value, cursorIndex, cursorValue, node, key;

  let cursorNode = beforeFirstNode ? beforeFirstNode.nextSibling : parentNode.firstChild;
  for(
    i=0,         cursorIndex=0;
    i<length && (cursorValue=prevArrayValue[cursorIndex]);
    ++i
  ){
    value = arrayValue[i];
    key   = value.key;
    node  = keyMap[key];

    if(node){
      // Skip over the previous elements that don't match the current element we're trying to insert.
      while(cursorValue && cursorValue.key !== key){
        keysToRemove[cursorValue.key] = true;
        cursorValue                   = prevArrayValue[++cursorIndex];
      }
      if(cursorValue && cursorValue.key !== key){
        parentNode.insertBefore(node, cursorNode);
      }
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

  return rerenderArrayValue.bind(null, parentNode, newKeyMap, beforeFirstNode, arrayValue);
}

function getRerenderFuncForValue(value){
  return typeof value === 'string' ? rerenderTextNodeValue : rerenderValue;
}

function createNodeFromValue(value){
  return typeof value === 'string' ? document.createTextNode(value)
          : createElement(value.template, value.values);
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
  values.push(rerenderArrayValue.bind(null, parentNode, keyMap, beforeFirstNode, arrayValue));
  return frag;
}

function createAndRegisterNodeFromValue(value, parentNode, values){
  if(value instanceof Array) return createAndRegisterFromArrayValue(parentNode, value, values);

  let node = createNodeFromValue(value);
  values.push(getRerenderFuncForValue(value).bind(null, parentNode, node, value));
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
  node.xvdom = {spec};
}

function rerender(node, {values:newValues}){
  const values = node.xvdom.spec.values;
  const length = values.length>>1;
  let newValue;

  for(let i=0, j=length; i<length; ++i){
    newValue = newValues[i];
    if(values[i] !== newValue){
      newValues.push(values[j++](newValue));
    }
  }
  node.xvdom.spec.values = newValues;
}

export default function(node, spec){
  if(node.xvdom){
    // Only rerender if there are dynamic values
    if(spec.values) rerender(node, spec);
  }
  else initialPatch(node, spec);
}
