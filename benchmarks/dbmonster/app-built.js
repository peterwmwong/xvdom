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
	  c: function c(inst) {
	    var _n = document.createElement('table'),
	        _n2;

	    _n.className = 'table table-striped latest-data';
	    _n2 = document.createElement('tbody');

	    _n2.appendChild(_xvdomMin2.default.createDynamic(true, _n2, inst.a, inst, 'b', 'c'));

	    _n.appendChild(_n2);

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    if (inst.a !== pInst.a) {
	      pInst.a = pInst.b(true, inst.a, pInst.a, pInst.c, pInst, 'b', 'c');
	    }
	  },
	  r: _xvdomMin2.default.DEADPOOL
	};
	var _xvdomSpec2 = {
	  c: function c(inst) {
	    var _n = document.createElement('tr'),
	        _n2,
	        _n3;

	    _n2 = document.createElement('td');
	    _n2.className = 'dbname';

	    _n2.appendChild(_xvdomMin2.default.createDynamic(true, _n2, inst.a, inst, 'b', 'c'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('td');
	    _n2.className = 'query-count';
	    _n3 = document.createElement('span');
	    inst.e = _n3;
	    _n3.className = inst.d;

	    _n3.appendChild(_xvdomMin2.default.createDynamic(true, _n3, inst.f, inst, 'g', 'h'));

	    _n2.appendChild(_n3);

	    _n.appendChild(_n2);

	    _n.appendChild(_xvdomMin2.default.createDynamic(false, _n, inst.i, inst, 'j', 'k'));

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    if (inst.a !== pInst.a) {
	      pInst.a = pInst.b(true, inst.a, pInst.a, pInst.c, pInst, 'b', 'c');
	    }

	    if (inst.d !== pInst.d) {
	      pInst.e.className = inst.d;
	      pInst.d = inst.d;
	    }

	    if (inst.f !== pInst.f) {
	      pInst.f = pInst.g(true, inst.f, pInst.f, pInst.h, pInst, 'g', 'h');
	    }

	    if (inst.i !== pInst.i) {
	      pInst.i = pInst.j(false, inst.i, pInst.i, pInst.k, pInst, 'j', 'k');
	    }
	  },
	  r: _xvdomMin2.default.DEADPOOL
	};
	var _xvdomSpec = {
	  c: function c(inst) {
	    var _n = document.createElement('td'),
	        _n2,
	        _n3;

	    inst.b = _n;
	    _n.className = inst.a;

	    _n.appendChild(_xvdomMin2.default.createDynamic(false, _n, inst.c, inst, 'd', 'e'));

	    _n2 = document.createElement('div');
	    _n2.className = 'popover left';
	    _n3 = document.createElement('div');
	    _n3.className = 'popover-content';

	    _n3.appendChild(_xvdomMin2.default.createDynamic(true, _n3, inst.f, inst, 'g', 'h'));

	    _n2.appendChild(_n3);

	    _n3 = document.createElement('div');
	    _n3.className = 'arrow';

	    _n2.appendChild(_n3);

	    _n.appendChild(_n2);

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    if (inst.a !== pInst.a) {
	      pInst.b.className = inst.a;
	      pInst.a = inst.a;
	    }

	    if (inst.c !== pInst.c) {
	      pInst.c = pInst.d(false, inst.c, pInst.c, pInst.e, pInst, 'd', 'e');
	    }

	    if (inst.f !== pInst.f) {
	      pInst.f = pInst.g(true, inst.f, pInst.f, pInst.h, pInst, 'g', 'h');
	    }
	  },
	  r: _xvdomMin2.default.DEADPOOL
	};


	var MUTATION_RATE = 0.5;
	var N = 50;
	var dbs = new _data.DatabaseList(N);

	var entryFormatElapsed = function entryFormatElapsed(v) {
	  return v <= 60 ? v.toFixed(2) : (v / 60 | 0) + ':' + v % 60;
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
	    $s: _xvdomSpec,
	    a: queryClasses(elapsed),
	    c: elapsed && entryFormatElapsed(elapsed),
	    f: query,
	    key: j
	  };
	};

	var renderDatabase = function renderDatabase(db, i) {
	  var count = db.queries.length;
	  return {
	    $s: _xvdomSpec2,
	    a: db.name,
	    d: counterClasses(count),
	    f: count,
	    i: map(db.getTopFiveQueries(), renderQuery),
	    key: i
	  };
	};
	var renderTable = function renderTable(data) {
	  return {
	    $s: _xvdomSpec3,
	    a: map(data, renderDatabase)
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
	  _xvdomMin2.default.rerender(dbmonApp, renderTable(dbs.dbs));
	  (0, _perfMonitor.endProfile)('view');

	  requestAnimationFrame(render);
	};

	window.app.appendChild(dbmonApp = _xvdomMin2.default.render(renderTable(dbs.dbs)));
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

	!function (n, e) {
	  "object" == ( false ? "undefined" : _typeof(exports)) && "object" == ( false ? "undefined" : _typeof(module)) ? module.exports = e() :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (e), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.xvdom = e() : n.xvdom = e();
	}(undefined, function () {
	  return function (n) {
	    function e(t) {
	      if (r[t]) return r[t].exports;var o = r[t] = { exports: {}, id: t, loaded: !1 };return n[t].call(o.exports, o, o.exports, e), o.loaded = !0, o.exports;
	    }var r = {};return e.m = n, e.c = r, e.p = "", e(0);
	  }([function (n, e, r) {
	    n.exports = r(1);
	  }, function (n, e) {
	    "use strict";
	    e.__esModule = !0;var r = { $p: null },
	        t = document.createComment(""),
	        o = e.DEADPOOL = { push: function push() {}, pop: function pop() {} },
	        u = e.Pool = function () {
	      var n = new Map();return { push: function push(e) {
	          var r = e.key;e.$x = n.get(r), n.set(r, e);
	        }, pop: function pop(e) {
	          var r = n.get(e);return r ? (n.set(e, r.$x), r) : void 0;
	        } };
	    },
	        i = function i(n) {
	      n.$s.r.push(n);
	    },
	        c = function c() {
	      return t.cloneNode(!1);
	    },
	        f = function f(n, e) {
	      var r = n.parentNode;r && r.replaceChild(e, n);
	    },
	        a = function a(n, e, r) {
	      return r ? n.insertBefore(e, r) : n.appendChild(e);
	    },
	        d = function d(n, e) {
	      i(n), e.removeChild(n.$n);
	    },
	        $ = function $(n, e) {
	      for (var r = n.length, t = 0; r > t;) {
	        d(n[t++], e);
	      }
	    },
	        p = function p(n, e) {
	      for (var r = n.length, t = 0; r > t;) {
	        i(n[t++]);
	      }e.textContent = "";
	    },
	        l = function l(n, e) {
	      return e.$s === n.$s && (n.$s.u(n, e), !0);
	    },
	        v = function v(n, e, r, t, o) {
	      if (!l(e, r)) {
	        var u = w(e),
	            c = t.$n;e.$c = r.$c, e.$t = r.$t, e.$p = r.$p, e.$a = n, t.$n = u, t[o] = e, n.$$instance = e, u.xvdom = t, f(c, u), i(e);
	      }
	    },
	        s = function s(n, e, r, t, o) {
	      var u = n.$$instance,
	          i = n.$$doRerender,
	          c = u.$p,
	          f = u.$t;n.$$doRerender = !1;var a = u.$t = e.apply(void 0, [c, f, n].concat(o));return n.$$doRerender = i, f !== a && i && v(n, u.$c(c, a, n), u, r, t), a;
	    },
	        m = function m(n, e, r, t) {
	      return function () {
	        for (var o = arguments.length, u = Array(o), i = 0; o > i; i++) {
	          u[i] = arguments[i];
	        }return s(n, e, r, t, u);
	      };
	    },
	        y = function y(n, e, t) {
	      var o = { $$doRerender: !1, $$instance: r };for (var u in n) {
	        o[u] = m(o, n[u], e, t);
	      }return o;
	    },
	        x = function x(n, e, r, t) {
	      for (var o = 0; r > o;) {
	        a(n, (e[o] = _(e[o])).$n, t), ++o;
	      }
	    },
	        h = function h(n, e, r) {
	      for (var t = 0; r > t;) {
	        n.appendChild((e[t] = _(e[t])).$n), ++t;
	      }
	    },
	        k = function k(n, e, r, t, o, u, i, c, f) {
	      for (var $ = new Map(), p = c.$n, l = void 0, v = void 0, s = void 0; f >= i;) {
	        l = r[i++], $.set(l.key, l);
	      }for (; o >= t;) {
	        s = e[t], v = s.key, l = $.get(v), l ? (l === c && (p = p.nextSibling), $["delete"](v), s = B(l, s)) : s = _(s), e[t] = s, a(n, s.$n, p), ++t;
	      }$.forEach(function (e) {
	        d(e, n);
	      });
	    },
	        g = function g(n, e, r, t, o, u, i, c, f, $, p, l) {
	      if (c > $) for (; u >= t;) {
	        o = e[t], a(n, (e[t] = _(o)).$n, l), ++t;
	      } else if (t > u) for (; $ >= c;) {
	        d(r[c++], n);
	      } else k(n, e, r, t, u, f, c, p, $);
	    },
	        b = function b(n, e, r, t, o, u) {
	      var i = 0,
	          c = 0,
	          f = !0,
	          d = e[0],
	          $ = t[0],
	          p = u,
	          l = void 0,
	          v = void 0,
	          s = void 0;r--, o--;n: for (; f && o >= i && r >= c;) {
	        for (f = !1; $.key === d.key;) {
	          if (e[c] = B($, d), i++, c++, i > o || c > r) break n;$ = t[i], d = e[c], f = !0;
	        }for (l = t[o], v = e[r]; l.key === v.key;) {
	          if (p = (e[r] = B(l, v)).$n, o--, r--, i > o || c > r) break n;l = t[o], v = e[r], f = !0;
	        }for (; $.key === v.key;) {
	          if (s = (e[r] = B($, v)).$n, l.key !== v.key && (p = a(n, s, p)), i++, r--, i > o || c > r) break n;$ = t[i], v = e[r], f = !0;
	        }for (; l.key === d.key;) {
	          if (a(n, (e[c] = B(l, d)).$n, $.$n), o--, c++, i > o || c > r) break n;l = t[o], d = e[c], f = !0;
	        }
	      }(r >= c || o >= i) && g(n, e, t, c, d, r, v, i, $, o, l, p);
	    },
	        C = function C(n, e, r) {
	      var t = n.parentNode,
	          o = e.length,
	          u = r.length;o ? u ? b(t, e, o, r, u, n) : x(t, e, o, n) : $(r, t);
	    },
	        N = function N(n, e, r) {
	      var t = e.length,
	          o = r.length;t ? o ? b(n, e, t, r, o, null) : h(n, e, t) : p(r, n);
	    },
	        D = function D(n, e, r, t, o, u, i) {
	      return null == e ? t.nodeValue = "" : e.constructor === String || e.constructor === Number ? t.nodeValue = e : A(n, e, null, t, o, u, i), e;
	    },
	        A = function A(n, e, r, t, o, u, i) {
	      return f(t, M(n, t.parentNode, e, o, u, i)), e;
	    },
	        O = function O(n, e, r, t, o, u, i) {
	      return e && l(e, r) ? r : A(n, e, null, t, o, u, i);
	    },
	        P = function P(n, e, r, t, o, u, i, c) {
	      var f = t.$a,
	          a = f.onProps;t.$p = e, a ? a() : v(f, t.$c(e, t.$t, f), t, u, c);
	    },
	        R = function R(n, e, r, t, o, u, i, c) {
	      var a = n(e || {});l(a, t) || f(o, u[i] = (u[c] = _(a)).$n);
	    },
	        j = function j(n, e, r, t, o, u, i) {
	      return e instanceof Array ? n ? N(t, e, r) : C(t, e, r) : n ? (p(r, t), t.appendChild(M(!0, t, e, o, u, i))) : ($(r, t.parentNode), A(!1, e, null, t, o, u, i)), e;
	    },
	        E = function E(n, e, t, o, u, i) {
	      r.$p = e;var c = n.state,
	          f = y(c, t, i),
	          a = c.onInit(e || {}, void 0, f);f.$$doRerender = !0;var d = n(e, a, f),
	          $ = w(d);return f.$$instance = d, d.$c = n, d.$t = a, d.$a = f, d.$p = e, t[o] = P, t[i] = d, t[u] = $, $;
	    },
	        M = e.createDynamic = function (n, e, r, t, o, u) {
	      var i = void 0,
	          f = void 0,
	          a = void 0,
	          d = void 0;return null == r || (d = r.constructor) === Boolean ? (a = A, f = i = c()) : d === Object ? (a = O, f = i = w(r)) : d === String || d === Number ? (a = D, f = i = document.createTextNode(r)) : d === Array && (i = document.createDocumentFragment(), h(i, r, r.length), a = j, f = n ? e : i.appendChild(c())), t[o] = a, t[u] = f, i;
	    },
	        S = e.createComponent = function (n, e, r, t, o, u) {
	      if (n.state) return E(n, e, r, t, o, u);var i = n(e || {}),
	          c = w(i);return r[t] = R, r[u] = i, r[o] = c, c;
	    },
	        _ = function _(n) {
	      var e = n.$s,
	          r = e.r.pop(n.key);return r ? (e.u(n, r), r) : ((n.$n = e.c(n)).xvdom = n, n);
	    },
	        w = e.render = function (n) {
	      return _(n).$n;
	    },
	        B = function B(n, e) {
	      return l(e, n) ? n : (e = _(e), f(n.$n, e.$n), i(n), e);
	    },
	        I = e.rerender = function (n, e) {
	      return B(n.xvdom, e).$n;
	    },
	        L = e.unmount = function (n) {
	      d(n.xvdom, n.parentNode);
	    };e["default"] = { createDynamic: M, createComponent: S, render: w, rerender: I, unmount: L, Pool: u, DEADPOOL: o };e._ = { rerenderText: D, rerenderInstance: O, rerenderDynamic: A, rerenderArray: j };
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

	/**
	 * @final
	 */


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