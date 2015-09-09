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

	var _renderInstanceJs = __webpack_require__(2);

	var _rerenderJs = __webpack_require__(3);

	var _createDynamicJs = __webpack_require__(4);

	var _setDynamicPropJs = __webpack_require__(10);

	exports.rerender = _rerenderJs.rerender;
	exports.renderInstance = _renderInstanceJs.renderInstance;
	exports.createDynamic = _createDynamicJs.createDynamic;
	exports.setDynamicProp = _setDynamicPropJs.setDynamicProp;
	exports.rerenderProp = _setDynamicPropJs.rerenderProp;

	window.xvdom = { rerender: _rerenderJs.rerender, createDynamic: _createDynamicJs.createDynamic, renderInstance: _renderInstanceJs.renderInstance, setDynamicProp: _setDynamicPropJs.setDynamicProp, rerenderProp: _setDynamicPropJs.rerenderProp };

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports.renderInstance = renderInstance;

	function renderInstance(value) {
	  var node = value.spec.render(value.values);
	  node.xvdom = value;
	  return node;
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports["default"] = rerender;

	function rerender(node, instance) {
	  var prevInstance = node.xvdom;
	  instance.spec.rerender(instance.values, prevInstance.values);
	}

	module.exports = exports["default"];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.createDynamic = createDynamic;

	var _renderInstanceJs = __webpack_require__(2);

	var _renderArrayJs = __webpack_require__(5);

	var _rerenderTextJs = __webpack_require__(6);

	var _rerenderInstanceJs = __webpack_require__(8);

	var _rerenderArrayJs = __webpack_require__(9);

	function createDynamic(valuesAndContext, valueIndex, contextIndex) {
	  var value = valuesAndContext[valueIndex] || '';
	  var valueConstructor = value.constructor;
	  var node = undefined,
	      context = undefined,
	      rerenderFunc = undefined;

	  if (valueConstructor === Object) {
	    rerenderFunc = _rerenderInstanceJs.rerenderInstance;
	    context = node = _renderInstanceJs.renderInstance(value);
	  } else if (valueConstructor === String) {
	    rerenderFunc = _rerenderTextJs.rerenderText;
	    context = node = document.createTextNode(value);
	  } else if (valueConstructor === Array) {
	    rerenderFunc = _rerenderArrayJs.rerenderArray;
	    node = document.createDocumentFragment();
	    context = _renderArrayJs.renderArray(node, value);
	  }

	  valuesAndContext[contextIndex] = rerenderFunc;
	  valuesAndContext[contextIndex + 1] = context;
	  return node;
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.renderArray = renderArray;

	var _renderInstanceJs = __webpack_require__(2);

	function renderArray(frag, array) {
	  var length = array.length;
	  var markerNode = document.createTextNode('');
	  var keyMap = markerNode.xvdomKeymap = {};
	  var item = undefined;
	  frag.appendChild(markerNode);

	  for (var i = 0; i < length; ++i) {
	    item = array[i];
	    frag.appendChild(keyMap[item.key] = _renderInstanceJs.renderInstance(item));
	  }
	  return markerNode;
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.rerenderText = rerenderText;

	var _rerenderDynamicJs = __webpack_require__(7);

	function rerenderText(value, valuesAndContext, valueIndex, contextIndex) {
	  if (value == null || value.constructor === String) {
	    valuesAndContext[valueIndex] = value;
	    valuesAndContext[contextIndex + 1].nodeValue = value || '';
	  } else {
	    _rerenderDynamicJs.rerenderDynamic(value, valuesAndContext, valueIndex, contextIndex);
	  }
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.rerenderDynamic = rerenderDynamic;

	var _createDynamicJs = __webpack_require__(4);

	function removeArrayNodes(keyMap, parentNode) {
	  for (var key in keyMap) {
	    parentNode.removeChild(keyMap[key]);
	  }
	}

	function replacePrevNode(prevNode, newNode) {
	  var parentNode = prevNode.parentNode;
	  if (prevNode.xvdomKeymap) {
	    removeArrayNodes(prevNode.xvdomKeymap, parentNode);
	  }

	  parentNode.replaceChild(newNode, prevNode);
	}

	function rerenderDynamic(value, valuesAndContext, valueIndex, contextIndex) {
	  var prevNode = valuesAndContext[contextIndex + 1];
	  valuesAndContext[valueIndex] = value;
	  replacePrevNode(prevNode, _createDynamicJs.createDynamic(valuesAndContext, valueIndex, contextIndex));
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.rerenderInstance = rerenderInstance;

	var _rerenderDynamicJs = __webpack_require__(7);

	function rerenderInstance(value, valuesAndContext, valueIndex, contextIndex) {
	  var node = valuesAndContext[contextIndex + 1];
	  var prevSpec = node.xvdom.spec;

	  if (prevSpec === (value && value.spec)) {
	    prevSpec.rerender(value.values, node.xvdom.values);
	    valuesAndContext[valueIndex] = node.xvdom = value;
	  } else {
	    _rerenderDynamicJs.rerenderDynamic(value, valuesAndContext, valueIndex, contextIndex);
	  }
	}

/***/ },
/* 9 */
/***/ function(module, exports) {

	// import {rerenderDynamic} from './rerenderDynamic.js';

	'use strict';

	exports.__esModule = true;
	exports.rerenderArray = rerenderArray;

	function rerenderArray(value, valuesAndContext, valueIndex, contextIndex) {
	  throw 'rerenderArray: Not implemented yet';
	}

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports.rerenderProp = rerenderProp;
	exports.setDynamicProp = setDynamicProp;

	function rerenderProp(attr, value, valuesAndContext, valueIndex, contextIndex) {
	  valuesAndContext[valueIndex] = value;
	  valuesAndContext[contextIndex + 1][attr] = value;
	}

	function setDynamicProp(node, attr, valueContext, valueIndex, contextIndex) {
	  node[attr] = valueContext[valueIndex];
	  valueContext[contextIndex] = rerenderProp;
	  valueContext[contextIndex + 1] = node;
	}

/***/ }
/******/ ]);