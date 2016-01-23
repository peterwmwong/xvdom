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

const EMPTY_OBJECT = {};
const preInstance = {$p:null};
const MARKER_NODE = document.createComment('');

const getMarkerNode = ()=>MARKER_NODE.cloneNode(false);

const replaceNode = (oldNode, newNode)=>{
  const parentNode = oldNode.parentNode;
  if(parentNode) parentNode.replaceChild(newNode, oldNode);
};

const recycle = instance=>{
  const pools = instance.$s.r;
  if(pools){
    const key = instance.key;
    const pool = pools[key];

    if(!pool) pools[key] = [instance];
    else pool.push(instance);
  }
};

const getRecycle = ({r:pools}, key)=>{
  if(pools){
    const pool = pools[key];
    return pool && pool.pop();
  }
};

const insertBefore = (parentNode, node, beforeNode)=>
  beforeNode ? parentNode.insertBefore(node, beforeNode) : parentNode.appendChild(node);

const removeArrayNodes = (array, parentNode)=>{
  let length = array.length;
  let i = 0;
  let item;

  while(i<length){
    item = array[i++];
    recycle(item);
    parentNode.removeChild(item.$n);
  }
};

const removeArrayNodesOnlyChild = (array, parentNode)=>{
  let length = array.length;
  let i = 0;

  while(i<length){
    recycle(array[i++]);
  }
  parentNode.textContent = '';
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

const renderArrayToParentBefore = (parentNode, array, length, markerNode)=>{
  let i = 0;

  while(i < length){
    insertBefore(
      parentNode,
      (array[i] = internalRender(array[i])).$n,
      markerNode
    );
    ++i;
  }
};

const renderArrayToParent = (parentNode, array, length)=>{
  let i = 0;

  while(i < length){
    parentNode.appendChild(
      (array[i] = internalRender(array[i])).$n
    );
    ++i;
  }
};

const rerenderArray_reconcileWithMap = (parentNode, array, oldArray, startIndex, endIndex, oldStartItem, oldStartIndex, oldEndItem, oldEndIndex)=>{
  const oldListNodeKeyMap = {};
  let insertBeforeNode = oldEndItem.$n;
  let item, key, node, startItem;

  while(oldStartIndex <= oldEndIndex){
    item = oldArray[oldStartIndex++];
    oldListNodeKeyMap[item.key] = item;
  }

  while(startIndex <= endIndex){
    startItem = array[startIndex];
    key = startItem.key;
    item = oldListNodeKeyMap[key];

    if(item){
      if(item === oldEndItem) insertBeforeNode = insertBeforeNode.nextSibling;
      oldListNodeKeyMap[key] = null;
      node = (array[startIndex] = internalRerender(item, startItem)).$n;
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

const rerenderArray_afterReconcile = (parentNode, array, oldArray, startIndex, startItem, endIndex, endItem, oldStartIndex, oldStartItem, oldEndIndex, oldEndItem, insertBeforeNode)=>{
  if(oldStartIndex > oldEndIndex){
    while(startIndex <= endIndex){
      startItem = array[startIndex];
      insertBefore(
        parentNode,
        (array[startIndex] = internalRender(startItem)).$n,
        insertBeforeNode
      );
      ++startIndex;
    }
  }
  else if(startIndex > endIndex){
    while(oldStartIndex <= oldEndIndex){
      oldStartItem = oldArray[oldStartIndex++];
      recycle(oldStartItem);
      parentNode.removeChild(oldStartItem.$n);
    }
  }
  else{
    rerenderArray_reconcileWithMap(parentNode, array, oldArray, startIndex, endIndex, oldStartItem, oldStartIndex, oldEndItem, oldEndIndex);
  }
};

const rerenderArray_reconcile = (parentNode, array, length, oldArray, oldLength, markerNode)=>{
  let oldStartIndex = 0;
  let startIndex    = 0;
  let successful    = true;
  let endIndex      = length - 1;
  let oldEndIndex   = oldLength - 1;
  let startItem     = 0 !== length && array[0];
  let oldStartItem  = 0 !== oldLength && oldArray[0];
  let insertBeforeNode = markerNode;
  let oldEndItem, endItem, node;

  outer: while(successful && oldStartIndex <= oldEndIndex && startIndex <= endIndex){
    successful = false;

    while (oldStartItem.key === startItem.key){
      array[startIndex] = internalRerender(oldStartItem, startItem);

      oldStartIndex++; startIndex++;
      if (oldStartIndex > oldEndIndex || startIndex > endIndex){
        break outer;
      }
      else{
        oldStartItem = oldArray[oldStartIndex];
        startItem = array[startIndex];
        successful = true;
      }
    }

    oldEndItem = oldArray[oldEndIndex];
    endItem = array[endIndex];

    while (oldEndItem.key === endItem.key){
      insertBeforeNode = (array[endIndex] = internalRerender(oldEndItem, endItem)).$n;

      oldEndIndex--; endIndex--;
      if (oldStartIndex > oldEndIndex || startIndex > endIndex){
        break outer;
      }
      else{
        oldEndItem = oldArray[oldEndIndex];
        endItem = array[endIndex];
        successful = true;
      }
    }

    while (oldStartItem.key === endItem.key){
      node = (array[endIndex] = internalRerender(oldStartItem, endItem)).$n;

      if(oldEndItem.key !== endItem.key){
        insertBeforeNode = insertBefore(parentNode, node, insertBeforeNode);
      }
      oldStartIndex++; endIndex--;
      if (oldStartIndex > oldEndIndex || startIndex > endIndex){
        break outer;
      }
      else{
        oldStartItem = oldArray[oldStartIndex];
        endItem = array[endIndex];
        successful = true;
      }
    }

    while (oldEndItem.key === startItem.key){
      insertBefore(
        parentNode,
        (array[startIndex] = internalRerender(oldEndItem, startItem)).$n,
        oldStartItem.$n
      );

      oldEndIndex--; startIndex++;
      if (oldStartIndex > oldEndIndex || startIndex > endIndex){
        break outer;
      }
      else{
        oldEndItem = oldArray[oldEndIndex];
        startItem = array[startIndex];
        successful = true;
      }
    }
  }

  if(startIndex <= endIndex || oldStartIndex <= oldEndIndex){
    rerenderArray_afterReconcile(parentNode, array, oldArray, startIndex, startItem, endIndex, endItem, oldStartIndex, oldStartItem, oldEndIndex, oldEndItem, insertBeforeNode);
  }
};

const rerenderArray = (parentNode, array, oldArray, markerNode)=>{
  const length = array.length;
  const oldLength = oldArray.length;
  if(!length){
    removeArrayNodes(oldArray, parentNode);
  }
  else if(!oldLength){
    renderArrayToParentBefore(parentNode, array, length, markerNode);
  }
  else{
    rerenderArray_reconcile(parentNode, array, length, oldArray, oldLength, markerNode);
  }
};

const rerenderArrayOnlyChild = (parentNode, array, oldArray)=>{
  const length = array.length;
  const oldLength = oldArray.length;
  if(!length){
    removeArrayNodesOnlyChild(oldArray, parentNode);
  }
  else if(!oldLength){
    renderArrayToParent(parentNode, array, length);
  }
  else{
    rerenderArray_reconcile(parentNode, array, length, oldArray, oldLength, null);
  }
};

const rerenderText = (isOnlyChild, value, oldValue, contextNode, instance, rerenderFuncProp, rerenderContextNode)=>{
  if(value == null){
    contextNode.nodeValue = '';
  }
  else if(value.constructor === String || value.constructor === Number){
    contextNode.nodeValue = value;
  }
  else{
    rerenderDynamic(isOnlyChild, value, null, contextNode, instance, rerenderFuncProp, rerenderContextNode);
  }
  return value;
};

const rerenderDynamic = (isOnlyChild, value, oldValue, contextNode, instance, rerenderFuncProp, rerenderContextNode)=>{
  replaceNode(
    contextNode,
    createDynamic(isOnlyChild, contextNode.parentNode, value, instance, rerenderFuncProp, rerenderContextNode)
  );
  return value;
};

const rerenderInstance = (isOnlyChild, value, prevValue, node, instance, rerenderFuncProp, rerenderContextNode)=>{
  if(value && internalRerenderInstance(value, prevValue)) return prevValue;

  return rerenderDynamic(isOnlyChild, value, null, node, instance, rerenderFuncProp, rerenderContextNode);
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

const rerenderArrayMaybe = (isOnlyChild, array, oldArray, markerNode, valuesAndContext, rerenderFuncProp, rerenderContextNode)=>{
  if(array instanceof Array){
    if(isOnlyChild){
      rerenderArrayOnlyChild(markerNode, array, oldArray);
    }
    else{
      rerenderArray(markerNode.parentNode, array, oldArray, markerNode);
    }
  }
  else{
    if(isOnlyChild){
      removeArrayNodesOnlyChild(oldArray, markerNode);
      markerNode.appendChild(
        createDynamic(true, markerNode, array, valuesAndContext, rerenderFuncProp, rerenderContextNode)
      );
    }
    else{
      removeArrayNodes(oldArray, markerNode.parentNode);
      rerenderDynamic(false, array, null, markerNode, valuesAndContext, rerenderFuncProp, rerenderContextNode);
    }
  }
  return array;
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

export const createDynamic = (isOnlyChild, parentNode, value, instance, rerenderFuncProp, rerenderContextNode)=>{
  let node, context, rerenderFunc;
  let valueConstructor;
  if(value == null || ((valueConstructor = value.constructor) === Boolean)){
    rerenderFunc = rerenderDynamic;
    context = node = getMarkerNode();
  }
  else if(valueConstructor === Object){
    rerenderFunc = rerenderInstance;
    context = node = render(value);
  }
  else if(valueConstructor === String || valueConstructor === Number){
    rerenderFunc = rerenderText;
    context = node = document.createTextNode(value);
  }
  else if(valueConstructor === Array){
    node = document.createDocumentFragment();
    renderArrayToParent(node, value, value.length);

    rerenderFunc = rerenderArrayMaybe;
    context = isOnlyChild ? parentNode : node.appendChild(getMarkerNode());
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
  const recycledInstance = getRecycle(spec, instance.key);
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

  instance = internalRender(instance);
  replaceNode(prevInstance.$n, instance.$n);
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
  rerenderText,
  rerenderInstance,
  rerenderDynamic,
  rerenderArray: rerenderArrayMaybe
};
