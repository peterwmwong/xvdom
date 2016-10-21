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
	  if (v instanceof Object) return v instanceof Array ? 'array' : 'object';

	  return isDynamicEmpty(v) ? 'empty' : 'text';
	}

	var EMPTY_PROPS = {};
	var DEADPOOL = exports.DEADPOOL = {
	  push: function push() {},
	  pop: function pop() {}
	};

	// Creates an empty object with no built in properties (ie. `constructor`).
	function Hash() {}
	Hash.prototype = Object.create(null);

	// TODO: Benchmark whether this is slower than Function/Prototype
	function Pool() {
	  this.map = new Hash();
	}

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

	function rerenderArrayReconcileWithMinLayout(parentNode, array, oldArray, markerNode) {
	  var i = 0;
	  for (; i < array.length && i < oldArray.length; i++) {
	    array[i] = internalRerender(oldArray[i], array[i]);
	  }

	  if (i < array.length) {
	    renderArrayToParentBefore(parentNode, array, i, markerNode);
	  } else {
	    removeArrayNodes(oldArray, parentNode, i);
	  }
	}

	function rerenderArrayOnlyChild(parentNode, array, oldArray) {
	  if (!array.length) {
	    removeArrayNodesOnlyChild(oldArray, parentNode);
	  } else if (!oldArray.length) {
	    renderArrayToParent(parentNode, array, 0);
	  } else {
	    rerenderArrayReconcileWithMinLayout(parentNode, array, oldArray, null);
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

	  // TODO: What is $r? Is this trying to track the original rendered instnace?
	  value.$r = prevRenderedInstance;
	  return node;
	}

	function rerenderArray(array, contextNode, isOnlyChild, oldArray) {
	  var markerNode = contextNode.xvdomContext;

	  if (array instanceof Array) {
	    if (isOnlyChild) {
	      rerenderArrayOnlyChild(markerNode, array, oldArray);
	    } else {
	      rerenderArrayReconcileWithMinLayout(markerNode.parentNode, array, oldArray, markerNode);
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

	function createArray(value, parentNode, isOnlyChild) {
	  var node = document.createDocumentFragment();
	  renderArrayToParent(node, value, 0);
	  node.xvdomContext = isOnlyChild ? parentNode : node.appendChild(createTextNode(''));
	  return node;
	}

	function StatefulComponent(render, props, instance, actions) {
	  this._boundActions = new Hash();
	  this._parentInst = instance;
	  this.actions = actions;
	  this.props = props;
	  this.render = render;
	  this.bindSend = this.bindSend.bind(this);
	  this.state = actions.onInit(this);
	  this.$n = internalRenderNoRecycle(this._instance = render(this));
	}

	StatefulComponent.prototype.updateProps = function (newProps) {
	  var props = this.props;

	  this.props = newProps;

	  if (this.actions.onProps) this.send('onProps', props);else this.rerender();

	  return this;
	};

	StatefulComponent.prototype.bindSend = function (action) {
	  return this._boundActions[action] || (this._boundActions[action] = this.send.bind(this, action));
	};

	StatefulComponent.prototype.send = function (actionName, context) {
	  var newState = void 0;
	  var actionFn = this.actions[actionName];
	  // TODO: process.ENV === 'development', console.error(`Action not found #{action}`);
	  if (!actionFn || (newState = actionFn(this, context)) == this.state) return;

	  this.state = newState;
	  this.rerender();
	};

	StatefulComponent.prototype.rerender = function () {
	  var instance = internalRerender(this._instance, this.render(this));
	  this._instance = instance;
	  instance.$n.xvdom = this._parentInst;
	};

	function createStatefulComponent(component, props, instance, actions) {
	  return new StatefulComponent(component, props, instance, actions);
	}

	function createStatelessComponent(component, props) {
	  var instance = component(props);
	  internalRenderNoRecycle(instance);
	  return instance;
	}

	function createComponent(component, actions, props, parentInstance) {
	  if (false) performance.mark('createComponent.start(' + component.name + ')');

	  var result = (actions ? createStatefulComponent : createStatelessComponent)(component, props || EMPTY_PROPS, parentInstance, actions);

	  if (false) {
	    performance.mark('createComponent.end(' + component.name + ')');
	    performance.measure('<' + component.name + '/>', 'createComponent.start(' + component.name + ')', 'createComponent.end(' + component.name + ')');
	  }
	  return result;
	};

	function updateComponent(component, actions, props, componentInstance) {
	  if (false) performance.mark('updateComponent.start(' + component.name + ')');

	  var result = actions ? componentInstance.updateProps(props) : internalRerender(componentInstance, component(props));

	  if (false) {
	    performance.mark('updateComponent.end(' + component.name + ')');
	    performance.measure('<' + component.name + '/>', 'updateComponent.start(' + component.name + ')', 'updateComponent.end(' + component.name + ')');
	  }
	  return result;
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
	  array: rerenderArray,
	  empty: rerenderText
	};

	function updateDynamic(isOnlyChild, oldValue, value, contextNode) {
	  return UPDATE_BY_TYPE[dynamicType(oldValue)](value, contextNode, isOnlyChild, oldValue);
	}

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