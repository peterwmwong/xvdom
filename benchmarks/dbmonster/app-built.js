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

	var _data = __webpack_require__(4);

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
	    c: entryFormatElapsed(elapsed),
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
	        container = document.createElement("div");
	        container.style.cssText = "position: fixed;" + "opacity: 0.9;" + "right: 0;" + "bottom: 0";
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
	            var min = (_this.flags & 32 /* RoundValues */) === 0 ? result.min.toFixed(2) : "" + Math.round(result.min);
	            var max = (_this.flags & 32 /* RoundValues */) === 0 ? result.max.toFixed(2) : "" + Math.round(result.max);
	            var mean = (_this.flags & 32 /* RoundValues */) === 0 ? result.mean.toFixed(2) : "" + Math.round(result.mean);
	            var now = (_this.flags & 32 /* RoundValues */) === 0 ? result.now.toFixed(2) : "" + Math.round(result.now);
	            _this.text.innerHTML = "" + ((_this.flags & 1 /* HideMin */) === 0 ? "<div>min: &nbsp;" + min + _this.unitName + "</div>" : "") + ((_this.flags & 2 /* HideMax */) === 0 ? "<div>max: &nbsp;" + max + _this.unitName + "</div>" : "") + ((_this.flags & 4 /* HideMean */) === 0 ? "<div>mean: " + mean + _this.unitName + "</div>" : "") + ((_this.flags & 8 /* HideNow */) === 0 ? "<div>now: &nbsp;" + now + _this.unitName + "</div>" : "");
	            if ((_this.flags & 16 /* HideGraph */) === 0) {
	                _this.ctx.fillStyle = "#010";
	                _this.ctx.fillRect(0, 0, MONITOR_GRAPH_WIDTH, MONITOR_GRAPH_HEIGHT);
	                _this.ctx.fillStyle = "#0f0";
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
	        this.element = document.createElement("div");
	        this.element.style.cssText = "padding: 2px;" + "background-color: #020;" + "font-family: monospace;" + "font-size: 12px;" + "color: #0f0";
	        this.label = document.createElement("div");
	        this.label.style.cssText = "text-align: center";
	        this.label.textContent = this.name;
	        this.text = document.createElement("div");
	        this.element.appendChild(this.label);
	        this.element.appendChild(this.text);
	        if ((flags & 16 /* HideGraph */) === 0) {
	            this.canvas = document.createElement("canvas");
	            this.canvas.style.cssText = "display: block; padding: 0; margin: 0";
	            this.canvas.width = MONITOR_GRAPH_WIDTH;
	            this.canvas.height = MONITOR_GRAPH_HEIGHT;
	            this.ctx = this.canvas.getContext("2d");
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
	    var w = new MonitorWidget("FPS", "", 2 /* HideMax */ | 1 /* HideMin */ | 4 /* HideMean */ | 32 /* RoundValues */);
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
	    checkInit();
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
	            w_1 = new MonitorWidget("Memory", "MB", 1 /* HideMin */ | 4 /* HideMean */);

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
	    checkInit();
	    var profiler = profilerInstances[name];
	    if (profiler === void 0) {
	        profilerInstances[name] = profiler = new Profiler(name, "ms");
	        container.appendChild(profiler.widget.element);
	    }
	}
	exports.initProfiler = initProfiler;

/***/ },
/* 3 */
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

/***/ },
/* 4 */
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