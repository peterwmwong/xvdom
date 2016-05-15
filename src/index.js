/*

Instance properties:

$a - actions for stateful components
$c - component for stateful components
$n = DOM node
$p - props for components
$s - spec (see below)
$t - state for stateful components
$x - Pool linked list next pointer

Spec properties:

c - create (or render)
u - update (or update)
r - keyed map of unmounted instanced that can be recycled

*/

const EMPTY_PROPS     = {};
const MARKER_NODE     = document.createComment('');
export const DEADPOOL = {push(){}, pop(){}};

// TODO: Benchmark whether this is slower than Function/Prototype
export const Pool = ()=>{
  const map = new Map();
  return {
    push(instance){
      const key = instance.key;
      instance.$x = map.get(key);
      map.set(key, instance);
    },
    pop(key){
      const head = map.get(key);
      if(head){
        map.set(key, head.$x);
        return head;
      }
    }
  };
};

const recycle = instance=>{instance.$s.r.push(instance);};

const getMarkerNode = ()=>MARKER_NODE.cloneNode(false);

const replaceNode   = (oldNode, newNode)=>{
  const parentNode = oldNode.parentNode;
  if(parentNode) parentNode.replaceChild(newNode, oldNode);
};

const insertBefore = (parentNode, node, beforeNode)=>
  beforeNode ? parentNode.insertBefore(node, beforeNode) : parentNode.appendChild(node);

const unmountInstance = (inst, parentNode)=>{
  recycle(inst);
  parentNode.removeChild(inst.$n);
};

const removeArrayNodes = (array, parentNode)=>{
  let length = array.length;
  let i = 0;

  while(i<length){
    unmountInstance(array[i++], parentNode);
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
  const oldListNodeKeyMap = new Map();
  let insertBeforeNode = oldEndItem.$n;
  let item, key, startItem;

  while(oldStartIndex <= oldEndIndex){
    item = oldArray[oldStartIndex++];
    oldListNodeKeyMap.set(item.key, item);
  }

  while(startIndex <= endIndex){
    startItem = array[startIndex];
    key = startItem.key;
    item = oldListNodeKeyMap.get(key);

    if(item){
      if(item === oldEndItem) insertBeforeNode = insertBeforeNode.nextSibling;
      oldListNodeKeyMap.delete(key);
      startItem = internalRerender(item, startItem);
    }
    else{
      startItem = internalRender(startItem);
    }
    array[startIndex] = startItem;
    insertBefore(parentNode, startItem.$n, insertBeforeNode);
    ++startIndex;
  }

  oldListNodeKeyMap.forEach(value=>{
    unmountInstance(value, parentNode);
  });
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
      unmountInstance(oldArray[oldStartIndex++], parentNode);
    }
  }
  else{
    rerenderArray_reconcileWithMap(parentNode, array, oldArray, startIndex, endIndex, oldStartItem, oldStartIndex, oldEndItem, oldEndIndex);
  }
};

const rerenderArray_reconcile = (parentNode, array, endIndex, oldArray, oldEndIndex, markerNode)=>{
  let oldStartIndex    = 0;
  let startIndex       = 0;
  let successful       = true;
  let startItem        = array[0];
  let oldStartItem     = oldArray[0];
  let insertBeforeNode = markerNode;
  let oldEndItem, endItem, node;
  endIndex--;
  oldEndIndex--;

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

const rerenderArray = (markerNode, array, oldArray)=>{
  const parentNode = markerNode.parentNode;
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

const rerenderComponent = (component, props, prevProps, componentInstance, node, instance, rerenderContextNode, componentInstanceProp)=>{
  const newCompInstance = component(props || EMPTY_PROPS);
  if(!internalRerenderInstance(newCompInstance, componentInstance)){
    replaceNode(
      node,
      instance[rerenderContextNode] = (
        instance[componentInstanceProp] = internalRender(newCompInstance)
      ).$n
    );
  }
};

const rerenderArrayMaybe = (isOnlyChild, array, oldArray, markerNode, valuesAndContext, rerenderFuncProp, rerenderContextNode)=>{
  if(array instanceof Array){
    if(isOnlyChild){
      rerenderArrayOnlyChild(markerNode, array, oldArray);
    }
    else{
      rerenderArray(markerNode, array, oldArray);
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

// TODO: Update JSX transform to just pass api and props
const rerenderStatefulComponent = (_, props, _2, api)=>{
  const {actions:{onProps}, props:prevProps} = api;
  api.props = props;
  if(onProps){
    api.send('onProps', prevProps);
  }
  else{
    api._rerender();
  }
};

function ComponentAPI(component, props, actions, parentInst){
  this.actions    = actions;
  this.component  = component;
  this.parentInst = parentInst;
  this.props      = props;

  //TODO: process.ENV === 'development', console.error(`Stateful components require atleast an 'onInit' function to provide the initial state (see)`);
  this.state      = actions.onInit(this);
  this.node       = render(this.instance = component(this));
}

ComponentAPI.prototype._rerender = function(){
  const {component, instance:prevInst} = this;
  const inst = component(this);
  if(internalRerenderInstance(inst, prevInst)) return;

  replaceNode(
    this.node,
    (this.node = render(this.instance = inst))
  );
  this.node.xvdom = this.parentInst;
  recycle(inst);
};

ComponentAPI.prototype.send = function(action, context){
  const actionFn = this.actions[action];
  // TODO: process.ENV === 'development', console.error(`Action not found #{action}`);
  if(!actionFn) return;

  const newState = actionFn(this, context);
  if(newState === this.state) return;

  this.state = newState;
  this._rerender();
};

ComponentAPI.prototype.bindSend = function(action){
  const boundActions = this._boundActions || (this._boundActions = {});
  return boundActions[action] || (boundActions[action] = this.send.bind(this, action));
};

const createStatefulComponent = (component, state, props, instance, rerenderFuncProp, rerenderContextNode, componentInstanceProp)=>{
  const api = new ComponentAPI(component, props, state, instance, componentInstanceProp);
  instance[rerenderFuncProp]           = rerenderStatefulComponent;
  instance[componentInstanceProp]      = api;
  return instance[rerenderContextNode] = api.node;
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

export const createNoStateComponent = (component, _, props, instance, rerenderFuncProp, rerenderContextNode, componentInstanceProp)=>{
  const inst = component(props);
  const node = render(inst);

  instance[rerenderFuncProp]           = rerenderComponent;
  instance[componentInstanceProp]      = inst;
  return instance[rerenderContextNode] = node;
};

// TODO: Consider JSX transform passes in `component.state` to reduce polymorphic IC
export const createComponent = (component, props, instance, rerenderFuncProp, rerenderContextNode, componentInstanceProp)=>{
  const state = component.state;
  const createFn = state ? createStatefulComponent : createNoStateComponent;
  return createFn(
    component,
    state,
    (props || EMPTY_PROPS),
    instance,
    rerenderFuncProp,
    rerenderContextNode,
    componentInstanceProp
  );
};

const internalRender = instance=>{
  const spec = instance.$s;
  const recycledInstance = spec.r.pop(instance.key);
  if(recycledInstance){
    spec.u(instance, recycledInstance);
    return recycledInstance;
  }
  else{
    (instance.$n = spec.c(instance)).xvdom = instance;
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

export const unmount = node=>{ unmountInstance(node.xvdom, node.parentNode); };

export default {
  createDynamic,
  createComponent,
  render,
  rerender,
  unmount,
  Pool,
  DEADPOOL
};

// Internal API
export const _ = {
  rerenderText,
  rerenderInstance,
  rerenderDynamic,
  rerenderArray: rerenderArrayMaybe
};
