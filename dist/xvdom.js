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

	// https://esbench.com/bench/57f1459d330ab09900a1a1dd
	function dynamicType(value) {
	  if (value instanceof Object) {
	    return value instanceof Array ? 'array' : 'object';
	  }

	  return value == null || value === true || value === false ? 'empty' : 'text';
	}

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

	var unmountInstance = function unmountInstance(inst, parentNode) {
	  recycle(inst);
	  parentNode.removeChild(inst.$n);
	};

	var removeArrayNodes = function removeArrayNodes(array, parentNode, i) {
	  while (i < array.length) {
	    unmountInstance(array[i++], parentNode);
	  }
	};

	var removeArrayNodesOnlyChild = function removeArrayNodesOnlyChild(array, parentNode) {
	  var i = 0;

	  while (i < array.length) {
	    recycle(array[i++]);
	  }
	  parentNode.textContent = '';
	};

	var internalRerenderInstance = function internalRerenderInstance(inst, prevInst) {
	  return prevInst.$s === inst.$s && (inst.$s.u(inst, prevInst), true);
	};

	var renderArrayToParentBefore = function renderArrayToParentBefore(parentNode, array, i, markerNode) {
	  if (markerNode == null) renderArrayToParent(parentNode, array, i);else renderArrayToParentBeforeNode(parentNode, array, i, markerNode);
	};

	var renderArrayToParentBeforeNode = function renderArrayToParentBeforeNode(parentNode, array, i, beforeNode) {
	  while (i < array.length) {
	    parentNode.insertBefore((array[i] = internalRender(array[i])).$n, beforeNode);
	    ++i;
	  }
	};

	var renderArrayToParent = function renderArrayToParent(parentNode, array, i) {
	  while (i < array.length) {
	    parentNode.appendChild((array[i] = internalRender(array[i])).$n);
	    ++i;
	  }
	};

	var rerenderArrayReconcileWithMinLayout = function rerenderArrayReconcileWithMinLayout(parentNode, array, length, oldArray, oldLength, markerNode) {
	  var oldStartIndex = 0;
	  var startIndex = 0;

	  do {
	    array[startIndex] = internalRerender(oldArray[oldStartIndex], array[startIndex]);
	    ++startIndex;
	    ++oldStartIndex;
	  } while (oldStartIndex < oldLength && startIndex < length);

	  if (startIndex < length) {
	    renderArrayToParentBefore(parentNode, array, startIndex, markerNode);
	  } else {
	    removeArrayNodes(oldArray, parentNode, oldStartIndex);
	  }
	};

	var rerenderArray = function rerenderArray(markerNode, array, oldArray) {
	  var parentNode = markerNode.parentNode;
	  var length = array.length;
	  var oldLength = oldArray.length;
	  if (!length) {
	    removeArrayNodes(oldArray, parentNode, 0);
	  } else if (!oldLength) {
	    renderArrayToParentBefore(parentNode, array, 0, markerNode);
	  } else {
	    rerenderArrayReconcileWithMinLayout(parentNode, array, length, oldArray, oldLength, markerNode);
	  }
	};

	var rerenderArrayOnlyChild = function rerenderArrayOnlyChild(parentNode, array, oldArray) {
	  var length = array.length;
	  var oldLength = oldArray.length;
	  if (!length) {
	    removeArrayNodesOnlyChild(oldArray, parentNode);
	  } else if (!oldLength) {
	    renderArrayToParent(parentNode, array, 0);
	  } else {
	    rerenderArrayReconcileWithMinLayout(parentNode, array, length, oldArray, oldLength, null);
	  }
	};

	var rerenderText = function rerenderText(value, contextNode, isOnlyChild) {
	  if (value instanceof Object) {
	    return rerenderDynamic(isOnlyChild, value, contextNode);
	  }

	  contextNode.nodeValue = value == null || value === true || value === false ? '' : value;
	  return contextNode;
	};

	var rerenderDynamic = function rerenderDynamic(isOnlyChild, value, contextNode) {
	  var node = createDynamic(isOnlyChild, contextNode.parentNode, value);
	  replaceNode(contextNode, node);
	  return node;
	};

	var rerenderInstance = function rerenderInstance(value, node, isOnlyChild, prevValue) {
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

	var rerenderArrayMaybe = function rerenderArrayMaybe(array, contextNode, isOnlyChild, oldArray) {
	  var markerNode = contextNode.xvdomContext;

	  if (array instanceof Array) {
	    if (isOnlyChild) {
	      rerenderArrayOnlyChild(markerNode, array, oldArray);
	    } else {
	      rerenderArray(markerNode, array, oldArray);
	    }
	    return contextNode;
	  } else {
	    if (isOnlyChild) {
	      removeArrayNodesOnlyChild(oldArray, markerNode);
	      return markerNode.appendChild(createDynamic(true, markerNode, array));
	    } else {
	      removeArrayNodes(oldArray, markerNode.parentNode, 0);
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

	var createArray = function createArray(value, parentNode, isOnlyChild) {
	  var node = document.createDocumentFragment();
	  renderArrayToParent(node, value, 0);
	  node.xvdomContext = isOnlyChild ? parentNode : node.appendChild(createTextNode(''));
	  return node;
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

	var CREATE_BY_TYPE = {
	  text: createTextNode,
	  object: internalRenderNoRecycle,
	  array: createArray,
	  empty: createEmptyTextNode
	};

	function createDynamic(isOnlyChild, parentNode, value) {
	  return CREATE_BY_TYPE[dynamicType(value)](value, parentNode, isOnlyChild);
	}

	var UPDATE_BY_TYPE = {
	  text: rerenderText,
	  object: rerenderInstance,
	  array: rerenderArrayMaybe,
	  empty: rerenderText
	};

	var updateDynamic = function updateDynamic(isOnlyChild, oldValue, value, contextNode) {
	  return UPDATE_BY_TYPE[dynamicType(oldValue)](value, contextNode, isOnlyChild, oldValue);
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