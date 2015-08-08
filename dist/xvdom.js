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

	function applyPropValue(nodeProp, value) {
	  nodeProp[0][nodeProp[1]] = value;
	  rendererFunc = applyPropValue;
	  rendererFirstArg = nodeProp;
	}

	function applyProp(node, prop, propValue, values) {
	  if (prop[0] === '$') {
	    var actualProp = prop.slice(1);
	    node[actualProp] = values[propValue];
	    values.push(applyPropValue, [node, actualProp]);
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
	      rArg[1].textContent = value;
	      rArg[2] = value;
	    }
	    setRerenderFuncForValue(rArg);
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

	// O( MAX(prevArrayValue.length, arrayValue.length) + NumOfRemovals )
	function rerenderArrayValue(rArg, arrayValue) {
	  var length = arrayValue.length;
	  var newKeyMap = {};
	  var keysToRemove = {};
	  var parentNode = rArg[0];
	  var keyMap = rArg[1];
	  var beforeFirstNode = rArg[2];
	  var prevArrayValue = rArg[3];

	  var value = undefined,
	      cursorValue = undefined,
	      node = undefined,
	      key = undefined;
	  var i = 0,
	      cursorIndex = 0;
	  var cursorNode = beforeFirstNode ? beforeFirstNode.nextSibling : parentNode.firstChild;

	  for (; i < length && (cursorValue = prevArrayValue[cursorIndex]); ++i) {
	    value = arrayValue[i];
	    key = value.key;
	    node = keyMap[key];

	    if (node) {
	      // Skip over the previous elements that don't match the current element we're trying to insert.
	      // TODO(pwong): Check if cursorValue.key is in arrayValue before removing AND advancing
	      //              Usecase: adding one to the beginning, should only be 1 insertBefore
	      while (cursorValue && cursorValue.key !== key) {
	        keysToRemove[cursorValue.key] = true;
	        cursorValue = prevArrayValue[++cursorIndex];
	      }

	      if (cursorValue && cursorValue.key !== key) parentNode.insertBefore(node, cursorNode);
	      if (node.xvdom__spec) rerender(node, value.values);
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
	  for (key in keysToRemove) {
	    parentNode.removeChild(keyMap[key]);
	  }

	  rendererFunc = rerenderArrayValue;
	  rArg[1] = newKeyMap;
	  rArg[3] = arrayValue;
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
	  var newValue = undefined,
	      rerenderer = undefined,
	      rerendererFirstArg = undefined;

	  for (var i = 0, j = length; i < length; ++i, ++j) {
	    newValue = values[i];
	    rerenderer = oldValues[j];
	    rerendererFirstArg = oldValues[++j];

	    if (newValue !== oldValues[i]) {
	      rerenderer(rerendererFirstArg, newValue);
	      values.push(rendererFunc, rendererFirstArg);
	    } else {
	      values.push(rerenderer, rerendererFirstArg);
	    }
	  }
	  node.xvdom__spec.values = values;
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