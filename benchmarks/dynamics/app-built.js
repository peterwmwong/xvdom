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

	var _index = __webpack_require__(2);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _xvdomSpec5 = {
	  c: function c(inst) {
	    var _n = _index2.default.createComponent(Comp, Comp.state, {
	      values: inst.a
	    }, inst, 'b', 'c');

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.b(Comp, {
	        values: inst.a
	      }, pInst.c, pInst, 'c');
	      pInst.a = inst.a;
	    }
	  },
	  r: _index2.default.DEADPOOL
	};
	var _xvdomSpec4 = {
	  c: function c(inst) {
	    var _n = document.createElement('div'),
	        _n2;

	    _n2 = _index2.default.createComponent(CompPart, CompPart.state, {
	      values: inst.a,
	      start: 0
	    }, inst, 'b', 'c');

	    _n.appendChild(_n2);

	    _n2 = _index2.default.createComponent(CompPart, CompPart.state, {
	      values: inst.d,
	      start: 5
	    }, inst, 'e', 'f');

	    _n.appendChild(_n2);

	    _n2 = _index2.default.createComponent(CompPart, CompPart.state, {
	      values: inst.g,
	      start: 10
	    }, inst, 'h', 'i');

	    _n.appendChild(_n2);

	    _n2 = _index2.default.createComponent(CompPart, CompPart.state, {
	      values: inst.j,
	      start: 15
	    }, inst, 'k', 'l');

	    _n.appendChild(_n2);

	    _n2 = _index2.default.createComponent(CompPart, CompPart.state, {
	      values: inst.m,
	      start: 20
	    }, inst, 'n', 'o');

	    _n.appendChild(_n2);

	    _n2 = _index2.default.createComponent(CompPart, CompPart.state, {
	      values: inst.p,
	      start: 25
	    }, inst, 'q', 'r');

	    _n.appendChild(_n2);

	    _n2 = _index2.default.createComponent(CompPart, CompPart.state, {
	      values: inst.s,
	      start: 30
	    }, inst, 't', 'u');

	    _n.appendChild(_n2);

	    _n2 = _index2.default.createComponent(CompPart, CompPart.state, {
	      values: inst.v,
	      start: 35
	    }, inst, 'w', 'x');

	    _n.appendChild(_n2);

	    _n2 = _index2.default.createComponent(CompPart, CompPart.state, {
	      values: inst.y,
	      start: 40
	    }, inst, 'z', 'A');

	    _n.appendChild(_n2);

	    _n2 = _index2.default.createComponent(CompPart, CompPart.state, {
	      values: inst.B,
	      start: 45
	    }, inst, 'C', 'D');

	    _n.appendChild(_n2);

	    _n2 = _index2.default.createComponent(CompPartPrefix, CompPartPrefix.state, {
	      values: inst.E,
	      start: 50
	    }, inst, 'F', 'G');

	    _n.appendChild(_n2);

	    _n2 = _index2.default.createComponent(CompPartPrefix, CompPartPrefix.state, {
	      values: inst.H,
	      start: 55
	    }, inst, 'I', 'J');

	    _n.appendChild(_n2);

	    _n2 = _index2.default.createComponent(CompPartPrefix, CompPartPrefix.state, {
	      values: inst.K,
	      start: 60
	    }, inst, 'L', 'M');

	    _n.appendChild(_n2);

	    _n2 = _index2.default.createComponent(CompPartPrefix, CompPartPrefix.state, {
	      values: inst.N,
	      start: 65
	    }, inst, 'O', 'P');

	    _n.appendChild(_n2);

	    _n2 = _index2.default.createComponent(CompPartPrefix, CompPartPrefix.state, {
	      values: inst.Q,
	      start: 70
	    }, inst, 'R', 'S');

	    _n.appendChild(_n2);

	    _n2 = _index2.default.createComponent(CompPartPrefix, CompPartPrefix.state, {
	      values: inst.T,
	      start: 75
	    }, inst, 'U', 'V');

	    _n.appendChild(_n2);

	    _n2 = _index2.default.createComponent(CompPartPrefix, CompPartPrefix.state, {
	      values: inst.W,
	      start: 80
	    }, inst, 'X', 'Y');

	    _n.appendChild(_n2);

	    _n2 = _index2.default.createComponent(CompPartPrefix, CompPartPrefix.state, {
	      values: inst.Z,
	      start: 85
	    }, inst, 'a1', 'b1');

	    _n.appendChild(_n2);

	    _n2 = _index2.default.createComponent(CompPartPrefix, CompPartPrefix.state, {
	      values: inst.c1,
	      start: 90
	    }, inst, 'd1', 'e1');

	    _n.appendChild(_n2);

	    _n2 = _index2.default.createComponent(CompPartPrefix, CompPartPrefix.state, {
	      values: inst.f1,
	      start: 95
	    }, inst, 'g1', 'h1');

	    _n.appendChild(_n2);

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.b(CompPart, {
	        values: inst.a,
	        start: 0
	      }, pInst.c, pInst, 'c');
	      pInst.a = inst.a;
	    }

	    if (inst.d !== pInst.d) {
	      pInst.e(CompPart, {
	        values: inst.d,
	        start: 5
	      }, pInst.f, pInst, 'f');
	      pInst.d = inst.d;
	    }

	    if (inst.g !== pInst.g) {
	      pInst.h(CompPart, {
	        values: inst.g,
	        start: 10
	      }, pInst.i, pInst, 'i');
	      pInst.g = inst.g;
	    }

	    if (inst.j !== pInst.j) {
	      pInst.k(CompPart, {
	        values: inst.j,
	        start: 15
	      }, pInst.l, pInst, 'l');
	      pInst.j = inst.j;
	    }

	    if (inst.m !== pInst.m) {
	      pInst.n(CompPart, {
	        values: inst.m,
	        start: 20
	      }, pInst.o, pInst, 'o');
	      pInst.m = inst.m;
	    }

	    if (inst.p !== pInst.p) {
	      pInst.q(CompPart, {
	        values: inst.p,
	        start: 25
	      }, pInst.r, pInst, 'r');
	      pInst.p = inst.p;
	    }

	    if (inst.s !== pInst.s) {
	      pInst.t(CompPart, {
	        values: inst.s,
	        start: 30
	      }, pInst.u, pInst, 'u');
	      pInst.s = inst.s;
	    }

	    if (inst.v !== pInst.v) {
	      pInst.w(CompPart, {
	        values: inst.v,
	        start: 35
	      }, pInst.x, pInst, 'x');
	      pInst.v = inst.v;
	    }

	    if (inst.y !== pInst.y) {
	      pInst.z(CompPart, {
	        values: inst.y,
	        start: 40
	      }, pInst.A, pInst, 'A');
	      pInst.y = inst.y;
	    }

	    if (inst.B !== pInst.B) {
	      pInst.C(CompPart, {
	        values: inst.B,
	        start: 45
	      }, pInst.D, pInst, 'D');
	      pInst.B = inst.B;
	    }

	    if (inst.E !== pInst.E) {
	      pInst.F(CompPartPrefix, {
	        values: inst.E,
	        start: 50
	      }, pInst.G, pInst, 'G');
	      pInst.E = inst.E;
	    }

	    if (inst.H !== pInst.H) {
	      pInst.I(CompPartPrefix, {
	        values: inst.H,
	        start: 55
	      }, pInst.J, pInst, 'J');
	      pInst.H = inst.H;
	    }

	    if (inst.K !== pInst.K) {
	      pInst.L(CompPartPrefix, {
	        values: inst.K,
	        start: 60
	      }, pInst.M, pInst, 'M');
	      pInst.K = inst.K;
	    }

	    if (inst.N !== pInst.N) {
	      pInst.O(CompPartPrefix, {
	        values: inst.N,
	        start: 65
	      }, pInst.P, pInst, 'P');
	      pInst.N = inst.N;
	    }

	    if (inst.Q !== pInst.Q) {
	      pInst.R(CompPartPrefix, {
	        values: inst.Q,
	        start: 70
	      }, pInst.S, pInst, 'S');
	      pInst.Q = inst.Q;
	    }

	    if (inst.T !== pInst.T) {
	      pInst.U(CompPartPrefix, {
	        values: inst.T,
	        start: 75
	      }, pInst.V, pInst, 'V');
	      pInst.T = inst.T;
	    }

	    if (inst.W !== pInst.W) {
	      pInst.X(CompPartPrefix, {
	        values: inst.W,
	        start: 80
	      }, pInst.Y, pInst, 'Y');
	      pInst.W = inst.W;
	    }

	    if (inst.Z !== pInst.Z) {
	      pInst.a1(CompPartPrefix, {
	        values: inst.Z,
	        start: 85
	      }, pInst.b1, pInst, 'b1');
	      pInst.Z = inst.Z;
	    }

	    if (inst.c1 !== pInst.c1) {
	      pInst.d1(CompPartPrefix, {
	        values: inst.c1,
	        start: 90
	      }, pInst.e1, pInst, 'e1');
	      pInst.c1 = inst.c1;
	    }

	    if (inst.f1 !== pInst.f1) {
	      pInst.g1(CompPartPrefix, {
	        values: inst.f1,
	        start: 95
	      }, pInst.h1, pInst, 'h1');
	      pInst.f1 = inst.f1;
	    }
	  },
	  r: _index2.default.DEADPOOL
	};
	var _xvdomSpec3 = {
	  c: function c(inst) {
	    var _n = document.createElement('div'),
	        _n2,
	        _n3,
	        _n4,
	        _n5,
	        _n6,
	        _n7;

	    _n2 = document.createElement('span');
	    _n3 = document.createElement('span');

	    _n3.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n3);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.a, inst, 'b', 'c'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n4 = document.createElement('span');

	    _n4.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n4);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.d, inst, 'e', 'f'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n5 = document.createElement('span');

	    _n5.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n5);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.g, inst, 'h', 'i'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n6 = document.createElement('span');

	    _n6.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n6);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.j, inst, 'k', 'l'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n7 = document.createElement('span');

	    _n7.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n7);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.m, inst, 'n', 'o'));

	    _n.appendChild(_n2);

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.a = pInst.b(false, inst.a, pInst.a, pInst.c, pInst, 'b', 'c');
	    }

	    if (inst.d !== pInst.d) {
	      pInst.d = pInst.e(false, inst.d, pInst.d, pInst.f, pInst, 'e', 'f');
	    }

	    if (inst.g !== pInst.g) {
	      pInst.g = pInst.h(false, inst.g, pInst.g, pInst.i, pInst, 'h', 'i');
	    }

	    if (inst.j !== pInst.j) {
	      pInst.j = pInst.k(false, inst.j, pInst.j, pInst.l, pInst, 'k', 'l');
	    }

	    if (inst.m !== pInst.m) {
	      pInst.m = pInst.n(false, inst.m, pInst.m, pInst.o, pInst, 'n', 'o');
	    }
	  },
	  r: _index2.default.DEADPOOL
	};
	var _xvdomSpec2 = {
	  c: function c(inst) {
	    var _n = document.createElement('div'),
	        _n2;

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.a, inst, 'b', 'c'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.d, inst, 'e', 'f'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.g, inst, 'h', 'i'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.j, inst, 'k', 'l'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.m, inst, 'n', 'o'));

	    _n.appendChild(_n2);

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.a = pInst.b(true, inst.a, pInst.a, pInst.c, pInst, 'b', 'c');
	    }

	    if (inst.d !== pInst.d) {
	      pInst.d = pInst.e(true, inst.d, pInst.d, pInst.f, pInst, 'e', 'f');
	    }

	    if (inst.g !== pInst.g) {
	      pInst.g = pInst.h(true, inst.g, pInst.g, pInst.i, pInst, 'h', 'i');
	    }

	    if (inst.j !== pInst.j) {
	      pInst.j = pInst.k(true, inst.j, pInst.j, pInst.l, pInst, 'k', 'l');
	    }

	    if (inst.m !== pInst.m) {
	      pInst.m = pInst.n(true, inst.m, pInst.m, pInst.o, pInst, 'n', 'o');
	    }
	  },
	  r: _index2.default.DEADPOOL
	};
	var _xvdomSpec = {
	  c: function c() {
	    var _n = document.createElement('b');

	    _n.appendChild(document.createTextNode(('hello') || ''));

	    return _n;
	  },
	  u: function u() {},
	  r: _index2.default.DEADPOOL
	};


	// Generated by instrumenting xvdom to count every dynamic rendered for a
	// non-trivial app (currently ticker).
	var COUNTS = {
	  boolean: 1,
	  null: 10,
	  string: 49,
	  number: 0,
	  instance: 36,
	  array: 5
	};

	var DYNAMIC_FACTORIES = {
	  string: function string(i) {
	    return 'hello ' + String.fromCharCode(65 + i % 26);
	  },
	  instance: function instance(i) {
	    return {
	      $s: _xvdomSpec
	    };
	  },
	  null: function _null(i) {
	    return null;
	  },
	  array: function array(i) {
	    return [];
	  },
	  boolean: function boolean(i) {
	    return !(i % 2);
	  },
	  number: function number(i) {
	    return i;
	  }
	};

	var createValues = function createValues(counts, numValues, reverse) {
	  var keys = (reverse ? function (a) {
	    return a.reverse();
	  } : function (a) {
	    return a;
	  })(Object.keys(counts));
	  var sum = keys.reduce(function (sum, key) {
	    return sum + counts[key];
	  }, 0);
	  var values = [];
	  var i = 0;

	  keys.forEach(function (key) {
	    var numOfDynamics = 100 * (counts[key] / sum) | 0;
	    while (numOfDynamics--) {
	      values[i++] = DYNAMIC_FACTORIES[key](i);
	    }
	  });

	  return values;
	};

	var CompPart = function CompPart(_ref) {
	  var start = _ref.start;
	  var values = _ref.values;
	  return {
	    $s: _xvdomSpec2,
	    a: values[0 + start],
	    d: values[1 + start],
	    g: values[2 + start],
	    j: values[3 + start],
	    m: values[4 + start]
	  };
	};

	var CompPartPrefix = function CompPartPrefix(_ref2) {
	  var start = _ref2.start;
	  var values = _ref2.values;
	  return {
	    $s: _xvdomSpec3,
	    a: values[0 + start],
	    d: values[1 + start],
	    g: values[2 + start],
	    j: values[3 + start],
	    m: values[4 + start]
	  };
	};

	var Comp = function Comp(_ref3) {
	  var values = _ref3.values;
	  return {
	    $s: _xvdomSpec4,
	    a: values,
	    d: values,
	    g: values,
	    j: values,
	    m: values,
	    p: values,
	    s: values,
	    v: values,
	    y: values,
	    B: values,
	    E: values,
	    H: values,
	    K: values,
	    N: values,
	    Q: values,
	    T: values,
	    W: values,
	    Z: values,
	    c1: values,
	    f1: values
	  };
	};

	var renderInstance = function renderInstance(values) {
	  return {
	    $s: _xvdomSpec5,
	    a: values
	  };
	};

	var render = function render() {
	  return _index2.default.render(renderInstance(createValues(COUNTS, 100)));
	};

	var rerender = function rerender(node) {
	  return _index2.default.rerender(node, renderInstance(createValues(COUNTS, 100, true)));
	};

	var benchmark = function benchmark() {
	  var i = 0;
	  var node = void 0;
	  while (i++ < 1000) {
	    node = render();
	    rerender(node);
	  }
	};

	var test = function test() {
	  var EXPECTED_TEXT_CONTENT = 'helloKhelloLhelloMhelloNhelloOhelloPhelloQhelloRhelloShelloThelloUhelloVhelloWhelloXhelloYhelloZhelloAhelloBhelloChelloDhelloEhelloFhelloGhelloHhelloIhelloJhelloKhelloLhelloMhelloNhelloOhelloPhelloQhelloRhelloShelloThelloUhelloVhelloWhelloXhelloYprefixhelloZprefixhelloAprefixhelloBprefixhelloCprefixhelloDprefixhelloEprefixhelloFprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixprefixprefixprefixprefixprefixprefixprefix';
	  var EXPECTED_TEXT_CONTENT_RERENDER = 'hellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohelloOhelloPhelloQhelloRhelloShelloThelloUhelloVhelloWhelloXhelloYprefixhelloZprefixhelloAprefixhelloBprefixhelloCprefixhelloDprefixhelloEprefixhelloFprefixhelloGprefixhelloHprefixhelloIprefixhelloJprefixhelloKprefixhelloLprefixhelloMprefixhelloNprefixhelloOprefixhelloPprefixhelloQprefixhelloRprefixhelloSprefixhelloTprefixhelloUprefixhelloVprefixhelloWprefixhelloXprefixhelloYprefixhelloZprefixhelloAprefixhelloBprefixhelloCprefixhelloDprefixhelloEprefixhelloFprefixhelloGprefixhelloHprefixhelloIprefixhelloJprefixprefixprefixprefixprefixprefixprefixprefixprefixprefixprefixprefixprefix';
	  var node = render();

	  var textContent = node.textContent.replace(/\s+/g, '');
	  var pass = textContent === EXPECTED_TEXT_CONTENT;
	  var message = '';
	  message += pass ? 'SUCCESS' : 'FAIL: expected textContent to be...\n"' + EXPECTED_TEXT_CONTENT + '"\nbut got...\n"' + textContent + '"';

	  rerender(node);

	  textContent = node.textContent.replace(/\s+/g, '');
	  pass = textContent === EXPECTED_TEXT_CONTENT_RERENDER;
	  message += pass ? 'RERENDER SUCCESS' : 'RERENDER FAIL: expected textContent to be...\n"' + EXPECTED_TEXT_CONTENT_RERENDER + '"\nbut got...\n"' + textContent + '"';

	  document.write(message);
	};

	var runBenchmark = function runBenchmark() {
	  var end;
	  var start = window.performance.now();
	  benchmark();
	  end = window.performance.now();
	  document.write((end - start).toFixed(3) + 'ms');
	};

	if (window.location.search === '?test') test();else runBenchmark();

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	/*

	Instance properties:

	$a - actions for stateful components
	$c - component for stateful components
	$n = DOM node
	$p - props for components
	$s - spec (see below)
	$t - state for stateful components
	$x - Pool linked list next pointer

	Spec properties:

	c - create (or render)
	u - update (or update)
	r - keyed map of unmounted instanced that can be recycled

	*/

	// Creates an empty object with no built in properties (ie. `constructor`).
	function Hash() {}
	Hash.prototype = Object.create(null);

	var EMPTY_PROPS = new Hash();
	var DEADPOOL = exports.DEADPOOL = {
	  push: function push() {},
	  pop: function pop() {}
	};

	// TODO: Benchmark whether this is slower than Function/Prototype
	function Pool() {
	  this.map = new Hash();
	};

	Pool.prototype.push = function (instance) {
	  var key = instance.key;
	  var map = this.map;

	  instance.$x = map[key];
	  map[key] = instance;
	};

	Pool.prototype.pop = function (key) {
	  var head = this.map[key];
	  if (!head) return;
	  this.map[key] = head.$x;
	  return head;
	};

	var recycle = function recycle(instance) {
	  instance.$s.r.push(instance);
	};
	var createTextNode = function createTextNode(value) {
	  return document.createTextNode(value);
	};

	var replaceNode = function replaceNode(oldNode, newNode) {
	  var parentNode = oldNode.parentNode;
	  if (parentNode) parentNode.replaceChild(newNode, oldNode);
	};

	var insertBefore = function insertBefore(parentNode, node, beforeNode) {
	  return beforeNode ? parentNode.insertBefore(node, beforeNode) : parentNode.appendChild(node);
	};

	var unmountInstance = function unmountInstance(inst, parentNode) {
	  recycle(inst);
	  parentNode.removeChild(inst.$n);
	};

	var removeArrayNodes = function removeArrayNodes(array, parentNode) {
	  var length = array.length;
	  var i = 0;

	  while (i < length) {
	    unmountInstance(array[i++], parentNode);
	  }
	};

	var removeArrayNodesOnlyChild = function removeArrayNodesOnlyChild(array, parentNode) {
	  var length = array.length;
	  var i = 0;

	  while (i < length) {
	    recycle(array[i++]);
	  }
	  parentNode.textContent = '';
	};

	var internalRerenderInstance = function internalRerenderInstance(inst, prevInst) {
	  return prevInst.$s === inst.$s && (inst.$s.u(inst, prevInst), true);
	};

	var renderArrayToParentBefore = function renderArrayToParentBefore(parentNode, array, length, markerNode) {
	  var i = 0;

	  while (i < length) {
	    insertBefore(parentNode, (array[i] = internalRender(array[i])).$n, markerNode);
	    ++i;
	  }
	};

	var renderArrayToParent = function renderArrayToParent(parentNode, array, length) {
	  var i = 0;

	  while (i < length) {
	    parentNode.appendChild((array[i] = internalRender(array[i])).$n);
	    ++i;
	  }
	};

	var rerenderArray_reconcileWithMap = function rerenderArray_reconcileWithMap(parentNode, array, oldArray, startIndex, endIndex, oldStartItem, oldStartIndex, oldEndItem, oldEndIndex) {
	  var oldListNodeKeyMap = new Map();
	  var insertBeforeNode = oldEndItem.$n;
	  var item = void 0,
	      key = void 0,
	      startItem = void 0;

	  while (oldStartIndex <= oldEndIndex) {
	    item = oldArray[oldStartIndex++];
	    oldListNodeKeyMap.set(item.key, item);
	  }

	  while (startIndex <= endIndex) {
	    startItem = array[startIndex];
	    key = startItem.key;
	    item = oldListNodeKeyMap.get(key);

	    if (item) {
	      if (item === oldEndItem) insertBeforeNode = insertBeforeNode.nextSibling;
	      oldListNodeKeyMap.delete(key);
	      startItem = internalRerender(item, startItem);
	    } else {
	      startItem = internalRender(startItem);
	    }
	    array[startIndex] = startItem;
	    insertBefore(parentNode, startItem.$n, insertBeforeNode);
	    ++startIndex;
	  }

	  oldListNodeKeyMap.forEach(function (value) {
	    unmountInstance(value, parentNode);
	  });
	};

	var rerenderArray_afterReconcile = function rerenderArray_afterReconcile(parentNode, array, oldArray, startIndex, startItem, endIndex, endItem, oldStartIndex, oldStartItem, oldEndIndex, oldEndItem, insertBeforeNode) {
	  if (oldStartIndex > oldEndIndex) {
	    while (startIndex <= endIndex) {
	      startItem = array[startIndex];
	      insertBefore(parentNode, (array[startIndex] = internalRender(startItem)).$n, insertBeforeNode);
	      ++startIndex;
	    }
	  } else if (startIndex > endIndex) {
	    while (oldStartIndex <= oldEndIndex) {
	      unmountInstance(oldArray[oldStartIndex++], parentNode);
	    }
	  } else {
	    rerenderArray_reconcileWithMap(parentNode, array, oldArray, startIndex, endIndex, oldStartItem, oldStartIndex, oldEndItem, oldEndIndex);
	  }
	};

	var rerenderArray_reconcile = function rerenderArray_reconcile(parentNode, array, endIndex, oldArray, oldEndIndex, markerNode) {
	  var oldStartIndex = 0;
	  var startIndex = 0;
	  var successful = true;
	  var startItem = array[0];
	  var oldStartItem = oldArray[0];
	  var insertBeforeNode = markerNode;
	  var oldEndItem = void 0,
	      endItem = void 0,
	      node = void 0;
	  endIndex--;
	  oldEndIndex--;

	  outer: while (successful && oldStartIndex <= oldEndIndex && startIndex <= endIndex) {
	    successful = false;

	    while (oldStartItem.key === startItem.key) {
	      array[startIndex] = internalRerender(oldStartItem, startItem);

	      oldStartIndex++;startIndex++;
	      if (oldStartIndex > oldEndIndex || startIndex > endIndex) {
	        break outer;
	      } else {
	        oldStartItem = oldArray[oldStartIndex];
	        startItem = array[startIndex];
	        successful = true;
	      }
	    }

	    oldEndItem = oldArray[oldEndIndex];
	    endItem = array[endIndex];

	    while (oldEndItem.key === endItem.key) {
	      insertBeforeNode = (array[endIndex] = internalRerender(oldEndItem, endItem)).$n;

	      oldEndIndex--;endIndex--;
	      if (oldStartIndex > oldEndIndex || startIndex > endIndex) {
	        break outer;
	      } else {
	        oldEndItem = oldArray[oldEndIndex];
	        endItem = array[endIndex];
	        successful = true;
	      }
	    }

	    while (oldStartItem.key === endItem.key) {
	      node = (array[endIndex] = internalRerender(oldStartItem, endItem)).$n;

	      if (oldEndItem.key !== endItem.key) {
	        insertBeforeNode = insertBefore(parentNode, node, insertBeforeNode);
	      }
	      oldStartIndex++;endIndex--;
	      if (oldStartIndex > oldEndIndex || startIndex > endIndex) {
	        break outer;
	      } else {
	        oldStartItem = oldArray[oldStartIndex];
	        endItem = array[endIndex];
	        successful = true;
	      }
	    }

	    while (oldEndItem.key === startItem.key) {
	      insertBefore(parentNode, (array[startIndex] = internalRerender(oldEndItem, startItem)).$n, oldStartItem.$n);

	      oldEndIndex--;startIndex++;
	      if (oldStartIndex > oldEndIndex || startIndex > endIndex) {
	        break outer;
	      } else {
	        oldEndItem = oldArray[oldEndIndex];
	        startItem = array[startIndex];
	        successful = true;
	      }
	    }
	  }

	  if (startIndex <= endIndex || oldStartIndex <= oldEndIndex) {
	    rerenderArray_afterReconcile(parentNode, array, oldArray, startIndex, startItem, endIndex, endItem, oldStartIndex, oldStartItem, oldEndIndex, oldEndItem, insertBeforeNode);
	  }
	};

	var rerenderArray = function rerenderArray(markerNode, array, oldArray) {
	  var parentNode = markerNode.parentNode;
	  var length = array.length;
	  var oldLength = oldArray.length;
	  if (!length) {
	    removeArrayNodes(oldArray, parentNode);
	  } else if (!oldLength) {
	    renderArrayToParentBefore(parentNode, array, length, markerNode);
	  } else {
	    rerenderArray_reconcile(parentNode, array, length, oldArray, oldLength, markerNode);
	  }
	};

	var rerenderArrayOnlyChild = function rerenderArrayOnlyChild(parentNode, array, oldArray) {
	  var length = array.length;
	  var oldLength = oldArray.length;
	  if (!length) {
	    removeArrayNodesOnlyChild(oldArray, parentNode);
	  } else if (!oldLength) {
	    renderArrayToParent(parentNode, array, length);
	  } else {
	    rerenderArray_reconcile(parentNode, array, length, oldArray, oldLength, null);
	  }
	};

	var rerenderText = function rerenderText(isOnlyChild, value, oldValue, contextNode, instance, rerenderFuncProp, rerenderContextNode) {
	  switch (value && value.constructor) {
	    case String:
	    case Number:
	    case 0:
	      contextNode.nodeValue = value;
	      break;

	    case Object:
	    case Array:
	      rerenderDynamic(isOnlyChild, value, null, contextNode, instance, rerenderFuncProp, rerenderContextNode);
	      break;

	    default:
	      contextNode.nodeValue = '';
	  }
	  return value;
	};

	var rerenderDynamic = function rerenderDynamic(isOnlyChild, value, oldValue, contextNode, instance, rerenderFuncProp, rerenderContextNode) {
	  replaceNode(contextNode, createDynamic(isOnlyChild, contextNode.parentNode, value, instance, rerenderFuncProp, rerenderContextNode));
	  return value;
	};

	var rerenderInstance = function rerenderInstance(isOnlyChild, value, prevValue, node, instance, rerenderFuncProp, rerenderContextNode) {
	  if (value && internalRerenderInstance(value, prevValue)) return prevValue;

	  return rerenderDynamic(isOnlyChild, value, null, node, instance, rerenderFuncProp, rerenderContextNode);
	};

	// TODO: Figure out whether we're using all these arguments
	var rerenderComponent = function rerenderComponent(component, props, componentInstance, instance, componentInstanceProp) {
	  var newCompInstance = component(props || EMPTY_PROPS);
	  if (!internalRerenderInstance(newCompInstance, componentInstance)) {
	    replaceNode(componentInstance.$n, (instance[componentInstanceProp] = internalRender(newCompInstance)).$n);
	  }
	};

	var rerenderArrayMaybe = function rerenderArrayMaybe(isOnlyChild, array, oldArray, markerNode, valuesAndContext, rerenderFuncProp, rerenderContextNode) {
	  if (array instanceof Array) {
	    if (isOnlyChild) {
	      rerenderArrayOnlyChild(markerNode, array, oldArray);
	    } else {
	      rerenderArray(markerNode, array, oldArray);
	    }
	  } else {
	    if (isOnlyChild) {
	      removeArrayNodesOnlyChild(oldArray, markerNode);
	      markerNode.appendChild(createDynamic(true, markerNode, array, valuesAndContext, rerenderFuncProp, rerenderContextNode));
	    } else {
	      removeArrayNodes(oldArray, markerNode.parentNode);
	      rerenderDynamic(false, array, null, markerNode, valuesAndContext, rerenderFuncProp, rerenderContextNode);
	    }
	  }
	  return array;
	};

	var rerenderStatefulComponent = function rerenderStatefulComponent(component, newProps, api) {
	  var _onProps = api._onProps;
	  var props = api.props;

	  api.props = newProps;

	  if (_onProps) componentSend(component, api, _onProps, props);else componentRerender(component, api);
	};

	var createDynamic = function createDynamic(isOnlyChild, parentNode, value, instance, rerenderFuncProp, rerenderContextNode) {
	  var context = void 0,
	      node = void 0,
	      rerenderFunc = void 0;
	  switch (value && value.constructor) {
	    case String:
	    case Number:
	    case 0:
	      rerenderFunc = rerenderText;
	      node = createTextNode(value);
	      break;

	    case Object:
	      rerenderFunc = rerenderInstance;
	      node = internalRenderNoRecycle(value);
	      break;

	    case Array:
	      rerenderFunc = rerenderArrayMaybe;
	      node = document.createDocumentFragment();
	      renderArrayToParent(node, value, value.length);
	      context = isOnlyChild ? parentNode : node.appendChild(createTextNode(''));
	      break;

	    default:
	      rerenderFunc = rerenderText;
	      node = createTextNode('');
	      break;
	  }

	  instance[rerenderFuncProp] = rerenderFunc;
	  instance[rerenderContextNode] = context || node;
	  return node;
	};

	var componentRerender = function componentRerender(component, api) {
	  var instance = internalRerender(api._instance, component(api));
	  api._instance = instance;
	  instance.$n.xvdom = api._parentInst;
	};

	var componentSend = function componentSend(component, api, actionFn, context) {
	  // TODO: process.ENV === 'development', console.error(`Action not found #{action}`);
	  if (!actionFn) return;

	  var newState = actionFn(api, context);
	  if (newState !== api.state) {
	    api.state = newState;
	    componentRerender(component, api);
	  }
	};

	var createStatefulComponent = function createStatefulComponent(component, props, instance, rerenderFuncProp, componentInstanceProp, actions) {
	  var boundActions = new Hash();

	  var api = {
	    _onProps: actions.onProps,
	    _parentInst: instance,

	    props: props,
	    bindSend: function bindSend(action) {
	      return boundActions[action] || (boundActions[action] = function (context) {
	        componentSend(component, api, actions[action], context);
	      });
	    }
	  };

	  //TODO: process.ENV === 'development', console.error(`Stateful components require atleast an 'onInit' function to provide the initial state (see)`);
	  api.state = actions.onInit(api);

	  instance[rerenderFuncProp] = rerenderStatefulComponent;
	  instance[componentInstanceProp] = api;
	  return internalRenderNoRecycle(api._instance = component(api));
	};

	var createNoStateComponent = exports.createNoStateComponent = function createNoStateComponent(component, props, instance, rerenderFuncProp, componentInstanceProp) {
	  instance[rerenderFuncProp] = rerenderComponent;
	  return internalRenderNoRecycle(instance[componentInstanceProp] = component(props));
	};

	var createComponent = exports.createComponent = function createComponent(component, actions, props, instance, rerenderFuncProp, componentInstanceProp) {
	  var createFn = actions ? createStatefulComponent : createNoStateComponent;
	  return createFn(component, props || EMPTY_PROPS, instance, rerenderFuncProp, componentInstanceProp, actions);
	};

	var internalRenderNoRecycle = function internalRenderNoRecycle(instance) {
	  var node = instance.$s.c(instance);
	  instance.$n = node;
	  node.xvdom = instance;
	  return node;
	};

	var internalRender = function internalRender(instance) {
	  var spec = instance.$s;
	  var recycledInstance = spec.r.pop(instance.key);
	  if (recycledInstance) {
	    spec.u(instance, recycledInstance);
	    return recycledInstance;
	  } else {
	    internalRenderNoRecycle(instance);
	    return instance;
	  }
	};

	var render = exports.render = function render(instance) {
	  return internalRender(instance).$n;
	};

	var internalRerender = function internalRerender(prevInstance, instance) {
	  if (internalRerenderInstance(instance, prevInstance)) return prevInstance;

	  instance = internalRender(instance);
	  replaceNode(prevInstance.$n, instance.$n);
	  recycle(prevInstance);
	  return instance;
	};

	var rerender = exports.rerender = function rerender(node, instance) {
	  return internalRerender(node.xvdom, instance).$n;
	};

	var unmount = exports.unmount = function unmount(node) {
	  unmountInstance(node.xvdom, node.parentNode);
	};

	exports.default = {
	  createDynamic: createDynamic,
	  createComponent: createComponent,
	  render: render,
	  rerender: rerender,
	  unmount: unmount,
	  Pool: Pool,
	  DEADPOOL: DEADPOOL
	};

	// Internal API

	var _ = exports._ = {
	  rerenderText: rerenderText,
	  rerenderInstance: rerenderInstance,
	  rerenderDynamic: rerenderDynamic,
	  rerenderArray: rerenderArrayMaybe
	};

/***/ }
/******/ ]);