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
	    _xvdomUpdateDynamic = _xvdomMin2.default.updateDynamic;
	var _xvdomSpec5 = {
	  c: function c(inst) {
	    var _n = _xvdomCreateComponent(App, App.state, null, inst, 'a', 'b');

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
	    var _n = _xvdomCreateComponent(Cell, Cell.state, {
	      initialValue: inst.a,
	      row: inst.b,
	      cell: inst.c,
	      cellUpdaters: inst.d
	    }, inst, 'e', 'f');

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.c !== pInst.c || inst.b !== pInst.b || inst.a !== pInst.a || inst.d !== pInst.d) {
	      pInst.e(Cell, {
	        initialValue: inst.a,
	        row: inst.b,
	        cell: inst.c,
	        cellUpdaters: inst.d
	      }, pInst.f, pInst, 'f');
	      pInst.a = inst.a;
	      pInst.b = inst.b;
	      pInst.c = inst.c;
	      pInst.d = inst.d;
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
	      return n instanceof Object ? n instanceof Array ? "array" : "object" : null == n || n === !0 || n === !1 ? "empty" : "text";
	    }function r() {}function o() {
	      this.map = new r();
	    }function u(n, t, r) {
	      return T[e(r)](r, t, n);
	    }t.__esModule = !0, r.prototype = Object.create(null);var c = new r(),
	        i = t.DEADPOOL = { push: function push() {}, pop: function pop() {} };o.prototype.push = function (n) {
	      var t = n.key,
	          e = this.map;n.$x = e[t], e[t] = n;
	    }, o.prototype.pop = function (n) {
	      var t = this.map[n];if (t) return this.map[n] = t.$x, t;
	    };var a = function a(n) {
	      n.$s.r.push(n);
	    },
	        f = function f(n) {
	      return document.createTextNode(n);
	    },
	        p = function p() {
	      return f("");
	    },
	        d = function d(n, t) {
	      var e = n.parentNode;e && e.replaceChild(t, n);
	    },
	        s = function s(n, t, e) {
	      return e ? n.insertBefore(t, e) : n.appendChild(t);
	    },
	        l = function l(n, t) {
	      a(n), t.removeChild(n.$n);
	    },
	        m = function m(n, t, e, r) {
	      for (; r > e;) {
	        l(n[e++], t);
	      }
	    },
	        v = function v(n, t) {
	      for (var e = n.length, r = 0; e > r;) {
	        a(n[r++]);
	      }t.textContent = "";
	    },
	        x = function x(n, t) {
	      return t.$s === n.$s && (n.$s.u(n, t), !0);
	    },
	        h = function h(n, t, e, r, o) {
	      for (; r > e;) {
	        s(n, (t[e] = S(t[e])).$n, o), ++e;
	      }
	    },
	        y = function y(n, t, e) {
	      for (var r = 0; e > r;) {
	        n.appendChild((t[r] = S(t[r])).$n), ++r;
	      }
	    },
	        $ = function $(n, t, e, r, o, u) {
	      var c = 0,
	          i = 0;do {
	        t[i] = V(r[c], t[i]), ++i, ++c;
	      } while (o > c && e > i);e > i ? h(n, t, i, e, u) : m(r, n, c, o);
	    },
	        C = function C(n, t, e) {
	      var r = n.parentNode,
	          o = t.length,
	          u = e.length;o ? u ? $(r, t, o, e, u, n) : h(r, t, 0, o, n) : m(e, r, 0, u);
	    },
	        b = function b(n, t, e) {
	      var r = t.length,
	          o = e.length;r ? o ? $(n, t, r, e, o, null) : y(n, t, r) : v(e, n);
	    },
	        _ = function _(n, t, e) {
	      return n instanceof Object ? j(e, n, t) : (t.nodeValue = null == n || n === !0 || n === !1 ? "" : n, t);
	    },
	        j = function j(n, t, e) {
	      var r = u(n, e.parentNode, t);return d(e, r), r;
	    },
	        g = function g(n, t, e, r) {
	      var o = void 0;return n && x(n, o = r.$r || r) ? (n.$r = o, t) : j(e, n, t);
	    },
	        D = function D(n, t, e, r, o) {
	      var u = n(t || c);x(u, e) || d(e.$n, (r[o] = S(u)).$n);
	    },
	        N = function N(n, t, e, r) {
	      var o = t.xvdomContext;return n instanceof Array ? (e ? b(o, n, r) : C(o, n, r), t) : e ? (v(r, o), o.appendChild(u(!0, o, n))) : (m(r, o.parentNode, 0, r.length), j(!1, n, o));
	    },
	        O = function O(n, t, e) {
	      var r = e._onProps,
	          o = e.props;e.props = t, r ? w(n, e, r, o) : A(n, e);
	    },
	        P = function P(n, t, e) {
	      var r = document.createDocumentFragment();return y(r, n, n.length), r.xvdomContext = e ? t : r.appendChild(f("")), r;
	    },
	        A = function A(n, t) {
	      var e = V(t._instance, n(t));t._instance = e, e.$n.xvdom = t._parentInst;
	    },
	        w = function w(n, t, e, r) {
	      if (e) {
	        var o = e(t, r);o !== t.state && (t.state = o, A(n, t));
	      }
	    },
	        I = function I(n, t, e, o, u, c) {
	      var i = new r(),
	          a = { _onProps: c.onProps, _parentInst: e, props: t, bindSend: function bindSend(t) {
	          return i[t] || (i[t] = function (e) {
	            w(n, a, c[t], e);
	          });
	        } };return a.state = c.onInit(a), e[o] = O, e[u] = a, L(a._instance = n(a));
	    },
	        E = t.createNoStateComponent = function (n, t, e, r, o) {
	      return e[r] = D, L(e[o] = n(t));
	    },
	        k = t.createComponent = function (n, t, e, r, o, u) {
	      var i = t ? I : E;return i(n, e || c, r, o, u, t);
	    },
	        L = function L(n) {
	      var t = n.$s.c(n);return n.$n = t, t.xvdom = n, t;
	    },
	        S = function S(n) {
	      var t = n.$s,
	          e = t.r.pop(n.key);return e ? (t.u(n, e), e) : (L(n), n);
	    },
	        T = { text: f, object: L, array: P, empty: p },
	        B = { text: _, object: g, array: N, empty: _ },
	        F = function F(n, t, r, o) {
	      return B[e(t)](r, o, n, t);
	    },
	        M = t.render = function (n) {
	      return S(n).$n;
	    },
	        V = function V(n, t) {
	      return x(t, n) ? n : (t = S(t), d(n.$n, t.$n), a(n), t);
	    },
	        q = t.rerender = function (n, t) {
	      return V(n.xvdom, t).$n;
	    },
	        z = t.unmount = function (n) {
	      l(n.xvdom, n.parentNode);
	    };t["default"] = { createComponent: k, createDynamic: u, el: function el(n) {
	        return document.createElement(n);
	      }, render: M, rerender: q, unmount: z, updateDynamic: F, Pool: o, DEADPOOL: i };t._ = { rerenderText: _, rerenderInstance: g, rerenderDynamic: j, rerenderArray: N };
	  }]);
	});

/***/ }
/******/ ]);