const EMPTY_STRING = '';
const EMPTY_OBJECT = {};

function recycle(stash, node){
  if(stash) stash.push(node);
}

function removeArrayNodes(list, parentNode){
  let item, node;
  while(item = list.pop()){
    recycle(item.spec.recycled, node = item._node);
    parentNode.removeChild(node);
  }
}

function propsNotEqual(a, b){
  let keyCount = 0;
  for(let prop in a){
    if(a[prop] !== b[prop]) return true;
    keyCount++;
  }

  return keyCount !== Object.keys(b).length;
}

function createStateActions(stateActions){
  const result = {};
  for(let sa in stateActions){
    result[sa] = (action=>
      function wrapAction(...args){
        const inst     = wrapAction.instance;
        const newState = action(inst.state, ...args);
        if(inst.state !== newState){
          inst.state = newState;
          inst._node = rerender(
            inst._node,
            inst.component(newState, stateActions)
          );
        }
      }
    )(stateActions[sa]);
  }
  return result;
}

export function renderArray(frag, array){
  const length = array.length;
  let item;

  for(let i=0; i<length; ++i){
    item = array[i];
    frag.appendChild(item._node = renderInstance(item));
  }
  return frag.appendChild(document.createTextNode(EMPTY_STRING));
}

export function rerenderText(value, oldValue, contextNode, instance, rerenderFuncProp, rerenderContextNode){
  if(value == null || value.constructor === String){
    contextNode.nodeValue = value || EMPTY_STRING;
    return;
  }
  rerenderDynamic(value, oldValue, contextNode, instance, rerenderFuncProp, rerenderContextNode);
}

export function rerenderDynamic(value, oldValue, contextNode, instance, rerenderFuncProp, rerenderContextNode){
  contextNode.parentNode.replaceChild(
    createDynamic(value, instance, rerenderFuncProp, rerenderContextNode),
    contextNode
  );
}

export function rerenderInstance(value, prevValue, node, instance, rerenderFuncProp, rerenderContextNode){
  const prevSpec = prevValue.spec;

  if(prevSpec === (value && value.spec)){
    prevSpec.rerender(value, prevValue);
    return;
  }

  rerenderDynamic(value, prevValue, node, instance, rerenderFuncProp, rerenderContextNode);
}

export function rerenderStatefulComponent(component, props, prevProps, componentInstance, node, instance, rerenderContextNode, componentInstanceProp){
  const onProps = componentInstance.actions.onProps;

  if(onProps && propsNotEqual(props, prevProps)){
    onProps(props);
  }
}

export function rerenderComponent(component, props, prevProps, componentInstance, node, instance, rerenderContextNode, componentInstanceProp){
  if(propsNotEqual(props, prevProps)){
    instance[rerenderContextNode] = rerender(
      node,
      instance[componentInstanceProp] = component(props || EMPTY_OBJECT)
    );
  }
}

export function renderInstance(instance){
  const spec = instance.spec;
  let node = spec.recycled && spec.recycled.pop();
  if(node){
    spec.rerender(instance, node.xvdom);
    return node;
  }

  instance._node = node = spec.render(instance);
  node.xvdom = instance;
  return node;
}

export function rerenderArray(list, oldList, markerNode, valuesAndContext, rerenderFuncProp, rerenderContextNode){
  const parentNode = markerNode.parentNode;

  if(!list || list.constructor !== Array){
    removeArrayNodes(oldList, parentNode);
    rerenderDynamic(list, oldList, markerNode, valuesAndContext, rerenderFuncProp, rerenderContextNode);
    return;
  }

  const length    = list.length;
  const oldLength = oldList.length;
  let i, node, value, insertBeforeNode;

  if(length === 0){
    removeArrayNodes(oldList, parentNode);
    return;
  }

  if (oldLength === 0){
    i = 0;
    while(i < length){
      value = list[i++];
      value._node = node = renderInstance(value);
      parentNode.insertBefore(node, markerNode);
    }
    return;
  }

  let oldEndIndex     = oldLength - 1;
  let endIndex        = length - 1;
  let oldStartIndex   = 0;
  let startIndex      = 0;
  let successful      = true;
  let oldStartItem, oldEndItem, startItem, endItem, nextItem;

  outer: while(successful && oldStartIndex <= oldEndIndex && startIndex <= endIndex){
    successful = false;

    oldStartItem = oldList[oldStartIndex];
    startItem = list[startIndex];
    while (oldStartItem.key === startItem.key){
      node = oldStartItem._node;
      startItem._node = rerender(node, startItem);

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
      node = oldEndItem._node;
      endItem._node = rerender(node, endItem);

      oldEndIndex--; endIndex--;
      if (oldStartIndex > oldEndIndex || startIndex > endIndex){
        break outer;
      }
      oldEndItem = oldList[oldEndIndex];
      endItem = list[endIndex];
      successful = true;
    }

    while (oldStartItem.key === endItem.key){
      nextItem = endIndex + 1 < length ? list[endIndex + 1]._node : markerNode;
      node = oldStartItem._node;
      endItem._node = node = rerender(node, endItem);
      if(oldEndItem.key !== endItem.key){
        parentNode.insertBefore(node, nextItem);
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
      node = oldEndItem._node;
      startItem._node = node = rerender(node, startItem);
      nextItem = oldStartItem._node;
      if(oldStartItem.key !== startItem.key){
        if(nextItem){
          parentNode.insertBefore(node, nextItem);
        }
        else{
          parentNode.appendChild(node);
        }
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
    insertBeforeNode = endItem ? endItem._node : markerNode;
    while(startIndex <= endIndex){
      startItem = list[startIndex++];
      startItem._node = node = renderInstance(startItem);
      parentNode.insertBefore(node, insertBeforeNode);
    }
  }
  else if(startIndex > endIndex){
    while(oldStartIndex <= oldEndIndex){
      oldStartItem = oldList[oldStartIndex++];
      recycle(oldStartItem.spec.recycled, node = oldStartItem._node);
      parentNode.removeChild(node);
    }
  }
  else{
    const oldListNodeKeyMap = {};
    let saveItem = oldStartItem;
    let item, prevItem;
    i = oldStartIndex;

    if(i <= oldEndIndex){
      item = oldList[i++];
      oldListNodeKeyMap[item.key] = prevItem = item;
    }

    while(i <= oldEndIndex){
      prevItem.next = item = oldList[i++];
      oldListNodeKeyMap[item.key] = prevItem = item;
    }

    while(startIndex <= endIndex){
      startItem = list[startIndex++];
      item = oldListNodeKeyMap[startItem.key];
      if(item){
        node = rerender(item._node, startItem);
        item._node = null;
      }
      else{
        node = renderInstance(startItem);
      }
      startItem._node = node;
      parentNode.insertBefore(node, markerNode);
    }

    while(saveItem){
      node = saveItem._node;
      if(node){
        recycle(saveItem.spec.recycled, node);
        parentNode.removeChild(node);
      }
      saveItem = saveItem.next;
    }
  }
}

export function rerender(node, instance){
  const prevInstance   = node.xvdom;
  const spec = instance.spec;
  if(spec === prevInstance.spec){
    spec.rerender(instance, prevInstance);
    return node;
  }

  const newNode = renderInstance(instance);
  node.parentNode.replaceChild(newNode, node);
  recycle(prevInstance.spec.recycled, node);
  return newNode;
}

export function createComponent(component, props, instance, rerenderFuncProp, rerenderContextNode, componentInstanceProp){
  if(component.state) return createStatefulComponent(component, props, instance, rerenderFuncProp, rerenderContextNode, componentInstanceProp);

  const inst = component(props);
  const node = renderInstance(inst);

  instance[rerenderFuncProp]      = rerenderComponent;
  instance[componentInstanceProp] = inst;
  instance[rerenderContextNode]   = node;

  return node;
}

export function createStatefulComponent(component, props, instance, rerenderFuncProp, rerenderContextNode, componentInstanceProp, componentStateProp, componentStateActionsProp){
  const state   = component.state.onInit(props);
  const actions = createStateActions(component.state);
  const inst    = component(state, actions);
  const node    = renderInstance(inst);

  for(let sa in actions){
    actions[sa].instance = inst;
  }

  inst.component = component;
  inst.state     = state;
  inst.actions   = actions;
  inst._node     = node;

  instance[rerenderFuncProp]      = rerenderStatefulComponent;
  instance[rerenderContextNode]   = node;
  instance[componentInstanceProp] = inst;
  return node;
}

export function createDynamic(value, instance, rerenderFuncProp, rerenderContextNode){
  value                  = value || EMPTY_STRING;
  const valueConstructor = value.constructor;
  let node, context, rerenderFunc;

  if(valueConstructor === Object){
    rerenderFunc = rerenderInstance;
    context = node = renderInstance(value);
  }
  else if(valueConstructor === String){
    rerenderFunc = rerenderText;
    context = node = document.createTextNode(value);
  }
  else if(valueConstructor === Array){
    rerenderFunc = rerenderArray;
    node = document.createDocumentFragment();
    context = renderArray(node, value);
  }

  instance[rerenderFuncProp]    = rerenderFunc;
  instance[rerenderContextNode] = context;
  return node;
}

export function unmount(node){
  if(node.xvdom) recycle(node.xvdom.spec.recycled, node);
  if(node.parentNode) node.parentNode.removeChild(node);
}
