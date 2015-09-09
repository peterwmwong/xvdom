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
	exports.rerenderArray = rerenderArray;
	exports.rerenderDynamic = rerenderDynamic;
	exports.rerenderInstance = rerenderInstance;
	exports.renderInstance = renderInstance;
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
	  var keyMap = markerNode.xvdomKeymap = {};
	  var item = undefined;
	  frag.appendChild(markerNode);

	  for (var i = 0; i < length; ++i) {
	    item = array[i];
	    frag.appendChild(keyMap[item.key] = renderInstance(item));
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

	function rerenderArray(value, valuesAndContext, valueIndex, contextIndex) {
	  throw 'rerenderArray: Not implemented yet';
	}

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
	  replacePrevNode(prevNode, createDynamic(valuesAndContext, valueIndex, contextIndex));
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

	function rerender(node, instance) {
	  var prevInstance = node.xvdom;
	  instance.spec.rerender(instance.values, prevInstance.values);
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