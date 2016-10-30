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
	  if (markerNode === null) renderArrayToParent(parentNode, array, i);else renderArrayToParentBeforeNode(parentNode, array, i, markerNode);
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

	function rerenderDynamic(isOnlyChild, value, contextNode) {
	  var frag = document.createDocumentFragment();
	  var node = createDynamic(isOnlyChild, frag, value);
	  replaceNode(contextNode, frag);
	  return node;
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
	  if (!oldArray.length) {
	    renderArrayToParent(parentNode, array, 0);
	  } else if (!array.length) {
	    removeArrayNodesOnlyChild(oldArray, parentNode);
	  } else {
	    rerenderArrayReconcileWithMinLayout(parentNode, array, oldArray, null);
	  }
	}

	function rerenderArray(array, parentOrMarkerNode, isOnlyChild, oldArray) {
	  if (array instanceof Array) {
	    return isOnlyChild ? rerenderArrayOnlyChild(parentOrMarkerNode, array, oldArray) : rerenderArrayReconcileWithMinLayout(parentOrMarkerNode.parentNode, array, oldArray, parentOrMarkerNode), parentOrMarkerNode;
	  }

	  if (isOnlyChild) {
	    removeArrayNodesOnlyChild(oldArray, parentOrMarkerNode);
	    return createDynamic(true, parentOrMarkerNode, array);
	  }

	  removeArrayNodes(oldArray, parentOrMarkerNode.parentNode, 0);
	}

	function rerenderText(value, contextNode, isOnlyChild) {
	  if (!(value instanceof Object)) {

	    contextNode.nodeValue = isDynamicEmpty(value) ? '' : value;
	    return contextNode;
	  }
	}

	function rerenderInstance(value, node, isOnlyChild, prevValue) {
	  var prevRenderedInstance = void 0;
	  if (value && internalRerenderInstance(prevRenderedInstance = prevValue.$r || prevValue, value)) {
	    // TODO: What is $r? Is this trying to track the original rendered instnace?
	    value.$r = prevRenderedInstance;
	    return node;
	  }
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

	function createDynamic(isOnlyChild, parentNode, value) {
	  return value instanceof Array ? (renderArrayToParent(parentNode, value, 0), isOnlyChild ? parentNode : parentNode.appendChild(createTextNode(''))) : parentNode.appendChild(value instanceof Object ? internalRenderNoRecycle(value) : createTextNode(isDynamicEmpty(value) ? '' : value));
	}

	function updateDynamic(isOnlyChild, oldValue, value, contextNode) {
	  return (oldValue instanceof Object ? oldValue instanceof Array ? rerenderArray(value, contextNode, isOnlyChild, oldValue) : rerenderInstance(value, contextNode, isOnlyChild, oldValue) : rerenderText(value, contextNode, isOnlyChild)) || rerenderDynamic(isOnlyChild, value, contextNode);
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