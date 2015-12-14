/*

Instance properties:

$c:Function - component for stateful components
$p:Object - props for components
$t:Object - state for stateful components
$s:Spec - spec
$dispatch:Function - updates the state of stateful components
$getDispatcherForAction:Function - retrieves a prebound function that calls dispatch for an action

Spec properties:

c:Function - create (or render)
u:Function - update (or update)

*/

const EMPTY_STRING = '';
const EMPTY_OBJECT = {};

const replaceNode = (oldNode, newNode)=>{
  const parentNode = oldNode.parentNode;
  if(parentNode) parentNode.replaceChild(newNode, oldNode);
};

const recycle = (stash, node)=>{
  if(stash) stash.push(node);
};

const removeArrayNodes = (list, parentNode)=>{
  let item, node;
  while(item = list.pop()){
    recycle(item.$s.recycled, node = item.$n);
    parentNode.removeChild(node);
  }
};

const internalRerenderInstance = (inst, prevInst)=>
  prevInst.$s === inst.$s && (inst.$s.u(inst, prevInst), true);

function internalRerenderStatefulComponent(inst, prevInst, parentInst, componentInstanceProp){
  if(internalRerenderInstance(inst, prevInst)) return;

  const newNode = renderInstance(inst);
  const node    = parentInst.$n;

  inst.$c = prevInst.$c;
  inst.$t = prevInst.$t;
  inst.$p = prevInst.$p;
  inst.$getDispatcherForAction = prevInst.$getDispatcherForAction;
  inst.$dispatch = prevInst.$dispatch;
  inst.$dispatch.$$instance = inst;

  parentInst.$n = newNode;
  parentInst[componentInstanceProp] = inst;

  newNode.xvdom = parentInst;
  replaceNode(node, newNode);
  recycle(inst.$s.recycled, node);
}

export function renderArray(frag, array){
  const length = array.length;
  let item;

  for(let i=0; i<length; ++i){
    item = array[i];
    frag.appendChild(item.$n = renderInstance(item));
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
  replaceNode(
    contextNode,
    createDynamic(value, instance, rerenderFuncProp, rerenderContextNode)
  );
  return value;
}

export function rerenderInstance(value, prevValue, node, instance, rerenderFuncProp, rerenderContextNode){
  if(value && internalRerenderInstance(value, prevValue)) return prevValue;

  return rerenderDynamic(value, prevValue, node, instance, rerenderFuncProp, rerenderContextNode);
}

export function rerenderStatefulComponent(component, props, prevProps, componentInstance, node, instance, rerenderContextNode, componentInstanceProp){
  const onProps        = component.onProps;
  componentInstance.$p = props;

  if(onProps) componentInstance.$dispatch(onProps);
  else{
    internalRerenderStatefulComponent(
      component(props, componentInstance.$t),
      componentInstance,
      instance,
      componentInstanceProp
    );
  }
}

export function rerenderComponent(component, props, prevProps, componentInstance, node, instance, rerenderContextNode, componentInstanceProp){
  const newCompInstance = component(props || EMPTY_OBJECT);
  if(internalRerenderInstance(newCompInstance, componentInstance)) return;

  const newNode = renderInstance(newCompInstance);
  instance[componentInstanceProp] = newCompInstance;
  instance[rerenderContextNode]   = newNode;
  newNode.xvdom = instance;
  replaceNode(node, newNode);
}

export function renderInstance(instance){
  const spec = instance.$s;
  let node = spec.recycled && spec.recycled.pop();
  if(node){
    spec.u(instance, node.xvdom);
    instance.$n = node;
    return node;
  }

  instance.$n = node = spec.c(instance);
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
      node = oldStartItem.$n;
      startItem.$n = rerender(node, startItem);

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
      node = oldEndItem.$n;
      endItem.$n = rerender(node, endItem);

      oldEndIndex--; endIndex--;
      if (oldStartIndex > oldEndIndex || startIndex > endIndex){
        break outer;
      }
      oldEndItem = oldList[oldEndIndex];
      endItem = list[endIndex];
      successful = true;
    }

    while (oldStartItem.key === endItem.key){
      nextItem = endIndex + 1 < length ? list[endIndex + 1].$n : markerNode;
      node = oldStartItem.$n;
      endItem.$n = node = rerender(node, endItem);
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
      node = oldEndItem.$n;
      startItem.$n = node = rerender(node, startItem);
      nextItem = oldStartItem.$n;
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
    insertBeforeNode = endItem ? endItem.$n : markerNode;
    while(startIndex <= endIndex){
      startItem = list[startIndex++];
      node = renderInstance(startItem);
      parentNode.insertBefore(node, insertBeforeNode);
    }
  }
  else if(startIndex > endIndex){
    while(oldStartIndex <= oldEndIndex){
      oldStartItem = oldList[oldStartIndex++];
      recycle(oldStartItem.$s.recycled, node = oldStartItem.$n);
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
        node = rerender(item.$n, startItem);
        item.$n = null;
      }
      else{
        node = renderInstance(startItem);
      }
      startItem.$n = node;
      parentNode.insertBefore(node, oldEndItem.$n);
    }

    while(saveItem){
      node = saveItem.$n;
      if(node){
        recycle(saveItem.$s.recycled, node);
        parentNode.removeChild(node);
      }
      saveItem = saveItem.next;
    }
  }
  return list;
}

export function rerender(node, instance){
  const prevInstance = node.xvdom;
  if(internalRerenderInstance(instance, prevInstance)) return node;

  const newNode = renderInstance(instance);
  replaceNode(node, newNode);
  recycle(prevInstance.$s.recycled, node);
  return newNode;
}

export function createComponent(component, props, instance, rerenderFuncProp, rerenderContextNode, componentInstanceProp){
  if(component.getInitialState) return createStatefulComponent(component, props, instance, rerenderFuncProp, rerenderContextNode, componentInstanceProp);

  const inst = component(props || EMPTY_OBJECT);
  const node = renderInstance(inst);

  instance[rerenderFuncProp]      = rerenderComponent;
  instance[componentInstanceProp] = inst;
  instance[rerenderContextNode]   = node;
  return node;
}

let actionId = 0;

export function createStatefulComponent(component, props, instance, rerenderFuncProp, rerenderContextNode, componentInstanceProp){
  const cachedDispatchers = {};

  const dispatch = (action, arg)=>{
    const componentInst = dispatch.$$instance;
    const newState = action(componentInst.$p, componentInst.$t, dispatch, arg);
    if(newState !== componentInst.$t){
      componentInst.$t = newState;
      internalRerenderStatefulComponent(
        component(componentInst.$p, newState, componentInst.$getDispatcherForAction),
        componentInst,
        instance,
        componentInstanceProp
      );
    }
  };

  const getDispatcherForAction = action=>{
    let id = action.$$xvdomId;
    return id ? cachedDispatchers[id] : (
      cachedDispatchers[action.$$xvdomId = ++actionId] = arg=>dispatch(action, arg)
    );
  };

  const state = component.getInitialState(props || EMPTY_OBJECT, dispatch);
  const inst  = component(props, state, getDispatcherForAction);
  const node  = renderInstance(inst);

  inst.$c = component;
  inst.$t = state;
  inst.$p = props;

  // TODO: rename to $d
  inst.$dispatch = dispatch;

  // TODO: rename to $g
  inst.$getDispatcherForAction = getDispatcherForAction;

  dispatch.$$instance = inst;

  instance[rerenderFuncProp]      = rerenderStatefulComponent;
  instance[componentInstanceProp] = inst;
  instance[rerenderContextNode]   = node;
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
  if(node.xvdom) recycle(node.xvdom.$s.recycled, node);
  if(node.parentNode) node.parentNode.removeChild(node);
}
