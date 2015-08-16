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

	var _patchJs = __webpack_require__(2);

	exports.patch = _patchJs.patch;
	exports.unmount = _patchJs.unmount;

	window.xvdom = { patch: _patchJs.patch, unmount: _patchJs.unmount };

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.patch = patch;
	exports.unmount = unmount;
	var rendererFunc = undefined;
	var rendererFirstArg = undefined;

	function rerenderProp(rArg, /* [parentNode, node, prevValue] */value) {
	  rArg[0][rArg[1]] = value;
	}

	function applyProp(node, prop, propValue, values) {
	  if (prop[0] === '$') {
	    var actualProp = prop.slice(1);
	    node[actualProp] = values[propValue];
	    values.push(rerenderProp, [node, actualProp]);
	  } else {
	    node[prop] = propValue;
	  }
	}

	function applyProps(node, props, values) {
	  for (var key in props) {
	    applyProp(node, key, props[key], values);
	  }
	}

	function createAddChildren(parentNode, vchildren, values) {
	  var length = vchildren.length;
	  for (var i = 0; i < length; ++i) {
	    attachNodeFromValueOrReference(vchildren[i], values, parentNode);
	  }
	}

	function createElement(_ref, values) {
	  var el = _ref.el;
	  var props = _ref.props;
	  var children = _ref.children;

	  var node = document.createElement(el);
	  if (props) applyProps(node, props, values);
	  if (children) createAddChildren(node, children, values);
	  return node;
	}

	function rerenderToArray(rArg, /* [parentNode, node, prevValue] */list) {
	  var length = list.length;
	  var keyMap = {};
	  var beforeNode = rArg[1];
	  var parentNode = rArg[0];
	  var item = undefined,
	      i = 0;

	  // parentNode, keyMap, beforeFirstNode, oldList
	  // rArg[0] = parentNode;
	  rArg[1] = keyMap;
	  rArg[2] = beforeNode.previousSibling;
	  rArg[3] = list;

	  while (i < length) {
	    item = list[i++];
	    parentNode.insertBefore(keyMap[item.key] = createNodeFromValue(item), beforeNode);
	  }

	  parentNode.removeChild(beforeNode);
	  rendererFunc = rerenderArrayValue;
	  rendererFirstArg = rArg;
	}

	function rerenderTextNodeValue(rArg, /* [parentNode, node, prevValue] */value) {
	  if (typeof value === 'string') {
	    if (rArg[2] !== value) {
	      rArg[1].nodeValue = value;
	      rArg[2] = value;
	    }
	  } else if (value instanceof Array) {
	    rerenderToArray(rArg, value);
	  } else {
	    rerenderValue(rArg, value);
	  }
	}

	function rerenderValue(rArg, /* [parentNode, node, prevValue] */value) {
	  if (value instanceof Array) return rerenderToArray(rArg, value);
	  var newNode = createNodeFromValue(value);
	  rArg[0].replaceChild(newNode, rArg[1]);
	  rArg[1] = newNode;
	  rArg[2] = value;
	  setRerenderFuncForValue(rArg);
	}

	// TODO(pwong): Provide a way for the user to choose/customize rerendering an Array
	// This function is an example of a fast array rerendering that assumes no additions or removals
	// function rerenderArrayValue(rArg, arrayValue){
	//   const keyMap = rArg[1];
	//   let i = arrayValue.length;
	//   let value, node;
	//
	//   while(i--){
	//     value = arrayValue[i];
	//     node  = keyMap[value.key];
	//     if(node.xvdom__spec) rerender(node, value.values);
	//   }
	//
	//   rArg[3] = arrayValue;
	//   rendererFunc = rerenderArrayValue;
	//   rendererFirstArg = rArg;
	// }

	function rerenderArrayValue(rArg, /*parentNode, keyMap, beforeFirstNode, oldList*/list) {
	  var parentNode = rArg[0];
	  var keyMap = rArg[1];
	  var beforeFirstNode = rArg[2];
	  var oldList = rArg[3];

	  var oldListLength = oldList.length;
	  var listLength = list.length;
	  var i = undefined,
	      node = undefined,
	      value = undefined;
	  var isListNotArray = !(list instanceof Array);

	  if (listLength === 0 || isListNotArray) {
	    for (var key in keyMap) {
	      if (node = keyMap[key]) {
	        parentNode.removeChild(node);
	        keyMap[key] = null;
	      }
	    }

	    if (isListNotArray) {
	      parentNode.insertBefore(rArg[1] = createNodeFromValue(list),
	      //TODO(pwong): Test rerendering IN THE MIDDLE Array, Array -> Text, Array -> Element
	      beforeFirstNode ? beforeFirstNode.nextSibling : null);
	      rArg[2] = list;
	      rArg[3] = null;
	      setRerenderFuncForValue(rArg);
	      return;
	    }
	  } else if (oldListLength === 0) {
	    i = 0;
	    while (i < listLength) {
	      value = list[i++];
	      parentNode.insertBefore(keyMap[value.key] = createNodeFromValue(value), beforeFirstNode ? beforeFirstNode.nextSibling : null);
	    }
	  } else {
	    var afterLastNode = oldListLength ? keyMap[oldList[oldListLength - 1].key].nextSibling : null;
	    var oldEndIndex = oldListLength - 1;
	    var endIndex = listLength - 1;
	    var oldStartIndex = 0;
	    var startIndex = 0;
	    var successful = true;
	    var key = undefined,
	        insertBeforNode = undefined,
	        item = undefined,
	        oldStartItem = undefined,
	        oldEndItem = undefined,
	        startItem = undefined,
	        endItem = undefined;

	    outer: while (successful && oldStartIndex <= oldEndIndex && startIndex <= endIndex) {
	      successful = false;

	      oldStartItem = oldList[oldStartIndex];
	      startItem = list[startIndex];
	      while (oldStartItem.key === startItem.key) {
	        node = keyMap[startItem.key];
	        if (node.xvdom__spec) rerender(node, startItem.values);

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
	        node = keyMap[endItem.key];
	        if (node.xvdom__spec) rerender(node, endItem.values);

	        --oldEndIndex;--endIndex;
	        if (oldStartIndex > oldEndIndex || startIndex > endIndex) {
	          break outer;
	        }
	        oldEndItem = oldList[oldEndIndex];
	        endItem = list[endIndex];
	        successful = true;
	      }

	      while (oldStartItem.key === endItem.key) {
	        node = keyMap[endItem.key];
	        if (node.xvdom__spec) rerender(node, endItem.values);

	        if (oldEndItem.key !== endItem.key) {
	          parentNode.insertBefore(node, keyMap[oldEndItem.key].nextSibling);
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
	        node = keyMap[startItem.key];
	        if (node.xvdom__spec) rerender(node, startItem.values);

	        if (oldStartItem.key !== startItem.key) {
	          parentNode.insertBefore(node, keyMap[oldStartItem.key]);
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
	      insertBeforNode = ++endIndex < listLength ? keyMap[list[endIndex].key] : afterLastNode;
	      while (startIndex < endIndex) {
	        startItem = list[startIndex++];
	        parentNode.insertBefore(keyMap[startItem.key] = createNodeFromValue(startItem), insertBeforNode);
	      }
	    } else if (startIndex > endIndex) {
	      while (oldStartIndex <= oldEndIndex) {
	        key = oldList[oldStartIndex++].key;
	        parentNode.removeChild(keyMap[key]);
	        keyMap[key] = null;
	      }
	    } else {
	      while (startIndex <= endIndex) {
	        item = list[startIndex++];
	        node = keyMap[item.key];
	        if (!node) {
	          node = keyMap[item.key] = createNodeFromValue(item);
	        } else if (node.xvdom__spec) {
	          rerender(node, item.values);
	        }
	        parentNode.insertBefore(node, afterLastNode);
	      }

	      var listKeysMap = {};
	      for (i = 0; i < listLength; ++i) {
	        listKeysMap[list[i].key] = null;
	      }

	      for (i = 0; i < oldListLength; ++i) {
	        key = oldList[i].key;
	        if (!(key in listKeysMap)) {
	          parentNode.removeChild(keyMap[key]);
	          keyMap[key] = null;
	        }
	      }
	    }
	  }

	  rendererFunc = rerenderArrayValue;
	  rArg[3] = list;
	  rendererFirstArg = rArg;
	}

	function setRerenderFuncForValue(rArg /*[parentNode, node, value]*/) {
	  rendererFunc = typeof rArg[2] === 'string' ? rerenderTextNodeValue : rerenderValue;
	  rendererFirstArg = rArg;
	}

	function createNodeFromValue(value) {
	  if (typeof value === 'string') return document.createTextNode(value);

	  var node = createElement(value.template, value.values);
	  if (value.values) node.xvdom__spec = value;
	  return node;
	}

	function createAndRegisterFromArrayValue(parentNode, arrayValue, values) {
	  var length = arrayValue.length;
	  var keyMap = {};
	  var beforeFirstNode = parentNode.lastChild;
	  var node = undefined,
	      value = undefined,
	      i = 0;

	  while (i < length) {
	    value = arrayValue[i++];
	    node = createNodeFromValue(value);
	    parentNode.appendChild(keyMap[value.key] = node);
	  }

	  rendererFunc = rerenderArrayValue;
	  rendererFirstArg = [parentNode, keyMap, beforeFirstNode, arrayValue];
	  values.push(rendererFunc, rendererFirstArg);
	}

	function attachAndRegisterNodeFromValue(value, parentNode, values) {
	  if (value instanceof Array) return createAndRegisterFromArrayValue(parentNode, value, values);

	  var node = createNodeFromValue(value);
	  setRerenderFuncForValue([parentNode, node, value]);
	  values.push(rendererFunc, rendererFirstArg);
	  parentNode.appendChild(node);
	}

	/*
	  vnode     : number valueRef | {el, props, children} vnode
	  values    : Array<any>
	  paretNode : Node
	*/
	function attachNodeFromValueOrReference(vnode, values, parentNode) {
	  switch (typeof vnode) {
	    case 'object':
	      parentNode.appendChild(createElement(vnode, values));
	      break;
	    case 'string':
	      parentNode.appendChild(document.createTextNode(vnode));
	      break;
	    default:
	      attachAndRegisterNodeFromValue(values[vnode], parentNode, values);
	  }
	}

	function initialPatch(node, spec) {
	  attachNodeFromValueOrReference(spec.template, spec.values, node);
	  node.xvdom__spec = spec;
	}

	function rerender(node, values) {
	  var oldValues = node.xvdom__spec.values;
	  var length = oldValues.length / 3;
	  var newValue = undefined;

	  for (var i = 0, j = length; i < length; ++i, ++j) {
	    newValue = values[i];
	    rendererFunc = oldValues[j];
	    rendererFirstArg = oldValues[++j];

	    if (newValue !== oldValues[i]) {
	      rendererFunc(rendererFirstArg, newValue);
	      oldValues[i] = newValue;
	      oldValues[j - 1] = rendererFunc;
	      oldValues[j] = rendererFirstArg;
	    }
	  }
	}

	var recycledSpecs = {};

	function patch(node, spec) {
	  if (node.xvdom__spec) {
	    // Only rerender if there are dynamic values
	    if (spec.values) rerender(node, spec.values);
	    return;
	  }

	  if (spec.recycleKey) {
	    var recycledStack = recycledSpecs[spec.recycleKey];
	    if (recycledStack) {
	      var recycled = recycledStack.pop();
	      if (recycled) {
	        var oldSpec = recycled.spec;
	        var rootNodes = recycled.rootNodes;
	        var _length = rootNodes.length;
	        var i = 0;

	        while (i < _length) {
	          node.appendChild(rootNodes[i++]);
	        }

	        node.xvdom__spec = oldSpec;
	        rerender(node, spec.values);
	        return;
	      }
	    }
	  }

	  initialPatch(node, spec);
	}

	function unmount(node) {
	  var spec = node.xvdom__spec;
	  if (spec && spec.recycleKey) {
	    var rootNodes = [];
	    var curNode = node.firstChild;
	    while (curNode) {
	      node.removeChild(curNode);
	      rootNodes.push(curNode);
	      curNode = curNode.nextSibling;
	    }

	    var recycledStack = recycledSpecs[spec.recycleKey];
	    if (!recycledStack) {
	      recycledStack = recycledSpecs[spec.recycleKey] = [];
	    }
	    recycledStack.push({ spec: spec, rootNodes: rootNodes });
	    node.xvdom__spec = null;
	  } else {
	    node.innerHTML = '';
	  }
	}

/***/ }
/******/ ]);