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

const isDynamicEmpty  = v => v == null || v === true || v === false;
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
  if(markerNode === null) renderArrayToParent(parentNode, array, i);
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

function rerenderDynamic(isOnlyChild, value, contextNode){
  const frag = document.createDocumentFragment();
  const node = createDynamic(isOnlyChild, frag, value);
  replaceNode(contextNode, frag);
  return node;
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
  if(!oldArray.length){
    renderArrayToParent(parentNode, array, 0);
  }
  else if(!array.length){
    removeArrayNodesOnlyChild(oldArray, parentNode);
  }
  else {
    rerenderArrayReconcileWithMinLayout(parentNode, array, oldArray, null);
  }
}

function rerenderArray(array, parentOrMarkerNode, isOnlyChild, oldArray){
  if(array instanceof Array){
    return (
      (isOnlyChild
        ? rerenderArrayOnlyChild(parentOrMarkerNode, array, oldArray)
        : rerenderArrayReconcileWithMinLayout(parentOrMarkerNode.parentNode, array, oldArray, parentOrMarkerNode)),
      parentOrMarkerNode
    );
  }

  if(isOnlyChild){
    removeArrayNodesOnlyChild(oldArray, parentOrMarkerNode);
    return createDynamic(true, parentOrMarkerNode, array);
  }

  removeArrayNodes(oldArray, parentOrMarkerNode.parentNode, 0);
}

function rerenderText(value, contextNode, isOnlyChild){
  if(!(value instanceof Object)){

    contextNode.nodeValue = isDynamicEmpty(value) ? '' : value;
    return contextNode;
  }
}

function rerenderInstance(value, node, isOnlyChild, prevValue){
  let prevRenderedInstance;
  if(value && internalRerenderInstance((prevRenderedInstance = prevValue.$r || prevValue), value)){
    // TODO: What is $r? Is this trying to track the original rendered instnace?
    value.$r = prevRenderedInstance;
    return node;
  }
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

function createDynamic(isOnlyChild, parentNode, value){
  return (
    value instanceof Array
      ? (
          renderArrayToParent(parentNode, value, 0),
          isOnlyChild ? parentNode : parentNode.appendChild(createTextNode(''))
        )
      : parentNode.appendChild(
          value instanceof Object
            ? internalRenderNoRecycle(value)
            : createTextNode(isDynamicEmpty(value) ? '' : value)
        )
  );
}

function updateDynamic(isOnlyChild, oldValue, value, contextNode){
  return (
    oldValue instanceof Object
      ? (
          oldValue instanceof Array
            ? rerenderArray(value, contextNode, isOnlyChild, oldValue)
            : rerenderInstance(value, contextNode, isOnlyChild, oldValue)
        )
      : rerenderText(value, contextNode, isOnlyChild)
  ) || rerenderDynamic(isOnlyChild, value, contextNode);
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
