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
	exports.rerenderProp = rerenderProp;
	exports.setDynamicProp = setDynamicProp;
	exports.renderArray = renderArray;
	exports.rerenderText = rerenderText;
	exports.rerenderDynamic = rerenderDynamic;
	exports.rerenderInstance = rerenderInstance;
	exports.renderInstance = renderInstance;
	exports.rerenderArray = rerenderArray;
	exports.rerender = rerender;
	exports.createDynamic = createDynamic;
	exports.unmount = unmount;
	var RECYCLED = {};

	function recycle(key, node) {
	  var stash = RECYCLED[key];
	  if (stash) stash.push(node);else RECYCLED[key] = [node];
	}

	function getRecycled(key) {
	  var stash = RECYCLED[key];
	  if (stash) return stash.pop();
	}

	function rerenderProp(attr, value, valuesAndContext, valueIndex, rerenderIndex, rerenderContextIndex) {
	  valuesAndContext[valueIndex] = value;
	  valuesAndContext[rerenderContextIndex][attr] = value;
	}

	function setDynamicProp(node, attr, valueContext, valueIndex, rerenderIndex, rerenderContextIndex) {
	  node[attr] = valueContext[valueIndex];
	  valueContext[rerenderIndex] = rerenderProp;
	  valueContext[rerenderContextIndex] = node;
	}

	function renderArray(frag, array) {
	  var length = array.length;
	  var item = undefined;

	  for (var i = 0; i < length; ++i) {
	    item = array[i];
	    frag.appendChild(item._node = renderInstance(item));
	  }
	  return frag.appendChild(document.createTextNode(''));
	}

	function rerenderText(value, valuesAndContext, valueIndex, rerenderIndex, rerenderContextIndex) {
	  if (value == null || value.constructor === String) {
	    valuesAndContext[valueIndex] = value;
	    valuesAndContext[rerenderContextIndex].nodeValue = value || '';
	  } else {
	    rerenderDynamic(value, valuesAndContext, valueIndex, rerenderIndex, rerenderContextIndex);
	  }
	}

	function rerenderDynamic(value, valuesAndContext, valueIndex, rerenderIndex, rerenderContextIndex) {
	  var prevNode = valuesAndContext[rerenderContextIndex];
	  valuesAndContext[valueIndex] = value;
	  prevNode.parentNode.replaceChild(createDynamic(valuesAndContext, valueIndex, rerenderIndex, rerenderContextIndex), prevNode);
	}

	function rerenderInstance(value, valuesAndContext, valueIndex, rerenderIndex, rerenderContextIndex) {
	  var node = valuesAndContext[rerenderContextIndex];
	  var prevSpec = node.xvdom.spec;

	  if (prevSpec === (value && value.spec)) {
	    prevSpec.rerender(value.values, node.xvdom.values);
	    valuesAndContext[valueIndex] = node.xvdom = value;
	  } else {
	    rerenderDynamic(value, valuesAndContext, valueIndex, rerenderIndex, rerenderContextIndex);
	  }
	}

	function renderInstance(instance) {
	  var spec = instance.spec;
	  var values = instance.values;

	  var node = undefined;
	  if (spec.recycleKey && (node = getRecycled(spec.recycleKey))) {
	    spec.rerender(values, node.xvdom.values);
	    return node;
	  }

	  node = spec.render(values);
	  node.xvdom = instance;
	  return node;
	}

	function removeArrayNodes(list, parentNode) {
	  var item = undefined,
	      node = undefined;
	  while (item = list.pop()) {
	    recycle(item.spec.recycleKey, node = item._node);
	    parentNode.removeChild(node);
	  }
	}

	function rerenderArray(list, valuesAndContext, valueIndex, rerenderIndex, rerenderContextIndex) {
	  var markerNode = valuesAndContext[rerenderContextIndex];
	  var parentNode = markerNode.parentNode;

	  if (!list || list.constructor !== Array) {
	    removeArrayNodes(valuesAndContext[valueIndex], parentNode);
	    rerenderDynamic(list, valuesAndContext, valueIndex, rerenderIndex, rerenderContextIndex);
	    return;
	  }

	  var length = list.length;
	  var oldList = valuesAndContext[valueIndex];
	  var oldLength = oldList.length;
	  var i = undefined,
	      node = undefined,
	      value = undefined,
	      insertBeforeNode = undefined;

	  valuesAndContext[valueIndex] = list;
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
	      recycle(oldStartItem.spec.recycleKey, node = oldStartItem._node);
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
	        recycle(saveItem.spec.recycleKey, node);
	        parentNode.removeChild(node);
	      }
	      saveItem = saveItem.next;
	    }
	  }
	}

	function rerender(node, instance) {
	  var prevInstance = node.xvdom;
	  var spec = instance.spec;
	  var values = instance.values;

	  if (spec === prevInstance.spec) {
	    spec.rerender(values, prevInstance.values);
	    return node;
	  }

	  var newNode = renderInstance(instance);
	  node.parentNode.replaceChild(newNode, node);
	  return newNode;
	}

	function createDynamic(valuesAndContext, valueIndex, rerenderIndex, rerenderContextIndex) {
	  var value = valuesAndContext[valueIndex] || '';
	  var valueConstructor = value.constructor;
	  var node = undefined,
	      context = undefined,
	      rerenderFunc = undefined;

	  if (valueConstructor === Object) {
	    rerenderFunc = rerenderInstance;
	    context = node = renderInstance(value);
	  } else if (valueConstructor === String) {
	    rerenderFunc = rerenderText;
	    context = node = document.createTextNode(value);
	  } else if (valueConstructor === Array) {
	    rerenderFunc = rerenderArray;
	    node = document.createDocumentFragment();
	    context = renderArray(node, value);
	  }

	  valuesAndContext[rerenderIndex] = rerenderFunc;
	  valuesAndContext[rerenderContextIndex] = context;
	  return node;
	}

	function unmount(node) {
	  if (node.xvdom) {
	    recycle(node.xvdom.spec.recycleKey, node);
	  }
	  if (node.parentNode) node.parentNode.removeChild(node);
	}

/***/ }
/******/ ]);