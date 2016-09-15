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

	var _perfMonitor = __webpack_require__(2);

	var _xvdomMin = __webpack_require__(3);

	var _xvdomMin2 = _interopRequireDefault(_xvdomMin);

	var _data = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _xvdomSpec3 = {
	  b: [0, 6, 1, 1, 6, 0, 7, 0, 6, 4],
	  s: ['className', 'table table-striped latest-data'],
	  u: [2, 0, 0]
	};
	var _xvdomSpec2 = {
	  b: [0, 9, 0, 6, 0, 8, 1, 1, 6, 4, 7, 0, 8, 1, 1, 6, 0, 5, 1, 0, 8, 6, 4, 7, 7, 2],
	  s: ['className', 'dbname', 'className', 'query-count', 'className'],
	  u: [2, 0, 0, 0, 4, 1, 2, 0, 2, 1, 0, 3]
	};
	var _xvdomSpec = {
	  b: [0, 8, 1, 0, 8, 6, 2, 0, 2, 1, 1, 6, 0, 2, 1, 1, 6, 4, 7, 0, 2, 1, 1],
	  s: ['className', 'className', 'popover left', 'className', 'popover-content', 'className', 'arrow'],
	  u: [0, 0, 0, 1, 0, 1, 2, 0, 2]
	};


	var MUTATION_RATE = 0.5;
	var dbs = new _data.DatabaseList(50);

	var entryFormatElapsed = function entryFormatElapsed(v) {
	  return v.toFixed(2);
	};

	var counterClasses = function counterClasses(count) {
	  return count >= 20 ? 'label label-important' : count >= 10 ? 'label label-warning' : 'label label-success';
	};

	var queryClasses = function queryClasses(elapsed) {
	  return elapsed >= 20 ? 'Query elapsed warn_long' : elapsed >= 10 ? 'Query elapsed warn' : 'Query elapsed short';
	};

	var map = function map(array, fn) {
	  var length = array.length;
	  var newArray = new Array(length);
	  var i = 0;
	  while (i < length) {
	    newArray[i] = fn(array[i], i);
	    ++i;
	  }
	  return newArray;
	};

	var renderQuery = function renderQuery(_ref, j) {
	  var elapsed = _ref.elapsed;
	  var query = _ref.query;
	  return {
	    t: _xvdomSpec,
	    d: [queryClasses(elapsed), elapsed && entryFormatElapsed(elapsed), query],
	    k: j
	  };
	};

	var renderDatabase = function renderDatabase(db, i) {
	  var count = db.queries.length;
	  return {
	    t: _xvdomSpec2,
	    d: [db.name, counterClasses(count), count, map(db.getTopFiveQueries(), renderQuery)],
	    k: i
	  };
	};

	var renderTable = function renderTable(data) {
	  return {
	    t: _xvdomSpec3,
	    d: [map(data, renderDatabase)]
	  };
	};

	var dbmonApp = void 0;
	(0, _perfMonitor.startFPSMonitor)();
	(0, _perfMonitor.initProfiler)('data');
	(0, _perfMonitor.initProfiler)('view');

	var render = function render() {
	  (0, _perfMonitor.startProfile)('data');
	  dbs.randomUpdate(MUTATION_RATE);
	  (0, _perfMonitor.endProfile)('data');

	  (0, _perfMonitor.startProfile)('view');
	  _xvdomMin2.default.xrerender(dbmonApp, renderTable(dbs.dbs));
	  (0, _perfMonitor.endProfile)('view');

	  requestAnimationFrame(render);
	};

	window.app.appendChild(dbmonApp = _xvdomMin2.default.xrender(renderTable(dbs.dbs)));
	requestAnimationFrame(render);

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	var MONITOR_GRAPH_HEIGHT = 30;
	var MONITOR_GRAPH_WIDTH = 100;
	var MAX_SAMPLES = MONITOR_GRAPH_WIDTH;
	var container = null;
	var initialized = false;
	var frameTasks = [];
	var rafId = -1;
	/**
	 * Initialize Performance Monitor
	 */
	function initPerfMonitor(options) {
	    if (!initialized) {
	        if (options.container) {
	            container = options.container;
	        }
	        initialized = true;
	    }
	}
	exports.initPerfMonitor = initPerfMonitor;
	/**
	 * Check that everything is properly initialized
	 */
	function checkInit() {
	    if (!container) {
	        container = document.createElement('div');
	        container.style.cssText = 'position: fixed;' + 'opacity: 0.9;' + 'right: 0;' + 'bottom: 0';
	        document.body.appendChild(container);
	    }
	    initialized = true;
	}
	/**
	 * Schedule new task that will be executed on the next frame
	 */
	function scheduleTask(task) {
	    frameTasks.push(task);
	    if (rafId === -1) {
	        requestAnimationFrame(function (t) {
	            rafId = -1;
	            var tasks = frameTasks;
	            frameTasks = [];
	            for (var i = 0; i < tasks.length; i++) {
	                tasks[i]();
	            }
	        });
	    }
	}
	var Result = function () {
	    function Result(min, max, mean, now) {
	        this.min = min;
	        this.max = max;
	        this.mean = mean;
	        this.now = now;
	    }
	    return Result;
	}();
	/**
	 * Data object contains all data samples
	 */
	var Data = function () {
	    function Data() {
	        this.samples = [];
	        this.maxSamples = MONITOR_GRAPH_WIDTH;
	    }
	    Data.prototype.addSample = function (v) {
	        if (this.samples.length === this.maxSamples) {
	            this.samples.shift();
	        }
	        this.samples.push(v);
	    };
	    Data.prototype.calc = function () {
	        var min = this.samples[0];
	        var max = this.samples[0];
	        var sum = 0;
	        for (var i = 0; i < this.samples.length; i++) {
	            var k = this.samples[i];
	            if (k < min) {
	                min = k;
	            }
	            if (k > max) {
	                max = k;
	            }
	            sum += k;
	        }
	        var now = this.samples[this.samples.length - 1];
	        var mean = sum / this.samples.length;
	        return new Result(min, max, mean, now);
	    };
	    return Data;
	}();
	var MonitorWidget = function () {
	    function MonitorWidget(name, unitName, flags) {
	        var _this = this;
	        if (flags === void 0) {
	            flags = 0;
	        }
	        this._syncView = function () {
	            var result = _this.results[_this.results.length - 1];
	            var scale = MONITOR_GRAPH_HEIGHT / (result.max * 1.2);
	            _this.text.innerHTML = '' + ((_this.flags & 1 /* HideMin */) === 0 ? "<div>min: &nbsp;" + result.mean.toFixed(2) + _this.unitName + "</div>" : '') + ((_this.flags & 2 /* HideMax */) === 0 ? "<div>max: &nbsp;" + result.max.toFixed(2) + _this.unitName + "</div>" : '') + ((_this.flags & 4 /* HideMean */) === 0 ? "<div>mean: " + result.mean.toFixed(2) + _this.unitName + "</div>" : '') + ((_this.flags & 8 /* HideNow */) === 0 ? "<div>now: &nbsp;" + result.now.toFixed(2) + _this.unitName + "</div>" : '');
	            if ((_this.flags & 16 /* HideGraph */) === 0) {
	                _this.ctx.fillStyle = '#010';
	                _this.ctx.fillRect(0, 0, MONITOR_GRAPH_WIDTH, MONITOR_GRAPH_HEIGHT);
	                _this.ctx.fillStyle = '#0f0';
	                for (var i = 0; i < _this.results.length; i++) {
	                    _this.ctx.fillRect(i, MONITOR_GRAPH_HEIGHT, 1, -(_this.results[i].now * scale));
	                }
	            }
	            _this._dirty = false;
	        };
	        this.name = name;
	        this.unitName = unitName;
	        this.flags = flags;
	        this.results = [];
	        this.element = document.createElement('div');
	        this.element.style.cssText = 'padding: 2px;' + 'background-color: #020;' + 'font-family: monospace;' + 'font-size: 12px;' + 'color: #0f0';
	        this.label = document.createElement('div');
	        this.label.style.cssText = 'text-align: center';
	        this.label.textContent = this.name;
	        this.text = document.createElement('div');
	        this.element.appendChild(this.label);
	        this.element.appendChild(this.text);
	        if ((flags & 16 /* HideGraph */) === 0) {
	            this.canvas = document.createElement('canvas');
	            this.canvas.style.cssText = 'display: block; padding: 0; margin: 0';
	            this.canvas.width = MONITOR_GRAPH_WIDTH;
	            this.canvas.height = MONITOR_GRAPH_HEIGHT;
	            this.ctx = this.canvas.getContext('2d');
	            this.element.appendChild(this.canvas);
	        } else {
	            this.canvas = null;
	            this.ctx = null;
	        }
	        this._dirty = false;
	    }
	    MonitorWidget.prototype.addResult = function (result) {
	        if (this.results.length === MONITOR_GRAPH_WIDTH) {
	            this.results.shift();
	        }
	        this.results.push(result);
	        this.invalidate();
	    };
	    MonitorWidget.prototype.invalidate = function () {
	        if (!this._dirty) {
	            this._dirty = true;
	            scheduleTask(this._syncView);
	        }
	    };
	    return MonitorWidget;
	}();
	/**
	 * Start FPS monitor
	 */
	function startFPSMonitor() {
	    checkInit();
	    var data = new Data();
	    var w = new MonitorWidget('FPS', 'fps', 2 /* HideMax */ | 1 /* HideMin */ | 4 /* HideMean */);
	    container.appendChild(w.element);
	    var samples = [];
	    var last = 0;
	    function update(now) {
	        var elapsed = (now - (last === 0 ? now : last)) / 1000;
	        var fps = 1 / elapsed;
	        if (fps !== Infinity) {
	            if (samples.length === 64) {
	                samples.shift();
	            }
	            samples.push(fps);
	            var sum = 0;
	            for (var i = 0; i < samples.length; i++) {
	                sum += samples[i];
	            }
	            var mean = sum / samples.length;
	            data.addSample(mean);
	            w.addResult(data.calc());
	        }
	        last = now;
	        requestAnimationFrame(update);
	    }
	    requestAnimationFrame(update);
	}
	exports.startFPSMonitor = startFPSMonitor;
	/**
	 * Start Memory Monitor
	 */
	function startMemMonitor() {
	    if (performance.memory !== void 0) {
	        var data_1;
	        var w_1;
	        var mem_1;

	        (function () {
	            var update = function update() {
	                data_1.addSample(Math.round(mem_1.usedJSHeapSize / (1024 * 1024)));
	                w_1.addResult(data_1.calc());
	                setTimeout(update, 30);
	            };

	            data_1 = new Data();
	            w_1 = new MonitorWidget('Memory', 'MB', 1 /* HideMin */ | 4 /* HideMean */);

	            container.appendChild(w_1.element);
	            mem_1 = performance.memory;

	            update();
	        })();
	    }
	}
	exports.startMemMonitor = startMemMonitor;
	var Profiler = function () {
	    function Profiler(name, unitName) {
	        this.data = new Data();
	        this.widget = new MonitorWidget(name, unitName);
	        this.startTime = 0;
	    }
	    return Profiler;
	}();
	var profilerInstances = {};
	function startProfile(name) {
	    var profiler = profilerInstances[name];
	    if (profiler !== void 0) {
	        profiler.startTime = performance.now();
	    }
	}
	exports.startProfile = startProfile;
	function endProfile(name) {
	    var now = performance.now();
	    var profiler = profilerInstances[name];
	    if (profiler !== void 0) {
	        profiler.data.addSample(now - profiler.startTime);
	        profiler.widget.addResult(profiler.data.calc());
	    }
	}
	exports.endProfile = endProfile;
	/**
	 * Initialize profiler and insert into container
	 */
	function initProfiler(name) {
	    var profiler = profilerInstances[name];
	    if (profiler === void 0) {
	        profilerInstances[name] = profiler = new Profiler(name, 'ms');
	        container.appendChild(profiler.widget.element);
	    }
	}
	exports.initProfiler = initProfiler;

/***/ },
/* 3 */
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module)))

/***/ },
/* 4 */
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

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Query = exports.Query = function () {
	  function Query(elapsed, query) {
	    _classCallCheck(this, Query);

	    this.elapsed = elapsed;
	    this.query = query;
	  }

	  Query.rand = function rand() {
	    var elapsed = Math.random() * 15;
	    var query = void 0;

	    if (Math.random() < 0.1) {
	      query = 'vacuum';
	    } else if (Math.random() < 0.2) {
	      query = '<IDLE> in transaction';
	    } else {
	      query = 'SELECT blah FROM something';
	    }

	    return new Query(elapsed, query);
	  };

	  return Query;
	}();

	;

	var EMPTY_QUERY = new Query(0.0, '');

	var DB_nextId = 0;

	var DB = exports.DB = function () {
	  function DB(name) {
	    _classCallCheck(this, DB);

	    this.id = DB_nextId++;
	    this.name = name;
	    this.queries = null;

	    this.update();
	  }

	  DB.prototype.update = function update() {
	    var queries = [];
	    var r = Math.floor(Math.random() * 10 + 1);
	    var j = 0;
	    for (; j < r; j++) {
	      queries.push(Query.rand());
	    }

	    this.queries = queries;
	  };

	  DB.prototype.getTopFiveQueries = function getTopFiveQueries() {
	    var qs = this.queries.slice();
	    qs.sort(function (a, b) {
	      return a.elapsed - b.elapsed;
	    });
	    qs = qs.slice(0, 5);
	    while (qs.length < 5) {
	      qs.push(EMPTY_QUERY);
	    }
	    return qs;
	  };

	  return DB;
	}();

	var DatabaseList = exports.DatabaseList = function () {
	  function DatabaseList(n) {
	    _classCallCheck(this, DatabaseList);

	    this.dbs = [];
	    var i = 0;
	    for (; i < n; i++) {
	      this.dbs.push(new DB('cluster' + i));
	      this.dbs.push(new DB('cluster' + i + 'slave'));
	    }
	  }

	  DatabaseList.prototype.update = function update() {
	    var dbs = this.dbs;
	    var i = 0;
	    for (; i < dbs.length; i++) {
	      dbs[i] = new DB(dbs[i].name);
	    }
	  };

	  DatabaseList.prototype.randomUpdate = function randomUpdate(r) {
	    var dbs = this.dbs;
	    var i = 0;
	    for (; i < dbs.length; i++) {
	      if (Math.random() < r) {
	        dbs[i] = new DB(dbs[i].name);
	      }
	    }
	  };

	  return DatabaseList;
	}();

/***/ }
/******/ ]);