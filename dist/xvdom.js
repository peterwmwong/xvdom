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
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
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
	function Hash() {}
	Hash.prototype = Object.create(null);

	var EMPTY_PROPS = new Hash();
	var DEADPOOL = exports.DEADPOOL = {
	  push: function push() {},
	  pop: function pop() {}
	};

	// TODO: Benchmark whether this is slower than Function/Prototype
	function Pool() {
	  this.map = new Hash();
	};

	Pool.prototype.push = function (instance) {
	  var key = instance.key;
	  var map = this.map;

	  instance.$x = map[key];
	  map[key] = instance;
	};

	Pool.prototype.pop = function (key) {
	  var head = this.map[key];
	  if (!head) return;
	  this.map[key] = head.$x;
	  return head;
	};

	var recycle = function recycle(instance) {
	  instance.$s.r.push(instance);
	};
	var createTextNode = function createTextNode(value) {
	  return document.createTextNode(value);
	};
	var createEmptyTextNode = function createEmptyTextNode() {
	  return createTextNode('');
	};

	var replaceNode = function replaceNode(oldNode, newNode) {
	  var parentNode = oldNode.parentNode;
	  if (parentNode) parentNode.replaceChild(newNode, oldNode);
	};

	var insertBefore = function insertBefore(parentNode, node, beforeNode) {
	  return beforeNode ? parentNode.insertBefore(node, beforeNode) : parentNode.appendChild(node);
	};

	var unmountInstance = function unmountInstance(inst, parentNode) {
	  recycle(inst);
	  parentNode.removeChild(inst.$n);
	};

	var removeArrayNodes = function removeArrayNodes(array, parentNode) {
	  var length = array.length;
	  var i = 0;

	  while (i < length) {
	    unmountInstance(array[i++], parentNode);
	  }
	};

	var removeArrayNodesOnlyChild = function removeArrayNodesOnlyChild(array, parentNode) {
	  var length = array.length;
	  var i = 0;

	  while (i < length) {
	    recycle(array[i++]);
	  }
	  parentNode.textContent = '';
	};

	var internalRerenderInstance = function internalRerenderInstance(inst, prevInst) {
	  return prevInst.$s === inst.$s && (inst.$s.u(inst, prevInst), true);
	};

	var renderArrayToParentBefore = function renderArrayToParentBefore(parentNode, array, length, markerNode) {
	  var i = 0;

	  while (i < length) {
	    insertBefore(parentNode, (array[i] = internalRender(array[i])).$n, markerNode);
	    ++i;
	  }
	};

	var renderArrayToParent = function renderArrayToParent(parentNode, array, length) {
	  var i = 0;

	  while (i < length) {
	    parentNode.appendChild((array[i] = internalRender(array[i])).$n);
	    ++i;
	  }
	};

	var rerenderArray_reconcileWithMap = function rerenderArray_reconcileWithMap(parentNode, array, oldArray, startIndex, endIndex, oldStartItem, oldStartIndex, oldEndItem, oldEndIndex) {
	  var oldListNodeKeyMap = new Map();
	  var insertBeforeNode = oldEndItem.$n;
	  var item = void 0,
	      key = void 0,
	      startItem = void 0;

	  while (oldStartIndex <= oldEndIndex) {
	    item = oldArray[oldStartIndex++];
	    oldListNodeKeyMap.set(item.key, item);
	  }

	  while (startIndex <= endIndex) {
	    startItem = array[startIndex];
	    key = startItem.key;
	    item = oldListNodeKeyMap.get(key);

	    if (item) {
	      if (item === oldEndItem) insertBeforeNode = insertBeforeNode.nextSibling;
	      oldListNodeKeyMap.delete(key);
	      startItem = internalRerender(item, startItem);
	    } else {
	      startItem = internalRender(startItem);
	    }
	    array[startIndex] = startItem;
	    insertBefore(parentNode, startItem.$n, insertBeforeNode);
	    ++startIndex;
	  }

	  oldListNodeKeyMap.forEach(function (value) {
	    unmountInstance(value, parentNode);
	  });
	};

	var rerenderArray_afterReconcile = function rerenderArray_afterReconcile(parentNode, array, oldArray, startIndex, startItem, endIndex, endItem, oldStartIndex, oldStartItem, oldEndIndex, oldEndItem, insertBeforeNode) {
	  if (oldStartIndex > oldEndIndex) {
	    while (startIndex <= endIndex) {
	      startItem = array[startIndex];
	      insertBefore(parentNode, (array[startIndex] = internalRender(startItem)).$n, insertBeforeNode);
	      ++startIndex;
	    }
	  } else if (startIndex > endIndex) {
	    while (oldStartIndex <= oldEndIndex) {
	      unmountInstance(oldArray[oldStartIndex++], parentNode);
	    }
	  } else {
	    rerenderArray_reconcileWithMap(parentNode, array, oldArray, startIndex, endIndex, oldStartItem, oldStartIndex, oldEndItem, oldEndIndex);
	  }
	};

	var rerenderArray_reconcile = function rerenderArray_reconcile(parentNode, array, endIndex, oldArray, oldEndIndex, markerNode) {
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

	  outer: while (successful && oldStartIndex <= oldEndIndex && startIndex <= endIndex) {
	    successful = false;

	    while (oldStartItem.key === startItem.key) {
	      array[startIndex] = internalRerender(oldStartItem, startItem);

	      oldStartIndex++;startIndex++;
	      if (oldStartIndex > oldEndIndex || startIndex > endIndex) {
	        break outer;
	      } else {
	        oldStartItem = oldArray[oldStartIndex];
	        startItem = array[startIndex];
	        successful = true;
	      }
	    }

	    oldEndItem = oldArray[oldEndIndex];
	    endItem = array[endIndex];

	    while (oldEndItem.key === endItem.key) {
	      insertBeforeNode = (array[endIndex] = internalRerender(oldEndItem, endItem)).$n;

	      oldEndIndex--;endIndex--;
	      if (oldStartIndex > oldEndIndex || startIndex > endIndex) {
	        break outer;
	      } else {
	        oldEndItem = oldArray[oldEndIndex];
	        endItem = array[endIndex];
	        successful = true;
	      }
	    }

	    while (oldStartItem.key === endItem.key) {
	      node = (array[endIndex] = internalRerender(oldStartItem, endItem)).$n;

	      if (oldEndItem.key !== endItem.key) {
	        insertBeforeNode = insertBefore(parentNode, node, insertBeforeNode);
	      }
	      oldStartIndex++;endIndex--;
	      if (oldStartIndex > oldEndIndex || startIndex > endIndex) {
	        break outer;
	      } else {
	        oldStartItem = oldArray[oldStartIndex];
	        endItem = array[endIndex];
	        successful = true;
	      }
	    }

	    while (oldEndItem.key === startItem.key) {
	      insertBefore(parentNode, (array[startIndex] = internalRerender(oldEndItem, startItem)).$n, oldStartItem.$n);

	      oldEndIndex--;startIndex++;
	      if (oldStartIndex > oldEndIndex || startIndex > endIndex) {
	        break outer;
	      } else {
	        oldEndItem = oldArray[oldEndIndex];
	        startItem = array[startIndex];
	        successful = true;
	      }
	    }
	  }

	  if (startIndex <= endIndex || oldStartIndex <= oldEndIndex) {
	    rerenderArray_afterReconcile(parentNode, array, oldArray, startIndex, startItem, endIndex, endItem, oldStartIndex, oldStartItem, oldEndIndex, oldEndItem, insertBeforeNode);
	  }
	};

	var rerenderArray = function rerenderArray(markerNode, array, oldArray) {
	  var parentNode = markerNode.parentNode;
	  var length = array.length;
	  var oldLength = oldArray.length;
	  if (!length) {
	    removeArrayNodes(oldArray, parentNode);
	  } else if (!oldLength) {
	    renderArrayToParentBefore(parentNode, array, length, markerNode);
	  } else {
	    rerenderArray_reconcile(parentNode, array, length, oldArray, oldLength, markerNode);
	  }
	};

	var rerenderArrayOnlyChild = function rerenderArrayOnlyChild(parentNode, array, oldArray) {
	  var length = array.length;
	  var oldLength = oldArray.length;
	  if (!length) {
	    removeArrayNodesOnlyChild(oldArray, parentNode);
	  } else if (!oldLength) {
	    renderArrayToParent(parentNode, array, length);
	  } else {
	    rerenderArray_reconcile(parentNode, array, length, oldArray, oldLength, null);
	  }
	};

	var rerenderText = function rerenderText(isOnlyChild, value, contextNode) {
	  switch (value && value.constructor) {
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

	var rerenderDynamic = function rerenderDynamic(isOnlyChild, value, contextNode) {
	  var node = createDynamic(isOnlyChild, contextNode.parentNode, value);
	  replaceNode(contextNode, node);
	  return node;
	};

	var rerenderInstance = function rerenderInstance(isOnlyChild, value, prevValue, node) {
	  var prevRenderedInstance = void 0;
	  if (value && internalRerenderInstance(value, prevRenderedInstance = prevValue.$r || prevValue)) {
	    value.$r = prevRenderedInstance;
	    return node;
	  }

	  return rerenderDynamic(isOnlyChild, value, node);
	};

	// TODO: Figure out whether we're using all these arguments
	var rerenderComponent = function rerenderComponent(component, props, componentInstance, instance, componentInstanceProp) {
	  var newCompInstance = component(props || EMPTY_PROPS);
	  if (!internalRerenderInstance(newCompInstance, componentInstance)) {
	    replaceNode(componentInstance.$n, (instance[componentInstanceProp] = internalRender(newCompInstance)).$n);
	  }
	};

	var rerenderArrayMaybe = function rerenderArrayMaybe(isOnlyChild, array, oldArray, markerNode) {
	  if (array instanceof Array) {
	    if (isOnlyChild) {
	      rerenderArrayOnlyChild(markerNode, array, oldArray);
	    } else {
	      rerenderArray(markerNode, array, oldArray);
	    }
	  } else {
	    if (isOnlyChild) {
	      removeArrayNodesOnlyChild(oldArray, markerNode);
	      return markerNode.appendChild(createDynamic(true, markerNode, array));
	    } else {
	      removeArrayNodes(oldArray, markerNode.parentNode);
	      return rerenderDynamic(false, array, markerNode);
	    }
	  }
	};

	var rerenderStatefulComponent = function rerenderStatefulComponent(component, newProps, api) {
	  var _onProps = api._onProps;
	  var props = api.props;

	  api.props = newProps;

	  if (_onProps) componentSend(component, api, _onProps, props);else componentRerender(component, api);
	};

	var updateDynamic = function updateDynamic(isOnlyChild, oldValue, value, contextNode) {
	  switch (oldValue && oldValue.constructor) {
	    case Array:
	      return rerenderArrayMaybe(isOnlyChild, value, oldValue, contextNode.xvdomContext) || contextNode;

	    case Object:
	      return rerenderInstance(isOnlyChild, value, oldValue, contextNode);

	    default:
	      return rerenderText(isOnlyChild, value, contextNode);
	  }
	};

	var createArray = function createArray(isOnlyChild, parentNode, value) {
	  var node = document.createDocumentFragment();
	  renderArrayToParent(node, value, value.length);
	  node.xvdomContext = isOnlyChild ? parentNode : node.appendChild(createEmptyTextNode());
	  return node;
	};

	var createDynamic = function createDynamic(isOnlyChild, parentNode, value) {
	  switch (value && value.constructor) {
	    case String:
	    case Number:
	    case 0:
	      return createTextNode(value);

	    case Object:
	      return internalRenderNoRecycle(value);

	    case Array:
	      return createArray(isOnlyChild, parentNode, value);

	    default:
	      return createEmptyTextNode();
	  }
	};

	var componentRerender = function componentRerender(component, api) {
	  var instance = internalRerender(api._instance, component(api));
	  api._instance = instance;
	  instance.$n.xvdom = api._parentInst;
	};

	var componentSend = function componentSend(component, api, actionFn, context) {
	  // TODO: process.ENV === 'development', console.error(`Action not found #{action}`);
	  if (!actionFn) return;

	  var newState = actionFn(api, context);
	  if (newState !== api.state) {
	    api.state = newState;
	    componentRerender(component, api);
	  }
	};

	var createStatefulComponent = function createStatefulComponent(component, props, instance, rerenderFuncProp, componentInstanceProp, actions) {
	  var boundActions = new Hash();

	  var api = {
	    _onProps: actions.onProps,
	    _parentInst: instance,

	    props: props,
	    bindSend: function bindSend(action) {
	      return boundActions[action] || (boundActions[action] = function (context) {
	        componentSend(component, api, actions[action], context);
	      });
	    }
	  };

	  //TODO: process.ENV === 'development', console.error(`Stateful components require atleast an 'onInit' function to provide the initial state (see)`);
	  api.state = actions.onInit(api);

	  instance[rerenderFuncProp] = rerenderStatefulComponent;
	  instance[componentInstanceProp] = api;
	  return internalRenderNoRecycle(api._instance = component(api));
	};

	var createNoStateComponent = exports.createNoStateComponent = function createNoStateComponent(component, props, instance, rerenderFuncProp, componentInstanceProp) {
	  instance[rerenderFuncProp] = rerenderComponent;
	  return internalRenderNoRecycle(instance[componentInstanceProp] = component(props));
	};

	var createComponent = exports.createComponent = function createComponent(component, actions, props, instance, rerenderFuncProp, componentInstanceProp) {
	  var createFn = actions ? createStatefulComponent : createNoStateComponent;
	  return createFn(component, props || EMPTY_PROPS, instance, rerenderFuncProp, componentInstanceProp, actions);
	};

	var internalRenderNoRecycle = function internalRenderNoRecycle(instance) {
	  var node = instance.$s.c(instance);
	  instance.$n = node;
	  node.xvdom = instance;
	  return node;
	};

	var internalRender = function internalRender(instance) {
	  var spec = instance.$s;
	  var recycledInstance = spec.r.pop(instance.key);
	  if (recycledInstance) {
	    spec.u(instance, recycledInstance);
	    return recycledInstance;
	  } else {
	    internalRenderNoRecycle(instance);
	    return instance;
	  }
	};

	var render = exports.render = function render(instance) {
	  return internalRender(instance).$n;
	};

	var internalRerender = function internalRerender(prevInstance, instance) {
	  if (internalRerenderInstance(instance, prevInstance)) return prevInstance;

	  instance = internalRender(instance);
	  replaceNode(prevInstance.$n, instance.$n);
	  recycle(prevInstance);
	  return instance;
	};

	var rerender = exports.rerender = function rerender(node, instance) {
	  return internalRerender(node.xvdom, instance).$n;
	};

	var unmount = exports.unmount = function unmount(node) {
	  unmountInstance(node.xvdom, node.parentNode);
	};

	exports.default = {
	  createComponent: createComponent,
	  createDynamic: createDynamic,
	  el: function el(tag) {
	    return document.createElement(tag);
	  },
	  render: render,
	  rerender: rerender,
	  unmount: unmount,
	  updateDynamic: updateDynamic,
	  Pool: Pool,
	  DEADPOOL: DEADPOOL
	};

	// Internal API

	var _ = exports._ = {
	  rerenderText: rerenderText,
	  rerenderInstance: rerenderInstance,
	  rerenderDynamic: rerenderDynamic,
	  rerenderArray: rerenderArrayMaybe
	};

/***/ }
/******/ ])
});
;