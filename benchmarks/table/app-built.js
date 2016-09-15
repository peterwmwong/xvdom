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
	  b: [1, 0],
	  s: [App],
	  u: []
	};
	var _xvdomSpec4 = {
	  b: [0, 6, 0, 6, 4],
	  s: [],
	  u: [2, 0, 0]
	};
	var _xvdomSpec3 = {
	  b: [0, 9, 0, 6, 4],
	  s: [],
	  u: [2, 0, 0]
	};
	var _xvdomSpec2 = {
	  b: [1, 4, 0],
	  s: [Cell, 'initialValue', 'row', 'cell', 'cellUpdaters'],
	  u: []
	};
	var _xvdomSpec = {
	  b: [0, 8, 1, 0, 8, 6, 4],
	  s: ['className'],
	  u: [0, 0, 0, 2, 0, 1]
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
	    t: _xvdomSpec,
	    d: [state > 50 ? 'high' : 'low', state]
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
	    t: _xvdomSpec4,
	    d: [rows.map(function (row, i) {
	      return {
	        t: _xvdomSpec3,
	        d: [row.map(function (cell, j) {
	          return {
	            t: _xvdomSpec2,
	            d: [cell, i, j, cellUpdaters],
	            k: j
	          };
	        })],
	        k: i
	      };
	    })]
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
	  t: _xvdomSpec5,
	  d: []
	}));

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	!function (n, t) {
	  "object" == ( false ? "undefined" : _typeof(exports)) && "object" == ( false ? "undefined" : _typeof(module)) ? module.exports = t() :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (t), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.xvdom = t() : n.xvdom = t();
	}(undefined, function () {
	  return function (n) {
	    function t(e) {
	      if (o[e]) return o[e].exports;var r = o[e] = { exports: {}, id: e, loaded: !1 };return n[e].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports;
	    }var o = {};return t.m = n, t.c = o, t.p = "", t(0);
	  }([function (n, t, o) {
	    n.exports = o(1);
	  }, function (n, t, o) {
	    "use strict";
	    function e(n) {
	      return n && n.__esModule ? n : { "default": n };
	    }function r(n, t) {
	      var o = g(t);o.__xvdomDynId = n.__xvdomDynId, o.__xvdomDynContextNodes = n.__xvdomDynContextNodes, F(n, o);
	    }function u(n, t) {
	      K(t) ? n.nodeValue = W(t) : r(n, t);
	    }function i(n, t) {
	      K(t) ? n.textContent = W(t) : r(n, t);
	    }function f(n, t, o) {
	      if (t instanceof Array) {
	        var e = t.length,
	            r = o.length;e ? r ? B(n, t, e, o, r, null) : h(t, n) : n.textContent = "";
	      }
	    }function c(n, t) {
	      for (; t--;) {
	        n.previousSibling.remove();
	      }
	    }function d(n, t, o) {
	      if (t instanceof Array) {
	        var e = t.length,
	            r = o.length;if (e) {
	          if (!r) throw "UNIMPLEMENTED!!!";B(n.parentNode, t, e, o, r, n);
	        } else c(n);
	      }
	    }function a(n, t, o, e, r) {
	      var u = X(r);u === Object ? p(r, e) : u === Array ? f(t, e, r) : i(t, e);
	    }function s(n, t, o, e, r) {
	      var i = r && r.constructor;i === Object ? p(r, e) : i === Array ? d(t, e, r) : u(t, e);
	    }function l(n, t, o, e, r) {
	      t[o[n]] = e;
	    }function v(n, t) {
	      var o = n.n,
	          e = R(t);F(o, e);var r = o.__xvdomDynContextNodes;r && (r[e.__xvdomDynId = o.__xvdomDynId] = e, e.__xvdomDynContextNodes = r);
	    }function x(n, t) {
	      for (var o = t.d, e = n.contextNodes, r = n.t, u = r.u, i = r.s, f = n.d, c = 0, d = 0, a = void 0, s = void 0; c < u.length;) {
	        a = o[d], s = f[d++], a === s ? c += 3 : Y[u[c++]](u[c++], e[u[c++]], i, a, s);
	      }t.contextNodes = e, (t.n = n.n).__xvdom = t;
	    }function p(n, t) {
	      t.t === n.t ? x(n, t) : v(n, t);
	    }function y(n, t) {
	      return p(n, t), t.n;
	    }function _(n, t) {
	      return n.parentNode ? y(n.__xvdom, t) : void 0;
	    }function N(n, t) {
	      return n.__xvdomDynId = t.length, n.__xvdomDynContextNodes = t, t.push(n), n;
	    }function m(n, t) {
	      return G(t, J(W(n)));
	    }function b(n, t) {
	      return G(t, R(n));
	    }function h(n, t) {
	      for (var o = 0; o < n.length;) {
	        t.appendChild(R(n[o++]));
	      }
	    }function k(n) {
	      return G(n, J(""));
	    }function C(n, t, o) {
	      N(m(n, t), o);
	    }function D(n, t, o) {
	      N(b(n, t), o);
	    }function P(n, t, o) {
	      h(n, t), N(k(t), o);
	    }function j(n, t, o) {
	      h(n, t), N(t, o);
	    }function g(n, t, o) {
	      var e = X(n);e === Object && D(n, t, o), e === Array ? P(n, t, o) : C(W(n), t, o);
	    }function A(n, t, o) {
	      var e = X(n);e === Object ? D(n, t, o) : e === Array ? j(n, t, o) : (Q(n) && (t.textContent = n), N(t, o));
	    }function E(n, t) {
	      var o = X(n);o === Object ? b(n, t) : o === Array ? h(n, t) : Q(n) && m(n, t);
	    }function I(n, t) {
	      var o = X(n);o === Object ? b(n, t) : o === Array ? h(n, t) : Q(n) && (t.textContent = W(n));
	    }function M(n, t, o, e) {
	      g(e[n.dPtr++], n.curNode, t);
	    }function O(n, t, o) {
	      E(o[n.sPtr++], n.curNode);
	    }function S(n, t, o, e) {
	      A(e[n.dPtr++], n.curNode, t);
	    }function w(n, t, o) {
	      I(o[n.sPtr++], n.curNode);
	    }function T(n, t, o, e, r, u) {
	      for (var i = void 0, f = void 0; o--;) {
	        f = r[t.sPtr++], i = e > o ? r[t.sPtr++] : u[t.dPtr++], null != i && (n[f] = i);
	      }
	    }function z(n, t, o, e, r) {
	      var u = n.lastNode = document.createElement(q["default"][r[n.i++]]);G(n.curNode, u);var i = r[n.i++];i > 0 && T(u, n, i, r[n.i++], o, e);
	    }function L() {
	      this.root = null;
	    }function R(n) {
	      var t = n.t,
	          o = t.b,
	          e = t.s,
	          r = n.d,
	          u = new L(),
	          i = o.length,
	          f = n.contextNodes = [],
	          c = { i: 0, sPtr: 0, dPtr: 0, curNode: u, lastNode: null };do {
	        Z[o[c.i++]](c, f, e, r, o);
	      } while (i > c.i);return u.finalizeRoot(n);
	    }function B(n, t, o, e, r, u) {
	      var i = 0,
	          f = 0,
	          c = !0,
	          d = t[0],
	          a = e[0],
	          s = u,
	          l = void 0,
	          v = void 0;o--, r--;n: for (; c && !$(i, r, f, o);) {
	        for (c = !1; a.k === d.k;) {
	          if (p(a, d), i++, f++, $(i, r, f, o)) break n;a = e[i], d = t[f], c = !0;
	        }for (l = e[r], v = t[o]; l.k === v.k;) {
	          if (s = y(l, v), r--, o--, $(i, r, f, o)) break n;l = e[r], v = t[o], c = !0;
	        }for (; a.k === v.k;) {
	          if (p(a, v), l.k !== v.k && (s = H(n, v.n, s)), i++, o--, $(i, r, f, o)) break n;a = e[i], v = t[o], c = !0;
	        }for (; l.k === d.k;) {
	          if (H(n, l.n, y(l, d)), r--, f++, $(i, r, f, o)) break n;l = e[r], d = t[f], c = !0;
	        }
	      }if (o >= f || r >= i) throw "NOT IMPLEMENTED!";
	    }t.__esModule = !0;var U = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (n) {
	      return typeof n === "undefined" ? "undefined" : _typeof(n);
	    } : function (n) {
	      return n && "function" == typeof Symbol && n.constructor === Symbol ? "symbol" : typeof n === "undefined" ? "undefined" : _typeof(n);
	    };t.xrerender = _, t.xrender = R;var V = o(2),
	        q = e(V),
	        F = function F(n, t) {
	      return n.parentNode.replaceChild(t, n);
	    },
	        G = function G(n, t) {
	      return n.appendChild(t);
	    },
	        H = function H(n, t, o) {
	      return n.insertBefore(t, o);
	    },
	        J = function J(n) {
	      return document.createTextNode(n);
	    },
	        K = function K(n) {
	      return "object" !== ("undefined" == typeof n ? "undefined" : U(n));
	    },
	        Q = function Q(n) {
	      return n || 0 === n;
	    },
	        W = function W(n) {
	      return Q(n) ? n : "";
	    },
	        X = function X(n) {
	      return n && n.constructor;
	    },
	        Y = [l, s, a];L.prototype.appendChild = function (n) {
	      return this.root = n;
	    }, L.prototype.finalizeRoot = function (n) {
	      var t = this.root;return t.__xvdom = n, n.n = t;
	    };var Z = [z, function () {}, M, O, S, w, function (n) {
	      n.curNode = n.lastNode;
	    }, function (n) {
	      n.curNode = n.curNode.parentNode;
	    }, function (n, t) {
	      t.push(n.lastNode);
	    }];t["default"] = { xrender: R, xrerender: _ };var $ = function $(n, t, o, e) {
	      return n > t || o > e;
	    };
	  }, function (n, t) {
	    "use strict";
	    t.__esModule = !0, t["default"] = ["a", "b", "div", "i", "input", "span", "table", "tbody", "td", "tr"];
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