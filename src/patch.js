const EMPTY_PROPS = {};
const recycledSpecs = {};
let rendererFunc;
let rendererFirstArg;

function isString(value){ return typeof value === 'string'; }

function rerenderProp(rArg/* [node, prop] */, value){
  rArg[0][rArg[1]] = value;
}

function applyProp(node, prop, propValue, values){
  if(prop[0] !== '$'){
    node[prop] = propValue;
    return;
  }
  const actualProp = prop.slice(1);
  node[actualProp] = values[propValue];
  values.push(rerenderProp, [node, actualProp]);
}

function applyProps(node, props, values){
  for(let key in props){
    applyProp(node, key, props[key], values);
  }
}

function createAddChildren(parentNode, vchildren, values){
  const length = vchildren.length;
  let i=0;
  while(i<length){
    attachNodeFromValueOrReference(vchildren[i++], values, parentNode);
  }
}

function rerenderSpec(prevSpec, spec, rerenderCount){
  const values    = spec.values;
  const oldValues = prevSpec.values;
  const length    = oldValues.length/3;
  let newValue, firstArgOffset;

  for(let i=0, j=length; i<length; ++i, j+=2){
    newValue = values[i];

    if(newValue !== oldValues[i]){
      firstArgOffset   = j+1;
      rendererFunc     = oldValues[j];
      rendererFirstArg = oldValues[firstArgOffset];

      if(rerenderComponent === rendererFunc){
        if(rendererFirstArg.rerenderCount !== rerenderCount){
          rendererFirstArg.rerenderCount = rerenderCount;
          rendererFunc(rendererFirstArg, values);
        }
      }
      else{
        rendererFunc(rendererFirstArg, newValue);
      }

      oldValues[i]              = newValue;
      oldValues[j]              = rendererFunc;
      oldValues[firstArgOffset] = rendererFirstArg;
    }
  }
}

function rerenderComponent(rArg/* [props, origProps, node] */, componentValues){
  const [props, origProps, node] = rArg;
  for(let key in origProps){
    if(key[0] === '$'){
      props[key.slice(1)] = componentValues[props[key]];
    }
  }
  rerenderSpec(node.xvdom__componentSpec, node.xvdom__component(props));
  rendererFunc     = rerenderComponent;
  rendererFirstArg = rArg;
  return node;
}

function getPropValues(props, values){
  let result = props;
  let actualProp, rArg, value;
  for(let key in props){
    if(key[0] === '$'){
      if(result === props){
        result        = Object.create(props);
        rArg          = [result, props];
      }

      value              = values[props[key]];
      actualProp         = key.slice(1);
      result[actualProp] = value;
      values.push(rerenderComponent, rArg);
    }
  }

  rendererFirstArg = rArg;
  return result;
}

function createComponent(component, componentProps, componentChildren, componentValues){
  const componentPropValues = componentProps ? getPropValues(componentProps, componentValues) : EMPTY_PROPS;
  const rArg                = rendererFirstArg;
  const componentSpec       = component(componentPropValues);
  const {template, values}  = componentSpec;
  const node = createDOMElement(template.el, template.props, template.children, values);

  if(componentProps !== componentPropValues){
    rArg.push(node);
  }
  node.xvdom__componentRenderCount = 0;
  node.xvdom__componentSpec        = componentSpec;
  node.xvdom__component            = component;
  return node;
}

function createDOMElement(el, props, children, values){
  const node = document.createElement(el);
  if(props)    applyProps(node, props, values);
  if(children) createAddChildren(node, children, values);
  return node;
}

function createElement({el, props, children}, values){
  return el.constructor === String ? createDOMElement(el, props, children, values)
    : createComponent(el, props, children, values);
}

function rerenderToArray(rArg/* [node, prevValue] */, list){
  const length     = list.length;
  const beforeNode = rArg[0];
  const parentNode = rArg[0] = beforeNode.parentNode;
  let item, i=0;

  /*parentNode, beforeFirstNode, oldList*/
  rArg[1] = beforeNode.previousSibling;
  rArg[2] = list;

  while(i<length){
    item = list[i++];
    parentNode.insertBefore(
      (item.node = createElementFromValue(item)),
      beforeNode
    );
  }

  parentNode.removeChild(beforeNode);
  rendererFunc = rerenderArrayValue;
  rendererFirstArg = rArg;
}

function rerenderTextNodeValue(rArg/*[node, prevValue] */, value){
  if(isString(value)){
    rArg[0].nodeValue = value;
    rArg[1] = value;
  }
  else if(value.constructor === Array){
    rerenderToArray(rArg, value);
  }
  else{
    rerenderValue(rArg, value);
  }
}

function rerenderValue(rArg/* [node, prevValue] */, value){
  if(value.constructor === Array) return rerenderToArray(rArg, value);
  const node    = rArg[0];
  const newNode = rArg[0] = createNodeFromValue(value);
  node.parentNode.replaceChild(newNode, node);
  rArg[1] = value;
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

function rerenderArrayValue(rArg /* [parentNode, beforeFirstNode, oldList] */, list){
  const [parentNode, beforeFirstNode, oldList] = rArg;
  let oldListLength  = oldList.length;
  let listLength     = list.length;
  let isListNotArray = list.constructor !== Array;
  let i, node, value;

  if(listLength === 0 || isListNotArray){
    for(i=0; i<oldListLength; ++i){
      parentNode.removeChild(oldList[i].node);
    }

    if(isListNotArray){
      parentNode.insertBefore(
        (rArg[0] = createNodeFromValue(list)),
        //TODO(pwong): Test rerendering IN THE MIDDLE Array, Array -> Text, Array -> Element
        (beforeFirstNode ? beforeFirstNode.nextSibling : null)
      );
      rArg[1] = list;
      rArg[2] = null;
      return;
    }
  }
  else if (oldListLength === 0){
    i = 0;
    while(i < listLength){
      value = list[i++];
      parentNode.insertBefore(
        (value.node = createElementFromValue(value)),
        (beforeFirstNode ? beforeFirstNode.nextSibling : null)
      );
    }
  }
  else{
    const afterLastNode = oldListLength ? oldList[oldListLength-1].node.nextSibling : null;
    let oldEndIndex     = oldListLength - 1;
    let endIndex        = listLength - 1;
    let oldStartIndex   = 0;
    let startIndex      = 0;
    let successful      = true;
    let key, insertBeforeNode, oldStartItem, oldEndItem, startItem, endItem;

    outer: while(successful && oldStartIndex <= oldEndIndex && startIndex <= endIndex){
      successful = false;

      oldStartItem = oldList[oldStartIndex];
      startItem = list[startIndex];
      while (oldStartItem.key === startItem.key){
        node = oldStartItem.node;
        startItem.node = node.xvdom__spec ? rerender(node, startItem) : node;

        ++oldStartIndex; ++startIndex;
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
        node = oldEndItem.node;
        endItem.node = node.xvdom__spec ? rerender(node, endItem) : node;

        --oldEndIndex; --endIndex;
        if (oldStartIndex > oldEndIndex || startIndex > endIndex){
          break outer;
        }
        oldEndItem = oldList[oldEndIndex];
        endItem = list[endIndex];
        successful = true;
      }

      while (oldStartItem.key === endItem.key){
        node = oldStartItem.node;
        endItem.node = node.xvdom__spec ? rerender(node, endItem) : node;

        if(oldEndItem.key !== endItem.key){
          parentNode.insertBefore(node, oldEndItem.node.nextSibling);
        }
        ++oldStartIndex; --endIndex;
        if (oldStartIndex > oldEndIndex || startIndex > endIndex){
          break outer;
        }
        oldStartItem = oldList[oldStartIndex];
        endItem = list[endIndex];
        successful = true;
      }

      while (oldEndItem.key === startItem.key){
        node = oldEndItem.node;
        startItem.node = node.xvdom__spec ? rerender(node, startItem) : node;

        if(oldStartItem.key !== startItem.key){
          parentNode.insertBefore(node, oldStartItem.node);
        }
        --oldEndIndex; ++startIndex;
        if (oldStartIndex > oldEndIndex || startIndex > endIndex){
          break outer;
        }
        oldEndItem = oldList[oldEndIndex];
        startItem = list[startIndex];
        successful = true;
      }
    }
    if(oldStartIndex > oldEndIndex){
      insertBeforeNode = endItem ? endItem.node : afterLastNode;
      while(startIndex <= endIndex){
        startItem = list[startIndex++];
        parentNode.insertBefore(
          (startItem.node = createElementFromValue(startItem)),
          insertBeforeNode
        );
      }
    }
    else if(startIndex > endIndex){
      while(oldStartIndex <= oldEndIndex){
        oldStartItem = oldList[oldStartIndex++];
        parentNode.removeChild(oldStartItem.node);
      }
    }
    else{
      const oldListNodeKeyMap = {};
      while(oldStartItem){
        oldListNodeKeyMap[oldStartItem.key] = oldStartItem.node;
        oldStartItem = oldList[++oldStartIndex];
      }

      while(startIndex <= endIndex){
        startItem = list[startIndex++];
        node = oldListNodeKeyMap[startItem.key];
        if(!node){
          node = createElementFromValue(startItem);
        }
        else if(node.xvdom__spec){
          node = rerender(node, startItem);
        }

        delete oldListNodeKeyMap[startItem.key];
        parentNode.insertBefore((startItem.node = node), afterLastNode);
      }

      for(key in oldListNodeKeyMap){
        parentNode.removeChild(oldListNodeKeyMap[key]);
      }
    }
  }

  rendererFunc     = rerenderArrayValue;
  rArg[2]          = list;
  rendererFirstArg = rArg;
}

function createElementFromValue(value){
  const values = value.values;
  const node = createElement(value.template, values);
  if(values) node.xvdom__spec = value;
  return node;
}

function createNodeFromValue(value){
  return isString(value)
            ? (rendererFunc = rerenderTextNodeValue, document.createTextNode(value))
            : (rendererFunc = rerenderValue,         createElementFromValue(value));
}

function createAndRegisterFromArrayValue(parentNode, arrayValue, values, insertBeforeNode){
  const length          = arrayValue.length;
  const beforeFirstNode = parentNode.lastChild;
  let node, value, i=0;

  if(insertBeforeNode){
    while(i<length){
      value = arrayValue[i++];
      node  = createElementFromValue(value);
      parentNode.insertBefore(
        (value.node = node),
        insertBeforeNode
      );
    }
  }
  else{
    while(i<length){
      value = arrayValue[i++];
      parentNode.appendChild(value.node = createElementFromValue(value));
    }
  }

  rendererFunc     = rerenderArrayValue;
  rendererFirstArg = [parentNode, beforeFirstNode, arrayValue];
  values.push(rendererFunc, rendererFirstArg);
}

function attachAndRegisterNodeFromValue(value, parentNode, values){
  if(value.constructor === Array) return createAndRegisterFromArrayValue(parentNode, value, values);

  const node = createNodeFromValue(value);
  values.push(rendererFunc, [node, value]);
  parentNode.appendChild(node);
}

/*
  vnode     : number valueRef | {el, props, children} vnode
  values    : Array<any>
  paretNode : Node
*/
function attachNodeFromValueOrReference(vnode, values, parentNode){
  const constructor = vnode.constructor;
  if(constructor === Number){
    attachAndRegisterNodeFromValue(values[vnode], parentNode, values);
  }
  else if(constructor === String){
    parentNode.appendChild(document.createTextNode(vnode));
  }
  else{
    parentNode.appendChild(createElement(vnode, values));
  }
}

function rerenderRootNode(node, spec){
  const newNode = createElementFromValue(spec);
  node.parentNode.replaceChild(newNode, node);
  newNode.xvdom__spec = spec;
  return newNode;
}

function initialPatch(node, spec){
  if(spec.recycleKey){
    const recycledStack = recycledSpecs[spec.recycleKey];
    const recycled      = recycledStack && recycledStack.pop();
    if(recycled){
      const rootNodes = recycled.rootNodes;
      const length    = rootNodes.length;
      let i=0;

      while(i<length){
        node.appendChild(rootNodes[i++]);
      }

      node.xvdom__spec = recycled.spec;
      rerender(node, spec);
      return;
    }
  }

  attachNodeFromValueOrReference(spec.template, spec.values, node);
  node.xvdom__spec = spec;
  node.xvdom__componentRenderCount = 0;
}

function rerender(node, spec){
  const prevSpec = node.xvdom__spec;
  if(spec.template !== prevSpec.template) return rerenderRootNode(node, spec);

  rerenderSpec(
    prevSpec,
    spec,
    (node.xvdom__rerenderCount = (node.xvdom__rerenderCount || 0) + 1)
  );
  return node;
}

export function patch(node, spec){
  if(!node.xvdom__spec) initialPatch(node, spec);
  // Only rerender if there are dynamic values
  else if(spec.values)  rerender(node, spec);
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
