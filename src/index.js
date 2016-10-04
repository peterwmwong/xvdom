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

// https://esbench.com/bench/57f1459d330ab09900a1a1dd
function dynamicType(value){
  if(value instanceof Object){
    return value instanceof Array ? 'array' : 'object';
  }

  return (value == null || value === true || value === false) ? 'empty' : 'text';
}

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

const recycle             = instance => { instance.$s.r.push(instance); };
const createTextNode      = value => document.createTextNode(value);
const createEmptyTextNode = () => createTextNode('');

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

const removeArrayNodes = (array, parentNode, i, length)=>{
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

const renderArrayToParentBefore = (parentNode, array, i, length, markerNode)=>{
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

function rerenderArray_replace(parentNode, array, oldArray, startIndex, endIndex, oldStartIndex, oldEndIndex, insertBeforeNode){
  while(startIndex <= endIndex && oldStartIndex <= oldEndIndex){
    array[startIndex] = internalRerender(oldArray[oldStartIndex++], array[startIndex++]);
  }

  if(oldStartIndex > oldEndIndex){
    renderArrayToParentBefore(parentNode, array, startIndex, endIndex+1, insertBeforeNode);
  }
  else{
    removeArrayNodes(oldArray, parentNode, oldStartIndex, oldEndIndex+1);
  }
}

const rerenderArray_afterReconcile = (parentNode, array, oldArray, startIndex, startItem, endIndex, endItem, oldStartIndex, oldStartItem, oldEndIndex, oldEndItem, insertBeforeNode)=>{
  if(oldStartIndex > oldEndIndex){
    renderArrayToParentBefore(parentNode, array, startIndex, endIndex+1, insertBeforeNode);
  }
  else if(startIndex > endIndex){
    removeArrayNodes(oldArray, parentNode, oldStartIndex, oldEndIndex+1);
  }
  else{
    rerenderArray_replace(parentNode, array, oldArray, startIndex, endIndex, oldStartIndex, oldEndIndex, insertBeforeNode);
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
      if (oldStartIndex > oldEndIndex || startIndex > endIndex) break outer;

      oldStartItem = oldArray[oldStartIndex];
      startItem = array[startIndex];
      successful = true;
    }

    oldEndItem = oldArray[oldEndIndex];
    endItem = array[endIndex];

    while (oldEndItem.key === endItem.key){
      insertBeforeNode = (array[endIndex] = internalRerender(oldEndItem, endItem)).$n;

      oldEndIndex--; endIndex--;
      if (oldStartIndex > oldEndIndex || startIndex > endIndex) break outer;

      oldEndItem = oldArray[oldEndIndex];
      endItem = array[endIndex];
      successful = true;
    }

    while (oldStartItem.key === endItem.key){
      // Items have swapped location
      if(oldEndItem.key === startItem.key){
        // Prefer rerendering rather than moving swapped items as ayout costs tend
        // to be more costly.  See js-framework-benchmark's "swap rows" benchmark.
        array[endIndex] = internalRerender(oldEndItem, endItem);
        array[startIndex] = internalRerender(oldStartItem, startItem);
        oldEndItem = oldArray[--oldEndIndex];
        startItem = array[++startIndex];
      }
      else{
        node = (array[endIndex] = internalRerender(oldStartItem, endItem)).$n;
        if(oldEndItem.key !== endItem.key){
          insertBeforeNode = insertBefore(parentNode, node, insertBeforeNode);
        }
      }

      oldStartIndex++; endIndex--;
      if (oldStartIndex > oldEndIndex || startIndex > endIndex) break outer;

      oldStartItem = oldArray[oldStartIndex];
      endItem = array[endIndex];
      successful = true;
    }

    while (oldEndItem.key === startItem.key){
      insertBefore(
        parentNode,
        (array[startIndex] = internalRerender(oldEndItem, startItem)).$n,
        oldStartItem.$n
      );

      oldEndIndex--; startIndex++;
      if (oldStartIndex > oldEndIndex || startIndex > endIndex) break outer;

      oldEndItem = oldArray[oldEndIndex];
      startItem = array[startIndex];
      successful = true;
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
    removeArrayNodes(oldArray, parentNode, 0, oldLength);
  }
  else if(!oldLength){
    renderArrayToParentBefore(parentNode, array, 0, length, markerNode);
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

const rerenderText = (value, contextNode, isOnlyChild)=>{
  if(value instanceof Object){
    return rerenderDynamic(isOnlyChild, value, contextNode);
  }

  contextNode.nodeValue = (value == null || value === true || value === false) ? '' : value;
  return contextNode;
};

const rerenderDynamic = (isOnlyChild, value, contextNode)=>{
  const node = createDynamic(isOnlyChild, contextNode.parentNode, value);
  replaceNode(contextNode, node);
  return node;
};

const rerenderInstance = (value, node, isOnlyChild, prevValue)=>{
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

const rerenderArrayMaybe = (array, contextNode, isOnlyChild, oldArray)=>{
  const markerNode = contextNode.xvdomContext;

  if(array instanceof Array){
    if(isOnlyChild){
      rerenderArrayOnlyChild(markerNode, array, oldArray);
    }
    else{
      rerenderArray(markerNode, array, oldArray);
    }
    return contextNode;
  }
  else{
    if(isOnlyChild){
      removeArrayNodesOnlyChild(oldArray, markerNode);
      return markerNode.appendChild(
        createDynamic(true, markerNode, array)
      );
    }
    else{
      removeArrayNodes(oldArray, markerNode.parentNode, 0, oldArray.length);
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

const createArray = (value, parentNode, isOnlyChild)=>{
  const node = document.createDocumentFragment();
  renderArrayToParent(node, value, value.length);
  node.xvdomContext = isOnlyChild ? parentNode : node.appendChild(createTextNode(''));
  return node;
};

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

const CREATE_BY_TYPE = {
  text:   createTextNode,
  object: internalRenderNoRecycle,
  array:  createArray,
  empty:  createEmptyTextNode
};

function createDynamic(isOnlyChild, parentNode, value){
  return CREATE_BY_TYPE[dynamicType(value)](value, parentNode, isOnlyChild);
}

const UPDATE_BY_TYPE = {
  text:   rerenderText,
  object: rerenderInstance,
  array:  rerenderArrayMaybe,
  empty:  rerenderText
};

const updateDynamic = (isOnlyChild, oldValue, value, contextNode)=>{
  return UPDATE_BY_TYPE[dynamicType(oldValue)](value, contextNode, isOnlyChild, oldValue);
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
