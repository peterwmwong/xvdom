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

	function rerenderProp(attr, value, valuesAndContext, valueIndex, contextIndex) {
	  valuesAndContext[valueIndex] = value;
	  valuesAndContext[contextIndex + 1][attr] = value;
	}

	function setDynamicProp(node, attr, valueContext, valueIndex, contextIndex) {
	  node[attr] = valueContext[valueIndex];
	  valueContext[contextIndex] = rerenderProp;
	  valueContext[contextIndex + 1] = node;
	}

	function renderArray(frag, array) {
	  var length = array.length;
	  var markerNode = document.createTextNode('');
	  var item = undefined;
	  frag.appendChild(markerNode);

	  for (var i = 0; i < length; ++i) {
	    item = array[i];
	    frag.appendChild(item._node = renderInstance(item));
	  }
	  return markerNode;
	}

	function rerenderText(value, valuesAndContext, valueIndex, contextIndex) {
	  if (value == null || value.constructor === String) {
	    valuesAndContext[valueIndex] = value;
	    valuesAndContext[contextIndex + 1].nodeValue = value || '';
	  } else {
	    rerenderDynamic(value, valuesAndContext, valueIndex, contextIndex);
	  }
	}

	function rerenderDynamic(value, valuesAndContext, valueIndex, contextIndex) {
	  var prevNode = valuesAndContext[contextIndex + 1];
	  valuesAndContext[valueIndex] = value;
	  prevNode.parentNode.replaceChild(createDynamic(valuesAndContext, valueIndex, contextIndex), prevNode);
	}

	function rerenderInstance(value, valuesAndContext, valueIndex, contextIndex) {
	  var node = valuesAndContext[contextIndex + 1];
	  var prevSpec = node.xvdom.spec;

	  if (prevSpec === (value && value.spec)) {
	    prevSpec.rerender(value.values, node.xvdom.values);
	    valuesAndContext[valueIndex] = node.xvdom = value;
	  } else {
	    rerenderDynamic(value, valuesAndContext, valueIndex, contextIndex);
	  }
	}

	function renderInstance(value) {
	  var node = value.spec.render(value.values);
	  node.xvdom = value;
	  return node;
	}

	// export function rerenderArray(value, valuesAndContext, valueIndex, contextIndex){
	//   const keyMap = valuesAndContext[contextIndex + 1].xvdomKeymap;
	//   const length = value.length;
	//   let i = 0;
	//   let item, node, itemInstance;
	//
	//   while(i < length){
	//     item         = value[i++];
	//     node         = keyMap[item.key];
	//     itemInstance = node.xvdom;
	//
	//     itemInstance.spec.rerender(item.values, itemInstance.values);
	//   }
	//
	//   valuesAndContext[valueIndex] = value;
	// }

	function removeArrayNodes(list, parentNode) {
	  var length = list.length;
	  for (var i = 0; i < length; ++i) {
	    parentNode.removeChild(list[i]._node);
	  }
	}

	function rerenderArray(list, valuesAndContext, valueIndex, contextIndex) {
	  var markerNode = valuesAndContext[contextIndex + 1];
	  var parentNode = markerNode.parentNode;

	  if (!list || list.constructor !== Array) {
	    removeArrayNodes(valuesAndContext[valueIndex], parentNode);
	    rerenderDynamic(list, valuesAndContext, valueIndex, contextIndex);
	    return;
	  }

	  var length = list.length;
	  var oldList = valuesAndContext[valueIndex];
	  var oldLength = oldList.length;
	  var i = undefined,
	      key = undefined,
	      node = undefined,
	      value = undefined,
	      insertBeforeNode = undefined;

	  valuesAndContext[valueIndex] = list;

	  if (length === 0) {
	    removeArrayNodes(oldList, parentNode);
	    return;
	  }

	  if (oldLength === 0) {
	    insertBeforeNode = markerNode.nextSibling;
	    i = 0;
	    while (i < length) {
	      value = list[i++];
	      parentNode.insertBefore(value._node = renderInstance(value), insertBeforeNode);
	    }
	    return;
	  }

	  var afterLastNode = oldLength ? oldList[oldLength - 1]._node.nextSibling : null;
	  var oldEndIndex = oldLength - 1;
	  var endIndex = length - 1;
	  var oldStartIndex = 0;
	  var startIndex = 0;
	  var successful = true;
	  var oldStartItem = undefined,
	      oldEndItem = undefined,
	      startItem = undefined,
	      endItem = undefined;

	  outer: while (successful && oldStartIndex <= oldEndIndex && startIndex <= endIndex) {
	    successful = false;

	    oldStartItem = oldList[oldStartIndex];
	    startItem = list[startIndex];
	    while (oldStartItem.key === startItem.key) {
	      node = oldStartItem._node;
	      startItem._node = node.xvdom ? rerender(node, startItem) : node;

	      ++oldStartIndex;++startIndex;
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
	      endItem._node = node.xvdom ? rerender(node, endItem) : node;

	      --oldEndIndex;--endIndex;
	      if (oldStartIndex > oldEndIndex || startIndex > endIndex) {
	        break outer;
	      }
	      oldEndItem = oldList[oldEndIndex];
	      endItem = list[endIndex];
	      successful = true;
	    }

	    while (oldStartItem.key === endItem.key) {
	      node = oldStartItem._node;
	      endItem._node = node.xvdom ? rerender(node, endItem) : node;

	      if (oldEndItem.key !== endItem.key) {
	        parentNode.insertBefore(node, oldEndItem._node.nextSibling);
	      }
	      ++oldStartIndex;--endIndex;
	      if (oldStartIndex > oldEndIndex || startIndex > endIndex) {
	        break outer;
	      }
	      oldStartItem = oldList[oldStartIndex];
	      endItem = list[endIndex];
	      successful = true;
	    }

	    while (oldEndItem.key === startItem.key) {
	      node = oldEndItem._node;
	      startItem._node = node.xvdom ? rerender(node, startItem) : node;

	      if (oldStartItem.key !== startItem.key) {
	        parentNode.insertBefore(node, oldStartItem._node);
	      }
	      --oldEndIndex;++startIndex;
	      if (oldStartIndex > oldEndIndex || startIndex > endIndex) {
	        break outer;
	      }
	      oldEndItem = oldList[oldEndIndex];
	      startItem = list[startIndex];
	      successful = true;
	    }
	  }
	  if (oldStartIndex > oldEndIndex) {
	    insertBeforeNode = endItem ? endItem._node : afterLastNode;
	    while (startIndex <= endIndex) {
	      startItem = list[startIndex++];
	      parentNode.insertBefore(startItem._node = renderInstance(startItem), insertBeforeNode);
	    }
	  } else if (startIndex > endIndex) {
	    while (oldStartIndex <= oldEndIndex) {
	      oldStartItem = oldList[oldStartIndex++];
	      parentNode.removeChild(oldStartItem._node);
	    }
	  } else {
	    var oldListNodeKeyMap = {};
	    while (oldStartItem) {
	      oldListNodeKeyMap[oldStartItem.key] = oldStartItem._node;
	      oldStartItem = oldList[++oldStartIndex];
	    }

	    while (startIndex <= endIndex) {
	      startItem = list[startIndex++];
	      node = oldListNodeKeyMap[startItem.key];
	      if (!node) {
	        node = renderInstance(startItem);
	      } else if (node.xvdom) {
	        node = rerender(node, startItem);
	      }

	      delete oldListNodeKeyMap[startItem.key];
	      parentNode.insertBefore(startItem._node = node, afterLastNode);
	    }

	    for (key in oldListNodeKeyMap) {
	      parentNode.removeChild(oldListNodeKeyMap[key]);
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

	function createDynamic(valuesAndContext, valueIndex, contextIndex) {
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

	  valuesAndContext[contextIndex] = rerenderFunc;
	  valuesAndContext[contextIndex + 1] = context;
	  return node;
	}

/***/ }
/******/ ]);