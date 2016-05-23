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

	var _xvdomSpec5 = {
	  c: function c(inst) {
	    var _n = _xvdomMin2.default.createComponent(App, App.state, null, inst, 'a', 'b');

	    return _n;
	  },
	  u: function u() {},
	  r: _xvdomMin2.default.DEADPOOL
	};
	var _xvdomSpec4 = {
	  c: function c(inst) {
	    var _n = document.createElement('table');

	    _n.appendChild(_xvdomMin2.default.createDynamic(true, _n, inst.a, inst, 'b', 'c'));

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.a = pInst.b(true, inst.a, pInst.a, pInst.c, pInst, 'b', 'c');
	    }
	  },
	  r: _xvdomMin2.default.DEADPOOL
	};
	var _xvdomSpec3 = {
	  c: function c(inst) {
	    var _n = document.createElement('tr');

	    _n.appendChild(_xvdomMin2.default.createDynamic(true, _n, inst.a, inst, 'b', 'c'));

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.a = pInst.b(true, inst.a, pInst.a, pInst.c, pInst, 'b', 'c');
	    }
	  },
	  r: _xvdomMin2.default.DEADPOOL
	};
	var _xvdomSpec2 = {
	  c: function c(inst) {
	    var _n = _xvdomMin2.default.createComponent(Cell, Cell.state, {
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

	    _n.appendChild(_xvdomMin2.default.createDynamic(true, _n, inst.c, inst, 'd', 'e'));

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
	      pInst.c = pInst.d(true, inst.c, pInst.c, pInst.e, pInst, 'd', 'e');
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
	        u = document.createComment(""),
	        i = e.DEADPOOL = { push: function push() {}, pop: function pop() {} };r.prototype.push = function (n) {
	      var e = n.key,
	          t = this.map;n.$x = t[e], t[e] = n;
	    }, r.prototype.pop = function (n) {
	      var e = this.map[n];if (e) return this.map[n] = e.$x, e;
	    };var c = function c(n) {
	      n.$s.r.push(n);
	    },
	        f = function f() {
	      return u.cloneNode(!1);
	    },
	        a = function a(n, e) {
	      var t = n.parentNode;t && t.replaceChild(e, n);
	    },
	        p = function p(n, e, t) {
	      return t ? n.insertBefore(e, t) : n.appendChild(e);
	    },
	        d = function d(n, e) {
	      c(n), e.removeChild(n.$n);
	    },
	        s = function s(n, e) {
	      for (var t = n.length, r = 0; t > r;) {
	        d(n[r++], e);
	      }
	    },
	        l = function l(n, e) {
	      for (var t = n.length, r = 0; t > r;) {
	        c(n[r++]);
	      }e.textContent = "";
	    },
	        v = function v(n, e) {
	      return e.$s === n.$s && (n.$s.u(n, e), !0);
	    },
	        m = function m(n, e, t, r) {
	      for (var o = 0; t > o;) {
	        p(n, (e[o] = B(e[o])).$n, r), ++o;
	      }
	    },
	        y = function y(n, e, t) {
	      for (var r = 0; t > r;) {
	        n.appendChild((e[r] = B(e[r])).$n), ++r;
	      }
	    },
	        $ = function $(n, e, t, r, o, u, i, c, f) {
	      for (var a = new Map(), s = c.$n, l = void 0, v = void 0, m = void 0; f >= i;) {
	        l = t[i++], a.set(l.key, l);
	      }for (; o >= r;) {
	        m = e[r], v = m.key, l = a.get(v), l ? (l === c && (s = s.nextSibling), a["delete"](v), m = M(l, m)) : m = B(m), e[r] = m, p(n, m.$n, s), ++r;
	      }a.forEach(function (e) {
	        d(e, n);
	      });
	    },
	        h = function h(n, e, t, r, o, u, i, c, f, a, s, l) {
	      if (c > a) for (; u >= r;) {
	        o = e[r], p(n, (e[r] = B(o)).$n, l), ++r;
	      } else if (r > u) for (; a >= c;) {
	        d(t[c++], n);
	      } else $(n, e, t, r, u, f, c, s, a);
	    },
	        x = function x(n, e, t, r, o, u) {
	      var i = 0,
	          c = 0,
	          f = !0,
	          a = e[0],
	          d = r[0],
	          s = u,
	          l = void 0,
	          v = void 0,
	          m = void 0;t--, o--;n: for (; f && o >= i && t >= c;) {
	        for (f = !1; d.key === a.key;) {
	          if (e[c] = M(d, a), i++, c++, i > o || c > t) break n;d = r[i], a = e[c], f = !0;
	        }for (l = r[o], v = e[t]; l.key === v.key;) {
	          if (s = (e[t] = M(l, v)).$n, o--, t--, i > o || c > t) break n;l = r[o], v = e[t], f = !0;
	        }for (; d.key === v.key;) {
	          if (m = (e[t] = M(d, v)).$n, l.key !== v.key && (s = p(n, m, s)), i++, t--, i > o || c > t) break n;d = r[i], v = e[t], f = !0;
	        }for (; l.key === a.key;) {
	          if (p(n, (e[c] = M(l, a)).$n, d.$n), o--, c++, i > o || c > t) break n;l = r[o], a = e[c], f = !0;
	        }
	      }(t >= c || o >= i) && h(n, e, r, c, a, t, v, i, d, o, l, s);
	    },
	        k = function k(n, e, t) {
	      var r = n.parentNode,
	          o = e.length,
	          u = t.length;o ? u ? x(r, e, o, t, u, n) : m(r, e, o, n) : s(t, r);
	    },
	        b = function b(n, e, t) {
	      var r = e.length,
	          o = t.length;r ? o ? x(n, e, r, t, o, null) : y(n, e, r) : l(t, n);
	    },
	        g = function g(n, e, t, r, o, u, i) {
	      return null == e ? r.nodeValue = "" : e.constructor === String || e.constructor === Number ? r.nodeValue = e : C(n, e, null, r, o, u, i), e;
	    },
	        C = function C(n, e, t, r, o, u, i) {
	      return a(r, P(n, r.parentNode, e, o, u, i)), e;
	    },
	        N = function N(n, e, t, r, o, u, i) {
	      return e && v(e, t) ? t : C(n, e, null, r, o, u, i);
	    },
	        _ = function _(n, e, t, r, u) {
	      var i = n(e || o);v(i, t) || a(t.$n, (r[u] = B(i)).$n);
	    },
	        D = function D(n, e, t, r, o, u, i) {
	      return e instanceof Array ? n ? b(r, e, t) : k(r, e, t) : n ? (l(t, r), r.appendChild(P(!0, r, e, o, u, i))) : (s(t, r.parentNode), C(!1, e, null, r, o, u, i)), e;
	    },
	        O = function O(n, e, t) {
	      var r = t._onProps,
	          o = t.props;t.props = e, r ? A(n, t, r, o) : j(n, t);
	    },
	        P = e.createDynamic = function (n, e, t, r, o, u) {
	      var i = void 0,
	          c = void 0,
	          a = void 0,
	          p = void 0;return null == t || (p = t.constructor) === Boolean ? (a = C, c = i = f()) : p === Object ? (a = N, c = i = E(t)) : p === String || p === Number ? (a = g, c = i = document.createTextNode(t)) : p === Array && (i = document.createDocumentFragment(), y(i, t, t.length), a = D, c = n ? e : i.appendChild(f())), r[o] = a, r[u] = c, i;
	    },
	        j = function j(n, e) {
	      var t = M(e._instance, n(e));e._instance = t, t.$n.xvdom = e._parentInst;
	    },
	        A = function A(n, e, t, r) {
	      if (t) {
	        var o = t(e, r);o !== e.state && (e.state = o, j(n, e));
	      }
	    },
	        S = function S(n, e, r, o, u, i) {
	      var c = new t(),
	          f = { _onProps: i.onProps, _parentInst: r, props: e, bindSend: function bindSend(e) {
	          return c[e] || (c[e] = function (t) {
	            A(n, f, i[e], t);
	          });
	        } };return f.state = i.onInit(f), r[o] = O, r[u] = f, E(f._instance = n(f));
	    },
	        w = e.createNoStateComponent = function (n, e, t, r, o) {
	      return t[r] = _, E(t[o] = n(e));
	    },
	        I = e.createComponent = function (n, e, t, r, u, i) {
	      var c = e ? S : w;return c(n, t || o, r, u, i, e);
	    },
	        E = function E(n) {
	      var e = n.$s.c(n);return n.$n = e, e.xvdom = n, e;
	    },
	        B = function B(n) {
	      var e = n.$s,
	          t = e.r.pop(n.key);return t ? (e.u(n, t), t) : (E(n), n);
	    },
	        L = e.render = function (n) {
	      return B(n).$n;
	    },
	        M = function M(n, e) {
	      return v(e, n) ? n : (e = B(e), a(n.$n, e.$n), c(n), e);
	    },
	        T = e.rerender = function (n, e) {
	      return M(n.xvdom, e).$n;
	    },
	        V = e.unmount = function (n) {
	      d(n.xvdom, n.parentNode);
	    };e["default"] = { createDynamic: P, createComponent: I, render: L, rerender: T, unmount: V, Pool: r, DEADPOOL: i };e._ = { rerenderText: g, rerenderInstance: N, rerenderDynamic: C, rerenderArray: D };
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