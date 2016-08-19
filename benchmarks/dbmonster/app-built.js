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
	  b: [0, 6, 1, 1, 4, 0, 7, 0, 4, 0, 9, 0, 4, 0, 8, 0, 4, 3],
	  s: ['className', 'table table-striped latest-data', 'Hello world'],
	  u: []
	};
	var _xvdomSpec2 = {
	  b: [0, 9, 0, 4, 0, 8, 1, 1, 4, 2, 5, 0, 8, 1, 1, 4, 0, 5, 1, 0, 6, 4, 2, 5, 5, 2],
	  s: ['className', 'dbname', 'className', 'query-count', 'className'],
	  u: [1, 0, 0, 262145, 1, 2, 1, 3]
	};
	var _xvdomSpec = {
	  b: [0, 8, 1, 0, 6, 4, 2, 0, 2, 1, 1, 4, 0, 2, 1, 1, 4, 2, 5, 0, 2, 1, 1],
	  s: ['className', 'className', 'popover left', 'className', 'popover-content', 'className', 'arrow'],
	  u: [0, 0, 1, 1, 1, 2]
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
	    d: [queryClasses(elapsed), elapsed && entryFormatElapsed(elapsed), query]
	  };
	};

	var renderDatabase = function renderDatabase(db, i) {
	  var count = db.queries.length;
	  return {
	    t: _xvdomSpec2,
	    d: [db.name, counterClasses(count), count, map(db.getTopFiveQueries(), renderQuery)]
	  };
	};
	// const renderTable = (data)=>
	//   <table className="table table-striped latest-data">
	//     <tbody>
	//     {map(data, renderDatabase)}
	//     </tbody>
	//   </table>;

	var renderTable = function renderTable(data) {
	  return {
	    t: _xvdomSpec3,
	    d: []
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

	!function (e, n) {
	  "object" == ( false ? "undefined" : _typeof(exports)) && "object" == ( false ? "undefined" : _typeof(module)) ? module.exports = n() :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (n), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.xvdom = n() : e.xvdom = n();
	}(undefined, function () {
	  return function (e) {
	    function n(r) {
	      if (t[r]) return t[r].exports;var o = t[r] = { exports: {}, id: r, loaded: !1 };return e[r].call(o.exports, o, o.exports, n), o.loaded = !0, o.exports;
	    }var t = {};return n.m = e, n.c = t, n.p = "", n(0);
	  }([function (e, n, t) {
	    e.exports = t(1);
	  }, function (e, n) {
	    "use strict";
	    function t() {}function r() {
	      this.map = new t();
	    }function o(e, n, t) {
	      switch (n && n.constructor) {case String:case Number:case 0:
	          return t.nodeValue = n, t;case Object:case Array:
	          return j(e, n, t);default:
	          return t.nodeValue = "", t;}
	    }function u(e, n, t, r) {
	      switch (n && n.constructor) {case Array:
	          return L(e, t, n, r.xvdomContext) || r;case Object:
	          return M(e, t, n, r);default:
	          return o(e, t, r);}
	    }function c(e, n, t) {
	      var r = void 0;switch (t && t.constructor) {case String:case Number:case 0:
	          r = m(t);break;case Object:case Array:
	          throw "NOT IMPLEMENTED YET";default:
	          r = m("");}e.push(r), G(n, r);
	    }function i(e, n, t) {
	      c(e.contextNodes, e.curNode, t[e.dPtr++]);
	    }function a(e, n) {
	      c(e.contextNodes, e.curNode, n[e.sPtr++]);
	    }function d(e, n, t, r, o, u, c) {
	      for (var i = void 0, a = void 0; r--;) {
	        a = u[n.sPtr++], i = o > r ? u[n.sPtr++] : c[n.dPtr++], null != i && (e[a] = i);
	      }
	    }function f(e, n, t, r) {
	      var o = e.lastNode = G(e.curNode, document.createElement(h[r[e.i++]])),
	          u = r[e.i++];u > 0 && d(o, e, r, u, r[e.i++], n, t);
	    }function s() {
	      this.root = null;
	    }function p(e, n, t, r, o) {
	      r !== o && (n[t[e >> 16]] = r);
	    }function l(e, n, t, r, o) {
	      if (r !== o) switch (r && r.constructor) {case String:case Number:case 0:
	          console.log(n), n.textContent = r;break;case Object:case Array:
	          throw "NOT IMPLEMENTED YET";default:
	          node = m("");}
	    }function v(e) {
	      var n = e.t,
	          t = n.b,
	          r = n.s,
	          o = e.d,
	          u = new s(),
	          c = t.length,
	          i = { i: 0, sPtr: 0, dPtr: 0, curNode: u, lastNode: null, contextNodes: e.contextNodes = [] };do {
	        R[t[i.i++]](i, r, o, t);
	      } while (c > i.i);var a = u.root;return a.__xvdom = e, a;
	    }function x(e, n) {
	      for (var t = n.t, r = t.u, o = t.s, u = n.d, c = e.__xvdom, i = c.contextNodes, a = c.d, d = r.length, f = 0, s = 0, p = void 0; d > f;) {
	        q[r[f++]](p = r[f++], i[65535 & p], o, u[s], a[s++]);
	      }
	    }n.__esModule = !0, n.xrender = v, n.xrerender = x;var h = n.REF_TO_TAG = ["a", "b", "div", "i", "input", "span", "table", "tbody", "td", "tr"];t.prototype = Object.create(null);var y = (new t(), n.DEADPOOL = { push: function push() {}, pop: function pop() {} });r.prototype.push = function (e) {
	      var n = e.key,
	          t = this.map;e.$x = t[n], t[n] = e;
	    }, r.prototype.pop = function (e) {
	      var n = this.map[e];if (n) return this.map[e] = n.$x, n;
	    };var N = function N(e) {
	      e.$s.r.push(e);
	    },
	        m = function m(e) {
	      return document.createTextNode(e);
	    },
	        $ = function $(e, n) {
	      var t = e.parentNode;t && t.replaceChild(n, e);
	    },
	        b = function b(e, n, t) {
	      return t ? e.insertBefore(n, t) : e.appendChild(n);
	    },
	        k = function k(e, n) {
	      N(e), n.removeChild(e.$n);
	    },
	        g = function g(e, n) {
	      for (var t = e.length, r = 0; t > r;) {
	        k(e[r++], n);
	      }
	    },
	        E = function E(e, n) {
	      for (var t = e.length, r = 0; t > r;) {
	        N(e[r++]);
	      }n.textContent = "";
	    },
	        O = function O(e, n) {
	      return n.$s === e.$s && (e.$s.u(e, n), !0);
	    },
	        P = function P(e, n, t, r) {
	      for (var o = 0; t > o;) {
	        b(e, (n[o] = I(n[o])).$n, r), ++o;
	      }
	    },
	        w = function w(e, n, t) {
	      for (var r = 0; t > r;) {
	        e.appendChild((n[r] = I(n[r])).$n), ++r;
	      }
	    },
	        C = function C(e, n, t, r, o, u, c, i, a) {
	      for (var d = new Map(), f = i.$n, s = void 0, p = void 0, l = void 0; a >= c;) {
	        s = t[c++], d.set(s.key, s);
	      }for (; o >= r;) {
	        l = n[r], p = l.key, s = d.get(p), s ? (s === i && (f = f.nextSibling), d["delete"](p), l = Y(s, l)) : l = I(l), n[r] = l, b(e, l.$n, f), ++r;
	      }d.forEach(function (n) {
	        k(n, e);
	      });
	    },
	        T = function T(e, n, t, r, o, u, c, i, a, d, f, s) {
	      if (i > d) for (; u >= r;) {
	        o = n[r], b(e, (n[r] = I(o)).$n, s), ++r;
	      } else if (r > u) for (; d >= i;) {
	        k(t[i++], e);
	      } else C(e, n, t, r, u, a, i, f, d);
	    },
	        A = function A(e, n, t, r, o, u) {
	      var c = 0,
	          i = 0,
	          a = !0,
	          d = n[0],
	          f = r[0],
	          s = u,
	          p = void 0,
	          l = void 0,
	          v = void 0;t--, o--;e: for (; a && o >= c && t >= i;) {
	        for (a = !1; f.key === d.key;) {
	          if (n[i] = Y(f, d), c++, i++, c > o || i > t) break e;f = r[c], d = n[i], a = !0;
	        }for (p = r[o], l = n[t]; p.key === l.key;) {
	          if (s = (n[t] = Y(p, l)).$n, o--, t--, c > o || i > t) break e;p = r[o], l = n[t], a = !0;
	        }for (; f.key === l.key;) {
	          if (v = (n[t] = Y(f, l)).$n, p.key !== l.key && (s = b(e, v, s)), c++, t--, c > o || i > t) break e;f = r[c], l = n[t], a = !0;
	        }for (; p.key === d.key;) {
	          if (b(e, (n[i] = Y(p, d)).$n, f.$n), o--, i++, c > o || i > t) break e;p = r[o], d = n[i], a = !0;
	        }
	      }(t >= i || o >= c) && T(e, n, r, i, d, t, l, c, f, o, p, s);
	    },
	        D = function D(e, n, t) {
	      var r = e.parentNode,
	          o = n.length,
	          u = t.length;o ? u ? A(r, n, o, t, u, e) : P(r, n, o, e) : g(t, r);
	    },
	        _ = function _(e, n, t) {
	      var r = n.length,
	          o = t.length;r ? o ? A(e, n, r, t, o, null) : w(e, n, r) : E(t, e);
	    },
	        j = function j(e, n, t) {
	      var r = i(e, t.parentNode, n);return $(t, r), r;
	    },
	        M = function M(e, n, t, r) {
	      var o = void 0;return n && O(n, o = t.$r || t) ? (n.$r = o, r) : j(e, n, r);
	    },
	        L = function L(e, n, t, r) {
	      return n instanceof Array ? void (e ? _(r, n, t) : D(r, n, t)) : e ? (E(t, r), r.appendChild(i(!0, r, n))) : (g(t, r.parentNode), j(!1, n, r));
	    },
	        S = function S(e) {
	      var n = e.$s.c(e);return e.$n = n, n.xvdom = e, n;
	    },
	        I = function I(e) {
	      var n = e.$s,
	          t = n.r.pop(e.key);return t ? (n.u(e, t), t) : (S(e), e);
	    },
	        V = n.render = function (e) {
	      return I(e).$n;
	    },
	        Y = function Y(e, n) {
	      return O(n, e) ? e : (n = I(n), $(e.$n, n.$n), N(e), n);
	    },
	        B = n.rerender = function (e, n) {
	      return Y(e.xvdom, n).$n;
	    },
	        F = n.unmount = function (e) {
	      k(e.xvdom, e.parentNode);
	    },
	        G = function G(e, n) {
	      return e.appendChild(n);
	    };s.prototype.appendChild = function (e) {
	      return this.root = e;
	    };var R = [f, function () {}, i, a, function (e) {
	      e.curNode = e.lastNode;
	    }, function (e) {
	      e.curNode = e.curNode.parentNode;
	    }, function (e) {
	      e.contextNodes.push(e.lastNode);
	    }],
	        q = [p, l];n["default"] = { createDynamic: i, el: function el(e) {
	        return document.createElement(e);
	      }, render: V, rerender: B, xrender: v, xrerender: x, unmount: F, updateDynamic: u, Pool: r, DEADPOOL: y };n._ = { rerenderText: o, rerenderInstance: M, rerenderDynamic: j, rerenderArray: L };
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