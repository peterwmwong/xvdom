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

const isDynamicEmpty = v => v == null || v === true || v === false;

// https://esbench.com/bench/57f1459d330ab09900a1a1dd
function dynamicType(v){
  if(v instanceof Object) return (v instanceof Array ? 'array' : 'object');

  return isDynamicEmpty(v) ? 'empty' : 'text';
}

const EMPTY_PROPS     = {};
export const DEADPOOL = {push(){}, pop(){}};

// Creates an empty object with no built in properties (ie. `constructor`).
function Hash(){}
Hash.prototype = Object.create(null);

// TODO: Benchmark whether this is slower than Function/Prototype
function Pool(){
  this.map = new Hash();
}

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

function unmountInstance(inst, parentNode){
  recycle(inst);
  parentNode.removeChild(inst.$n);
}

function removeArrayNodes(array, parentNode, i){
  while(i < array.length){
    unmountInstance(array[i++], parentNode);
  }
}

function removeArrayNodesOnlyChild(array, parentNode){
  let i = 0;

  while(i < array.length){
    recycle(array[i++]);
  }
  parentNode.textContent = '';
}

function internalRerenderInstance(prevInst, inst){
  return prevInst.$s === inst.$s && (
    inst.$s.u(inst, prevInst),
    true
  );
}

function renderArrayToParentBefore(parentNode, array, i, markerNode){
  if(markerNode == null) renderArrayToParent(parentNode, array, i);
  else renderArrayToParentBeforeNode(parentNode, array, i, markerNode);
}

function renderArrayToParentBeforeNode(parentNode, array, i, beforeNode){
  while(i < array.length){
    parentNode.insertBefore(
      (array[i] = internalRender(array[i])).$n,
      beforeNode
    );
    ++i;
  }
}

function renderArrayToParent(parentNode, array, i){
  while(i < array.length){
    parentNode.appendChild(
      (array[i] = internalRender(array[i])).$n
    );
    ++i;
  }
}

function rerenderArrayReconcileWithMinLayout(parentNode, array, oldArray, markerNode){
  let i=0;
  for(; i < array.length && i < oldArray.length; i++){
    array[i] = internalRerender(oldArray[i], array[i]);
  }

  if(i < array.length){
    renderArrayToParentBefore(parentNode, array, i, markerNode);
  }
  else{
    removeArrayNodes(oldArray, parentNode, i);
  }
}

function rerenderArrayOnlyChild(parentNode, array, oldArray){
  if(!array.length){
    removeArrayNodesOnlyChild(oldArray, parentNode);
  }
  else if(!oldArray.length){
    renderArrayToParent(parentNode, array, 0);
  }
  else{
    rerenderArrayReconcileWithMinLayout(parentNode, array, oldArray, null);
  }
}

function rerenderDynamic(isOnlyChild, value, contextNode){
  const node = createDynamic(isOnlyChild, contextNode.parentNode, value);
  replaceNode(contextNode, node);
  return node;
}

function rerenderText(value, contextNode, isOnlyChild){
  if(value instanceof Object){
    return rerenderDynamic(isOnlyChild, value, contextNode);
  }

  contextNode.nodeValue = isDynamicEmpty(value) ? '' : value;
  return contextNode;
}

function rerenderInstance(value, node, isOnlyChild, prevValue){
  let prevRenderedInstance;
  if(!value || !internalRerenderInstance((prevRenderedInstance = prevValue.$r || prevValue), value)){
    return rerenderDynamic(isOnlyChild, value, node);
  }

  // TODO: What is $r? Is this trying to track the original rendered instnace?
  value.$r = prevRenderedInstance;
  return node;
}

function rerenderArray(array, contextNode, isOnlyChild, oldArray){
  const markerNode = contextNode.xvdomContext;

  if(array instanceof Array){
    if(isOnlyChild){
      rerenderArrayOnlyChild(markerNode, array, oldArray);
    }
    else{
      rerenderArrayReconcileWithMinLayout(markerNode.parentNode, array, oldArray, markerNode);
    }
    return contextNode;
  }

  if(isOnlyChild){
    removeArrayNodesOnlyChild(oldArray, markerNode);
    return markerNode.appendChild(
      createDynamic(true, markerNode, array)
    );
  }

  removeArrayNodes(oldArray, markerNode.parentNode, 0);
  return rerenderDynamic(false, array, markerNode);
}

function createArray(value, parentNode, isOnlyChild){
  const node = document.createDocumentFragment();
  renderArrayToParent(node, value, 0);
  node.xvdomContext = isOnlyChild ? parentNode : node.appendChild(createTextNode(''));
  return node;
}

function StatefulComponent(render, props, instance, actions){
  this._boundActions = new Hash();
  this._parentInst   = instance;
  this.actions       = actions;
  this.props         = props;
  this.render        = render;
  this.bindSend      = this.bindSend.bind(this);
  this.state         = actions.onInit(this);
  this.$n            = internalRenderNoRecycle(this._instance = render(this));
}

StatefulComponent.prototype.updateProps = function(newProps){
  const {props} = this;
  this.props = newProps;

  if(this.actions.onProps) this.send('onProps', props);
  else this.rerender();

  return this;
};

StatefulComponent.prototype.bindSend = function(action){
  return this._boundActions[action] || (
    this._boundActions[action] = this.send.bind(this, action)
  );
};

StatefulComponent.prototype.send = function(actionName, context){
  let newState;
  const actionFn = this.actions[actionName];
  // TODO: process.ENV === 'development', console.error(`Action not found #{action}`);
  if(!actionFn || (newState = actionFn(this, context)) == this.state) return;

  this.state = newState;
  this.rerender();
};

StatefulComponent.prototype.rerender = function(){
  const instance = internalRerender(this._instance, this.render(this));
  this._instance = instance;
  instance.$n.xvdom = this._parentInst;
};

function createStatefulComponent(component, props, instance, actions){
  return new StatefulComponent(component, props, instance, actions);
}

function createStatelessComponent(component, props){
  const instance = component(props);
  internalRenderNoRecycle(instance);
  return instance;
}

export function createComponent(component, actions, props, parentInstance){
  if(process.env.NODE_ENV === 'development') performance.mark(`createComponent.start(${component.name})`);

  const result = (actions ? createStatefulComponent : createStatelessComponent)(
    component,
    (props || EMPTY_PROPS),
    parentInstance,
    actions
  );

  if(process.env.NODE_ENV === 'development'){
    performance.mark(`createComponent.end(${component.name})`);
    performance.measure(`<${component.name}/>`, `createComponent.start(${component.name})`, `createComponent.end(${component.name})`);
  }
  return result;
};

function updateComponent(component, actions, props, componentInstance){
  if(process.env.NODE_ENV === 'development') performance.mark(`updateComponent.start(${component.name})`);

  const result = (
    actions
      ? componentInstance.updateProps(props)
      : internalRerender(componentInstance, component(props))
  );

  if(process.env.NODE_ENV === 'development'){
    performance.mark(`updateComponent.end(${component.name})`);
    performance.measure(`<${component.name}/>`, `updateComponent.start(${component.name})`, `updateComponent.end(${component.name})`);
  }
  return result;
}

function internalRenderNoRecycle(instance){
  const node  = instance.$s.c(instance);
  instance.$n = node;
  node.xvdom  = instance;
  return node;
}

function internalRender(instance){
  const spec = instance.$s;
  const recycledInstance = spec.r.pop(instance.key);
  if(recycledInstance){
    spec.u(instance, recycledInstance);
    return recycledInstance;
  }

  internalRenderNoRecycle(instance);
  return instance;
}

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
  array:  rerenderArray,
  empty:  rerenderText
};

function updateDynamic(isOnlyChild, oldValue, value, contextNode){
  return UPDATE_BY_TYPE[dynamicType(oldValue)](value, contextNode, isOnlyChild, oldValue);
}

function internalRerender(prevInstance, instance){
  if(internalRerenderInstance(prevInstance, instance)) return prevInstance;

  replaceNode(prevInstance.$n, (instance = internalRender(instance)).$n);
  recycle(prevInstance);
  return instance;
}

export const render   = instance => internalRender(instance).$n;
export const rerender = (node, instance) => internalRerender(node.xvdom, instance).$n;
export const unmount  = node => { unmountInstance(node.xvdom, node.parentNode); };

export default {
  createComponent,
  createDynamic,
  el: tag => document.createElement(tag),
  render,
  rerender,
  unmount,
  updateComponent,
  updateDynamic,
  Pool,
  DEADPOOL
};

// Internal API
export const _ = {
  rerenderText,
  rerenderDynamic
};
