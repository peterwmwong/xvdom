/*

Instance properties:

$a - actions for stateful components
$c - component for stateful components
$p - props for components
$t - state for stateful components
$s - spec

Spec properties:

c - create (or render)
u - update (or update)

*/

const EMPTY_STRING = '';
const EMPTY_OBJECT = {};
const preInstance = {$p:null};

const replaceNode = (oldNode, newNode)=>{
  const parentNode = oldNode.parentNode;
  if(parentNode) parentNode.replaceChild(newNode, oldNode);
};

const recycle = (stash, node)=>{
  if(stash) stash.push(node);
};

const insertBefore = (parentNode, node, beforeNode)=>
  beforeNode ? parentNode.insertBefore(node, beforeNode) : parentNode.appendChild(node);

const removeArrayNodes = (list, parentNode)=>{
  let item, node;
  while(item = list.pop()){
    recycle(item.$s.recycled, node = item.$n);
    parentNode.removeChild(node);
  }
};

const internalRerenderInstance = (inst, prevInst)=>
  prevInst.$s === inst.$s && (
    inst.$s.u(inst, prevInst),
    true
  );

function internalRerenderStatefulComponent(stateActions, inst, prevInst, parentInst, componentInstanceProp){
  if(internalRerenderInstance(inst, prevInst)) return;

  const newNode = renderInstance(inst);
  const node    = parentInst.$n;

  inst.$c = prevInst.$c;
  inst.$t = prevInst.$t;
  inst.$p = prevInst.$p;
  inst.$a = stateActions;

  parentInst.$n = newNode;
  parentInst[componentInstanceProp] = inst;

  stateActions.$$instance = inst;

  newNode.xvdom = parentInst;
  replaceNode(node, newNode);
  recycle(inst.$s.recycled, node);
}

function callAction(stateActions, action, parentInst, componentInstanceProp, args){
  const inst                = stateActions.$$instance;
  const {$p:props, $t:state}= inst;
  const shouldRerender      = stateActions.$$doRerender;
  stateActions.$$doRerender = false;
  const newState            = action.apply(undefined, [props, state, stateActions].concat(args));
  stateActions.$$doRerender = shouldRerender;
  inst.$t = newState;
  if(state !== newState && shouldRerender){
    internalRerenderStatefulComponent(
      stateActions,
      inst.$c(props, newState, stateActions),
      inst,
      parentInst,
      componentInstanceProp
    );
  }
  return newState;
}

function createAction(stateActions, action, parentInst, componentInstanceProp){
  return (...args)=>callAction(stateActions, action, parentInst, componentInstanceProp, args);
}

function createStateActions(rawActions, parentInst, componentInstanceProp, preInstance){
  const stateActions = {$$doRerender: false, $$instance: preInstance};
  for(let sa in rawActions){
    stateActions[sa] = createAction(stateActions, rawActions[sa], parentInst, componentInstanceProp);
  }
  return stateActions;
}


function rerenderArray_addAllBefore(parentNode, list, length, markerNode){
  let i = 0;
  let value;

  while(i < length){
    value = list[i++];
    insertBefore(
      parentNode,
      (value.$n = renderInstance(value)),
      markerNode
    );
  }
}

function rerenderArray_reconcileWithMap(parentNode, list, oldList, startIndex, endIndex, oldStartItem, oldStartIndex, oldEndItem, oldEndIndex){
  const oldListNodeKeyMap = {};
  let saveItem = oldStartItem;
  let insertBeforeNode = oldEndItem.$n;
  let startItem, item, prevItem, node;

  if(oldStartIndex <= oldEndIndex){
    item = oldList[oldStartIndex++];
    oldListNodeKeyMap[item.key] = prevItem = item;
  }

  while(oldStartIndex <= oldEndIndex){
    prevItem.next = item = oldList[oldStartIndex++];
    oldListNodeKeyMap[item.key] = prevItem = item;
  }

  while(startIndex <= endIndex){
    startItem = list[startIndex++];
    item = oldListNodeKeyMap[startItem.key];

    if(item){
      if(item === oldEndItem) insertBeforeNode = insertBeforeNode.nextSibling;
      node = rerender(item.$n, startItem);
      item.$n = null;
    }
    else{
      node = renderInstance(startItem);
    }
    startItem.$n = node;
    insertBefore(parentNode, node, insertBeforeNode);
  }

  while(saveItem){
    if(node = saveItem.$n){
      recycle(saveItem.$s.recycled, node);
      parentNode.removeChild(node);
    }
    saveItem = saveItem.next;
  }
}

function rerenderArray_afterReconcile(parentNode, list, oldList, startIndex, startItem, endIndex, endItem, oldStartIndex, oldStartItem, oldEndIndex, oldEndItem, markerNode){
  let node, insertBeforeNode;

  if(oldStartIndex > oldEndIndex){
    insertBeforeNode = endItem ? endItem.$n : markerNode;
    while(startIndex <= endIndex){
      startItem = list[startIndex++];
      insertBefore(
        parentNode,
        (startItem.$n = renderInstance(startItem)),
        insertBeforeNode
      );
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
    rerenderArray_reconcileWithMap(parentNode, list, oldList, startIndex, endIndex, oldStartItem, oldStartIndex, oldEndItem, oldEndIndex);
  }
}

function rerenderArray_reconcile(parentNode, list, endIndex, oldList, oldEndIndex, markerNode){
  let oldStartIndex = 0;
  let startIndex    = 0;
  let successful    = true;
  let startItem     = list[0];
  let oldStartItem  = oldList[0];
  let nextItem      = markerNode;
  let oldEndItem, endItem, node;

  outer: while(successful && oldStartIndex <= oldEndIndex && startIndex <= endIndex){
    successful = false;

    while (oldStartItem.key === startItem.key){
      startItem.$n = rerender(oldStartItem.$n, startItem);

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
      endItem.$n = nextItem = rerender(oldEndItem.$n, endItem);

      oldEndIndex--; endIndex--;
      if (oldStartIndex > oldEndIndex || startIndex > endIndex){
        break outer;
      }
      oldEndItem = oldList[oldEndIndex];
      endItem = list[endIndex];
      successful = true;
    }

    while (oldStartItem.key === endItem.key){
      endItem.$n = node = rerender(oldStartItem.$n, endItem);

      if(oldEndItem.key !== endItem.key){
        nextItem = insertBefore(parentNode, node, nextItem);
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
      insertBefore(
        parentNode,
        (startItem.$n = rerender(oldEndItem.$n, startItem)),
        oldStartItem.$n
      );

      oldEndIndex--; startIndex++;
      if (oldStartIndex > oldEndIndex || startIndex > endIndex){
        break outer;
      }
      oldEndItem = oldList[oldEndIndex];
      startItem = list[startIndex];
      successful = true;
    }
  }

  rerenderArray_afterReconcile(parentNode, list, oldList, startIndex, startItem, endIndex, endItem, oldStartIndex, oldStartItem, oldEndIndex, oldEndItem, markerNode);
}

function rerenderArrayForReal(parentNode, list, oldList, markerNode, valuesAndContext, rerenderFuncProp, rerenderContextNode){
  const length = list.length;
  const oldLength = oldList.length;
  if(!length){
    removeArrayNodes(oldList, parentNode);
  }
  else if(!oldLength){
    rerenderArray_addAllBefore(parentNode, list, length, markerNode);
  }
  else{
    rerenderArray_reconcile(parentNode, list, length-1, oldList, oldLength-1, markerNode);
  }
}

export function renderArray(frag, array){
  const length = array.length;
  let i=0;
  let item;

  while(i<length){
    item = array[i++];
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
  const onProps = componentInstance.$a.onProps;
  componentInstance.$p = props;

  if(onProps) onProps();
  else{
    internalRerenderStatefulComponent(
      componentInstance.$a,
      componentInstance.$c(props, componentInstance, componentInstance.$a),
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
  if(list instanceof Array){
    rerenderArrayForReal(parentNode, list, oldList, markerNode);
  }
  else{
    removeArrayNodes(oldList, parentNode);
    rerenderDynamic(list, undefined, markerNode, valuesAndContext, rerenderFuncProp, rerenderContextNode);
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
  if(component.state) return createStatefulComponent(component, props, instance, rerenderFuncProp, rerenderContextNode, componentInstanceProp);

  const inst = component(props || EMPTY_OBJECT);
  const node = renderInstance(inst);

  instance[rerenderFuncProp]      = rerenderComponent;
  instance[componentInstanceProp] = inst;
  instance[rerenderContextNode]   = node;
  return node;
}

export function createStatefulComponent(component, props, instance, rerenderFuncProp, rerenderContextNode, componentInstanceProp){
  preInstance.$p        = props;
  const rawActions      = component.state;
  const actions         = createStateActions(rawActions, instance, componentInstanceProp, preInstance);
  const state           = rawActions.onInit(props || EMPTY_OBJECT, undefined, actions);
  actions.$$doRerender  = true;
  const inst            = component(props, state, actions);
  const node            = renderInstance(inst);

  actions.$$instance = inst;

  inst.$c = component;
  inst.$t = state;
  inst.$a = actions;
  inst.$p = props;

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
