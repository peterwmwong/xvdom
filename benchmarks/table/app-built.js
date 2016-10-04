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

	!function (n, e) {
	   true ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.xvdom = e() : n.xvdom = e();
	}(undefined, function () {
	  return function (n) {
	    function e(r) {
	      if (t[r]) return t[r].exports;var o = t[r] = { exports: {}, id: r, loaded: !1 };return n[r].call(o.exports, o, o.exports, e), o.loaded = !0, o.exports;
	    }var t = {};return e.m = n, e.c = t, e.p = "", e(0);
	  }([function (n, e, t) {
	    n.exports = t(1);
	  }, function (n, e) {
	    "use strict";
	    function t(n) {
	      return n instanceof Object ? n instanceof Array ? "array" : "object" : null == n || n === !0 || n === !1 ? "empty" : "text";
	    }function r() {}function o() {
	      this.map = new r();
	    }function u(n, e, t, r, o, u, i, c) {
	      for (; o >= r && i >= u;) {
	        e[r] = z(t[u++], e[r++]);
	      }u > i ? $(n, e, r, o + 1, c) : m(t, n, u, i + 1);
	    }function i(n, e, r) {
	      return F[t(r)](r, e, n);
	    }e.__esModule = !0, r.prototype = Object.create(null);var c = new r(),
	        a = e.DEADPOOL = { push: function push() {}, pop: function pop() {} };o.prototype.push = function (n) {
	      var e = n.key,
	          t = this.map;n.$x = t[e], t[e] = n;
	    }, o.prototype.pop = function (n) {
	      var e = this.map[n];if (e) return this.map[n] = e.$x, e;
	    };var f = function f(n) {
	      n.$s.r.push(n);
	    },
	        p = function p(n) {
	      return document.createTextNode(n);
	    },
	        d = function d() {
	      return p("");
	    },
	        s = function s(n, e) {
	      var t = n.parentNode;t && t.replaceChild(e, n);
	    },
	        v = function v(n, e, t) {
	      return t ? n.insertBefore(e, t) : n.appendChild(e);
	    },
	        l = function l(n, e) {
	      f(n), e.removeChild(n.$n);
	    },
	        m = function m(n, e, t, r) {
	      for (; r > t;) {
	        l(n[t++], e);
	      }
	    },
	        y = function y(n, e) {
	      for (var t = n.length, r = 0; t > r;) {
	        f(n[r++]);
	      }e.textContent = "";
	    },
	        x = function x(n, e) {
	      return e.$s === n.$s && (n.$s.u(n, e), !0);
	    },
	        $ = function $(n, e, t, r, o) {
	      for (; r > t;) {
	        v(n, (e[t] = B(e[t])).$n, o), ++t;
	      }
	    },
	        h = function h(n, e, t) {
	      for (var r = 0; t > r;) {
	        n.appendChild((e[r] = B(e[r])).$n), ++r;
	      }
	    },
	        k = function k(n, e, t, r, o, i, c, a, f, p, d, s) {
	      a > p ? $(n, e, r, i + 1, s) : r > i ? m(t, n, a, p + 1) : u(n, e, t, r, i, a, p, s);
	    },
	        b = function b(n, e, t, r, o, u) {
	      var i = 0,
	          c = 0,
	          a = !0,
	          f = e[0],
	          p = r[0],
	          d = u,
	          s = void 0,
	          l = void 0,
	          m = void 0;t--, o--;n: for (; a && o >= i && t >= c;) {
	        for (a = !1; p.key === f.key;) {
	          if (e[c] = z(p, f), i++, c++, i > o || c > t) break n;p = r[i], f = e[c], a = !0;
	        }for (s = r[o], l = e[t]; s.key === l.key;) {
	          if (d = (e[t] = z(s, l)).$n, o--, t--, i > o || c > t) break n;s = r[o], l = e[t], a = !0;
	        }for (; p.key === l.key;) {
	          if (s.key === f.key ? (e[t] = z(s, l), e[c] = z(p, f), s = r[--o], f = e[++c]) : (m = (e[t] = z(p, l)).$n, s.key !== l.key && (d = v(n, m, d))), i++, t--, i > o || c > t) break n;p = r[i], l = e[t], a = !0;
	        }for (; s.key === f.key;) {
	          if (v(n, (e[c] = z(s, f)).$n, p.$n), o--, c++, i > o || c > t) break n;s = r[o], f = e[c], a = !0;
	        }
	      }(t >= c || o >= i) && k(n, e, r, c, f, t, l, i, p, o, s, d);
	    },
	        C = function C(n, e, t) {
	      var r = n.parentNode,
	          o = e.length,
	          u = t.length;o ? u ? b(r, e, o, t, u, n) : $(r, e, 0, o, n) : m(t, r, 0, u);
	    },
	        _ = function _(n, e, t) {
	      var r = e.length,
	          o = t.length;r ? o ? b(n, e, r, t, o, null) : h(n, e, r) : y(t, n);
	    },
	        j = function j(n, e, t) {
	      return n instanceof Object ? g(t, n, e) : (e.nodeValue = null == n || n === !0 || n === !1 ? "" : n, e);
	    },
	        g = function g(n, e, t) {
	      var r = i(n, t.parentNode, e);return s(t, r), r;
	    },
	        D = function D(n, e, t, r) {
	      var o = void 0;return n && x(n, o = r.$r || r) ? (n.$r = o, e) : g(t, n, e);
	    },
	        N = function N(n, e, t, r, o) {
	      var u = n(e || c);x(u, t) || s(t.$n, (r[o] = B(u)).$n);
	    },
	        O = function O(n, e, t, r) {
	      var o = e.xvdomContext;return n instanceof Array ? (t ? _(o, n, r) : C(o, n, r), e) : t ? (y(r, o), o.appendChild(i(!0, o, n))) : (m(r, o.parentNode, 0, r.length), g(!1, n, o));
	    },
	        P = function P(n, e, t) {
	      var r = t._onProps,
	          o = t.props;t.props = e, r ? w(n, t, r, o) : I(n, t);
	    },
	        A = function A(n, e, t) {
	      var r = document.createDocumentFragment();return h(r, n, n.length), r.xvdomContext = t ? e : r.appendChild(p("")), r;
	    },
	        I = function I(n, e) {
	      var t = z(e._instance, n(e));e._instance = t, t.$n.xvdom = e._parentInst;
	    },
	        w = function w(n, e, t, r) {
	      if (t) {
	        var o = t(e, r);o !== e.state && (e.state = o, I(n, e));
	      }
	    },
	        E = function E(n, e, t, o, u, i) {
	      var c = new r(),
	          a = { _onProps: i.onProps, _parentInst: t, props: e, bindSend: function bindSend(e) {
	          return c[e] || (c[e] = function (t) {
	            w(n, a, i[e], t);
	          });
	        } };return a.state = i.onInit(a), t[o] = P, t[u] = a, T(a._instance = n(a));
	    },
	        L = e.createNoStateComponent = function (n, e, t, r, o) {
	      return t[r] = N, T(t[o] = n(e));
	    },
	        S = e.createComponent = function (n, e, t, r, o, u) {
	      var i = e ? E : L;return i(n, t || c, r, o, u, e);
	    },
	        T = function T(n) {
	      var e = n.$s.c(n);return n.$n = e, e.xvdom = n, e;
	    },
	        B = function B(n) {
	      var e = n.$s,
	          t = e.r.pop(n.key);return t ? (e.u(n, t), t) : (T(n), n);
	    },
	        F = { text: p, object: T, array: A, empty: d },
	        M = { text: j, object: D, array: O, empty: j },
	        V = function V(n, e, r, o) {
	      return M[t(e)](r, o, n, e);
	    },
	        q = e.render = function (n) {
	      return B(n).$n;
	    },
	        z = function z(n, e) {
	      return x(e, n) ? n : (e = B(e), s(n.$n, e.$n), f(n), e);
	    },
	        G = e.rerender = function (n, e) {
	      return z(n.xvdom, e).$n;
	    },
	        H = e.unmount = function (n) {
	      l(n.xvdom, n.parentNode);
	    };e["default"] = { createComponent: S, createDynamic: i, el: function el(n) {
	        return document.createElement(n);
	      }, render: q, rerender: G, unmount: H, updateDynamic: V, Pool: o, DEADPOOL: a };e._ = { rerenderText: j, rerenderInstance: D, rerenderDynamic: g, rerenderArray: O };
	  }]);
	});

/***/ }
/******/ ]);