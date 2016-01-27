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

	var _xvdomSpec5 = {
	  c: function c(inst) {
	    var _n = xvdom.createComponent(App, null, inst, 'b', 'c', 'd');

	    return _n;
	  },
	  u: function u() {},
	  r: null
	};
	var _xvdomSpec4 = {
	  c: function c(inst) {
	    var _n = document.createElement('table');

	    _n.appendChild(xvdom.createDynamic(true, _n, inst.a, inst, 'b', 'c'));

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    if (inst.a !== pInst.a) {
	      pInst.a = pInst.b(true, inst.a, pInst.a, pInst.c, pInst, 'b', 'c');
	    }
	  },
	  r: null
	};
	var _xvdomSpec3 = {
	  c: function c(inst) {
	    var _n = document.createElement('tr');

	    _n.appendChild(xvdom.createDynamic(true, _n, inst.a, inst, 'b', 'c'));

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    if (inst.a !== pInst.a) {
	      pInst.a = pInst.b(true, inst.a, pInst.a, pInst.c, pInst, 'b', 'c');
	    }
	  },
	  r: null
	};
	var _xvdomSpec2 = {
	  c: function c(inst) {
	    var _n = xvdom.createComponent(Cell, {
	      initialValue: inst.p0initialValue,
	      row: inst.p0row,
	      cell: inst.p0cell,
	      cellUpdaters: inst.p0cellUpdaters
	    }, inst, 'b', 'c', 'd');

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    if (inst.p0cell !== pInst.p0cell || inst.p0row !== pInst.p0row || inst.p0initialValue !== pInst.p0initialValue || inst.p0cellUpdaters !== pInst.p0cellUpdaters) {
	      pInst.b(Cell, {
	        initialValue: inst.p0initialValue,
	        row: inst.p0row,
	        cell: inst.p0cell,
	        cellUpdaters: inst.p0cellUpdaters
	      }, null, pInst.d, pInst.c, pInst, 'c', 'd');
	      pInst.p0initialValue = inst.p0initialValue;
	      pInst.p0row = inst.p0row;
	      pInst.p0cell = inst.p0cell;
	      pInst.p0cellUpdaters = inst.p0cellUpdaters;
	    }
	  },
	  r: null
	};
	var _xvdomSpec = {
	  c: function c(inst) {
	    var _n = document.createElement('td');

	    inst.b = _n;
	    _n.className = inst.a;

	    _n.appendChild(xvdom.createDynamic(true, _n, inst.c, inst, 'd', 'e'));

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    if (inst.a !== pInst.a) {
	      pInst.b.className = inst.a;
	      pInst.a = inst.a;
	    }

	    if (inst.c !== pInst.c) {
	      pInst.c = pInst.d(true, inst.c, pInst.c, pInst.e, pInst, 'd', 'e');
	    }
	  },
	  r: null
	};
	var COLS = 100;
	var ROWS = 100;
	var randInt = function randInt(maxValue) {
	  return Math.random() * maxValue | 0;
	};
	var genRows = function genRows() {
	  var rows = new Array(ROWS);

	  for (var row = 0; row < ROWS; ++row) {
	    var cols = rows[row] = new Array(COLS);

	    for (var col = 0; col < COLS; ++col) {
	      cols[col] = randInt(COLS);
	    }
	  }
	  return rows;
	};

	var cellId = function cellId(row, cell) {
	  return row + '-' + cell;
	};

	var Cell = function Cell(props, state) {
	  return {
	    $s: _xvdomSpec,
	    $n: null,
	    $c: null,
	    $t: null,
	    $a: null,
	    $p: null,
	    a: state > 50 ? 'high' : 'low',
	    b: null,
	    c: state,
	    d: null,
	    e: null
	  };
	};

	Cell.state = {
	  onInit: function onInit(_ref, state, _ref2) {
	    var initialValue = _ref.initialValue;
	    var row = _ref.row;
	    var cell = _ref.cell;
	    var cellUpdaters = _ref.cellUpdaters;
	    var update = _ref2.update;

	    cellUpdaters[cellId(row, cell)] = update;
	    return initialValue;
	  },
	  update: function update(props, state, actions, newValue) {
	    return newValue;
	  }
	};

	var App = function App(props, _ref3) {
	  var rows = _ref3.rows;
	  var cellUpdaters = _ref3.cellUpdaters;
	  return {
	    $s: _xvdomSpec4,
	    $n: null,
	    $c: null,
	    $t: null,
	    $a: null,
	    $p: null,
	    a: rows.map(function (row, i) {
	      return {
	        $s: _xvdomSpec3,
	        $n: null,
	        $c: null,
	        $t: null,
	        $a: null,
	        $p: null,
	        a: row.map(function (cell, j) {
	          return {
	            $s: _xvdomSpec2,
	            $n: null,
	            $c: null,
	            $t: null,
	            $a: null,
	            $p: null,
	            b: null,
	            c: null,
	            d: null,
	            p0initialValue: cell,
	            p0row: i,
	            p0cell: j,
	            p0cellUpdaters: cellUpdaters,
	            key: j
	          };
	        }),
	        b: null,
	        c: null,
	        key: i
	      };
	    }),
	    b: null,
	    c: null
	  };
	};

	App.state = {
	  onInit: function onInit(props, state, actions) {
	    var cellUpdaters = {};
	    var update = function update() {
	      for (var i = 0; i < 300; ++i) {
	        cellUpdaters[cellId(randInt(ROWS - 1), randInt(COLS - 1))](randInt(COLS));
	      }
	      requestAnimationFrame(update);
	    };
	    requestAnimationFrame(update);
	    return { rows: genRows(), cellUpdaters: cellUpdaters };
	  }
	};

	window.app.appendChild(xvdom.render({
	  $s: _xvdomSpec5,
	  $n: null,
	  $c: null,
	  $t: null,
	  $a: null,
	  $p: null,
	  b: null,
	  c: null,
	  d: null
	}));

/***/ }
/******/ ]);