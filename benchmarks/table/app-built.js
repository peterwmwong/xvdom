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

	var _xvdomMin = __webpack_require__(2);

	var _xvdomMin2 = _interopRequireDefault(_xvdomMin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _xvdomCreateComponent = _xvdomMin2.default.createComponent,
	    _xvdomCreateDynamic = _xvdomMin2.default.createDynamic,
	    _xvdomEl = _xvdomMin2.default.el,
	    _xvdomUpdateComponent = _xvdomMin2.default.updateComponent,
	    _xvdomUpdateDynamic = _xvdomMin2.default.updateDynamic;
	var _xvdomSpec5 = {
	  c: function c(inst) {
	    var _n = _xvdomCreateComponent(App, App.state, null, inst).$n;

	    return _n;
	  },
	  u: function u() {},
	  r: _xvdomMin2.default.DEADPOOL
	};
	var _xvdomSpec4 = {
	  c: function c(inst) {
	    var _n = _xvdomEl('table');

	    _n.appendChild(inst.b = _xvdomCreateDynamic(true, _n, inst.a));

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.b = _xvdomUpdateDynamic(true, pInst.a, pInst.a = inst.a, pInst.b);
	    }
	  },
	  r: _xvdomMin2.default.DEADPOOL
	};
	var _xvdomSpec3 = {
	  c: function c(inst) {
	    var _n = _xvdomEl('tr');

	    _n.appendChild(inst.b = _xvdomCreateDynamic(true, _n, inst.a));

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.b = _xvdomUpdateDynamic(true, pInst.a, pInst.a = inst.a, pInst.b);
	    }
	  },
	  r: _xvdomMin2.default.DEADPOOL
	};
	var _xvdomSpec2 = {
	  c: function c(inst) {
	    var _n = (inst.e = _xvdomCreateComponent(Cell, Cell.state, {
	      initialValue: inst.a,
	      row: inst.b,
	      cell: inst.c,
	      cellUpdaters: inst.d
	    }, inst)).$n;

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.c !== pInst.c || inst.b !== pInst.b || inst.a !== pInst.a || inst.d !== pInst.d) {
	      pInst.e = _xvdomUpdateComponent(Cell, Cell.state, {
	        initialValue: pInst.a = inst.a,
	        row: pInst.b = inst.b,
	        cell: pInst.c = inst.c,
	        cellUpdaters: pInst.d = inst.d
	      }, pInst.e);
	    }
	  },
	  r: _xvdomMin2.default.DEADPOOL
	};
	var _xvdomSpec = {
	  c: function c(inst) {
	    var _n = _xvdomEl('td');

	    inst.b = _n;
	    _n.className = inst.a;

	    _n.appendChild(inst.d = _xvdomCreateDynamic(true, _n, inst.c));

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;
	    v = inst.a;

	    if (v !== pInst.a) {
	      pInst.b.className = v;
	      pInst.a = v;
	    }

	    if (inst.c !== pInst.c) {
	      pInst.d = _xvdomUpdateDynamic(true, pInst.c, pInst.c = inst.c, pInst.d);
	    }
	  },
	  r: _xvdomMin2.default.DEADPOOL
	};


	var COLS = 100;
	var ROWS = 100;
	var randInt = function randInt(maxValue) {
	  return Math.random() * maxValue | 0;
	};
	var cellId = function cellId(row, cell) {
	  return row + '-' + cell;
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

	var Cell = function Cell(_ref) {
	  var state = _ref.state;
	  return {
	    $s: _xvdomSpec,
	    a: state > 50 ? 'high' : 'low',
	    c: state
	  };
	};

	Cell.state = {
	  onInit: function onInit(_ref2) {
	    var _ref2$props = _ref2.props;
	    var initialValue = _ref2$props.initialValue;
	    var row = _ref2$props.row;
	    var cell = _ref2$props.cell;
	    var cellUpdaters = _ref2$props.cellUpdaters;
	    var bindSend = _ref2.bindSend;

	    cellUpdaters[cellId(row, cell)] = bindSend('update');
	    return initialValue;
	  },
	  update: function update(component, newValue) {
	    return newValue;
	  }
	};

	var App = function App(_ref3) {
	  var _ref3$state = _ref3.state;
	  var rows = _ref3$state.rows;
	  var cellUpdaters = _ref3$state.cellUpdaters;
	  return {
	    $s: _xvdomSpec4,
	    a: rows.map(function (row, i) {
	      return {
	        $s: _xvdomSpec3,
	        a: row.map(function (cell, j) {
	          return {
	            $s: _xvdomSpec2,
	            a: cell,
	            b: i,
	            c: j,
	            d: cellUpdaters,
	            key: j
	          };
	        }),
	        key: i
	      };
	    })
	  };
	};

	App.state = {
	  onInit: function onInit() {
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

	window.app.appendChild(_xvdomMin2.default.render({
	  $s: _xvdomSpec5
	}));

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	!function (n, t) {
	   true ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.xvdom = t() : n.xvdom = t();
	}(undefined, function () {
	  return function (n) {
	    function t(r) {
	      if (e[r]) return e[r].exports;var o = e[r] = { exports: {}, id: r, loaded: !1 };return n[r].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports;
	    }var e = {};return t.m = n, t.c = e, t.p = "", t(0);
	  }([function (n, t, e) {
	    n.exports = e(1);
	  }, function (n, t) {
	    "use strict";
	    function e(n) {
	      return n instanceof Object ? n instanceof Array ? "array" : "object" : I(n) ? "empty" : "text";
	    }function r() {}function o() {
	      this.map = new r();
	    }function u(n, t) {
	      T(n), t.removeChild(n.$n);
	    }function c(n, t, e) {
	      for (; e < n.length;) {
	        u(n[e++], t);
	      }
	    }function i(n, t) {
	      for (var e = 0; e < n.length;) {
	        T(n[e++]);
	      }t.textContent = "";
	    }function a(n, t) {
	      return n.$s === t.$s && (t.$s.u(t, n), !0);
	    }function f(n, t, e, r) {
	      null == r ? d(n, t, e) : p(n, t, e, r);
	    }function p(n, t, e, r) {
	      for (; e < t.length;) {
	        n.insertBefore((t[e] = P(t[e])).$n, r), ++e;
	      }
	    }function d(n, t, e) {
	      for (; e < t.length;) {
	        n.appendChild((t[e] = P(t[e])).$n), ++e;
	      }
	    }function s(n, t, e, r, o, u) {
	      var i = 0,
	          a = 0;do {
	        t[a] = E(r[i], t[a]), ++a, ++i;
	      } while (i < o && a < e);a < e ? f(n, t, a, u) : c(r, n, i);
	    }function l(n, t, e) {
	      var r = n.parentNode,
	          o = t.length,
	          u = e.length;o ? u ? s(r, t, o, e, u, n) : f(r, t, 0, n) : c(e, r, 0);
	    }function m(n, t, e) {
	      var r = t.length,
	          o = e.length;r ? o ? s(n, t, r, e, o, null) : d(n, t, 0) : i(e, n);
	    }function v(n, t, e) {
	      var r = w(n, e.parentNode, t);return M(e, r), r;
	    }function x(n, t, e) {
	      return n instanceof Object ? v(e, n, t) : (t.nodeValue = I(n) ? "" : n, t);
	    }function h(n, t, e, r) {
	      var o = void 0;return n && a(o = r.$r || r, n) ? (n.$r = o, t) : v(e, n, t);
	    }function y(n, t, e, r) {
	      var o = t.xvdomContext;return n instanceof Array ? (e ? m(o, n, r) : l(o, n, r), t) : e ? (i(r, o), o.appendChild(w(!0, o, n))) : (c(r, o.parentNode, 0), v(!1, n, o));
	    }function $(n, t, e, r) {
	      var o = r.props;r.props = e, t.onProps ? g(n, r, t.onProps, o) : b(n, r);
	    }function C(n, t, e) {
	      var r = document.createDocumentFragment();return d(r, n, 0), r.xvdomContext = e ? t : r.appendChild(B("")), r;
	    }function b(n, t) {
	      var e = E(t._instance, n(t));t._instance = e, e.$n.xvdom = t._parentInst;
	    }function g(n, t, e, r) {
	      if (e) {
	        var o = e(t, r);o !== t.state && (t.state = o, b(n, t));
	      }
	    }function j(n, t, e, o) {
	      var u = new r(),
	          c = { props: t, bindSend: function bindSend(t) {
	          return u[t] || (u[t] = function (e) {
	            g(n, c, o[t], e);
	          });
	        }, _parentInst: e };return c.state = o.onInit(c), c.$n = N(c._instance = n(c)), c;
	    }function D(n, t) {
	      var e = n(t);return N(e), e;
	    }function _(n, t, e, r) {
	      return (t ? j : D)(n, e || k, r, t);
	    }function O(n, t, e, r) {
	      return t ? ($(n, t, e, r), r) : E(r, n(e));
	    }function N(n) {
	      var t = n.$s.c(n);return n.$n = t, t.xvdom = n, t;
	    }function P(n) {
	      var t = n.$s,
	          e = t.r.pop(n.key);return e ? (t.u(n, e), e) : (N(n), n);
	    }function w(n, t, r) {
	      return S[e(r)](r, t, n);
	    }function A(n, t, r, o) {
	      return V[e(t)](r, o, n, t);
	    }function E(n, t) {
	      return a(n, t) ? n : (M(n.$n, (t = P(t)).$n), T(n), t);
	    }t.__esModule = !0, t.createComponent = _;var I = function I(n) {
	      return null == n || n === !0 || n === !1;
	    };r.prototype = Object.create(null);var k = new r(),
	        L = t.DEADPOOL = { push: function push() {}, pop: function pop() {} };o.prototype.push = function (n) {
	      var t = n.key,
	          e = this.map;n.$x = e[t], e[t] = n;
	    }, o.prototype.pop = function (n) {
	      var t = this.map[n];if (t) return this.map[n] = t.$x, t;
	    };var T = function T(n) {
	      n.$s.r.push(n);
	    },
	        B = function B(n) {
	      return document.createTextNode(n);
	    },
	        F = function F() {
	      return B("");
	    },
	        M = function M(n, t) {
	      var e = n.parentNode;e && e.replaceChild(t, n);
	    },
	        S = { text: B, object: N, array: C, empty: F },
	        V = { text: x, object: h, array: y, empty: x },
	        q = t.render = function (n) {
	      return P(n).$n;
	    },
	        z = t.rerender = function (n, t) {
	      return E(n.xvdom, t).$n;
	    },
	        G = t.unmount = function (n) {
	      u(n.xvdom, n.parentNode);
	    };t.default = { createComponent: _, createDynamic: w, el: function el(n) {
	        return document.createElement(n);
	      }, render: q, rerender: z, unmount: G, updateComponent: O, updateDynamic: A, Pool: o, DEADPOOL: L };t._ = { rerenderText: x, rerenderDynamic: v };
	  }]);
	});

/***/ }
/******/ ]);