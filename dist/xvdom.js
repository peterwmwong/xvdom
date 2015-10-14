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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _renderJs = __webpack_require__(2);

	var xvdom = _interopRequireWildcard(_renderJs);

	exports['default'] = xvdom;

	window.xvdom = xvdom;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
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
	var EMPTY_STRING = '';
	var EMPTY_OBJECT = {};

	function recycle(stash, node) {
	  if (stash) stash.push(node);
	}

	function removeArrayNodes(list, parentNode) {
	  var item = undefined,
	      node = undefined;
	  while (item = list.pop()) {
	    recycle(item.spec.recycled, node = item._node);
	    parentNode.removeChild(node);
	  }
	}

	function propsNotEqual(a, b) {
	  var keyCount = 0;
	  for (var prop in a) {
	    if (a[prop] !== b[prop]) return true;
	    keyCount++;
	  }

	  return keyCount !== Object.keys(b).length;
	}

	function createStateActions(stateActions) {
	  var result = {};
	  for (var sa in stateActions) {
	    result[sa] = (function (action) {
	      return function wrapAction() {
	        var inst = wrapAction.instance;

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }

	        var newState = action.apply(undefined, [inst.state].concat(args));
	        if (inst.state !== newState) {
	          inst.state = newState;
	          inst._node = rerender(inst._node, inst.component(newState, stateActions));
	        }
	      };
	    })(stateActions[sa]);
	  }
	  return result;
	}

	function renderArray(frag, array) {
	  var length = array.length;
	  var item = undefined;

	  for (var i = 0; i < length; ++i) {
	    item = array[i];
	    frag.appendChild(item._node = renderInstance(item));
	  }
	  return frag.appendChild(document.createTextNode(EMPTY_STRING));
	}

	function rerenderText(value, oldValue, contextNode, instance, rerenderFuncProp, rerenderContextNode) {
	  if (value == null) {
	    contextNode.nodeValue = EMPTY_STRING;
	    return;
	  } else if (value.constructor === String || value.constructor === Number) {
	    contextNode.nodeValue = value;
	    return;
	  }
	  rerenderDynamic(value, oldValue, contextNode, instance, rerenderFuncProp, rerenderContextNode);
	}

	function rerenderDynamic(value, oldValue, contextNode, instance, rerenderFuncProp, rerenderContextNode) {
	  contextNode.parentNode.replaceChild(createDynamic(value, instance, rerenderFuncProp, rerenderContextNode), contextNode);
	}

	function rerenderInstance(value, prevValue, node, instance, rerenderFuncProp, rerenderContextNode) {
	  var prevSpec = prevValue.spec;

	  if (prevSpec === (value && value.spec)) {
	    prevSpec.rerender(value, prevValue);
	    return;
	  }

	  rerenderDynamic(value, prevValue, node, instance, rerenderFuncProp, rerenderContextNode);
	}

	function rerenderStatefulComponent(component, props, prevProps, componentInstance, node, instance, rerenderContextNode, componentInstanceProp) {
	  var onProps = componentInstance.actions.onProps;

	  if (onProps && propsNotEqual(props, prevProps)) {
	    onProps(props);
	  }
	}

	function rerenderComponent(component, props, prevProps, componentInstance, node, instance, rerenderContextNode, componentInstanceProp) {
	  if (propsNotEqual(props, prevProps)) {
	    instance[rerenderContextNode] = rerender(node, instance[componentInstanceProp] = component(props || EMPTY_OBJECT));
	  }
	}

	function renderInstance(instance) {
	  var spec = instance.spec;
	  var node = spec.recycled && spec.recycled.pop();
	  if (node) {
	    spec.rerender(instance, node.xvdom);
	    return node;
	  }

	  instance._node = node = spec.render(instance);
	  node.xvdom = instance;
	  return node;
	}

	function rerenderArray(list, oldList, markerNode, valuesAndContext, rerenderFuncProp, rerenderContextNode) {
	  var parentNode = markerNode.parentNode;

	  if (!list || list.constructor !== Array) {
	    removeArrayNodes(oldList, parentNode);
	    rerenderDynamic(list, oldList, markerNode, valuesAndContext, rerenderFuncProp, rerenderContextNode);
	    return;
	  }

	  var length = list.length;
	  var oldLength = oldList.length;
	  var i = undefined,
	      node = undefined,
	      value = undefined,
	      insertBeforeNode = undefined;

	  if (length === 0) {
	    removeArrayNodes(oldList, parentNode);
	    return;
	  }

	  if (oldLength === 0) {
	    i = 0;
	    while (i < length) {
	      value = list[i++];
	      value._node = node = renderInstance(value);
	      parentNode.insertBefore(node, markerNode);
	    }
	    return;
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
	      node = oldStartItem._node;
	      startItem._node = rerender(node, startItem);

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
	      node = oldEndItem._node;
	      endItem._node = rerender(node, endItem);

	      oldEndIndex--;endIndex--;
	      if (oldStartIndex > oldEndIndex || startIndex > endIndex) {
	        break outer;
	      }
	      oldEndItem = oldList[oldEndIndex];
	      endItem = list[endIndex];
	      successful = true;
	    }

	    while (oldStartItem.key === endItem.key) {
	      nextItem = endIndex + 1 < length ? list[endIndex + 1]._node : markerNode;
	      node = oldStartItem._node;
	      endItem._node = node = rerender(node, endItem);
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
	      node = oldEndItem._node;
	      startItem._node = node = rerender(node, startItem);
	      nextItem = oldStartItem._node;
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
	    insertBeforeNode = endItem ? endItem._node : markerNode;
	    while (startIndex <= endIndex) {
	      startItem = list[startIndex++];
	      startItem._node = node = renderInstance(startItem);
	      parentNode.insertBefore(node, insertBeforeNode);
	    }
	  } else if (startIndex > endIndex) {
	    while (oldStartIndex <= oldEndIndex) {
	      oldStartItem = oldList[oldStartIndex++];
	      recycle(oldStartItem.spec.recycled, node = oldStartItem._node);
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
	        node = rerender(item._node, startItem);
	        item._node = null;
	      } else {
	        node = renderInstance(startItem);
	      }
	      startItem._node = node;
	      parentNode.insertBefore(node, markerNode);
	    }

	    while (saveItem) {
	      node = saveItem._node;
	      if (node) {
	        recycle(saveItem.spec.recycled, node);
	        parentNode.removeChild(node);
	      }
	      saveItem = saveItem.next;
	    }
	  }
	}

	function rerender(node, instance) {
	  var prevInstance = node.xvdom;
	  var spec = instance.spec;
	  if (spec === prevInstance.spec) {
	    spec.rerender(instance, prevInstance);
	    return node;
	  }

	  var newNode = renderInstance(instance);
	  node.parentNode.replaceChild(newNode, node);
	  recycle(prevInstance.spec.recycled, node);
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

	function createStatefulComponent(component, props, instance, rerenderFuncProp, rerenderContextNode, componentInstanceProp) {
	  var state = component.state.onInit(props || EMPTY_OBJECT);
	  var actions = createStateActions(component.state);
	  var inst = component(state, actions);
	  var node = renderInstance(inst);

	  for (var sa in actions) {
	    actions[sa].instance = inst;
	  }

	  inst.component = component;
	  inst.state = state;
	  inst.actions = actions;
	  inst._node = node;

	  instance[rerenderFuncProp] = rerenderStatefulComponent;
	  instance[rerenderContextNode] = node;
	  instance[componentInstanceProp] = inst;
	  return node;
	}

	function createDynamic(value, instance, rerenderFuncProp, rerenderContextNode) {
	  var node = undefined,
	      context = undefined,
	      rerenderFunc = undefined;
	  if (value == null) {
	    instance[rerenderFuncProp] = rerenderText;
	    return instance[rerenderContextNode] = document.createTextNode(EMPTY_STRING);
	  }

	  var valueConstructor = value.constructor;

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
	  if (node.xvdom) recycle(node.xvdom.spec.recycled, node);
	  if (node.parentNode) node.parentNode.removeChild(node);
	}

/***/ }
/******/ ]);