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
	exports.createComponent = createComponent;
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

	var isDynamicEmpty = function isDynamicEmpty(v) {
	  return v == null || v === true || v === false;
	};

	// https://esbench.com/bench/57f1459d330ab09900a1a1dd
	function dynamicType(v) {
	  if (v instanceof Object) {
	    return v instanceof Array ? 'array' : 'object';
	  }

	  return isDynamicEmpty(v) ? 'empty' : 'text';
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

	function unmountInstance(inst, parentNode) {
	  recycle(inst);
	  parentNode.removeChild(inst.$n);
	}

	function removeArrayNodes(array, parentNode, i) {
	  while (i < array.length) {
	    unmountInstance(array[i++], parentNode);
	  }
	}

	function removeArrayNodesOnlyChild(array, parentNode) {
	  var i = 0;

	  while (i < array.length) {
	    recycle(array[i++]);
	  }
	  parentNode.textContent = '';
	}

	function internalRerenderInstance(prevInst, inst) {
	  return prevInst.$s === inst.$s && (inst.$s.u(inst, prevInst), true);
	}

	function renderArrayToParentBefore(parentNode, array, i, markerNode) {
	  if (markerNode == null) renderArrayToParent(parentNode, array, i);else renderArrayToParentBeforeNode(parentNode, array, i, markerNode);
	}

	function renderArrayToParentBeforeNode(parentNode, array, i, beforeNode) {
	  while (i < array.length) {
	    parentNode.insertBefore((array[i] = internalRender(array[i])).$n, beforeNode);
	    ++i;
	  }
	}

	function renderArrayToParent(parentNode, array, i) {
	  while (i < array.length) {
	    parentNode.appendChild((array[i] = internalRender(array[i])).$n);
	    ++i;
	  }
	}

	function rerenderArrayReconcileWithMinLayout(parentNode, array, length, oldArray, oldLength, markerNode) {
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
	}

	function rerenderArray(markerNode, array, oldArray) {
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
	}

	function rerenderArrayOnlyChild(parentNode, array, oldArray) {
	  var length = array.length;
	  var oldLength = oldArray.length;

	  if (!length) {
	    removeArrayNodesOnlyChild(oldArray, parentNode);
	  } else if (!oldLength) {
	    renderArrayToParent(parentNode, array, 0);
	  } else {
	    rerenderArrayReconcileWithMinLayout(parentNode, array, length, oldArray, oldLength, null);
	  }
	}

	function rerenderDynamic(isOnlyChild, value, contextNode) {
	  var node = createDynamic(isOnlyChild, contextNode.parentNode, value);
	  replaceNode(contextNode, node);
	  return node;
	}

	function rerenderText(value, contextNode, isOnlyChild) {
	  if (value instanceof Object) {
	    return rerenderDynamic(isOnlyChild, value, contextNode);
	  }

	  contextNode.nodeValue = isDynamicEmpty(value) ? '' : value;
	  return contextNode;
	}

	function rerenderInstance(value, node, isOnlyChild, prevValue) {
	  var prevRenderedInstance = void 0;
	  if (!value || !internalRerenderInstance(prevRenderedInstance = prevValue.$r || prevValue, value)) {
	    return rerenderDynamic(isOnlyChild, value, node);
	  }

	  value.$r = prevRenderedInstance;
	  return node;
	}

	function rerenderArrayMaybe(array, contextNode, isOnlyChild, oldArray) {
	  var markerNode = contextNode.xvdomContext;

	  if (array instanceof Array) {
	    if (isOnlyChild) {
	      rerenderArrayOnlyChild(markerNode, array, oldArray);
	    } else {
	      rerenderArray(markerNode, array, oldArray);
	    }
	    return contextNode;
	  }

	  if (isOnlyChild) {
	    removeArrayNodesOnlyChild(oldArray, markerNode);
	    return markerNode.appendChild(createDynamic(true, markerNode, array));
	  }

	  removeArrayNodes(oldArray, markerNode.parentNode, 0);
	  return rerenderDynamic(false, array, markerNode);
	}

	function rerenderStatefulComponent(component, actions, newProps, api) {
	  var props = api.props;

	  api.props = newProps;

	  if (actions.onProps) componentSend(component, api, actions.onProps, props);else componentRerender(component, api);
	}

	function createArray(value, parentNode, isOnlyChild) {
	  var node = document.createDocumentFragment();
	  renderArrayToParent(node, value, 0);
	  node.xvdomContext = isOnlyChild ? parentNode : node.appendChild(createTextNode(''));
	  return node;
	}

	function componentRerender(component, api) {
	  var instance = internalRerender(api._instance, component(api));
	  api._instance = instance;
	  instance.$n.xvdom = api._parentInst;
	}

	function componentSend(component, api, actionFn, context) {
	  // TODO: process.ENV === 'development', console.error(`Action not found #{action}`);
	  if (!actionFn) return;

	  var newState = actionFn(api, context);
	  if (newState !== api.state) {
	    api.state = newState;
	    componentRerender(component, api);
	  }
	}

	function createStatefulComponent(component, props, instance, actions) {
	  var boundActions = new Hash();

	  var api = {
	    props: props,
	    bindSend: function bindSend(action) {
	      return boundActions[action] || (boundActions[action] = function (context) {
	        componentSend(component, api, actions[action], context);
	      });
	    },
	    _parentInst: instance
	  };

	  //TODO: process.ENV === 'development', console.error(`Stateful components require atleast an 'onInit' function to provide the initial state (see)`);
	  api.state = actions.onInit(api);
	  api.$n = internalRenderNoRecycle(api._instance = component(api));
	  return api;
	}

	function createNoStateComponent(component, props) {
	  var instance = component(props);
	  internalRenderNoRecycle(instance);
	  return instance;
	}

	function createComponent(component, actions, props, parentInstance) {
	  return (actions ? createStatefulComponent : createNoStateComponent)(component, props || EMPTY_PROPS, parentInstance, actions);
	};

	function updateComponent(component, actions, props, componentInstance) {
	  if (!actions) return internalRerender(componentInstance, component(props));

	  rerenderStatefulComponent(component, actions, props, componentInstance);
	  return componentInstance;
	}

	function internalRenderNoRecycle(instance) {
	  var node = instance.$s.c(instance);
	  instance.$n = node;
	  node.xvdom = instance;
	  return node;
	}

	function internalRender(instance) {
	  var spec = instance.$s;
	  var recycledInstance = spec.r.pop(instance.key);
	  if (recycledInstance) {
	    spec.u(instance, recycledInstance);
	    return recycledInstance;
	  }

	  internalRenderNoRecycle(instance);
	  return instance;
	}

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

	function updateDynamic(isOnlyChild, oldValue, value, contextNode) {
	  return UPDATE_BY_TYPE[dynamicType(oldValue)](value, contextNode, isOnlyChild, oldValue);
	};

	function internalRerender(prevInstance, instance) {
	  if (internalRerenderInstance(prevInstance, instance)) return prevInstance;

	  replaceNode(prevInstance.$n, (instance = internalRender(instance)).$n);
	  recycle(prevInstance);
	  return instance;
	}

	var render = exports.render = function render(instance) {
	  return internalRender(instance).$n;
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
	  updateComponent: updateComponent,
	  updateDynamic: updateDynamic,
	  Pool: Pool,
	  DEADPOOL: DEADPOOL
	};

	// Internal API

	var _ = exports._ = {
	  rerenderText: rerenderText,
	  rerenderDynamic: rerenderDynamic
	};

/***/ }
/******/ ])
});
;