/*

Instance properties:

$n = DOM node
$s - spec (see below)
$x - Pool linked list next pointer

Spec properties:

c - create (or render)
u - update (or update)
r - keyed map of unmounted instanced that can be recycled

*/

// Creates an empty object with no built in properties (ie. `constructor`).
function Hash(){}
Hash.prototype = Object.create(null);

const EMPTY_PROPS     = new Hash();
export const DEADPOOL = {push(){}, pop(){}};

// TODO: Benchmark whether this is slower than Function/Prototype
function Pool(){
  this.map = new Hash();
};

Pool.prototype.push = function(instance){
  const {key} = instance;
  const {map} = this;
  instance.$x = map[key];
  map[key] = instance;
};

Pool.prototype.pop = function(key){
  const head = this.map[key];
  if(!head) return;
  this.map[key] = head.$x;
  return head;
};

const recycle        = instance => { instance.$s.r.push(instance); };
const createTextNode = value    => document.createTextNode(value);

const replaceNode = (oldNode, newNode)=>{
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

const rerenderText = (isOnlyChild, value, contextNode)=>{
  switch(value && value.constructor){
    case String:
    case Number:
    case 0:
      contextNode.nodeValue = value;
      return contextNode;

    case Object:
    case Array:
      return rerenderDynamic(isOnlyChild, value, contextNode);

    default:
      contextNode.nodeValue = '';
      return contextNode;
  }
};

const rerenderDynamic = (isOnlyChild, value, contextNode)=>{
  const node = createDynamic(isOnlyChild, contextNode.parentNode, value);
  replaceNode(contextNode, node);
  return node;
};

const rerenderInstance = (isOnlyChild, value, prevValue, node)=>{
  let prevRenderedInstance;
  if(value && internalRerenderInstance(value, prevRenderedInstance = prevValue.$r || prevValue)){
    value.$r = prevRenderedInstance;
    return node;
  }

  return rerenderDynamic(isOnlyChild, value, node);
};

// TODO: Figure out whether we're using all these arguments
const rerenderComponent = (component, props, componentInstance, instance, componentInstanceProp)=>{
  const newCompInstance = component(props || EMPTY_PROPS);
  if(!internalRerenderInstance(newCompInstance, componentInstance)){
    replaceNode(
      componentInstance.$n,
      (instance[componentInstanceProp] = internalRender(newCompInstance)).$n
    );
  }
};

const rerenderArrayMaybe = (isOnlyChild, array, oldArray, markerNode)=>{
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
      return markerNode.appendChild(
        createDynamic(true, markerNode, array)
      );
    }
    else{
      removeArrayNodes(oldArray, markerNode.parentNode);
      return rerenderDynamic(false, array, markerNode);
    }
  }
};

const rerenderStatefulComponent = (component, newProps, api)=>{
  const {_onProps, props} = api;
  api.props = newProps;

  if(_onProps) componentSend(component, api, _onProps, props);
  else componentRerender(component, api);
};

const updateDynamic = (isOnlyChild, oldValue, value, contextNode)=>{
  switch(oldValue && oldValue.constructor){
    case Array:
      return rerenderArrayMaybe(isOnlyChild, value, oldValue, contextNode.xvdomContext) || contextNode;

    case Object:
      return rerenderInstance(isOnlyChild, value, oldValue, contextNode);

    default:
      return rerenderText(isOnlyChild, value, contextNode);
  }
};

const createArray = (isOnlyChild, parentNode, value)=>{
  const node = document.createDocumentFragment();
  renderArrayToParent(node, value, value.length);
  node.xvdomContext = isOnlyChild ? parentNode : node.appendChild(createTextNode(''));
  return node;
};

function createDynamic(isOnlyChild, parentNode, value){
  switch(value && value.constructor){
    case Number:
    case String:
    case 0:
      return createTextNode(value);

    case Object:
      return internalRenderNoRecycle(value);

    case Array:
      return createArray(isOnlyChild, parentNode, value);

    default:
      return createTextNode('');
  }
}

const componentRerender = (component, api)=> {
  const instance = internalRerender(api._instance, component(api));
  api._instance = instance;
  instance.$n.xvdom = api._parentInst;
};

const componentSend = (component, api, actionFn, context)=> {
  // TODO: process.ENV === 'development', console.error(`Action not found #{action}`);
  if(!actionFn) return;

  const newState = actionFn(api, context);
  if(newState !== api.state){
    api.state = newState;
    componentRerender(component, api);
  }
};

const createStatefulComponent = (component, props, instance, rerenderFuncProp, componentInstanceProp, actions)=>{
  const boundActions  = new Hash();

  const api = {
    _onProps:    actions.onProps,
    _parentInst: instance,

    props,
    bindSend: (action)=> boundActions[action] || (
      boundActions[action] = (context)=>{ componentSend(component, api, actions[action], context); }
    )
  };

  //TODO: process.ENV === 'development', console.error(`Stateful components require atleast an 'onInit' function to provide the initial state (see)`);
  api.state = actions.onInit(api);

  instance[rerenderFuncProp]      = rerenderStatefulComponent;
  instance[componentInstanceProp] = api;
  return internalRenderNoRecycle(api._instance = component(api));
};

export const createNoStateComponent = (component, props, instance, rerenderFuncProp, componentInstanceProp)=>{
  instance[rerenderFuncProp] = rerenderComponent;
  return internalRenderNoRecycle(
    instance[componentInstanceProp] = component(props)
  );
};

export const createComponent = (component, actions, props, instance, rerenderFuncProp, componentInstanceProp)=>{
  const createFn = actions ? createStatefulComponent : createNoStateComponent;
  return createFn(
    component,
    (props || EMPTY_PROPS),
    instance,
    rerenderFuncProp,
    componentInstanceProp,
    actions
  );
};

const internalRenderNoRecycle = (instance)=> {
  const node  = instance.$s.c(instance);
  instance.$n = node;
  node.xvdom  = instance;
  return node;
};

const internalRender = instance=>{
  const spec = instance.$s;
  const recycledInstance = spec.r.pop(instance.key);
  if(recycledInstance){
    spec.u(instance, recycledInstance);
    return recycledInstance;
  }
  else{
    internalRenderNoRecycle(instance);
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
  createComponent,
  createDynamic,
  el:(tag) => document.createElement(tag),
  render,
  rerender,
  unmount,
  updateDynamic,
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
