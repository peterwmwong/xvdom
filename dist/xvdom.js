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
	function applyPropValue(node, prop, value) {
	  node[prop] = value;
	  return applyPropValue.bind(null, node, prop);
	}

	function applyProp(node, prop, propValue, values) {
	  if (prop[0] === '$') {
	    var actualProp = prop.slice(1);
	    applyPropValue(node, actualProp, values[propValue]);
	    values.push(applyPropValue.bind(null, node, actualProp));
	  } else {
	    applyPropValue(node, prop, propValue);
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

	function rerenderTextNodeValue(parentNode, node, prevValue, value) {
	  if (typeof value === 'string') {
	    if (prevValue !== value) node.textContent = value;
	    return rerenderTextNodeValue.bind(null, parentNode, node, value);
	  }
	  return rerenderValue(parentNode, node, prevValue, value);
	}

	function rerenderValue(parentNode, node, prevValue, value) {
	  var newNode = createNodeFromValue(value);
	  parentNode.replaceChild(newNode, node);
	  return getRerenderFuncForValue(value).bind(null, parentNode, newNode, value);
	}

	//TODO(pwong): maybe prevArrayValue could just be previous list of keys

	// O( MAX(prevArrayValue.length, arrayValue.length) + NumOfRemovals )
	function rerenderArrayValue(parentNode, keyMap, beforeFirstNode, prevArrayValue, arrayValue) {
	  var length = arrayValue.length;
	  if (length === 0) return;

	  var newKeyMap = {};
	  var keysToRemove = {};
	  var i = 0,
	      value = undefined,
	      cursorIndex = undefined,
	      cursorValue = undefined,
	      node = undefined,
	      key = undefined;

	  var cursorNode = beforeFirstNode ? beforeFirstNode.nextSibling : parentNode.firstChild;
	  for (i = 0, cursorIndex = 0; i < length && (cursorValue = prevArrayValue[cursorIndex]); ++i) {
	    value = arrayValue[i];
	    key = value.key;
	    node = keyMap[key];

	    debugger; //eslint-disable-line
	    if (node) {
	      // Skip over the previous elements that don't match the current element we're trying to insert.
	      while (cursorValue && cursorValue.key !== key) {
	        keysToRemove[cursorValue.key] = true;
	        cursorValue = prevArrayValue[++cursorIndex];
	      }
	      if (cursorValue && cursorValue.key !== key) {
	        parentNode.insertBefore(node, cursorNode);
	      }
	      ++cursorIndex;
	    } else {
	      node = createNodeFromValue(value);
	      parentNode.insertBefore(node, cursorNode);
	    }

	    newKeyMap[key] = node;
	    cursorNode = node.nextSibling;
	  }

	  // If there are more NEW elements than OLD elements, add the rest of the NEW elements
	  while (i < length) {
	    value = arrayValue[i++];
	    key = value.key;
	    node = keyMap[key] || createNodeFromValue(value);

	    parentNode.insertBefore(node, cursorNode);

	    delete keysToRemove[key];
	    newKeyMap[key] = node;
	    cursorNode = node.nextSibling;
	  }

	  // If there are more OLD elements than NEW elements, remove the rest of the OLD elements
	  while (cursorIndex < prevArrayValue.length) {
	    parentNode.removeChild(keyMap[prevArrayValue[cursorIndex++].key]);
	  }

	  // Remove all elements that were skipped over and never reattached
	  prevArrayValue = Object.keys(keysToRemove); // Reuse prevArrayValue
	  for (key in prevArrayValue) {
	    parentNode.removeChild(keyMap[key]);
	  }

	  return rerenderArrayValue.bind(null, parentNode, newKeyMap, beforeFirstNode, arrayValue);
	}

	function getRerenderFuncForValue(value) {
	  return typeof value === 'string' ? rerenderTextNodeValue : rerenderValue;
	}

	function createNodeFromValue(value) {
	  return typeof value === 'string' ? document.createTextNode(value) : createElement(value.template, value.values);
	}

	function createAndRegisterFromArrayValue(parentNode, arrayValue, values) {
	  var length = arrayValue.length;
	  var frag = document.createDocumentFragment();
	  var keyMap = {};
	  var beforeFirstNode = parentNode.lastChild;
	  var node = undefined,
	      value = undefined;
	  for (var i = 0; i < length; ++i) {
	    value = arrayValue[i];
	    node = createNodeFromValue(value);
	    node.__index = i;
	    keyMap[value.key] = node;
	    frag.appendChild(node);
	  }
	  values.push(rerenderArrayValue.bind(null, parentNode, keyMap, beforeFirstNode, arrayValue));
	  return frag;
	}

	function createAndRegisterNodeFromValue(value, parentNode, values) {
	  if (value instanceof Array) return createAndRegisterFromArrayValue(parentNode, value, values);

	  var node = createNodeFromValue(value);
	  values.push(getRerenderFuncForValue(value).bind(null, parentNode, node, value));
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
	  node.xvdom = { spec: spec };
	}

	function rerender(node, _ref2) {
	  var newValues = _ref2.values;

	  var values = node.xvdom.spec.values;
	  var length = values.length >> 1;
	  var newValue = undefined;

	  for (var i = 0, j = length; i < length; ++i) {
	    newValue = newValues[i];
	    if (values[i] !== newValue) {
	      newValues.push(values[j++](newValue));
	    }
	  }
	  node.xvdom.spec.values = newValues;
	}

	exports['default'] = function (node, spec) {
	  if (node.xvdom) {
	    // Only rerender if there are dynamic values
	    if (spec.values) rerender(node, spec);
	  } else initialPatch(node, spec);
	};

	module.exports = exports['default'];

/***/ }
/******/ ]);