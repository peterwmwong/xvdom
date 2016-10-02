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
	    function t(n) {
	      return n instanceof Object ? n instanceof Array ? "array" : "object" : null == n || n === !0 || n === !1 ? "empty" : "text";
	    }function r() {}function o() {
	      this.map = new r();
	    }function u(n, e, r) {
	      return B[t(r)](r, e, n);
	    }e.__esModule = !0, r.prototype = Object.create(null);var i = new r(),
	        c = e.DEADPOOL = { push: function push() {}, pop: function pop() {} };o.prototype.push = function (n) {
	      var e = n.key,
	          t = this.map;n.$x = t[e], t[e] = n;
	    }, o.prototype.pop = function (n) {
	      var e = this.map[n];if (e) return this.map[n] = e.$x, e;
	    };var f = function f(n) {
	      n.$s.r.push(n);
	    },
	        a = function a(n) {
	      return document.createTextNode(n);
	    },
	        p = function p() {
	      return a("");
	    },
	        d = function d(n, e) {
	      var t = n.parentNode;t && t.replaceChild(e, n);
	    },
	        s = function s(n, e, t) {
	      return t ? n.insertBefore(e, t) : n.appendChild(e);
	    },
	        v = function v(n, e) {
	      f(n), e.removeChild(n.$n);
	    },
	        l = function l(n, e) {
	      for (var t = n.length, r = 0; t > r;) {
	        v(n[r++], e);
	      }
	    },
	        m = function m(n, e) {
	      for (var t = n.length, r = 0; t > r;) {
	        f(n[r++]);
	      }e.textContent = "";
	    },
	        y = function y(n, e) {
	      return e.$s === n.$s && (n.$s.u(n, e), !0);
	    },
	        x = function x(n, e, t, r) {
	      for (var o = 0; t > o;) {
	        s(n, (e[o] = T(e[o])).$n, r), ++o;
	      }
	    },
	        $ = function $(n, e, t) {
	      for (var r = 0; t > r;) {
	        n.appendChild((e[r] = T(e[r])).$n), ++r;
	      }
	    },
	        h = function h(n, e, t, r, o, u, i, c, f) {
	      for (var a = new Map(), p = c.$n, d = void 0, l = void 0, m = void 0; f >= i;) {
	        d = t[i++], a.set(d.key, d);
	      }for (; o >= r;) {
	        m = e[r], l = m.key, d = a.get(l), d ? (d === c && (p = p.nextSibling), a["delete"](l), m = z(d, m)) : m = T(m), e[r] = m, s(n, m.$n, p), ++r;
	      }a.forEach(function (e) {
	        v(e, n);
	      });
	    },
	        k = function k(n, e, t, r, o, u, i, c, f, a, p, d) {
	      if (c > a) for (; u >= r;) {
	        o = e[r], s(n, (e[r] = T(o)).$n, d), ++r;
	      } else if (r > u) for (; a >= c;) {
	        v(t[c++], n);
	      } else h(n, e, t, r, u, f, c, p, a);
	    },
	        b = function b(n, e, t, r, o, u) {
	      var i = 0,
	          c = 0,
	          f = !0,
	          a = e[0],
	          p = r[0],
	          d = u,
	          v = void 0,
	          l = void 0,
	          m = void 0;t--, o--;n: for (; f && o >= i && t >= c;) {
	        for (f = !1; p.key === a.key;) {
	          if (e[c] = z(p, a), i++, c++, i > o || c > t) break n;p = r[i], a = e[c], f = !0;
	        }for (v = r[o], l = e[t]; v.key === l.key;) {
	          if (d = (e[t] = z(v, l)).$n, o--, t--, i > o || c > t) break n;v = r[o], l = e[t], f = !0;
	        }for (; p.key === l.key;) {
	          if (m = (e[t] = z(p, l)).$n, v.key !== l.key && (d = s(n, m, d)), i++, t--, i > o || c > t) break n;p = r[i], l = e[t], f = !0;
	        }for (; v.key === a.key;) {
	          if (s(n, (e[c] = z(v, a)).$n, p.$n), o--, c++, i > o || c > t) break n;v = r[o], a = e[c], f = !0;
	        }
	      }(t >= c || o >= i) && k(n, e, r, c, a, t, l, i, p, o, v, d);
	    },
	        C = function C(n, e, t) {
	      var r = n.parentNode,
	          o = e.length,
	          u = t.length;o ? u ? b(r, e, o, t, u, n) : x(r, e, o, n) : l(t, r);
	    },
	        g = function g(n, e, t) {
	      var r = e.length,
	          o = t.length;r ? o ? b(n, e, r, t, o, null) : $(n, e, r) : m(t, n);
	    },
	        _ = function _(n, e, t) {
	      return n instanceof Object ? j(t, n, e) : (e.nodeValue = null == n || n === !0 || n === !1 ? "" : n, e);
	    },
	        j = function j(n, e, t) {
	      var r = u(n, t.parentNode, e);return d(t, r), r;
	    },
	        D = function D(n, e, t, r) {
	      var o = void 0;return n && y(n, o = r.$r || r) ? (n.$r = o, e) : j(t, n, e);
	    },
	        N = function N(n, e, t, r, o) {
	      var u = n(e || i);y(u, t) || d(t.$n, (r[o] = T(u)).$n);
	    },
	        O = function O(n, e, t, r) {
	      var o = e.xvdomContext;return n instanceof Array ? (t ? g(o, n, r) : C(o, n, r), e) : t ? (m(r, o), o.appendChild(u(!0, o, n))) : (l(r, o.parentNode), j(!1, n, o));
	    },
	        P = function P(n, e, t) {
	      var r = t._onProps,
	          o = t.props;t.props = e, r ? E(n, t, r, o) : w(n, t);
	    },
	        A = function A(n, e, t) {
	      var r = document.createDocumentFragment();return $(r, n, n.length), r.xvdomContext = t ? e : r.appendChild(a("")), r;
	    },
	        w = function w(n, e) {
	      var t = z(e._instance, n(e));e._instance = t, t.$n.xvdom = e._parentInst;
	    },
	        E = function E(n, e, t, r) {
	      if (t) {
	        var o = t(e, r);o !== e.state && (e.state = o, w(n, e));
	      }
	    },
	        I = function I(n, e, t, o, u, i) {
	      var c = new r(),
	          f = { _onProps: i.onProps, _parentInst: t, props: e, bindSend: function bindSend(e) {
	          return c[e] || (c[e] = function (t) {
	            E(n, f, i[e], t);
	          });
	        } };return f.state = i.onInit(f), t[o] = P, t[u] = f, M(f._instance = n(f));
	    },
	        S = e.createNoStateComponent = function (n, e, t, r, o) {
	      return t[r] = N, M(t[o] = n(e));
	    },
	        L = e.createComponent = function (n, e, t, r, o, u) {
	      var c = e ? I : S;return c(n, t || i, r, o, u, e);
	    },
	        M = function M(n) {
	      var e = n.$s.c(n);return n.$n = e, e.xvdom = n, e;
	    },
	        T = function T(n) {
	      var e = n.$s,
	          t = e.r.pop(n.key);return t ? (e.u(n, t), t) : (M(n), n);
	    },
	        B = { text: a, object: M, array: A, empty: p },
	        F = { text: _, object: D, array: O, empty: _ },
	        V = function V(n, e, r, o) {
	      return F[t(e)](r, o, n, e);
	    },
	        q = e.render = function (n) {
	      return T(n).$n;
	    },
	        z = function z(n, e) {
	      return y(e, n) ? n : (e = T(e), d(n.$n, e.$n), f(n), e);
	    },
	        G = e.rerender = function (n, e) {
	      return z(n.xvdom, e).$n;
	    },
	        H = e.unmount = function (n) {
	      v(n.xvdom, n.parentNode);
	    };e["default"] = { createComponent: L, createDynamic: u, el: function el(n) {
	        return document.createElement(n);
	      }, render: q, rerender: G, unmount: H, updateDynamic: V, Pool: o, DEADPOOL: c };e._ = { rerenderText: _, rerenderInstance: D, rerenderDynamic: j, rerenderArray: O };
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