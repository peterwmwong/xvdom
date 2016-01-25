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

	"use strict";

	var _xvdomSpec3 = {
	  c: function c(inst) {
	    var _n = document.createElement("table"),
	        _n2;

	    _n.className = "table table-striped latest-data";
	    _n2 = document.createElement("tbody");

	    _n2.appendChild(xvdom.createDynamic(true, _n2, inst.a, inst, "b", "c"));

	    _n.appendChild(_n2);

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    if (inst.a !== pInst.a) {
	      pInst.a = pInst.b(true, inst.a, pInst.a, pInst.c, pInst, "b", "c");
	    }
	  },
	  r: null
	};
	var _xvdomSpec2 = {
	  c: function c(inst) {
	    var _n = document.createElement("tr"),
	        _n2,
	        _n3;

	    _n2 = document.createElement("td");
	    _n2.className = "dbname";

	    _n2.appendChild(xvdom.createDynamic(true, _n2, inst.a, inst, "b", "c"));

	    _n.appendChild(_n2);

	    _n2 = document.createElement("td");
	    _n2.className = "query-count";
	    _n3 = document.createElement("span");
	    inst.e = _n3;
	    _n3.className = inst.d;

	    _n3.appendChild(xvdom.createDynamic(true, _n3, inst.f, inst, "g", "h"));

	    _n2.appendChild(_n3);

	    _n.appendChild(_n2);

	    _n.appendChild(xvdom.createDynamic(false, _n, inst.i, inst, "j", "k"));

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    if (inst.a !== pInst.a) {
	      pInst.a = pInst.b(true, inst.a, pInst.a, pInst.c, pInst, "b", "c");
	    }

	    if (inst.d !== pInst.d) {
	      pInst.e.className = inst.d;
	      pInst.d = inst.d;
	    }

	    if (inst.f !== pInst.f) {
	      pInst.f = pInst.g(true, inst.f, pInst.f, pInst.h, pInst, "g", "h");
	    }

	    if (inst.i !== pInst.i) {
	      pInst.i = pInst.j(false, inst.i, pInst.i, pInst.k, pInst, "j", "k");
	    }
	  },
	  r: null
	};
	var _xvdomSpec = {
	  c: function c(inst) {
	    var _n = document.createElement("td"),
	        _n2,
	        _n3;

	    _n.className = "Query elapsed";

	    _n.appendChild(xvdom.createDynamic(false, _n, inst.a, inst, "b", "c"));

	    _n2 = document.createElement("div");
	    _n2.className = "popover left";
	    _n3 = document.createElement("div");
	    _n3.className = "popover-content";

	    _n3.appendChild(xvdom.createDynamic(true, _n3, inst.d, inst, "e", "f"));

	    _n2.appendChild(_n3);

	    _n3 = document.createElement("div");
	    _n3.className = "arrow";

	    _n2.appendChild(_n3);

	    _n.appendChild(_n2);

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    if (inst.a !== pInst.a) {
	      pInst.a = pInst.b(false, inst.a, pInst.a, pInst.c, pInst, "b", "c");
	    }

	    if (inst.d !== pInst.d) {
	      pInst.d = pInst.e(true, inst.d, pInst.d, pInst.f, pInst, "e", "f");
	    }
	  },
	  r: null
	};
	var renderQuery = function renderQuery(query, j) {
	  return {
	    $s: _xvdomSpec,
	    $n: null,
	    $c: null,
	    $t: null,
	    $a: null,
	    $p: null,
	    a: query.formatElapsed,
	    b: null,
	    c: null,
	    d: query.query,
	    e: null,
	    f: null,
	    key: j
	  };
	};

	var renderQueries = function renderQueries(array) {
	  var length = array.length;
	  var newArray = new Array(length);
	  var i = 0;
	  while (i < length) {
	    newArray[i] = renderQuery(array[i], i);
	    ++i;
	  }
	  return newArray;
	};

	var renderDatabase = function renderDatabase(_ref, i) {
	  var dbname = _ref.dbname;
	  var lastSample = _ref.lastSample;
	  return {
	    $s: _xvdomSpec2,
	    $n: null,
	    $c: null,
	    $t: null,
	    $a: null,
	    $p: null,
	    a: dbname,
	    b: null,
	    c: null,
	    d: lastSample.countClassName,
	    e: null,
	    f: lastSample.nbQueries,
	    g: null,
	    h: null,
	    i: renderQueries(lastSample.topFiveQueries),
	    j: null,
	    k: null,
	    key: i
	  };
	};

	var renderDatabases = function renderDatabases(array) {
	  var length = array.length;
	  var newArray = new Array(length);
	  var i = 0;
	  while (i < length) {
	    newArray[i] = renderDatabase(array[i], i);
	    ++i;
	  }
	  return newArray;
	};

	var dbmonApp = undefined;
	var render = function render() {
	  var instance = {
	    $s: _xvdomSpec3,
	    $n: null,
	    $c: null,
	    $t: null,
	    $a: null,
	    $p: null,
	    a: renderDatabases(ENV.generateData().toArray()),
	    b: null,
	    c: null
	  };

	  Monitoring.renderRate.ping();
	  setTimeout(render, ENV.timeout);

	  if (dbmonApp) xvdom.rerender(dbmonApp, instance);else app.appendChild(dbmonApp = xvdom.render(instance));
	};

	render();

/***/ }
/******/ ]);