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
	    var _n = document.createElement('table');

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
	    var _n = document.createElement('tr');

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
	    var _n = document.createElement('td');

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

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	!function (n, e) {
	  "object" == ( false ? "undefined" : _typeof(exports)) && "object" == ( false ? "undefined" : _typeof(module)) ? module.exports = e() :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (e), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.xvdom = e() : n.xvdom = e();
	}(undefined, function () {
	  return function (n) {
	    function e(r) {
	      if (t[r]) return t[r].exports;var o = t[r] = { exports: {}, id: r, loaded: !1 };return n[r].call(o.exports, o, o.exports, e), o.loaded = !0, o.exports;
	    }var t = {};return e.m = n, e.c = t, e.p = "", e(0);
	  }([function (n, e, t) {
	    n.exports = t(1);
	  }, function (n, e) {
	    "use strict";
	    function t() {}function r() {
	      this.map = new t();
	    }e.__esModule = !0, t.prototype = Object.create(null);var o = new t(),
	        u = e.DEADPOOL = { push: function push() {}, pop: function pop() {} };r.prototype.push = function (n) {
	      var e = n.key,
	          t = this.map;n.$x = t[e], t[e] = n;
	    }, r.prototype.pop = function (n) {
	      var e = this.map[n];if (e) return this.map[n] = e.$x, e;
	    };var c = function c(n) {
	      n.$s.r.push(n);
	    },
	        i = function i(n) {
	      return document.createTextNode(n);
	    },
	        a = function a() {
	      return i("");
	    },
	        f = function f(n, e) {
	      var t = n.parentNode;t && t.replaceChild(e, n);
	    },
	        s = function s(n, e, t) {
	      return t ? n.insertBefore(e, t) : n.appendChild(e);
	    },
	        p = function p(n, e) {
	      c(n), e.removeChild(n.$n);
	    },
	        d = function d(n, e) {
	      for (var t = n.length, r = 0; t > r;) {
	        p(n[r++], e);
	      }
	    },
	        v = function v(n, e) {
	      for (var t = n.length, r = 0; t > r;) {
	        c(n[r++]);
	      }e.textContent = "";
	    },
	        l = function l(n, e) {
	      return e.$s === n.$s && (n.$s.u(n, e), !0);
	    },
	        m = function m(n, e, t, r) {
	      for (var o = 0; t > o;) {
	        s(n, (e[o] = T(e[o])).$n, r), ++o;
	      }
	    },
	        y = function y(n, e, t) {
	      for (var r = 0; t > r;) {
	        n.appendChild((e[r] = T(e[r])).$n), ++r;
	      }
	    },
	        $ = function $(n, e, t, r, o, u, c, i, a) {
	      for (var f = new Map(), d = i.$n, v = void 0, l = void 0, m = void 0; a >= c;) {
	        v = t[c++], f.set(v.key, v);
	      }for (; o >= r;) {
	        m = e[r], l = m.key, v = f.get(l), v ? (v === i && (d = d.nextSibling), f["delete"](l), m = B(v, m)) : m = T(m), e[r] = m, s(n, m.$n, d), ++r;
	      }f.forEach(function (e) {
	        p(e, n);
	      });
	    },
	        x = function x(n, e, t, r, o, u, c, i, a, f, d, v) {
	      if (i > f) for (; u >= r;) {
	        o = e[r], s(n, (e[r] = T(o)).$n, v), ++r;
	      } else if (r > u) for (; f >= i;) {
	        p(t[i++], n);
	      } else $(n, e, t, r, u, a, i, d, f);
	    },
	        h = function h(n, e, t, r, o, u) {
	      var c = 0,
	          i = 0,
	          a = !0,
	          f = e[0],
	          p = r[0],
	          d = u,
	          v = void 0,
	          l = void 0,
	          m = void 0;t--, o--;n: for (; a && o >= c && t >= i;) {
	        for (a = !1; p.key === f.key;) {
	          if (e[i] = B(p, f), c++, i++, c > o || i > t) break n;p = r[c], f = e[i], a = !0;
	        }for (v = r[o], l = e[t]; v.key === l.key;) {
	          if (d = (e[t] = B(v, l)).$n, o--, t--, c > o || i > t) break n;v = r[o], l = e[t], a = !0;
	        }for (; p.key === l.key;) {
	          if (m = (e[t] = B(p, l)).$n, v.key !== l.key && (d = s(n, m, d)), c++, t--, c > o || i > t) break n;p = r[c], l = e[t], a = !0;
	        }for (; v.key === f.key;) {
	          if (s(n, (e[i] = B(v, f)).$n, p.$n), o--, i++, c > o || i > t) break n;v = r[o], f = e[i], a = !0;
	        }
	      }(t >= i || o >= c) && x(n, e, r, i, f, t, l, c, p, o, v, d);
	    },
	        k = function k(n, e, t) {
	      var r = n.parentNode,
	          o = e.length,
	          u = t.length;o ? u ? h(r, e, o, t, u, n) : m(r, e, o, n) : d(t, r);
	    },
	        b = function b(n, e, t) {
	      var r = e.length,
	          o = t.length;r ? o ? h(n, e, r, t, o, null) : y(n, e, r) : v(t, n);
	    },
	        g = function g(n, e, t) {
	      switch (e && e.constructor) {case String:case Number:case 0:
	          return t.nodeValue = e, t;case Object:case Array:
	          return C(n, e, t);default:
	          return t.nodeValue = "", t;}
	    },
	        C = function C(n, e, t) {
	      var r = A(n, t.parentNode, e);return f(t, r), r;
	    },
	        _ = function _(n, e, t, r) {
	      return e && l(e, t.$ri || t) ? (e.$ri = t, r) : C(n, e, r);
	    },
	        N = function N(n, e, t, r, u) {
	      var c = n(e || o);l(c, t) || f(t.$n, (r[u] = T(c)).$n);
	    },
	        D = function D(n, e, t, r) {
	      return e instanceof Array ? void (n ? b(r, e, t) : k(r, e, t)) : n ? (v(t, r), r.appendChild(A(!0, r, e))) : (d(t, r.parentNode), C(!1, e, r));
	    },
	        O = function O(n, e, t) {
	      var r = t._onProps,
	          o = t.props;t.props = e, r ? S(n, t, r, o) : P(n, t);
	    },
	        j = function j(n, e, t, r) {
	      switch (e && e.constructor) {case Array:
	          return D(n, t, e, r.xvdomContext) || r;case Object:
	          return _(n, t, e, r);default:
	          return g(n, t, r);}
	    },
	        w = function w(n, e, t) {
	      var r = document.createDocumentFragment();return y(r, t, t.length), r.xvdomContext = n ? e : r.appendChild(a()), r;
	    },
	        A = function A(n, e, t) {
	      switch (t && t.constructor) {case String:case Number:case 0:
	          return i(t);case Object:
	          return M(t);case Array:
	          return w(n, e, t);default:
	          return a();}
	    },
	        P = function P(n, e) {
	      var t = B(e._instance, n(e));e._instance = t, t.$n.xvdom = e._parentInst;
	    },
	        S = function S(n, e, t, r) {
	      if (t) {
	        var o = t(e, r);o !== e.state && (e.state = o, P(n, e));
	      }
	    },
	        I = function I(n, e, r, o, u, c) {
	      var i = new t(),
	          a = { _onProps: c.onProps, _parentInst: r, props: e, bindSend: function bindSend(e) {
	          return i[e] || (i[e] = function (t) {
	            S(n, a, c[e], t);
	          });
	        } };return a.state = c.onInit(a), r[o] = O, r[u] = a, M(a._instance = n(a));
	    },
	        E = e.createNoStateComponent = function (n, e, t, r, o) {
	      return t[r] = N, M(t[o] = n(e));
	    },
	        L = e.createComponent = function (n, e, t, r, u, c) {
	      var i = e ? I : E;return i(n, t || o, r, u, c, e);
	    },
	        M = function M(n) {
	      var e = n.$s.c(n);return n.$n = e, e.xvdom = n, e;
	    },
	        T = function T(n) {
	      var e = n.$s,
	          t = e.r.pop(n.key);return t ? (e.u(n, t), t) : (M(n), n);
	    },
	        V = e.render = function (n) {
	      return T(n).$n;
	    },
	        B = function B(n, e) {
	      return l(e, n) ? n : (e = T(e), f(n.$n, e.$n), c(n), e);
	    },
	        F = e.rerender = function (n, e) {
	      return B(n.xvdom, e).$n;
	    },
	        q = e.unmount = function (n) {
	      p(n.xvdom, n.parentNode);
	    };e["default"] = { createComponent: L, createDynamic: A, render: V, rerender: F, unmount: q, updateDynamic: j, Pool: r, DEADPOOL: u };e._ = { rerenderText: g, rerenderInstance: _, rerenderDynamic: C, rerenderArray: D };
	  }]);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module)))

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ }
/******/ ]);