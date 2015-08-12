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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _patchJs = __webpack_require__(2);

	var _patchJs2 = _interopRequireDefault(_patchJs);

	exports.patch = _patchJs2['default'];

	window.xvdom = { patch: _patchJs2['default'] };

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
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
	    parentNode.appendChild(createNodeFromValueOrReference(vchildren[i], values, parentNode));
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

	function rerenderTextNodeValue(rArg, /* [parentNode, node, prevValue] */value) {
	  if (typeof value === 'string') {
	    if (rArg[2] !== value) {
	      rArg[1].nodeValue = value;
	      rArg[2] = value;
	    }
	  } else {
	    rerenderValue(rArg, value);
	  }
	}

	function rerenderValue(rArg, /* [parentNode, node, prevValue] */value) {
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

	function removeArrayElements(parentNode, keyMap) {
	  for (var key in keyMap) {
	    parentNode.removeChild(keyMap[key]);
	  }
	}

	// O( MAX(prevArrayValue.length, arrayValue.length) + NumOfRemovals )
	function rerenderArrayValue(rArg, list) {
	  var parentDom = rArg[0];
	  var keyMap = rArg[1];
	  var /*beforeFirstNode*/oldList = rArg[3];

	  var oldListLength = oldList.length;
	  var listLength = list.length;

	  if (listLength === 0) {
	    removeArrayElements(parentDom, keyMap);
	    return;
	  } else if (oldListLength === 0) {
	    createAndRegisterFromArrayValue(parentDom, list, []);
	    return;
	  }

	  var newKeyMap = {};
	  var afterLastNode = oldListLength ? keyMap[oldList[oldListLength - 1].key].nextSibling : null;
	  var oldEndIndex = oldListLength - 1;
	  var endIndex = listLength - 1;
	  var oldStartIndex = 0;
	  var startIndex = 0;
	  var successful = true;
	  var node = undefined,
	      nextItem = undefined,
	      oldItem = undefined,
	      item = undefined;

	  outer: while (successful && oldStartIndex <= oldEndIndex && startIndex <= endIndex) {
	    successful = false;
	    var oldStartItem = undefined,
	        oldEndItem = undefined,
	        startItem = undefined,
	        endItem = undefined;

	    oldStartItem = oldList[oldStartIndex];
	    startItem = list[startIndex];
	    while (oldStartItem.key === startItem.key) {
	      node = keyMap[startItem.key];
	      if (node.xvdom__spec) rerender(node, startItem.values);

	      newKeyMap[startItem.key] = node;
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
	      node = keyMap[endItem.key];
	      if (node.xvdom__spec) rerender(node, endItem.values);

	      newKeyMap[endItem.key] = node;
	      oldEndIndex--;endIndex--;
	      if (oldStartIndex > oldEndIndex || startIndex > endIndex) {
	        break outer;
	      }
	      oldEndItem = oldList[oldEndIndex];
	      endItem = list[endIndex];
	      successful = true;
	    }

	    while (oldStartItem.key === endItem.key) {
	      nextItem = endIndex + 1 < listLength ? list[endIndex + 1] : afterLastNode;
	      node = keyMap[endItem.key];
	      if (node.xvdom__spec) rerender(node, endItem.values);
	      if (oldEndItem.key !== endItem.key) {
	        parentDom.insertBefore(node, keyMap[oldEndItem.key].nextSibling);
	      }
	      newKeyMap[endItem.key] = node;
	      oldStartIndex++;endIndex--;
	      if (oldStartIndex > oldEndIndex || startIndex > endIndex) {
	        break outer;
	      }
	      oldStartItem = oldList[oldStartIndex];
	      endItem = list[endIndex];
	      successful = true;
	    }

	    while (oldEndItem.key === startItem.key) {
	      nextItem = oldStartIndex < oldListLength ? oldList[oldStartIndex] : afterLastNode;
	      node = keyMap[startItem.key];
	      if (node.xvdom__spec) rerender(node, startItem.values);
	      if (oldStartItem.key !== startItem.key) {
	        parentDom.insertBefore(node, keyMap[oldStartItem.key]);
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
	    while (startIndex <= endIndex) {
	      node = createNodeFromValue(list[startIndex]);
	      newKeyMap[list[startIndex].key] = node;
	      parentDom.insertBefore(node, newKeyMap[list[endIndex + 1].key]);
	      startIndex++;
	    }
	    // nextItem = (endIndex + 1 < listLength) ? list[endIndex + 1] : afterLastNode;
	    // for (i = startIndex; i <= endIndex; i++){
	    //   item = list[i];
	    //   attachFragment(context, item, parentDom, component, nextItem);
	    // }
	  } else if (startIndex > endIndex) {
	      // removeFragments(context, parentDom, oldList, oldStartIndex, oldEndIndex + 1);
	    } else {
	        var i = undefined,
	            oldNextItem = oldEndIndex + 1 >= oldListLength ? null : oldList[oldEndIndex + 1];
	        var oldListMap = {};
	        for (i = oldEndIndex; i >= oldStartIndex; i--) {
	          oldItem = oldList[i];
	          oldItem.next = oldNextItem;
	          oldListMap[oldItem.key] = oldItem;
	          oldNextItem = oldItem;
	        }
	        nextItem = endIndex + 1 < listLength ? list[endIndex + 1] : afterLastNode;
	        for (i = endIndex; i >= startIndex; i--) {
	          item = list[i];
	          var key = item.key;
	          oldItem = oldListMap[key];
	          if (oldItem) {
	            oldListMap[key] = null;
	            oldNextItem = oldItem.next;
	            updateFragment(context, oldItem, item, parentDom, component);
	            if (parentDom.nextSibling != (nextItem && nextItem.dom)) {
	              moveFragment(parentDom, item, nextItem);
	            }
	          } else {
	            attachFragment(context, item, parentDom, component, nextItem);
	          }
	          nextItem = item;
	        }
	        for (i = oldStartIndex; i <= oldEndIndex; i++) {
	          oldItem = oldList[i];
	          if (oldListMap[oldItem.key] !== null) {
	            removeFragment(context, parentDom, oldItem);
	          }
	        }
	      }

	  rendererFunc = rerenderArrayValue;
	  rArg[1] = newKeyMap;
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
	  var frag = document.createDocumentFragment();
	  var keyMap = {};
	  var beforeFirstNode = parentNode.lastChild;
	  var node = undefined,
	      value = undefined,
	      i = 0;

	  while (i < length) {
	    value = arrayValue[i++];
	    node = createNodeFromValue(value);
	    frag.appendChild(keyMap[value.key] = node);
	  }

	  rendererFunc = rerenderArrayValue;
	  rendererFirstArg = [parentNode, keyMap, beforeFirstNode, arrayValue];
	  values.push(rendererFunc, rendererFirstArg);
	  return frag;
	}

	function createAndRegisterNodeFromValue(value, parentNode, values) {
	  if (value instanceof Array) return createAndRegisterFromArrayValue(parentNode, value, values);

	  var node = createNodeFromValue(value);
	  setRerenderFuncForValue([parentNode, node, value]);
	  values.push(rendererFunc, rendererFirstArg);
	  return node;
	}

	/*
	  vnode     : number valueRef | {el, props, children} vnode
	  values    : Array<any>
	  paretNode : Node
	*/
	function createNodeFromValueOrReference(vnode, values, parentNode) {
	  switch (typeof vnode) {
	    case 'object':
	      return createElement(vnode, values);
	    case 'string':
	      return document.createTextNode(vnode);
	    default:
	      return createAndRegisterNodeFromValue(values[vnode], parentNode, values);
	  }
	}

	function initialPatch(node, spec) {
	  node.appendChild(createNodeFromValueOrReference(spec.template, spec.values));
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

	exports['default'] = function (node, spec) {
	  if (node.xvdom__spec) {
	    // Only rerender if there are dynamic values
	    if (spec.values) rerender(node, spec.values);
	  } else initialPatch(node, spec);
	};

	module.exports = exports['default'];

/***/ }
/******/ ]);