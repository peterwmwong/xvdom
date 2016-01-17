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

const recycle = instance=>{
  const pool = instance.$s.recycled;
  if(pool) pool.push(instance);
};

// const recycleKeyed = instance=>{
//   const pool = instance.$s.recycledKeyed;
//   if(pool) pool[instance.key] = instance.$n;
// };

const insertBefore = (parentNode, node, beforeNode)=>
  beforeNode ? parentNode.insertBefore(node, beforeNode) : parentNode.appendChild(node);

const removeArrayNodes = (list, parentNode)=>{
  let item;
  while(item = list.pop()){
    recycle(item);
    parentNode.removeChild(item.$n);
  }
};

const internalRerenderInstance = (inst, prevInst)=>
  prevInst.$s === inst.$s && (
    inst.$s.u(inst, prevInst),
    true
  );

const internalRerenderStatefulComponent = (stateActions, inst, prevInst, parentInst, componentInstanceProp)=>{
  if(internalRerenderInstance(inst, prevInst)) return;

  const newNode = render(inst);
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
  recycle(inst);
};

const callAction = (stateActions, action, parentInst, componentInstanceProp, args)=>{
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
};

const createAction = (stateActions, action, parentInst, componentInstanceProp)=>
  (...args)=>callAction(stateActions, action, parentInst, componentInstanceProp, args);

const createStateActions = (rawActions, parentInst, componentInstanceProp, $$instance)=>{
  const stateActions = {$$doRerender:false, $$instance};
  for(let sa in rawActions){
    stateActions[sa] = createAction(stateActions, rawActions[sa], parentInst, componentInstanceProp);
  }
  return stateActions;
};

const rerenderArray_addAllBefore = (parentNode, list, length, markerNode)=>{
  let i = 0;
  let value;

  while(i < length){
    value = list[i++];
    insertBefore(
      parentNode,
      (value.$n = render(value)),
      markerNode
    );
  }
};

const rerenderArray_reconcileWithMap = (parentNode, list, oldList, startIndex, endIndex, oldStartItem, oldStartIndex, oldEndItem, oldEndIndex)=>{
  const oldListNodeKeyMap = {};
  let insertBeforeNode = oldEndItem.$n;
  let item, key, node, startItem;

  while(oldStartIndex <= oldEndIndex){
    item = oldList[oldStartIndex++];
    oldListNodeKeyMap[item.key] = item;
  }

  while(startIndex <= endIndex){
    startItem = list[startIndex];
    key = startItem.key;
    item = oldListNodeKeyMap[key];

    if(item){
      if(item === oldEndItem) insertBeforeNode = insertBeforeNode.nextSibling;
      oldListNodeKeyMap[key] = null;
      node = (list[startIndex] = internalRerender(item, startItem)).$n;
    }
    else{
      node = render(startItem);
    }
    insertBefore(parentNode, node, insertBeforeNode);
    ++startIndex;
  }

  for(key in oldListNodeKeyMap){
    item = oldListNodeKeyMap[key];
    if(item){
      recycle(item);
      parentNode.removeChild(item.$n);
    }
  }
};

const rerenderArray_afterReconcile = (parentNode, list, oldList, startIndex, startItem, endIndex, endItem, oldStartIndex, oldStartItem, oldEndIndex, oldEndItem, insertBeforeNode)=>{
  if(oldStartIndex > oldEndIndex){
    while(startIndex <= endIndex){
      startItem = list[startIndex];
      insertBefore(
        parentNode,
        (list[startIndex] = internalRender(startItem)).$n,
        insertBeforeNode
      );
      ++startIndex;
    }
  }
  else if(startIndex > endIndex){
    while(oldStartIndex <= oldEndIndex){
      oldStartItem = oldList[oldStartIndex++];
      recycle(oldStartItem);
      parentNode.removeChild(oldStartItem.$n);
    }
  }
  else{
    rerenderArray_reconcileWithMap(parentNode, list, oldList, startIndex, endIndex, oldStartItem, oldStartIndex, oldEndItem, oldEndIndex);
  }
};

const rerenderArray_reconcile = (parentNode, list, length, oldList, oldLength, markerNode)=>{
  let oldStartIndex = 0;
  let startIndex    = 0;
  let successful    = true;
  let endIndex      = length - 1;
  let oldEndIndex   = oldLength - 1;
  let startItem     = 0 !== length && list[0];
  let oldStartItem  = 0 !== oldLength && oldList[0];
  let insertBeforeNode = markerNode;
  let oldEndItem, endItem, node;

  outer: while(successful && oldStartIndex <= oldEndIndex && startIndex <= endIndex){
    successful = false;

    while (oldStartItem.key === startItem.key){
      list[startIndex] = internalRerender(oldStartItem, startItem);

      oldStartIndex++; startIndex++;
      if (oldStartIndex > oldEndIndex || startIndex > endIndex){
        break outer;
      }
      else{
        oldStartItem = oldList[oldStartIndex];
        startItem = list[startIndex];
        successful = true;
      }
    }

    oldEndItem = oldList[oldEndIndex];
    endItem = list[endIndex];

    while (oldEndItem.key === endItem.key){
      insertBeforeNode = (list[endIndex] = internalRerender(oldEndItem, endItem)).$n;

      oldEndIndex--; endIndex--;
      if (oldStartIndex > oldEndIndex || startIndex > endIndex){
        break outer;
      }
      else{
        oldEndItem = oldList[oldEndIndex];
        endItem = list[endIndex];
        successful = true;
      }
    }

    while (oldStartItem.key === endItem.key){
      node = (list[endIndex] = internalRerender(oldStartItem, endItem)).$n;

      if(oldEndItem.key !== endItem.key){
        insertBeforeNode = insertBefore(parentNode, node, insertBeforeNode);
      }
      oldStartIndex++; endIndex--;
      if (oldStartIndex > oldEndIndex || startIndex > endIndex){
        break outer;
      }
      else{
        oldStartItem = oldList[oldStartIndex];
        endItem = list[endIndex];
        successful = true;
      }
    }

    while (oldEndItem.key === startItem.key){
      insertBefore(
        parentNode,
        internalRerender(oldEndItem, startItem).$n,
        oldStartItem.$n
      );
      list[startIndex] = oldEndItem;

      oldEndIndex--; startIndex++;
      if (oldStartIndex > oldEndIndex || startIndex > endIndex){
        break outer;
      }
      else{
        oldEndItem = oldList[oldEndIndex];
        startItem = list[startIndex];
        successful = true;
      }
    }
  }

  if(startIndex <= endIndex || oldStartIndex <= oldEndIndex){
    rerenderArray_afterReconcile(parentNode, list, oldList, startIndex, startItem, endIndex, endItem, oldStartIndex, oldStartItem, oldEndIndex, oldEndItem, insertBeforeNode);
  }
};

const rerenderArray = (parentNode, list, oldList, markerNode, valuesAndContext, rerenderFuncProp, rerenderContextNode)=>{
  const length = list.length;
  const oldLength = oldList.length;
  if(!length){
    removeArrayNodes(oldList, parentNode);
  }
  else if(!oldLength){
    rerenderArray_addAllBefore(parentNode, list, length, markerNode);
  }
  else{
    rerenderArray_reconcile(parentNode, list, length, oldList, oldLength, markerNode);
  }
};

const renderArray = (frag, array)=>{
  const length = array.length;
  let i=0;
  let item;

  while(i<length){
    item = array[i++];
    frag.appendChild(item.$n = render(item));
  }
  return frag.appendChild(document.createTextNode(EMPTY_STRING));
};

const rerenderText = (value, oldValue, contextNode, instance, rerenderFuncProp, rerenderContextNode)=>{
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
};

const rerenderDynamic = (value, oldValue, contextNode, instance, rerenderFuncProp, rerenderContextNode)=>{
  replaceNode(
    contextNode,
    createDynamic(value, instance, rerenderFuncProp, rerenderContextNode)
  );
  return value;
};

const rerenderInstance = (value, prevValue, node, instance, rerenderFuncProp, rerenderContextNode)=>{
  if(value && internalRerenderInstance(value, prevValue)) return prevValue;

  return rerenderDynamic(value, prevValue, node, instance, rerenderFuncProp, rerenderContextNode);
};

const rerenderStatefulComponent = (component, props, prevProps, componentInstance, node, instance, rerenderContextNode, componentInstanceProp)=>{
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
};

const rerenderComponent = (component, props, prevProps, componentInstance, node, instance, rerenderContextNode, componentInstanceProp)=>{
  const newCompInstance = component(props || EMPTY_OBJECT);
  if(internalRerenderInstance(newCompInstance, componentInstance)) return;

  const newNode = render(newCompInstance);
  instance[componentInstanceProp] = newCompInstance;
  instance[rerenderContextNode]   = newNode;
  newNode.xvdom = instance;
  replaceNode(node, newNode);
};

const rerenderArrayMaybe = (list, oldList, markerNode, valuesAndContext, rerenderFuncProp, rerenderContextNode)=>{
  const parentNode = markerNode.parentNode;
  if(list instanceof Array){
    rerenderArray(parentNode, list, oldList, markerNode);
  }
  else{
    removeArrayNodes(oldList, parentNode);
    rerenderDynamic(list, undefined, markerNode, valuesAndContext, rerenderFuncProp, rerenderContextNode);
  }
  return list;
};

const createStatefulComponent = (component, props, instance, rerenderFuncProp, rerenderContextNode, componentInstanceProp)=>{
  preInstance.$p        = props;
  const rawActions      = component.state;
  const actions         = createStateActions(rawActions, instance, componentInstanceProp, preInstance);
  const state           = rawActions.onInit(props || EMPTY_OBJECT, undefined, actions);
  actions.$$doRerender  = true;
  const inst            = component(props, state, actions);
  const node            = render(inst);

  actions.$$instance = inst;

  inst.$c = component;
  inst.$t = state;
  inst.$a = actions;
  inst.$p = props;

  instance[rerenderFuncProp]      = rerenderStatefulComponent;
  instance[componentInstanceProp] = inst;
  instance[rerenderContextNode]   = node;
  return node;
};

export const createDynamic = (value, instance, rerenderFuncProp, rerenderContextNode)=>{
  let node, context, rerenderFunc;
  let valueConstructor;
  if(value == null || ((valueConstructor = value.constructor) === Boolean)){
    instance[rerenderFuncProp] = rerenderDynamic;
    return instance[rerenderContextNode] = document.createTextNode(EMPTY_STRING);
  }

  if(valueConstructor === Object){
    rerenderFunc = rerenderInstance;
    context = node = render(value);
  }
  else if(valueConstructor === String || valueConstructor === Number){
    rerenderFunc = rerenderText;
    context = node = document.createTextNode(value);
  }
  else if(valueConstructor === Array){
    rerenderFunc = rerenderArrayMaybe;
    node = document.createDocumentFragment();
    context = renderArray(node, value);
  }

  instance[rerenderFuncProp]    = rerenderFunc;
  instance[rerenderContextNode] = context;
  return node;
};

export const createComponent = (component, props, instance, rerenderFuncProp, rerenderContextNode, componentInstanceProp)=>{
  if(component.state) return createStatefulComponent(component, props, instance, rerenderFuncProp, rerenderContextNode, componentInstanceProp);

  const inst = component(props || EMPTY_OBJECT);
  const node = render(inst);

  instance[rerenderFuncProp]      = rerenderComponent;
  instance[componentInstanceProp] = inst;
  instance[rerenderContextNode]   = node;
  return node;
};

const internalRender = instance=>{
  const spec = instance.$s;
  let recycledInstance = spec.recycled && spec.recycled.pop();
  if(recycledInstance){
    spec.u(instance, recycledInstance);
    return recycledInstance;
  }
  else{
    (instance.$n  = spec.c(instance)).xvdom = instance;
    return instance;
  }
};

export const render = instance=>internalRender(instance).$n;

const internalRerender = (prevInstance, instance)=>{
  if(internalRerenderInstance(instance, prevInstance)) return prevInstance;

  replaceNode(prevInstance.$n, render(instance));
  recycle(prevInstance);
  return instance;
};

export const rerender = (node, instance)=>internalRerender(node.xvdom, instance).$n;

export const unmount = node=>{
  if(node.xvdom) recycle(node.xvdom);
  if(node.parentNode) node.parentNode.removeChild(node);
};

export default {
  createDynamic,
  createComponent,
  render,
  rerender,
  unmount
};

// Internal API
export const _ = {
  renderArray,
  rerenderText,
  rerenderInstance,
  rerenderDynamic,
  rerenderArray: rerenderArrayMaybe
};
