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

function internalRerenderStatefulComponent(stateActions, inst, prevInst, parentInst, componentInstanceProp){
  if(prevInst.spec === inst.spec){
    inst.spec.rerender(inst, prevInst);
    return;
  }

  const newNode = renderInstance(inst);
  const node    = parentInst._node;

  stateActions.$$instance = inst;

  inst.component = prevInst.component;
  inst.state     = prevInst.state;
  inst.actions   = prevInst.actions;
  inst.props     = prevInst.props;

  parentInst._node = newNode;
  parentInst[componentInstanceProp] = inst;
  newNode.xvdom = parentInst;

  node.parentNode.replaceChild(newNode, node);
  recycle(inst.spec.recycled, node);
}

function callAction(stateActions, action, parentInst, componentInstanceProp, args){
  const inst               = stateActions.$$instance;
  const {props, state}     = inst;
  const shouldRerender     = stateActions.$$doRerender;
  stateActions.$$doRerender = false;
  const newState           = action(props, state, stateActions, ...args) || state;
  stateActions.$$doRerender = shouldRerender;
  if(state !== newState){
    inst.state = newState;
    if(shouldRerender){
      internalRerenderStatefulComponent(
        stateActions,
        inst.component(props, newState, stateActions),
        inst,
        parentInst,
        componentInstanceProp
      );
    }
  }
  return newState;
}

function createStateActions(stateActions, parentInst, componentInstanceProp, preInstance){
  const result = {$$doRerender: false, $$instance: preInstance};
  for(let sa in stateActions){
    result[sa] = (action=>
      (...args)=>callAction(result, action, parentInst, componentInstanceProp, args)
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
  if(value == null){
    contextNode.nodeValue = EMPTY_STRING;
  }
  else if(value.constructor === String || value.constructor === Number){
    contextNode.nodeValue = value;
  }
  else{
    rerenderDynamic(value, oldValue, contextNode, instance, rerenderFuncProp, rerenderContextNode);
  }
  return value;
}

export function rerenderDynamic(value, oldValue, contextNode, instance, rerenderFuncProp, rerenderContextNode){
  const parentNode = contextNode.parentNode;
  if(parentNode){
    parentNode.replaceChild(
      createDynamic(value, instance, rerenderFuncProp, rerenderContextNode),
      contextNode
    );
  }
  return value;
}

export function rerenderInstance(value, prevValue, node, instance, rerenderFuncProp, rerenderContextNode){
  const prevSpec = prevValue.spec;

  if(prevSpec === (value && value.spec)){
    prevSpec.rerender(value, prevValue);
    return prevValue;
  }

  rerenderDynamic(value, prevValue, node, instance, rerenderFuncProp, rerenderContextNode);
  return value;
}

export function rerenderStatefulComponent(component, props, prevProps, componentInstance, node, instance, rerenderContextNode, componentInstanceProp){
  const onProps = componentInstance.actions.onProps;
  componentInstance.props = props;

  if(onProps) onProps();
}

export function rerenderComponent(component, props, prevProps, componentInstance, node, instance, rerenderContextNode, componentInstanceProp){
  const newCompInstance = component(props || EMPTY_OBJECT);
  if(componentInstance.spec === newCompInstance.spec){
    componentInstance.spec.rerender(newCompInstance, componentInstance);
    return;
  }

  const newNode = renderInstance(newCompInstance);
  instance[componentInstanceProp] = newCompInstance;
  instance[rerenderContextNode]   = newNode;
  newNode.xvdom = instance;
  node.parentNode.replaceChild(newNode, node);
}

export function renderInstance(instance){
  const spec = instance.spec;
  let node = spec.recycled && spec.recycled.pop();
  if(node){
    spec.rerender(instance, node.xvdom);
    instance._node = node;
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
    return list;
  }

  const length    = list.length;
  const oldLength = oldList.length;
  let i, node, value, insertBeforeNode;

  if(length === 0){
    removeArrayNodes(oldList, parentNode);
    return list;
  }


  if (oldLength === 0){
    i = 0;
    while(i < length){
      value = list[i++];
      node = renderInstance(value);
      parentNode.insertBefore(node, markerNode);
    }
    return list;
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
      node = renderInstance(startItem);
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
  return list;
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

  const inst = component(props || EMPTY_OBJECT);
  const node = renderInstance(inst);

  instance[rerenderFuncProp]      = rerenderComponent;
  instance[componentInstanceProp] = inst;
  instance[rerenderContextNode]   = node;

  return node;
}

const preInstance = {props: undefined, component: undefined, state: undefined};

export function createStatefulComponent(component, props, instance, rerenderFuncProp, rerenderContextNode, componentInstanceProp){
  preInstance.props     = props;
  preInstance.component = component;
  const rawActions      = component.state;
  const actions         = createStateActions(rawActions, instance, componentInstanceProp, preInstance);
  const state           = rawActions.onInit(props || EMPTY_OBJECT, undefined, actions);
  actions.$$doRerender  = true;
  const inst            = component(props, state, actions);
  const node            = renderInstance(inst);

  actions.$$instance = inst;

  inst.component = component;
  inst.state     = state;
  inst.actions   = actions;
  inst.props     = props;

  instance[rerenderFuncProp]      = rerenderStatefulComponent;
  instance[rerenderContextNode]   = node;
  instance[componentInstanceProp] = inst;
  return node;
}

export function createDynamic(value, instance, rerenderFuncProp, rerenderContextNode){
  let node, context, rerenderFunc;
  let valueConstructor;
  if(value == null || ((valueConstructor = value.constructor) === Boolean)){
    instance[rerenderFuncProp] = rerenderDynamic;
    return instance[rerenderContextNode] = document.createTextNode(EMPTY_STRING);
  }

  if(valueConstructor === Object){
    rerenderFunc = rerenderInstance;
    context = node = renderInstance(value);
  }
  else if(valueConstructor === String || valueConstructor === Number){
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
