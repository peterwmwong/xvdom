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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/*

	Instance properties:

	$a - actions for stateful components
	$c - component for stateful components
	$p - props for components
	$t - state for stateful components
	$s - spec

	Spec properties:

	c - create (or render)
	u - update (or update)

	*/

	var EMPTY_STRING = '';
	var EMPTY_OBJECT = {};
	var preInstance = { $p: null };
	var MARKER_NODE = document.createComment(EMPTY_STRING);

	var getMarkerNode = function getMarkerNode() {
	  return MARKER_NODE.cloneNode(false);
	};

	var replaceNode = function replaceNode(oldNode, newNode) {
	  var parentNode = oldNode.parentNode;
	  if (parentNode) parentNode.replaceChild(newNode, oldNode);
	};

	var recycle = function recycle(instance) {
	  var pool = instance.$s.recycled;
	  if (pool) pool[instance.key] = instance;
	};

	var insertBefore = function insertBefore(parentNode, node, beforeNode) {
	  return beforeNode ? parentNode.insertBefore(node, beforeNode) : parentNode.appendChild(node);
	};

	var renderArray = function renderArray(array, parentNode) {
	  var length = array.length;
	  var i = 0;
	  var item = undefined;

	  while (i < length) {
	    item = array[i++];
	    recycle(item);
	    parentNode.removeChild(item.$n);
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
	  if (internalRerenderInstance(inst, prevInst)) return;

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
	};

	var callAction = function callAction(stateActions, action, parentInst, componentInstanceProp, args) {
	  var inst = stateActions.$$instance;
	  var props = inst.$p;
	  var state = inst.$t;

	  var shouldRerender = stateActions.$$doRerender;
	  stateActions.$$doRerender = false;
	  var newState = action.apply(undefined, [props, state, stateActions].concat(args));
	  stateActions.$$doRerender = shouldRerender;
	  inst.$t = newState;
	  if (state !== newState && shouldRerender) {
	    internalRerenderStatefulComponent(stateActions, inst.$c(props, newState, stateActions), inst, parentInst, componentInstanceProp);
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

	var createStateActions = function createStateActions(rawActions, parentInst, componentInstanceProp, $$instance) {
	  var stateActions = { $$doRerender: false, $$instance: $$instance };
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
	  var oldListNodeKeyMap = {};
	  var insertBeforeNode = oldEndItem.$n;
	  var item = undefined,
	      key = undefined,
	      node = undefined,
	      startItem = undefined;

	  while (oldStartIndex <= oldEndIndex) {
	    item = oldArray[oldStartIndex++];
	    oldListNodeKeyMap[item.key] = item;
	  }

	  while (startIndex <= endIndex) {
	    startItem = array[startIndex];
	    key = startItem.key;
	    item = oldListNodeKeyMap[key];

	    if (item) {
	      if (item === oldEndItem) insertBeforeNode = insertBeforeNode.nextSibling;
	      oldListNodeKeyMap[key] = null;
	      node = (array[startIndex] = internalRerender(item, startItem)).$n;
	    } else {
	      node = render(startItem);
	    }
	    insertBefore(parentNode, node, insertBeforeNode);
	    ++startIndex;
	  }

	  for (key in oldListNodeKeyMap) {
	    item = oldListNodeKeyMap[key];
	    if (item) {
	      recycle(item);
	      parentNode.removeChild(item.$n);
	    }
	  }
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
	      oldStartItem = oldArray[oldStartIndex++];
	      recycle(oldStartItem);
	      parentNode.removeChild(oldStartItem.$n);
	    }
	  } else {
	    rerenderArray_reconcileWithMap(parentNode, array, oldArray, startIndex, endIndex, oldStartItem, oldStartIndex, oldEndItem, oldEndIndex);
	  }
	};

	var rerenderArray_reconcile = function rerenderArray_reconcile(parentNode, array, length, oldArray, oldLength, markerNode) {
	  var oldStartIndex = 0;
	  var startIndex = 0;
	  var successful = true;
	  var endIndex = length - 1;
	  var oldEndIndex = oldLength - 1;
	  var startItem = 0 !== length && array[0];
	  var oldStartItem = 0 !== oldLength && oldArray[0];
	  var insertBeforeNode = markerNode;
	  var oldEndItem = undefined,
	      endItem = undefined,
	      node = undefined;

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

	var rerenderArray = function rerenderArray(parentNode, array, oldArray, markerNode, valuesAndContext, rerenderFuncProp, rerenderContextNode) {
	  var length = array.length;
	  var oldLength = oldArray.length;
	  if (!length) {
	    renderArray(oldArray, parentNode);
	  } else if (!oldLength) {
	    renderArrayToParentBefore(parentNode, array, length, markerNode);
	  } else {
	    rerenderArray_reconcile(parentNode, array, length, oldArray, oldLength, markerNode);
	  }
	};

	var rerenderArrayOnlyChild = function rerenderArrayOnlyChild(parentNode, array, oldArray, valuesAndContext, rerenderFuncProp, rerenderContextNode) {
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

	var rerenderText = function rerenderText(value, oldValue, contextNode, instance, rerenderFuncProp, rerenderContextNode) {
	  if (value == null) {
	    contextNode.nodeValue = EMPTY_STRING;
	  } else if (value.constructor === String || value.constructor === Number) {
	    contextNode.nodeValue = value;
	  } else {
	    rerenderDynamic(value, null, contextNode, instance, rerenderFuncProp, rerenderContextNode);
	  }
	  return value;
	};

	var rerenderTextOnlyChild = function rerenderTextOnlyChild(value, oldValue, contextNode, instance, rerenderFuncProp, rerenderContextNode) {
	  if (value == null) {
	    contextNode.nodeValue = EMPTY_STRING;
	  } else if (value.constructor === String || value.constructor === Number) {
	    contextNode.nodeValue = value;
	  } else {
	    rerenderDynamicOnlyChild(value, null, contextNode, instance, rerenderFuncProp, rerenderContextNode);
	  }
	  return value;
	};

	var rerenderDynamic = function rerenderDynamic(value, oldValue, contextNode, instance, rerenderFuncProp, rerenderContextNode) {
	  replaceNode(contextNode, createDynamic(value, instance, rerenderFuncProp, rerenderContextNode));
	  return value;
	};

	var rerenderDynamicOnlyChild = function rerenderDynamicOnlyChild(value, oldValue, contextNode, instance, rerenderFuncProp, rerenderContextNode) {
	  replaceNode(contextNode, createDynamicOnlyChild(contextNode.parentNode, value, instance, rerenderFuncProp, rerenderContextNode));
	  return value;
	};

	var rerenderInstance = function rerenderInstance(value, prevValue, node, instance, rerenderFuncProp, rerenderContextNode) {
	  if (value && internalRerenderInstance(value, prevValue)) return prevValue;

	  return rerenderDynamic(value, null, node, instance, rerenderFuncProp, rerenderContextNode);
	};

	var rerenderInstanceOnlyChild = function rerenderInstanceOnlyChild(value, prevValue, node, instance, rerenderFuncProp, rerenderContextNode) {
	  if (value && internalRerenderInstance(value, prevValue)) return prevValue;

	  return rerenderDynamicOnlyChild(value, null, node, instance, rerenderFuncProp, rerenderContextNode);
	};

	var rerenderStatefulComponent = function rerenderStatefulComponent(component, props, prevProps, componentInstance, node, instance, rerenderContextNode, componentInstanceProp) {
	  var onProps = componentInstance.$a.onProps;
	  componentInstance.$p = props;

	  if (onProps) onProps();else {
	    internalRerenderStatefulComponent(componentInstance.$a, componentInstance.$c(props, componentInstance, componentInstance.$a), componentInstance, instance, componentInstanceProp);
	  }
	};

	var rerenderComponent = function rerenderComponent(component, props, prevProps, componentInstance, node, instance, rerenderContextNode, componentInstanceProp) {
	  var newCompInstance = component(props || EMPTY_OBJECT);
	  if (internalRerenderInstance(newCompInstance, componentInstance)) return;

	  var newNode = render(newCompInstance);
	  instance[componentInstanceProp] = newCompInstance;
	  instance[rerenderContextNode] = newNode;
	  newNode.xvdom = instance;
	  replaceNode(node, newNode);
	};

	var rerenderArrayMaybe = function rerenderArrayMaybe(array, oldArray, markerNode, valuesAndContext, rerenderFuncProp, rerenderContextNode) {
	  var parentNode = markerNode.parentNode;
	  if (array instanceof Array) {
	    rerenderArray(parentNode, array, oldArray, markerNode);
	  } else {
	    renderArray(oldArray, parentNode);
	    rerenderDynamic(array, null, markerNode, valuesAndContext, rerenderFuncProp, rerenderContextNode);
	  }
	  return array;
	};

	var rerenderArrayMaybeOnlyChild = function rerenderArrayMaybeOnlyChild(array, oldArray, parentNode, valuesAndContext, rerenderFuncProp, rerenderContextNode) {
	  if (array instanceof Array) {
	    rerenderArrayOnlyChild(parentNode, array, oldArray, parentNode);
	  } else {
	    removeArrayNodesOnlyChild(oldArray, parentNode);
	    parentNode.appendChild(createDynamicOnlyChild(parentNode, array, valuesAndContext, rerenderFuncProp, rerenderContextNode));
	  }
	  return array;
	};

	var createStatefulComponent = function createStatefulComponent(component, props, instance, rerenderFuncProp, rerenderContextNode, componentInstanceProp) {
	  preInstance.$p = props;
	  var rawActions = component.state;
	  var actions = createStateActions(rawActions, instance, componentInstanceProp, preInstance);
	  var state = rawActions.onInit(props || EMPTY_OBJECT, undefined, actions);
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

	var createDynamic = exports.createDynamic = function createDynamic(value, instance, rerenderFuncProp, rerenderContextNode) {
	  var node = undefined,
	      context = undefined,
	      rerenderFunc = undefined;
	  var valueConstructor = undefined;
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
	    context = node.appendChild(getMarkerNode());
	  }

	  instance[rerenderFuncProp] = rerenderFunc;
	  instance[rerenderContextNode] = context;
	  return node;
	};

	var createDynamicOnlyChild = exports.createDynamicOnlyChild = function createDynamicOnlyChild(onlyChildParentNode, value, instance, rerenderFuncProp, rerenderContextNode) {
	  var node = undefined,
	      context = undefined,
	      rerenderFunc = undefined;
	  var valueConstructor = undefined;
	  if (value == null || (valueConstructor = value.constructor) === Boolean) {
	    rerenderFunc = rerenderDynamicOnlyChild;
	    context = node = getMarkerNode();
	  } else if (valueConstructor === Object) {
	    rerenderFunc = rerenderInstanceOnlyChild;
	    context = node = render(value);
	  } else if (valueConstructor === String || valueConstructor === Number) {
	    rerenderFunc = rerenderTextOnlyChild;
	    context = node = document.createTextNode(value);
	  } else if (valueConstructor === Array) {
	    node = document.createDocumentFragment();
	    renderArrayToParent(node, value, value.length);

	    rerenderFunc = rerenderArrayMaybeOnlyChild;
	    context = onlyChildParentNode;
	  }

	  instance[rerenderFuncProp] = rerenderFunc;
	  instance[rerenderContextNode] = context;
	  return node;
	};

	var createComponent = exports.createComponent = function createComponent(component, props, instance, rerenderFuncProp, rerenderContextNode, componentInstanceProp) {
	  if (component.state) return createStatefulComponent(component, props, instance, rerenderFuncProp, rerenderContextNode, componentInstanceProp);

	  var inst = component(props || EMPTY_OBJECT);
	  var node = render(inst);

	  instance[rerenderFuncProp] = rerenderComponent;
	  instance[componentInstanceProp] = inst;
	  instance[rerenderContextNode] = node;
	  return node;
	};

	var internalRender = function internalRender(instance) {
	  var spec = instance.$s;
	  var recycled = spec.recycled;
	  var recycledInstance = recycled && recycled[instance.key];
	  if (recycledInstance) {
	    recycled[instance.key] = null;
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
	  if (node.xvdom) recycle(node.xvdom);
	  if (node.parentNode) node.parentNode.removeChild(node);
	};

	exports.default = {
	  createDynamic: createDynamic,
	  createDynamicOnlyChild: createDynamicOnlyChild,
	  createComponent: createComponent,
	  render: render,
	  rerender: rerender,
	  unmount: unmount
	};

	// Internal API

	var _ = exports._ = {
	  rerenderText: rerenderText,
	  rerenderInstance: rerenderInstance,
	  rerenderDynamic: rerenderDynamic,
	  rerenderArray: rerenderArrayMaybe,
	  rerenderArrayOnlyChild: rerenderArrayMaybeOnlyChild
	};

/***/ }
/******/ ])
});
;