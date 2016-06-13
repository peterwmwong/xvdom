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

	var _xvdomCreateDynamic = _xvdomMin2.default.createDynamic,
	    _xvdomEl = _xvdomMin2.default.el,
	    _xvdomUpdateDynamic = _xvdomMin2.default.updateDynamic;
	var _xvdomSpec3 = {
	  c: function c(inst) {
	    var _n = _xvdomEl('table'),
	        _n2;

	    _n.className = 'table table-striped latest-data';
	    _n2 = _xvdomEl('tbody');

	    _n2.appendChild(inst.b = _xvdomCreateDynamic(true, _n2, inst.a));

	    _n.appendChild(_n2);

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
	    var _n = _xvdomEl('tr'),
	        _n2,
	        _n3;

	    _n2 = _xvdomEl('td');
	    _n2.className = 'dbname';

	    _n2.appendChild(inst.b = _xvdomCreateDynamic(true, _n2, inst.a));

	    _n.appendChild(_n2);

	    _n2 = _xvdomEl('td');
	    _n2.className = 'query-count';
	    _n3 = _xvdomEl('span');
	    inst.d = _n3;
	    _n3.className = inst.c;

	    _n3.appendChild(inst.f = _xvdomCreateDynamic(true, _n3, inst.e));

	    _n2.appendChild(_n3);

	    _n.appendChild(_n2);

	    _n.appendChild(inst.h = _xvdomCreateDynamic(false, _n, inst.g));

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.b = _xvdomUpdateDynamic(true, pInst.a, pInst.a = inst.a, pInst.b);
	    }

	    v = inst.c;

	    if (v !== pInst.c) {
	      pInst.d.className = v;
	      pInst.c = v;
	    }

	    if (inst.e !== pInst.e) {
	      pInst.f = _xvdomUpdateDynamic(true, pInst.e, pInst.e = inst.e, pInst.f);
	    }

	    if (inst.g !== pInst.g) {
	      pInst.h = _xvdomUpdateDynamic(false, pInst.g, pInst.g = inst.g, pInst.h);
	    }
	  },
	  r: _xvdomMin2.default.DEADPOOL
	};
	var _xvdomSpec = {
	  c: function c(inst) {
	    var _n = _xvdomEl('td'),
	        _n2,
	        _n3;

	    inst.b = _n;
	    _n.className = inst.a;

	    _n.appendChild(inst.d = _xvdomCreateDynamic(false, _n, inst.c));

	    _n2 = _xvdomEl('div');
	    _n2.className = 'popover left';
	    _n3 = _xvdomEl('div');
	    _n3.className = 'popover-content';

	    _n3.appendChild(inst.f = _xvdomCreateDynamic(true, _n3, inst.e));

	    _n2.appendChild(_n3);

	    _n3 = _xvdomEl('div');
	    _n3.className = 'arrow';

	    _n2.appendChild(_n3);

	    _n.appendChild(_n2);

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
	      pInst.d = _xvdomUpdateDynamic(false, pInst.c, pInst.c = inst.c, pInst.d);
	    }

	    if (inst.e !== pInst.e) {
	      pInst.f = _xvdomUpdateDynamic(true, pInst.e, pInst.e = inst.e, pInst.f);
	    }
	  },
	  r: _xvdomMin2.default.DEADPOOL
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
	    $s: _xvdomSpec,
	    a: queryClasses(elapsed),
	    c: elapsed && entryFormatElapsed(elapsed),
	    e: query,
	    key: j
	  };
	};

	var renderDatabase = function renderDatabase(db, i) {
	  var count = db.queries.length;
	  return {
	    $s: _xvdomSpec2,
	    a: db.name,
	    c: counterClasses(count),
	    e: count,
	    g: map(db.getTopFiveQueries(), renderQuery),
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
	        d = function d(n, e, t) {
	      return t ? n.insertBefore(e, t) : n.appendChild(e);
	    },
	        s = function s(n, e) {
	      c(n), e.removeChild(n.$n);
	    },
	        p = function p(n, e) {
	      for (var t = n.length, r = 0; t > r;) {
	        s(n[r++], e);
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
	        d(n, (e[o] = T(e[o])).$n, r), ++o;
	      }
	    },
	        y = function y(n, e, t) {
	      for (var r = 0; t > r;) {
	        n.appendChild((e[r] = T(e[r])).$n), ++r;
	      }
	    },
	        $ = function $(n, e, t, r, o, u, c, i, a) {
	      for (var f = new Map(), p = i.$n, v = void 0, l = void 0, m = void 0; a >= c;) {
	        v = t[c++], f.set(v.key, v);
	      }for (; o >= r;) {
	        m = e[r], l = m.key, v = f.get(l), v ? (v === i && (p = p.nextSibling), f["delete"](l), m = B(v, m)) : m = T(m), e[r] = m, d(n, m.$n, p), ++r;
	      }f.forEach(function (e) {
	        s(e, n);
	      });
	    },
	        x = function x(n, e, t, r, o, u, c, i, a, f, p, v) {
	      if (i > f) for (; u >= r;) {
	        o = e[r], d(n, (e[r] = T(o)).$n, v), ++r;
	      } else if (r > u) for (; f >= i;) {
	        s(t[i++], n);
	      } else $(n, e, t, r, u, a, i, p, f);
	    },
	        h = function h(n, e, t, r, o, u) {
	      var c = 0,
	          i = 0,
	          a = !0,
	          f = e[0],
	          s = r[0],
	          p = u,
	          v = void 0,
	          l = void 0,
	          m = void 0;t--, o--;n: for (; a && o >= c && t >= i;) {
	        for (a = !1; s.key === f.key;) {
	          if (e[i] = B(s, f), c++, i++, c > o || i > t) break n;s = r[c], f = e[i], a = !0;
	        }for (v = r[o], l = e[t]; v.key === l.key;) {
	          if (p = (e[t] = B(v, l)).$n, o--, t--, c > o || i > t) break n;v = r[o], l = e[t], a = !0;
	        }for (; s.key === l.key;) {
	          if (m = (e[t] = B(s, l)).$n, v.key !== l.key && (p = d(n, m, p)), c++, t--, c > o || i > t) break n;s = r[c], l = e[t], a = !0;
	        }for (; v.key === f.key;) {
	          if (d(n, (e[i] = B(v, f)).$n, s.$n), o--, i++, c > o || i > t) break n;v = r[o], f = e[i], a = !0;
	        }
	      }(t >= i || o >= c) && x(n, e, r, i, f, t, l, c, s, o, v, p);
	    },
	        k = function k(n, e, t) {
	      var r = n.parentNode,
	          o = e.length,
	          u = t.length;o ? u ? h(r, e, o, t, u, n) : m(r, e, o, n) : p(t, r);
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
	      var o = void 0;return e && l(e, o = t.$r || t) ? (e.$r = o, r) : C(n, e, r);
	    },
	        N = function N(n, e, t, r, u) {
	      var c = n(e || o);l(c, t) || f(t.$n, (r[u] = T(c)).$n);
	    },
	        D = function D(n, e, t, r) {
	      return e instanceof Array ? void (n ? b(r, e, t) : k(r, e, t)) : n ? (v(t, r), r.appendChild(A(!0, r, e))) : (p(t, r.parentNode), C(!1, e, r));
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
	        E = function E(n, e, r, o, u, c) {
	      var i = new t(),
	          a = { _onProps: c.onProps, _parentInst: r, props: e, bindSend: function bindSend(e) {
	          return i[e] || (i[e] = function (t) {
	            S(n, a, c[e], t);
	          });
	        } };return a.state = c.onInit(a), r[o] = O, r[u] = a, M(a._instance = n(a));
	    },
	        I = e.createNoStateComponent = function (n, e, t, r, o) {
	      return t[r] = N, M(t[o] = n(e));
	    },
	        L = e.createComponent = function (n, e, t, r, u, c) {
	      var i = e ? E : I;return i(n, t || o, r, u, c, e);
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
	      s(n.xvdom, n.parentNode);
	    };e["default"] = { createComponent: L, createDynamic: A, el: function el(n) {
	        return document.createElement(n);
	      }, render: V, rerender: F, unmount: q, updateDynamic: j, Pool: r, DEADPOOL: u };e._ = { rerenderText: g, rerenderInstance: _, rerenderDynamic: C, rerenderArray: D };
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