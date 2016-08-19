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

export const REF_TO_TAG = [
  'a',
  'b',
  'div',
  'i',
  'input',
  'span',
  'table',
  'tbody',
  'td',
  'tr'
];

// Creates an empty object with no built in properties (ie. `constructor`).
function Hash(){}
Hash.prototype = Object.create(null);

const EMPTY_PROPS = new Hash();
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

const recycle = instance=>{instance.$s.r.push(instance);};
const createTextNode = (value)=>document.createTextNode(value);
const createEmptyTextNode = ()=>createTextNode('');

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

function rerenderText(isOnlyChild, value, contextNode){
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

function updateDynamic(isOnlyChild, oldValue, value, contextNode){
  switch(oldValue && oldValue.constructor){
    case Array:
      return rerenderArrayMaybe(isOnlyChild, value, oldValue, contextNode.xvdomContext) || contextNode;

    case Object:
      return rerenderInstance(isOnlyChild, value, oldValue, contextNode);

    default:
      return rerenderText(isOnlyChild, value, contextNode);
  }
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

const appendChild = (node, child)=>{ node.appendChild(child); };

function createDynamicChild(value){
  switch(value && value.constructor){
    case String:
    case Number:
    case 0:
      return createTextNode(value);
      break;

    case Object:
    case Array:
      throw "NOT IMPLEMENTED YET";

    default:
      return createTextNode('');
  }
}

function createDynamic(ctx, statics, dynamics){
  const node = createDynamicChild(dynamics[ctx.dPtr++]);
  ctx.contextNodes.push(node);
  appendChild(ctx.curNode, node);
}

function createStatic(ctx, statics){
  appendChild(
    ctx.curNode,
    createDynamicChild(statics[ctx.sPtr++])
  );
}

function assignProps(node, ctx, bytecode, j, numStaticProps, statics, dynamics){
  let value, prop;
  while(j--){
    prop  = statics[ctx.sPtr++];
    value = j < numStaticProps ? statics[ctx.sPtr++] : dynamics[ctx.dPtr++];
    if (value != null) node[prop] = value;
  }
}

function createNode(ctx, statics, dynamics, bytecode){
  const node = ctx.lastNode = document.createElement(
    REF_TO_TAG[bytecode[ctx.i++]]
  );
  appendChild(ctx.curNode, node);

  const totalProps = bytecode[ctx.i++];
  if(totalProps > 0){
    assignProps(node, ctx, bytecode, totalProps, bytecode[ctx.i++], statics, dynamics);
  }
}

function RootNode(){ this.root = null; }
RootNode.prototype.appendChild = function(node){ return this.root = node; };

const COMMANDS = [
  createNode,
  ()=>{},// createComponentAllStaticProps,
  createDynamic,
  createStatic,
  ((ctx)=> { ctx.curNode = ctx.lastNode;           }),
  ((ctx)=> { ctx.curNode = ctx.curNode.parentNode; }),
  ((ctx)=> { ctx.contextNodes.push(ctx.lastNode);  })
];

function updateElProp(opArg, contextNode, statics, value, prevValue){
  if(value !== prevValue){
    contextNode[statics[opArg >> 16]] = value;
  }
}

function updateElChild(opArg, contextNode, statics, value, prevValue){
  if(value !== prevValue){
    switch(value && value.constructor){
      case String:
      case Number:
      case 0:
        contextNode.textContent = value;
        break;

      case Object:
      case Array:
        throw "NOT IMPLEMENTED YET";

      default:
        contextNode = createTextNode('');
    }
  }
}

const RERENDER_COMMANDS = [
  updateElProp,
  updateElChild
];

export function xrender(instance){
  const {t: {b:bytecode, s:statics}, d:dynamics} = instance;
  const rootNode = new RootNode();
  const length = bytecode.length;

  // TOOD: Consider RISC approach, where all Render Commands take X params
  //    Pros: context no longer needs `i`
  //    Cons: wasteful (padding, params for commands that take fewer params)
  const ctx = {
    i        : 0,
    sPtr     : 0,
    dPtr     : 0,
    curNode  : rootNode,
    lastNode : null,
    contextNodes: instance.contextNodes = []
  };

  do { COMMANDS[bytecode[ctx.i++]](ctx, statics, dynamics, bytecode); }
  while(length > ctx.i);

  const root = rootNode.root;
  root.__xvdom = instance;
  return root;
}

export function xrerender(node, {t: {u:bytecode, s:statics}, d:dynamics}){
  const {contextNodes, d:prevDynamics} = node.__xvdom;
  const length = bytecode.length;
  let i = 0;
  let dynamicOffset = 0;
  let opArg;
  while(length > i){
    RERENDER_COMMANDS[bytecode[i++]](
      (opArg = bytecode[i++]),
      contextNodes[opArg & 0xFFFF],
      statics,
      dynamics[dynamicOffset],
      prevDynamics[dynamicOffset++]
    );
  }
}

export default {
  createDynamic,
  el:(tag) => document.createElement(tag),
  render,
  rerender,
  xrender,
  xrerender,
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
