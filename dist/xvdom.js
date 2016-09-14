(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["xvdom"] = factory();
	else
		root["xvdom"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.xrerender = xrerender;
	exports.xrender = xrender;

	var _ref_to_tag = __webpack_require__(2);

	var _ref_to_tag2 = _interopRequireDefault(_ref_to_tag);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var replaceChild = function replaceChild(prev, cur) {
	  return prev.parentNode.replaceChild(cur, prev);
	};
	var appendChild = function appendChild(node, child) {
	  return node.appendChild(child);
	};
	var insertBefore = function insertBefore(parentNode, node, beforeNode) {
	  return parentNode.insertBefore(node, beforeNode);
	};
	var createTextNode = function createTextNode(v) {
	  return document.createTextNode(v);
	};

	var isDynamicTextable = function isDynamicTextable(v) {
	  return (typeof v === 'undefined' ? 'undefined' : _typeof(v)) !== 'object';
	};
	var isDynamicNotBlankText = function isDynamicNotBlankText(v) {
	  return v || v === 0;
	};
	var dynamicToText = function dynamicToText(v) {
	  return isDynamicNotBlankText(v) ? v : '';
	};
	var getConstructor = function getConstructor(v) {
	  return v && v.constructor;
	};

	function replaceDynamicElChild(contextNode, value) {
	  var node = createDynamicChild(value);
	  node.__xvdomDynId = contextNode.__xvdomDynId;
	  node.__xvdomDynContextNodes = contextNode.__xvdomDynContextNodes;
	  replaceChild(contextNode, node);
	}

	function updateElChildText(contextNode, value) {
	  if (isDynamicTextable(value)) contextNode.nodeValue = dynamicToText(value);else replaceDynamicElChild(contextNode, value);
	}

	function updateElOnlyChildText(contextNode, value) {
	  if (isDynamicTextable(value)) contextNode.textContent = dynamicToText(value);else replaceDynamicElChild(contextNode, value);
	}

	function updateElOnlyChildArray(parentNode, value, prevValue) {
	  if (value instanceof Array) {
	    var length = value.length;
	    var oldLength = prevValue.length;
	    if (!length) {
	      parentNode.textContent = '';
	    } else if (!oldLength) {
	      createStaticChildArray(value, parentNode);
	    } else {
	      rerenderArray_reconcile(parentNode, value, length, prevValue, oldLength, null);
	    }
	  }
	}

	function removeChildrenBefore(beforeNode, num) {
	  while (num--) {
	    beforeNode.previousSibling.remove();
	  }
	}

	function updateElChildArray(markerNode, value, prevValue) {
	  if (value instanceof Array) {
	    var length = value.length;
	    var oldLength = prevValue.length;
	    if (!length) {
	      removeChildrenBefore(markerNode);
	    } else if (!oldLength) {
	      throw "UNIMPLEMENTED!!!";
	    } else {
	      rerenderArray_reconcile(markerNode.parentNode, value, length, prevValue, oldLength, markerNode);
	    }
	  }
	}

	function updateElOnlyChild(_, contextNode, statics, value, prevValue) {
	  var type = getConstructor(prevValue);
	  if (type === Object) rerenderInstance(prevValue, value);else if (type === Array) updateElOnlyChildArray(contextNode, value, prevValue);else updateElOnlyChildText(contextNode, value);
	}

	function updateElChild(_, contextNode, statics, value, prevValue) {
	  var type = prevValue && prevValue.constructor;
	  if (type === Object) rerenderInstance(prevValue, value);else if (type === Array) updateElChildArray(contextNode, value, prevValue);else updateElChildText(contextNode, value);
	}

	function updateElProp(staticOffsetToProp, contextNode, statics, value, prevValue) {
	  contextNode[statics[staticOffsetToProp]] = value;
	}

	var UPDATE_COMMANDS = [updateElProp, updateElChild, updateElOnlyChild];

	function rerenderInstanceWithTemplateAndDynamics(prevInstance, instance) {
	  var prevNode = prevInstance.n;
	  var node = xrender(instance);

	  replaceChild(prevNode, node);
	  var __xvdomDynContextNodes = prevNode.__xvdomDynContextNodes;

	  if (__xvdomDynContextNodes) {
	    __xvdomDynContextNodes[node.__xvdomDynId = prevNode.__xvdomDynId] = node;
	    node.__xvdomDynContextNodes = __xvdomDynContextNodes;
	  }
	}

	function rerenderInstanceWithDynamics(prevInstance, instance) {
	  var dynamics = instance.d;
	  var contextNodes = prevInstance.contextNodes;
	  var _prevInstance$t = prevInstance.t;
	  var bytecode = _prevInstance$t.u;
	  var statics = _prevInstance$t.s;
	  var prevDynamics = prevInstance.d;


	  var i = 0;
	  var dynamicOffset = 0;
	  var value = void 0,
	      prevValue = void 0;

	  while (i < bytecode.length) {
	    value = dynamics[dynamicOffset];
	    prevValue = prevDynamics[dynamicOffset++];

	    if (value === prevValue) i += 3;else {
	      UPDATE_COMMANDS[bytecode[i++]](bytecode[i++], contextNodes[bytecode[i++]], statics, value, prevValue);
	    }
	  }

	  instance.contextNodes = contextNodes;
	  (instance.n = prevInstance.n).__xvdom = instance;
	}

	function rerenderInstance(prevInstance, instance) {
	  if (instance.t === prevInstance.t) rerenderInstanceWithDynamics(prevInstance, instance);else rerenderInstanceWithTemplateAndDynamics(prevInstance, instance);
	}

	function rerenderInstanceAndReturnNode(prevInstance, instance) {
	  rerenderInstance(prevInstance, instance);
	  return instance.n;
	}

	function xrerender(node, instance) {
	  if (node.parentNode) return rerenderInstanceAndReturnNode(node.__xvdom, instance);
	}

	function addContextNode(node, contextNodes) {
	  node.__xvdomDynId = contextNodes.length;
	  node.__xvdomDynContextNodes = contextNodes;
	  contextNodes.push(node);
	  return node;
	}

	function createStaticChildTextNode(value, parentNode) {
	  return appendChild(parentNode, createTextNode(dynamicToText(value)));
	}

	function createStaticChildInstance(value, parentNode) {
	  return appendChild(parentNode, xrender(value));
	}

	function createStaticChildArray(value, parentNode) {
	  var i = 0;
	  while (i < value.length) {
	    parentNode.appendChild(xrender(value[i++]));
	  }
	};

	function createStaticChildEmptyTextNode(parentNode) {
	  return appendChild(parentNode, createTextNode(''));
	}

	function createDynamicChildTextNode(value, parentNode, contextNodes) {
	  addContextNode(createStaticChildTextNode(value, parentNode), contextNodes);
	}

	function createDynamicChildInstance(value, parentNode, contextNodes) {
	  addContextNode(createStaticChildInstance(value, parentNode), contextNodes);
	};

	function createDynamicChildArray(value, parentNode, contextNodes) {
	  createStaticChildArray(value, parentNode);
	  addContextNode(createStaticChildEmptyTextNode(parentNode), contextNodes);
	};

	function createDynamicChildArrayOnlyChild(value, parentNode, contextNodes) {
	  createStaticChildArray(value, parentNode);
	  addContextNode(parentNode, contextNodes);
	};

	function createDynamicChild(value, parentNode, contextNodes) {
	  var type = getConstructor(value);
	  if (type === Object) createDynamicChildInstance(value, parentNode, contextNodes);
	  if (type === Array) createDynamicChildArray(value, parentNode, contextNodes);else createDynamicChildTextNode(dynamicToText(value), parentNode, contextNodes);
	}

	function createDynamicChildOnlyChild(value, parentNode, contextNodes) {
	  var type = getConstructor(value);
	  if (type === Object) createDynamicChildInstance(value, parentNode, contextNodes);else if (type === Array) createDynamicChildArrayOnlyChild(value, parentNode, contextNodes);else {
	    if (isDynamicNotBlankText(value)) parentNode.textContent = value;
	    addContextNode(parentNode, contextNodes);
	  }
	}

	function createStaticChild(value, parentNode) {
	  var type = getConstructor(value);
	  if (type === Object) createStaticChildInstance(value, parentNode);else if (type === Array) createStaticChildArray(value, parentNode);else if (isDynamicNotBlankText(value)) createStaticChildTextNode(value, parentNode);
	}

	function createStaticChildOnlyChild(value, parentNode) {
	  var type = getConstructor(value);
	  if (type === Object) createStaticChildInstance(value, parentNode);else if (type === Array) createStaticChildArray(value, parentNode);else if (isDynamicNotBlankText(value)) parentNode.textContent = dynamicToText(value);
	}

	function createDynamic(ctx, contextNodes, statics, dynamics) {
	  createDynamicChild(dynamics[ctx.dPtr++], ctx.curNode, contextNodes);
	}

	function createStatic(ctx, contextNodes, statics) {
	  createStaticChild(statics[ctx.sPtr++], ctx.curNode);
	}

	function createDynamicOnlyChild(ctx, contextNodes, statics, dynamics) {
	  createDynamicChildOnlyChild(dynamics[ctx.dPtr++], ctx.curNode, contextNodes);
	}

	function createStaticOnlyChild(ctx, contextNodes, statics) {
	  createStaticChildOnlyChild(statics[ctx.sPtr++], ctx.curNode);
	}

	function assignProps(node, ctx, j, numStaticProps, statics, dynamics) {
	  var value = void 0,
	      prop = void 0;
	  while (j--) {
	    prop = statics[ctx.sPtr++];
	    value = j < numStaticProps ? statics[ctx.sPtr++] : dynamics[ctx.dPtr++];
	    if (value != null) node[prop] = value;
	  }
	}

	function createNode(ctx, contextNodes, statics, dynamics, bytecode) {
	  var node = ctx.lastNode = document.createElement(_ref_to_tag2.default[bytecode[ctx.i++]]);
	  appendChild(ctx.curNode, node);

	  var totalProps = bytecode[ctx.i++];
	  if (totalProps > 0) {
	    assignProps(node, ctx, totalProps, bytecode[ctx.i++], statics, dynamics);
	  }
	}

	function RootNode() {
	  this.root = null;
	}
	RootNode.prototype.appendChild = function (node) {
	  return this.root = node;
	};
	RootNode.prototype.finalizeRoot = function (instance) {
	  var root = this.root;

	  root.__xvdom = instance;
	  return instance.n = root;
	};

	var CREATE_COMMANDS = [createNode, function () {}, // createComponentAllStaticProps,
	createDynamic, createStatic, createDynamicOnlyChild, createStaticOnlyChild, function (ctx) {
	  ctx.curNode = ctx.lastNode;
	}, function (ctx) {
	  ctx.curNode = ctx.curNode.parentNode;
	}, function (ctx, contextNodes) {
	  contextNodes.push(ctx.lastNode);
	}];

	function xrender(instance) {
	  var _instance$t = instance.t;
	  var bytecode = _instance$t.b;
	  var statics = _instance$t.s;
	  var dynamics = instance.d;

	  var rootNode = new RootNode();
	  var length = bytecode.length;
	  var contextNodes = instance.contextNodes = [];

	  // TOOD: Consider RISC approach, where all Render Commands take X params
	  //    Pros: context no longer needs `i`
	  //    Cons: wasteful (padding, params for commands that take fewer params)
	  var ctx = {
	    i: 0,
	    sPtr: 0,
	    dPtr: 0,
	    curNode: rootNode,
	    lastNode: null
	  };

	  // TODO: pass ctx.curNode
	  do {
	    CREATE_COMMANDS[bytecode[ctx.i++]](ctx, contextNodes, statics, dynamics, bytecode);
	  } while (length > ctx.i);

	  return rootNode.finalizeRoot(instance);
	}

	exports.default = { xrender: xrender, xrerender: xrerender };

	// ======================
	// Recycling support code
	// ======================

	// // Creates an empty object with no built in properties (ie. `constructor`).
	// function Hash(){}
	// Hash.prototype = Object.create(null);
	//
	// export const DEADPOOL = {push(){}, pop(){}};
	//
	// // TODO: Benchmark whether this is slower than Function/Prototype
	// function Pool(){
	//   this.map = new Hash();
	// };
	//
	// Pool.prototype.push = function(instance){
	//   const {key} = instance;
	//   const {map} = this;
	//   instance.$x = map[key];
	//   map[key] = instance;
	// };
	//
	// Pool.prototype.pop = function(key){
	//   const head = this.map[key];
	//   if(!head) return;
	//   this.map[key] = head.$x;
	//   return head;
	// };

	// ===================
	// Rerender Array Code
	// ===================
	//
	// const replaceNode = (oldNode, newNode)=>{
	//   const parentNode = oldNode.parentNode;
	//   if(parentNode) parentNode.replaceChild(newNode, oldNode);
	// };
	//
	// const insertBefore = (parentNode, node, beforeNode)=>
	//   beforeNode ? parentNode.insertBefore(node, beforeNode) : parentNode.appendChild(node);
	//
	// const unmountInstance = (inst, parentNode)=>{
	//   recycle(inst);
	//   parentNode.removeChild(inst.$n);
	// };
	//
	// const removeArrayNodes = (array, parentNode)=>{
	//   let length = array.length;
	//   let i = 0;
	//
	//   while(i<length){
	//     unmountInstance(array[i++], parentNode);
	//   }
	// };
	//
	// const removeArrayNodesOnlyChild = (array, parentNode)=>{
	//   let length = array.length;
	//   let i = 0;
	//
	//   while(i<length){
	//     recycle(array[i++]);
	//   }
	//   parentNode.textContent = '';
	// };
	//
	// const internalRerenderInstance = (inst, prevInst)=>
	//   prevInst.$s === inst.$s && (
	//     inst.$s.u(inst, prevInst),
	//     true
	//   );
	//
	// const renderArrayToParentBefore = (parentNode, array, length, markerNode)=>{
	//   let i = 0;
	//
	//   while(i < length){
	//     insertBefore(
	//       parentNode,
	//       (array[i] = internalRender(array[i])).$n,
	//       markerNode
	//     );
	//     ++i;
	//   }
	// };
	//
	// const renderArrayToParent = (parentNode, array, length)=>{
	//   let i = 0;
	//
	//   while(i < length){
	//     parentNode.appendChild(
	//       (array[i] = xrender(array[i]))
	//     );
	//     ++i;
	//   }
	// };
	//
	// const rerenderArray_reconcileWithMap = (parentNode, array, oldArray, startIndex, endIndex, oldStartItem, oldStartIndex, oldEndItem, oldEndIndex)=>{
	//   const oldListNodeKeyMap = new Map();
	//   let insertBeforeNode = oldEndItem.$n;
	//   let item, key, startItem;
	//
	//   while(oldStartIndex <= oldEndIndex){
	//     item = oldArray[oldStartIndex++];
	//     oldListNodeKeyMap.set(item.k, item);
	//   }
	//
	//   while(startIndex <= endIndex){
	//     startItem = array[startIndex];
	//     key = startItem.k;
	//     item = oldListNodeKeyMap.get(key);
	//
	//     if(item){
	//       if(item === oldEndItem) insertBeforeNode = insertBeforeNode.nextSibling;
	//       oldListNodeKeyMap.delete(key);
	//       startItem = internalRerender(item, startItem);
	//     }
	//     else{
	//       startItem = internalRender(startItem);
	//     }
	//     array[startIndex] = startItem;
	//     insertBefore(parentNode, startItem.$n, insertBeforeNode);
	//     ++startIndex;
	//   }
	//
	//   oldListNodeKeyMap.forEach(value=>{
	//     unmountInstance(value, parentNode);
	//   });
	// };
	//
	// const rerenderArray_afterReconcile = (parentNode, array, oldArray, startIndex, startItem, endIndex, endItem, oldStartIndex, oldStartItem, oldEndIndex, oldEndItem, insertBeforeNode)=>{
	//   if(oldStartIndex > oldEndIndex){
	//     while(startIndex <= endIndex){
	//       startItem = array[startIndex];
	//       insertBefore(
	//         parentNode,
	//         (array[startIndex] = internalRender(startItem)).$n,
	//         insertBeforeNode
	//       );
	//       ++startIndex;
	//     }
	//   }
	//   else if(startIndex > endIndex){
	//     while(oldStartIndex <= oldEndIndex){
	//       unmountInstance(oldArray[oldStartIndex++], parentNode);
	//     }
	//   }
	//   else{
	//     rerenderArray_reconcileWithMap(parentNode, array, oldArray, startIndex, endIndex, oldStartItem, oldStartIndex, oldEndItem, oldEndIndex);
	//   }
	// };

	var withinBounds = function withinBounds(oldStartIndex, oldEndIndex, startIndex, endIndex) {
	  return oldStartIndex > oldEndIndex || startIndex > endIndex;
	};

	function rerenderArray_reconcile(parentNode, array, endIndex, oldArray, oldEndIndex, markerNode) {
	  var oldStartIndex = 0;
	  var startIndex = 0;
	  var successful = true;
	  var startItem = array[0];
	  var oldStartItem = oldArray[0];
	  var insertBeforeNode = markerNode;
	  var oldEndItem = void 0,
	      endItem = void 0,
	      node = void 0;
	  endIndex--;
	  oldEndIndex--;

	  outer: while (successful && !withinBounds(oldStartIndex, oldEndIndex, startIndex, endIndex)) {
	    successful = false;

	    while (oldStartItem.k === startItem.k) {
	      rerenderInstance(oldStartItem, startItem);

	      oldStartIndex++;startIndex++;
	      if (withinBounds(oldStartIndex, oldEndIndex, startIndex, endIndex)) {
	        break outer;
	      } else {
	        oldStartItem = oldArray[oldStartIndex];
	        startItem = array[startIndex];
	        successful = true;
	      }
	    }

	    oldEndItem = oldArray[oldEndIndex];
	    endItem = array[endIndex];

	    while (oldEndItem.k === endItem.k) {
	      insertBeforeNode = rerenderInstanceAndReturnNode(oldEndItem, endItem);

	      oldEndIndex--;endIndex--;
	      if (withinBounds(oldStartIndex, oldEndIndex, startIndex, endIndex)) {
	        break outer;
	      } else {
	        oldEndItem = oldArray[oldEndIndex];
	        endItem = array[endIndex];
	        successful = true;
	      }
	    }

	    while (oldStartItem.k === endItem.k) {
	      node = rerenderInstanceAndReturnNode(oldStartItem, endItem);

	      if (oldEndItem.k !== endItem.k) {
	        insertBeforeNode = insertBefore(parentNode, node, insertBeforeNode);
	      }
	      oldStartIndex++;endIndex--;
	      if (withinBounds(oldStartIndex, oldEndIndex, startIndex, endIndex)) {
	        break outer;
	      } else {
	        oldStartItem = oldArray[oldStartIndex];
	        endItem = array[endIndex];
	        successful = true;
	      }
	    }

	    while (oldEndItem.k === startItem.k) {
	      insertBefore(parentNode, oldEndItem.n, rerenderInstanceAndReturnNode(oldEndItem, startItem));

	      oldEndIndex--;startIndex++;
	      if (withinBounds(oldStartIndex, oldEndIndex, startIndex, endIndex)) {
	        break outer;
	      } else {
	        oldEndItem = oldArray[oldEndIndex];
	        startItem = array[startIndex];
	        successful = true;
	      }
	    }
	  }

	  if (startIndex <= endIndex || oldStartIndex <= oldEndIndex) {
	    // rerenderArray_afterReconcile(parentNode, array, oldArray, startIndex, startItem, endIndex, endItem, oldStartIndex, oldStartItem, oldEndIndex, oldEndItem, insertBeforeNode);
	    throw "NOT IMPLEMENTED!";
	  }
	}

	// const rerenderArray = (markerNode, array, oldArray)=>{
	//   const parentNode = markerNode.parentNode;
	//   const length = array.length;
	//   const oldLength = oldArray.length;
	//   if(!length){
	//     removeArrayNodes(oldArray, parentNode);
	//   }
	//   else if(!oldLength){
	//     renderArrayToParentBefore(parentNode, array, length, markerNode);
	//   }
	//   else{
	//     rerenderArray_reconcile(parentNode, array, length, oldArray, oldLength, markerNode);
	//   }
	// };

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.default = ['a', 'b', 'div', 'i', 'input', 'span', 'table', 'tbody', 'td', 'tr'];

/***/ }
/******/ ])
});
;