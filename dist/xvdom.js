var xvdom =
/******/ (function(modules) { // webpackBootstrap
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
	exports.renderArray = renderArray;
	exports.rerenderText = rerenderText;
	exports.rerenderDynamic = rerenderDynamic;
	exports.rerenderInstance = rerenderInstance;
	exports.rerenderStatefulComponent = rerenderStatefulComponent;
	exports.rerenderComponent = rerenderComponent;
	exports.renderInstance = renderInstance;
	exports.rerenderArray = rerenderArray;
	exports.rerender = rerender;
	exports.createComponent = createComponent;
	exports.createStatefulComponent = createStatefulComponent;
	exports.createDynamic = createDynamic;
	exports.unmount = unmount;
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

	var replaceNode = function replaceNode(oldNode, newNode) {
	  var parentNode = oldNode.parentNode;
	  if (parentNode) parentNode.replaceChild(newNode, oldNode);
	};

	var recycle = function recycle(stash, node) {
	  if (stash) stash.push(node);
	};

	var removeArrayNodes = function removeArrayNodes(list, parentNode) {
	  var item = undefined,
	      node = undefined;
	  while (item = list.pop()) {
	    recycle(item.$s.recycled, node = item.$n);
	    parentNode.removeChild(node);
	  }
	};

	var internalRerenderInstance = function internalRerenderInstance(inst, prevInst) {
	  return prevInst.$s === inst.$s && (inst.$s.u(inst, prevInst), true);
	};

	function internalRerenderStatefulComponent(stateActions, inst, prevInst, parentInst, componentInstanceProp) {
	  if (internalRerenderInstance(inst, prevInst)) return;

	  var newNode = renderInstance(inst);
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
	  recycle(inst.$s.recycled, node);
	}

	function callAction(stateActions, action, parentInst, componentInstanceProp, args) {
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
	}

	function createAction(stateActions, action, parentInst, componentInstanceProp) {
	  return function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return callAction(stateActions, action, parentInst, componentInstanceProp, args);
	  };
	}

	function createStateActions(rawActions, parentInst, componentInstanceProp, preInstance) {
	  var stateActions = { $$doRerender: false, $$instance: preInstance };
	  for (var sa in rawActions) {
	    stateActions[sa] = createAction(stateActions, rawActions[sa], parentInst, componentInstanceProp);
	  }
	  return stateActions;
	}

	function renderArray(frag, array) {
	  var length = array.length;
	  var item = undefined;

	  for (var i = 0; i < length; ++i) {
	    item = array[i];
	    frag.appendChild(item.$n = renderInstance(item));
	  }
	  return frag.appendChild(document.createTextNode(EMPTY_STRING));
	}

	function rerenderText(value, oldValue, contextNode, instance, rerenderFuncProp, rerenderContextNode) {
	  if (value == null) {
	    contextNode.nodeValue = EMPTY_STRING;
	  } else if (value.constructor === String || value.constructor === Number) {
	    contextNode.nodeValue = value;
	  } else {
	    rerenderDynamic(value, oldValue, contextNode, instance, rerenderFuncProp, rerenderContextNode);
	  }
	  return value;
	}

	function rerenderDynamic(value, oldValue, contextNode, instance, rerenderFuncProp, rerenderContextNode) {
	  replaceNode(contextNode, createDynamic(value, instance, rerenderFuncProp, rerenderContextNode));
	  return value;
	}

	function rerenderInstance(value, prevValue, node, instance, rerenderFuncProp, rerenderContextNode) {
	  if (value && internalRerenderInstance(value, prevValue)) return prevValue;

	  return rerenderDynamic(value, prevValue, node, instance, rerenderFuncProp, rerenderContextNode);
	}

	function rerenderStatefulComponent(component, props, prevProps, componentInstance, node, instance, rerenderContextNode, componentInstanceProp) {
	  var onProps = componentInstance.$a.onProps;
	  componentInstance.$p = props;

	  if (onProps) onProps();else {
	    internalRerenderStatefulComponent(componentInstance.$a, componentInstance.$c(props, componentInstance, componentInstance.$a), componentInstance, instance, componentInstanceProp);
	  }
	}

	function rerenderComponent(component, props, prevProps, componentInstance, node, instance, rerenderContextNode, componentInstanceProp) {
	  var newCompInstance = component(props || EMPTY_OBJECT);
	  if (internalRerenderInstance(newCompInstance, componentInstance)) return;

	  var newNode = renderInstance(newCompInstance);
	  instance[componentInstanceProp] = newCompInstance;
	  instance[rerenderContextNode] = newNode;
	  newNode.xvdom = instance;
	  replaceNode(node, newNode);
	}

	function renderInstance(instance) {
	  var spec = instance.$s;
	  var node = spec.recycled && spec.recycled.pop();
	  if (node) {
	    spec.u(instance, node.xvdom);
	    instance.$n = node;
	    return node;
	  }

	  instance.$n = node = spec.c(instance);
	  node.xvdom = instance;
	  return node;
	}

	function rerenderArray(list, oldList, markerNode, valuesAndContext, rerenderFuncProp, rerenderContextNode) {
	  var parentNode = markerNode.parentNode;

	  if (!list || list.constructor !== Array) {
	    removeArrayNodes(oldList, parentNode);
	    rerenderDynamic(list, oldList, markerNode, valuesAndContext, rerenderFuncProp, rerenderContextNode);
	    return list;
	  }

	  var length = list.length;
	  var oldLength = oldList.length;
	  var i = undefined,
	      node = undefined,
	      value = undefined,
	      insertBeforeNode = undefined;

	  if (length === 0) {
	    removeArrayNodes(oldList, parentNode);
	    return list;
	  }

	  if (oldLength === 0) {
	    i = 0;
	    while (i < length) {
	      value = list[i++];
	      node = renderInstance(value);
	      parentNode.insertBefore(node, markerNode);
	    }
	    return list;
	  }

	  var oldEndIndex = oldLength - 1;
	  var endIndex = length - 1;
	  var oldStartIndex = 0;
	  var startIndex = 0;
	  var successful = true;
	  var oldStartItem = undefined,
	      oldEndItem = undefined,
	      startItem = undefined,
	      endItem = undefined,
	      nextItem = undefined;

	  outer: while (successful && oldStartIndex <= oldEndIndex && startIndex <= endIndex) {
	    successful = false;

	    oldStartItem = oldList[oldStartIndex];
	    startItem = list[startIndex];
	    while (oldStartItem.key === startItem.key) {
	      node = oldStartItem.$n;
	      startItem.$n = rerender(node, startItem);

	      oldStartIndex++;startIndex++;
	      if (oldStartIndex > oldEndIndex || startIndex > endIndex) {
	        break outer;
	      }
	      oldStartItem = oldList[oldStartIndex];
	      startItem = list[startIndex];
	      successful = true;
	    }

	    oldEndItem = oldList[oldEndIndex];
	    endItem = list[endIndex];
	    while (oldEndItem.key === endItem.key) {
	      node = oldEndItem.$n;
	      endItem.$n = rerender(node, endItem);

	      oldEndIndex--;endIndex--;
	      if (oldStartIndex > oldEndIndex || startIndex > endIndex) {
	        break outer;
	      }
	      oldEndItem = oldList[oldEndIndex];
	      endItem = list[endIndex];
	      successful = true;
	    }

	    while (oldStartItem.key === endItem.key) {
	      nextItem = endIndex + 1 < length ? list[endIndex + 1].$n : markerNode;
	      node = oldStartItem.$n;
	      endItem.$n = node = rerender(node, endItem);
	      if (oldEndItem.key !== endItem.key) {
	        parentNode.insertBefore(node, nextItem);
	      }
	      oldStartIndex++;endIndex--;
	      if (oldStartIndex > oldEndIndex || startIndex > endIndex) {
	        break outer;
	      }
	      oldStartItem = oldList[oldStartIndex];
	      endItem = list[endIndex];
	      successful = true;
	    }

	    while (oldEndItem.key === startItem.key) {
	      node = oldEndItem.$n;
	      startItem.$n = node = rerender(node, startItem);
	      nextItem = oldStartItem.$n;
	      if (oldStartItem.key !== startItem.key) {
	        if (nextItem) {
	          parentNode.insertBefore(node, nextItem);
	        } else {
	          parentNode.appendChild(node);
	        }
	      }
	      oldEndIndex--;startIndex++;
	      if (oldStartIndex > oldEndIndex || startIndex > endIndex) {
	        break outer;
	      }
	      oldEndItem = oldList[oldEndIndex];
	      startItem = list[startIndex];
	      successful = true;
	    }
	  }
	  if (oldStartIndex > oldEndIndex) {
	    insertBeforeNode = endItem ? endItem.$n : markerNode;
	    while (startIndex <= endIndex) {
	      startItem = list[startIndex++];
	      node = renderInstance(startItem);
	      parentNode.insertBefore(node, insertBeforeNode);
	    }
	  } else if (startIndex > endIndex) {
	    while (oldStartIndex <= oldEndIndex) {
	      oldStartItem = oldList[oldStartIndex++];
	      recycle(oldStartItem.$s.recycled, node = oldStartItem.$n);
	      parentNode.removeChild(node);
	    }
	  } else {
	    var oldListNodeKeyMap = {};
	    var saveItem = oldStartItem;
	    var item = undefined,
	        prevItem = undefined;
	    i = oldStartIndex;

	    if (i <= oldEndIndex) {
	      item = oldList[i++];
	      oldListNodeKeyMap[item.key] = prevItem = item;
	    }

	    while (i <= oldEndIndex) {
	      prevItem.next = item = oldList[i++];
	      oldListNodeKeyMap[item.key] = prevItem = item;
	    }

	    while (startIndex <= endIndex) {
	      startItem = list[startIndex++];
	      item = oldListNodeKeyMap[startItem.key];
	      if (item) {
	        node = rerender(item.$n, startItem);
	        item.$n = null;
	      } else {
	        node = renderInstance(startItem);
	      }
	      startItem.$n = node;
	      parentNode.insertBefore(node, oldEndItem.$n);
	    }

	    while (saveItem) {
	      node = saveItem.$n;
	      if (node) {
	        recycle(saveItem.$s.recycled, node);
	        parentNode.removeChild(node);
	      }
	      saveItem = saveItem.next;
	    }
	  }
	  return list;
	}

	function rerender(node, instance) {
	  var prevInstance = node.xvdom;
	  if (internalRerenderInstance(instance, prevInstance)) return node;

	  var newNode = renderInstance(instance);
	  replaceNode(node, newNode);
	  recycle(prevInstance.$s.recycled, node);
	  return newNode;
	}

	function createComponent(component, props, instance, rerenderFuncProp, rerenderContextNode, componentInstanceProp) {
	  if (component.state) return createStatefulComponent(component, props, instance, rerenderFuncProp, rerenderContextNode, componentInstanceProp);

	  var inst = component(props || EMPTY_OBJECT);
	  var node = renderInstance(inst);

	  instance[rerenderFuncProp] = rerenderComponent;
	  instance[componentInstanceProp] = inst;
	  instance[rerenderContextNode] = node;
	  return node;
	}

	var preInstance = { $p: null };

	function createStatefulComponent(component, props, instance, rerenderFuncProp, rerenderContextNode, componentInstanceProp) {
	  preInstance.$p = props;
	  var rawActions = component.state;
	  var actions = createStateActions(rawActions, instance, componentInstanceProp, preInstance);
	  var state = rawActions.onInit(props || EMPTY_OBJECT, undefined, actions);
	  actions.$$doRerender = true;
	  var inst = component(props, state, actions);
	  var node = renderInstance(inst);

	  actions.$$instance = inst;

	  inst.$c = component;
	  inst.$t = state;
	  inst.$a = actions;
	  inst.$p = props;

	  instance[rerenderFuncProp] = rerenderStatefulComponent;
	  instance[componentInstanceProp] = inst;
	  instance[rerenderContextNode] = node;
	  return node;
	}

	function createDynamic(value, instance, rerenderFuncProp, rerenderContextNode) {
	  var node = undefined,
	      context = undefined,
	      rerenderFunc = undefined;
	  var valueConstructor = undefined;
	  if (value == null || (valueConstructor = value.constructor) === Boolean) {
	    instance[rerenderFuncProp] = rerenderDynamic;
	    return instance[rerenderContextNode] = document.createTextNode(EMPTY_STRING);
	  }

	  if (valueConstructor === Object) {
	    rerenderFunc = rerenderInstance;
	    context = node = renderInstance(value);
	  } else if (valueConstructor === String || valueConstructor === Number) {
	    rerenderFunc = rerenderText;
	    context = node = document.createTextNode(value);
	  } else if (valueConstructor === Array) {
	    rerenderFunc = rerenderArray;
	    node = document.createDocumentFragment();
	    context = renderArray(node, value);
	  }

	  instance[rerenderFuncProp] = rerenderFunc;
	  instance[rerenderContextNode] = context;
	  return node;
	}

	function unmount(node) {
	  if (node.xvdom) recycle(node.xvdom.$s.recycled, node);
	  if (node.parentNode) node.parentNode.removeChild(node);
	}

/***/ }
/******/ ]);