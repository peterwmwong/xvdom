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

	$a - actions for stateful components
	$c - component for stateful components
	$n = DOM node
	$p - props for components
	$s - spec (see below)
	$t - state for stateful components
	$x - Pool linked list next pointer

	Spec properties:

	c - create (or render)
	u - update (or update)
	r - keyed map of unmounted instanced that can be recycled

	*/

	var PRE_INSTANCE = { $p: null };
	var EMPTY_PROPS = {};
	var MARKER_NODE = document.createComment('');
	var DEADPOOL = exports.DEADPOOL = {
	  push: function push() {},
	  pop: function pop() {}
	};

	// TODO: Benchmark whether this is slower than Function/Prototype
	var Pool = exports.Pool = function Pool() {
	  var map = new Map();
	  return {
	    push: function push(instance) {
	      var key = instance.key;
	      instance.$x = map.get(key);
	      map.set(key, instance);
	    },
	    pop: function pop(key) {
	      var head = map.get(key);
	      if (head) {
	        map.set(key, head.$x);
	        return head;
	      }
	    }
	  };
	};

	var recycle = function recycle(instance) {
	  instance.$s.r.push(instance);
	};

	var getMarkerNode = function getMarkerNode() {
	  return MARKER_NODE.cloneNode(false);
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

	var internalRerenderStatefulComponent = function internalRerenderStatefulComponent(stateActions, inst, prevInst, parentInst, componentInstanceProp) {
	  if (!internalRerenderInstance(inst, prevInst)) {
	    var newNode = render(inst);
	    var node = parentInst.$n;

	    inst.$c = prevInst.$c;
	    inst.$t = prevInst.$t;
	    inst.$p = prevInst.$p;
	    inst.$a = stateActions;

	    parentInst.$n = newNode;
	    parentInst[componentInstanceProp] = inst;

	    stateActions.$$instance = inst;

	    newNode.xvdom = parentInst;
	    replaceNode(node, newNode);
	    recycle(inst);
	  }
	};

	var callAction = function callAction(stateActions, action, parentInst, componentInstanceProp, args) {
	  var $$instance = stateActions.$$instance;
	  var $$doRerender = stateActions.$$doRerender;
	  var props = $$instance.$p;
	  var state = $$instance.$t;


	  stateActions.$$doRerender = false;
	  var newState = $$instance.$t = action.apply(undefined, [props, state, stateActions].concat(args));
	  stateActions.$$doRerender = $$doRerender;

	  if (state !== newState && $$doRerender) {
	    internalRerenderStatefulComponent(stateActions, $$instance.$c(props, newState, stateActions), $$instance, parentInst, componentInstanceProp);
	  }
	  return newState;
	};

	var createAction = function createAction(stateActions, action, parentInst, componentInstanceProp) {
	  return function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return callAction(stateActions, action, parentInst, componentInstanceProp, args);
	  };
	};

	var createStateActions = function createStateActions(rawActions, parentInst, componentInstanceProp) {
	  var stateActions = { $$doRerender: false, $$instance: PRE_INSTANCE };
	  for (var sa in rawActions) {
	    stateActions[sa] = createAction(stateActions, rawActions[sa], parentInst, componentInstanceProp);
	  }
	  return stateActions;
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

	var rerenderText = function rerenderText(isOnlyChild, value, oldValue, contextNode, instance, rerenderFuncProp, rerenderContextNode) {
	  if (value == null) {
	    contextNode.nodeValue = '';
	  } else if (value.constructor === String || value.constructor === Number) {
	    contextNode.nodeValue = value;
	  } else {
	    rerenderDynamic(isOnlyChild, value, null, contextNode, instance, rerenderFuncProp, rerenderContextNode);
	  }
	  return value;
	};

	var rerenderDynamic = function rerenderDynamic(isOnlyChild, value, oldValue, contextNode, instance, rerenderFuncProp, rerenderContextNode) {
	  replaceNode(contextNode, createDynamic(isOnlyChild, contextNode.parentNode, value, instance, rerenderFuncProp, rerenderContextNode));
	  return value;
	};

	var rerenderInstance = function rerenderInstance(isOnlyChild, value, prevValue, node, instance, rerenderFuncProp, rerenderContextNode) {
	  if (value && internalRerenderInstance(value, prevValue)) return prevValue;

	  return rerenderDynamic(isOnlyChild, value, null, node, instance, rerenderFuncProp, rerenderContextNode);
	};

	var rerenderStatefulComponent = function rerenderStatefulComponent(component, props, prevProps, componentInstance, node, instance, rerenderContextNode, componentInstanceProp) {
	  var stateActions = componentInstance.$a;
	  var onProps = stateActions.onProps;
	  componentInstance.$p = props;

	  if (onProps) onProps();else {
	    internalRerenderStatefulComponent(stateActions, componentInstance.$c(props, componentInstance.$t, stateActions), componentInstance, instance, componentInstanceProp);
	  }
	};

	var rerenderComponent = function rerenderComponent(component, props, prevProps, componentInstance, node, instance, rerenderContextNode, componentInstanceProp) {
	  var newCompInstance = component(props || EMPTY_PROPS);
	  if (!internalRerenderInstance(newCompInstance, componentInstance)) {
	    replaceNode(node, instance[rerenderContextNode] = (instance[componentInstanceProp] = internalRender(newCompInstance)).$n);
	  }
	};

	var rerenderArrayMaybe = function rerenderArrayMaybe(isOnlyChild, array, oldArray, markerNode, valuesAndContext, rerenderFuncProp, rerenderContextNode) {
	  if (array instanceof Array) {
	    if (isOnlyChild) {
	      rerenderArrayOnlyChild(markerNode, array, oldArray);
	    } else {
	      rerenderArray(markerNode, array, oldArray);
	    }
	  } else {
	    if (isOnlyChild) {
	      removeArrayNodesOnlyChild(oldArray, markerNode);
	      markerNode.appendChild(createDynamic(true, markerNode, array, valuesAndContext, rerenderFuncProp, rerenderContextNode));
	    } else {
	      removeArrayNodes(oldArray, markerNode.parentNode);
	      rerenderDynamic(false, array, null, markerNode, valuesAndContext, rerenderFuncProp, rerenderContextNode);
	    }
	  }
	  return array;
	};

	var createStatefulComponent = function createStatefulComponent(component, props, instance, rerenderFuncProp, rerenderContextNode, componentInstanceProp) {
	  PRE_INSTANCE.$p = props;
	  var rawActions = component.state;
	  var actions = createStateActions(rawActions, instance, componentInstanceProp);
	  var state = rawActions.onInit(props, undefined, actions);
	  actions.$$doRerender = true;
	  var inst = component(props, state, actions);
	  var node = render(inst);

	  actions.$$instance = inst;

	  inst.$c = component;
	  inst.$t = state;
	  inst.$a = actions;
	  inst.$p = props;

	  instance[rerenderFuncProp] = rerenderStatefulComponent;
	  instance[componentInstanceProp] = inst;
	  instance[rerenderContextNode] = node;
	  return node;
	};

	var createDynamic = exports.createDynamic = function createDynamic(isOnlyChild, parentNode, value, instance, rerenderFuncProp, rerenderContextNode) {
	  var node = void 0,
	      context = void 0,
	      rerenderFunc = void 0;
	  var valueConstructor = void 0;
	  if (value == null || (valueConstructor = value.constructor) === Boolean) {
	    rerenderFunc = rerenderDynamic;
	    context = node = getMarkerNode();
	  } else if (valueConstructor === Object) {
	    rerenderFunc = rerenderInstance;
	    context = node = render(value);
	  } else if (valueConstructor === String || valueConstructor === Number) {
	    rerenderFunc = rerenderText;
	    context = node = document.createTextNode(value);
	  } else if (valueConstructor === Array) {
	    node = document.createDocumentFragment();
	    renderArrayToParent(node, value, value.length);

	    rerenderFunc = rerenderArrayMaybe;
	    context = isOnlyChild ? parentNode : node.appendChild(getMarkerNode());
	  }

	  instance[rerenderFuncProp] = rerenderFunc;
	  instance[rerenderContextNode] = context;
	  return node;
	};

	var createNoStateComponent = exports.createNoStateComponent = function createNoStateComponent(component, props, instance, rerenderFuncProp, rerenderContextNode, componentInstanceProp) {
	  var inst = component(props);
	  var node = render(inst);

	  instance[rerenderFuncProp] = rerenderComponent;
	  instance[componentInstanceProp] = inst;
	  instance[rerenderContextNode] = node;
	  return node;
	};

	// TODO: Consider JSX transform passes in `component.state` to reduce polymorphic IC
	var createComponent = exports.createComponent = function createComponent(component, props, instance, rerenderFuncProp, rerenderContextNode, componentInstanceProp) {
	  var createFn = component.state ? createStatefulComponent : createNoStateComponent;
	  return createFn(component, props || EMPTY_PROPS, instance, rerenderFuncProp, rerenderContextNode, componentInstanceProp);
	};

	var internalRender = function internalRender(instance) {
	  var spec = instance.$s;
	  var recycledInstance = spec.r.pop(instance.key);
	  if (recycledInstance) {
	    spec.u(instance, recycledInstance);
	    return recycledInstance;
	  } else {
	    (instance.$n = spec.c(instance)).xvdom = instance;
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
	  createDynamic: createDynamic,
	  createComponent: createComponent,
	  render: render,
	  rerender: rerender,
	  unmount: unmount,
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