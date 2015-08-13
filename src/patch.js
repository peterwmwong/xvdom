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
    attachNodeFromValueOrReference(vchildren[i], values, parentNode);
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

function removeArrayElements(parentNode, keyMap){
  for(let key in keyMap){
    parentNode.removeChild(keyMap[key]);
  }
}

// O( MAX(prevArrayValue.length, arrayValue.length) + NumOfRemovals )
function rerenderArrayValue(rArg, list){
  const [parentNode, keyMap, /*beforeFirstNode*/, oldList] = rArg;
  let oldListLength = oldList.length;
  let listLength = list.length;

  if(listLength === 0){
    removeArrayElements(parentNode, keyMap);
    return;
  }
  else if (oldListLength === 0){
    createAndRegisterFromArrayValue(parentNode, list, []);
    return;
  }

  const afterLastNode = oldListLength ? keyMap[oldList[oldListLength-1].key].nextSibling : null;
  let oldEndIndex   = oldListLength - 1;
  let endIndex      = listLength - 1;
  let oldStartIndex = 0;
  let startIndex    = 0;
  let successful    = true;
  let node, nextItem, oldItem, item;
  let oldStartItem, oldEndItem, startItem, endItem;

  outer: while(successful && oldStartIndex <= oldEndIndex && startIndex <= endIndex){
    successful = false;

    oldStartItem = oldList[oldStartIndex];
    startItem = list[startIndex];
    while (oldStartItem.key === startItem.key){
      node = keyMap[startItem.key];
      if(node.xvdom__spec) rerender(node, startItem.values);

      oldStartIndex++; startIndex++;
      if (oldStartIndex > oldEndIndex || startIndex > endIndex){
        break outer;
      }
      oldStartItem = oldList[oldStartIndex];
      startItem = list[startIndex];
      successful = true;
    }

    oldEndItem = oldList[oldEndIndex];
    endItem = list[endIndex];
    while (oldEndItem.key === endItem.key){
      node = keyMap[endItem.key];
      if(node.xvdom__spec) rerender(node, endItem.values);

      oldEndIndex--; endIndex--;
      if (oldStartIndex > oldEndIndex || startIndex > endIndex){
        break outer;
      }
      oldEndItem = oldList[oldEndIndex];
      endItem = list[endIndex];
      successful = true;
    }

    while (oldStartItem.key === endItem.key){
      node = keyMap[endItem.key];
      if(node.xvdom__spec) rerender(node, endItem.values);

      if(oldEndItem.key !== endItem.key){
        parentNode.insertBefore(node, keyMap[oldEndItem.key].nextSibling);
      }
      oldStartIndex++; endIndex--;
      if (oldStartIndex > oldEndIndex || startIndex > endIndex){
        break outer;
      }
      oldStartItem = oldList[oldStartIndex];
      endItem = list[endIndex];
      successful = true;
    }

    while (oldEndItem.key === startItem.key){
      node = keyMap[startItem.key];
      if(node.xvdom__spec) rerender(node, startItem.values);

      if(oldStartItem.key !== startItem.key){
        parentNode.insertBefore(node, keyMap[oldStartItem.key]);
      }
      oldEndIndex--; startIndex++;
      if (oldStartIndex > oldEndIndex || startIndex > endIndex){
        break outer;
      }
      oldEndItem = oldList[oldEndIndex];
      startItem = list[startIndex];
      successful = true;
    }
  }
  if(oldStartIndex > oldEndIndex){
    while(startIndex <= endIndex){
      node = createNodeFromValue(list[startIndex]);
      keyMap[list[startIndex].key] = node;
      parentNode.insertBefore(node, keyMap[list[endIndex+1].key]);
      startIndex++;
    }
    // nextItem = (endIndex + 1 < listLength) ? list[endIndex + 1] : afterLastNode;
    // for (i = startIndex; i <= endIndex; i++){
    //   item = list[i];
    //   attachFragment(context, item, parentNode, component, nextItem);
    // }
  }
  else if(startIndex > endIndex){
    // removeFragments(context, parentNode, oldList, oldStartIndex, oldEndIndex + 1);
  }
  else{
    let i, oldNextItem = (oldEndIndex + 1 >= oldListLength ? null : oldList[oldEndIndex + 1]);
    let oldListMap = {};
    for(i = oldEndIndex; i >= oldStartIndex; i--){
      oldItem = oldList[i];
      oldItem.next = oldNextItem;
      oldListMap[oldItem.key] = oldItem;
      oldNextItem = oldItem;
    }
    nextItem = (endIndex + 1 < listLength) ? list[endIndex + 1] : afterLastNode;
    for(i = endIndex; i >= startIndex; i--){
      item = list[i];
      let key = item.key;
      oldItem = oldListMap[key];
      if(oldItem){
        oldListMap[key] = null;
        oldNextItem = oldItem.next;
        updateFragment(context, oldItem, item, parentNode, component);
        if(parentNode.nextSibling != (nextItem && nextItem.dom)){
          moveFragment(parentNode, item, nextItem);
        }
      }
      else{
        attachFragment(context, item, parentNode, component, nextItem);
      }
      nextItem = item;
    }
    for(i = oldStartIndex; i <= oldEndIndex; i++){
      oldItem = oldList[i];
      if(oldListMap[oldItem.key] !== null){
        removeFragment(context, parentNode, oldItem);
      }
    }
  }

  rendererFunc     = rerenderArrayValue;
  rArg[3]          = list;
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
  const keyMap          = {};
  const beforeFirstNode = parentNode.lastChild;
  let node, value, i=0;

  while(i<length){
    value = arrayValue[i++];
    node  = createNodeFromValue(value);
    parentNode.appendChild(keyMap[value.key] = node);
  }

  rendererFunc     = rerenderArrayValue;
  rendererFirstArg = [parentNode, keyMap, beforeFirstNode, arrayValue];
  values.push(rendererFunc, rendererFirstArg);
}

function attachAndRegisterNodeFromValue(value, parentNode, values){
  if(value instanceof Array) return createAndRegisterFromArrayValue(parentNode, value, values);

  let node = createNodeFromValue(value);
  setRerenderFuncForValue([parentNode, node, value]);
  values.push(rendererFunc, rendererFirstArg);
  parentNode.appendChild(node);
}

/*
  vnode     : number valueRef | {el, props, children} vnode
  values    : Array<any>
  paretNode : Node
*/
function attachNodeFromValueOrReference(vnode, values, parentNode){
  switch(typeof vnode){
    case 'object':
      parentNode.appendChild(createElement(vnode, values));
      break;
    case 'string':
      parentNode.appendChild(document.createTextNode(vnode));
      break;
    default:
      attachAndRegisterNodeFromValue(values[vnode], parentNode, values);
  }
}

function initialPatch(node, spec){
  attachNodeFromValueOrReference(spec.template, spec.values, node);
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

const recycledSpecs = {};

export function patch(node, spec){
  if(node.xvdom__spec){
    // Only rerender if there are dynamic values
    if(spec.values) rerender(node, spec.values);
    return;
  }

  if(spec.recycleKey){
    const recycledStack = recycledSpecs[spec.recycleKey];
    if(recycledStack){
      const recycled = recycledStack.pop();
      if(recycled){
        const oldSpec = recycled.spec;
        const rootNodes = recycled.rootNodes;
        const length = rootNodes.length;
        let i=0;

        while(i<length){
          node.appendChild(rootNodes[i++]);
        }

        node.xvdom__spec = oldSpec;
        rerender(node, spec.values);
        return;
      }
    }
  }

  initialPatch(node, spec);
}

export function unmount(node){
  const spec = node.xvdom__spec;
  if(spec && spec.recycleKey){
    const rootNodes = [];
    let curNode = node.firstChild;
    while(curNode){
      node.removeChild(curNode);
      rootNodes.push(curNode);
      curNode = curNode.nextSibling;
    }

    let recycledStack = recycledSpecs[spec.recycleKey];
    if(!recycledStack){
      recycledStack = recycledSpecs[spec.recycleKey] = [];
    }
    recycledStack.push({spec, rootNodes});
    node.xvdom__spec = null;
  }
  else{
    node.innerHTML = '';
  }
}
