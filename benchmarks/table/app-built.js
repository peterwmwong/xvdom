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
	      return n instanceof Object ? n instanceof Array ? "array" : "object" : N(n) ? "empty" : "text";
	    }function r() {}function o() {
	      this.map = new r();
	    }function i(n, t) {
	      I(n), t.removeChild(n.$n);
	    }function u(n, t, e) {
	      for (; e < n.length;) {
	        i(n[e++], t);
	      }
	    }function c(n, t) {
	      for (var e = 0; e < n.length;) {
	        I(n[e++]);
	      }t.textContent = "";
	    }function s(n, t) {
	      return n.$s === t.$s && (t.$s.u(t, n), !0);
	    }function a(n, t, e, r) {
	      null == r ? f(n, t, e) : p(n, t, e, r);
	    }function p(n, t, e, r) {
	      for (; e < t.length;) {
	        n.insertBefore((t[e] = D(t[e])).$n, r), ++e;
	      }
	    }function f(n, t, e) {
	      for (; e < t.length;) {
	        n.appendChild((t[e] = D(t[e])).$n), ++e;
	      }
	    }function d(n, t, e, r) {
	      for (var o = 0; o < t.length && o < e.length; o++) {
	        t[o] = P(e[o], t[o]);
	      }o < t.length ? a(n, t, o, r) : u(e, n, o);
	    }function h(n, t, e) {
	      t.length ? e.length ? d(n, t, e, null) : f(n, t, 0) : c(e, n);
	    }function l(n, t, e) {
	      var r = A(n, e.parentNode, t);return L(e, r), r;
	    }function m(n, t, e) {
	      return n instanceof Object ? l(e, n, t) : (t.nodeValue = N(n) ? "" : n, t);
	    }function v(n, t, e, r) {
	      var o = void 0;return n && s(o = r.$r || r, n) ? (n.$r = o, t) : l(e, n, t);
	    }function x(n, t, e, r) {
	      var o = t.xvdomContext;return n instanceof Array ? (e ? h(o, n, r) : d(o.parentNode, n, r, o), t) : e ? (c(r, o), o.appendChild(A(!0, o, n))) : (u(r, o.parentNode, 0), l(!1, n, o));
	    }function y(n, t, e) {
	      var r = document.createDocumentFragment();return f(r, n, 0), r.xvdomContext = e ? t : r.appendChild(S("")), r;
	    }function $(n, t, e, o) {
	      this._boundActions = new r(), this._parentInst = e, this.actions = o, this.props = t, this.render = n, this.bindSend = this.bindSend.bind(this), this.state = o.onInit(this), this.$n = j(this._instance = n(this));
	    }function b(n, t, e, r) {
	      return new $(n, t, e, r);
	    }function C(n, t) {
	      var e = n(t);return j(e), e;
	    }function _(n, t, e, r) {
	      var o = (t ? b : C)(n, e || w, r, t);return o;
	    }function g(n, t, e, r) {
	      var o = t ? r.updateProps(e) : P(r, n(e));return o;
	    }function j(n) {
	      var t = n.$s.c(n);return n.$n = t, t.xvdom = n, t;
	    }function D(n) {
	      var t = n.$s,
	          e = t.r.pop(n.key);return e ? (t.u(n, e), e) : (j(n), n);
	    }function A(n, t, r) {
	      return T[e(r)](r, t, n);
	    }function O(n, t, r, o) {
	      return B[e(t)](r, o, n, t);
	    }function P(n, t) {
	      return s(n, t) ? n : (L(n.$n, (t = D(t)).$n), I(n), t);
	    }t.__esModule = !0, t.createComponent = _;var N = function N(n) {
	      return null == n || n === !0 || n === !1;
	    },
	        w = {},
	        E = t.DEADPOOL = { push: function push() {}, pop: function pop() {} };r.prototype = Object.create(null), o.prototype.push = function (n) {
	      var t = n.key,
	          e = this.map;n.$x = e[t], e[t] = n;
	    }, o.prototype.pop = function (n) {
	      var t = this.map[n];if (t) return this.map[n] = t.$x, t;
	    };var I = function I(n) {
	      n.$s.r.push(n);
	    },
	        S = function S(n) {
	      return document.createTextNode(n);
	    },
	        k = function k() {
	      return S("");
	    },
	        L = function L(n, t) {
	      var e = n.parentNode;e && e.replaceChild(t, n);
	    };$.prototype.updateProps = function (n) {
	      var t = this.props;return this.props = n, this.actions.onProps ? this.send("onProps", t) : this.rerender(), this;
	    }, $.prototype.bindSend = function (n) {
	      return this._boundActions[n] || (this._boundActions[n] = this.send.bind(this, n));
	    }, $.prototype.send = function (n, t) {
	      var e = void 0,
	          r = this.actions[n];r && (e = r(this, t)) != this.state && (this.state = e, this.rerender());
	    }, $.prototype.rerender = function () {
	      var n = P(this._instance, this.render(this));this._instance = n, n.$n.xvdom = this._parentInst;
	    };var T = { text: S, object: j, array: y, empty: k },
	        B = { text: m, object: v, array: x, empty: m },
	        F = t.render = function (n) {
	      return D(n).$n;
	    },
	        M = t.rerender = function (n, t) {
	      return P(n.xvdom, t).$n;
	    },
	        V = t.unmount = function (n) {
	      i(n.xvdom, n.parentNode);
	    };t.default = { createComponent: _, createDynamic: A, el: function el(n) {
	        return document.createElement(n);
	      }, render: F, rerender: M, unmount: V, updateComponent: g, updateDynamic: O, Pool: o, DEADPOOL: E };t._ = { rerenderText: m, rerenderDynamic: l };
	  }]);
	});

/***/ }
/******/ ]);