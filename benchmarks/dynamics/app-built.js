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

	var _xvdomCreateComponent = _index2.default.createComponent,
	    _xvdomCreateDynamic = _index2.default.createDynamic,
	    _xvdomEl = _index2.default.el,
	    _xvdomUpdateDynamic = _index2.default.updateDynamic;
	var _xvdomSpec5 = {
	  c: function c(inst) {
	    var _n = _xvdomCreateComponent(Comp, Comp.state, {
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
	    var _n = _xvdomEl('div'),
	        _n2;

	    _n2 = _xvdomCreateComponent(CompPart, CompPart.state, {
	      values: inst.a,
	      start: 0
	    }, inst, 'b', 'c');

	    _n.appendChild(_n2);

	    _n2 = _xvdomCreateComponent(CompPart, CompPart.state, {
	      values: inst.d,
	      start: 5
	    }, inst, 'e', 'f');

	    _n.appendChild(_n2);

	    _n2 = _xvdomCreateComponent(CompPart, CompPart.state, {
	      values: inst.g,
	      start: 10
	    }, inst, 'h', 'i');

	    _n.appendChild(_n2);

	    _n2 = _xvdomCreateComponent(CompPart, CompPart.state, {
	      values: inst.j,
	      start: 15
	    }, inst, 'k', 'l');

	    _n.appendChild(_n2);

	    _n2 = _xvdomCreateComponent(CompPart, CompPart.state, {
	      values: inst.m,
	      start: 20
	    }, inst, 'n', 'o');

	    _n.appendChild(_n2);

	    _n2 = _xvdomCreateComponent(CompPart, CompPart.state, {
	      values: inst.p,
	      start: 25
	    }, inst, 'q', 'r');

	    _n.appendChild(_n2);

	    _n2 = _xvdomCreateComponent(CompPart, CompPart.state, {
	      values: inst.s,
	      start: 30
	    }, inst, 't', 'u');

	    _n.appendChild(_n2);

	    _n2 = _xvdomCreateComponent(CompPart, CompPart.state, {
	      values: inst.v,
	      start: 35
	    }, inst, 'w', 'x');

	    _n.appendChild(_n2);

	    _n2 = _xvdomCreateComponent(CompPart, CompPart.state, {
	      values: inst.y,
	      start: 40
	    }, inst, 'z', 'A');

	    _n.appendChild(_n2);

	    _n2 = _xvdomCreateComponent(CompPart, CompPart.state, {
	      values: inst.B,
	      start: 45
	    }, inst, 'C', 'D');

	    _n.appendChild(_n2);

	    _n2 = _xvdomCreateComponent(CompPartPrefix, CompPartPrefix.state, {
	      values: inst.E,
	      start: 50
	    }, inst, 'F', 'G');

	    _n.appendChild(_n2);

	    _n2 = _xvdomCreateComponent(CompPartPrefix, CompPartPrefix.state, {
	      values: inst.H,
	      start: 55
	    }, inst, 'I', 'J');

	    _n.appendChild(_n2);

	    _n2 = _xvdomCreateComponent(CompPartPrefix, CompPartPrefix.state, {
	      values: inst.K,
	      start: 60
	    }, inst, 'L', 'M');

	    _n.appendChild(_n2);

	    _n2 = _xvdomCreateComponent(CompPartPrefix, CompPartPrefix.state, {
	      values: inst.N,
	      start: 65
	    }, inst, 'O', 'P');

	    _n.appendChild(_n2);

	    _n2 = _xvdomCreateComponent(CompPartPrefix, CompPartPrefix.state, {
	      values: inst.Q,
	      start: 70
	    }, inst, 'R', 'S');

	    _n.appendChild(_n2);

	    _n2 = _xvdomCreateComponent(CompPartPrefix, CompPartPrefix.state, {
	      values: inst.T,
	      start: 75
	    }, inst, 'U', 'V');

	    _n.appendChild(_n2);

	    _n2 = _xvdomCreateComponent(CompPartPrefix, CompPartPrefix.state, {
	      values: inst.W,
	      start: 80
	    }, inst, 'X', 'Y');

	    _n.appendChild(_n2);

	    _n2 = _xvdomCreateComponent(CompPartPrefix, CompPartPrefix.state, {
	      values: inst.Z,
	      start: 85
	    }, inst, 'a1', 'b1');

	    _n.appendChild(_n2);

	    _n2 = _xvdomCreateComponent(CompPartPrefix, CompPartPrefix.state, {
	      values: inst.c1,
	      start: 90
	    }, inst, 'd1', 'e1');

	    _n.appendChild(_n2);

	    _n2 = _xvdomCreateComponent(CompPartPrefix, CompPartPrefix.state, {
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
	    var _n = _xvdomEl('div'),
	        _n2,
	        _n3,
	        _n4,
	        _n5,
	        _n6,
	        _n7;

	    _n2 = _xvdomEl('span');
	    _n3 = _xvdomEl('span');

	    _n3.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n3);

	    _n2.appendChild(inst.b = _xvdomCreateDynamic(false, _n2, inst.a));

	    _n.appendChild(_n2);

	    _n2 = _xvdomEl('span');
	    _n4 = _xvdomEl('span');

	    _n4.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n4);

	    _n2.appendChild(inst.d = _xvdomCreateDynamic(false, _n2, inst.c));

	    _n.appendChild(_n2);

	    _n2 = _xvdomEl('span');
	    _n5 = _xvdomEl('span');

	    _n5.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n5);

	    _n2.appendChild(inst.f = _xvdomCreateDynamic(false, _n2, inst.e));

	    _n.appendChild(_n2);

	    _n2 = _xvdomEl('span');
	    _n6 = _xvdomEl('span');

	    _n6.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n6);

	    _n2.appendChild(inst.h = _xvdomCreateDynamic(false, _n2, inst.g));

	    _n.appendChild(_n2);

	    _n2 = _xvdomEl('span');
	    _n7 = _xvdomEl('span');

	    _n7.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n7);

	    _n2.appendChild(inst.j = _xvdomCreateDynamic(false, _n2, inst.i));

	    _n.appendChild(_n2);

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.b = _xvdomUpdateDynamic(false, pInst.a, pInst.a = inst.a, pInst.b);
	    }

	    if (inst.c !== pInst.c) {
	      pInst.d = _xvdomUpdateDynamic(false, pInst.c, pInst.c = inst.c, pInst.d);
	    }

	    if (inst.e !== pInst.e) {
	      pInst.f = _xvdomUpdateDynamic(false, pInst.e, pInst.e = inst.e, pInst.f);
	    }

	    if (inst.g !== pInst.g) {
	      pInst.h = _xvdomUpdateDynamic(false, pInst.g, pInst.g = inst.g, pInst.h);
	    }

	    if (inst.i !== pInst.i) {
	      pInst.j = _xvdomUpdateDynamic(false, pInst.i, pInst.i = inst.i, pInst.j);
	    }
	  },
	  r: _index2.default.DEADPOOL
	};
	var _xvdomSpec2 = {
	  c: function c(inst) {
	    var _n = _xvdomEl('div'),
	        _n2;

	    _n2 = _xvdomEl('span');

	    _n2.appendChild(inst.b = _xvdomCreateDynamic(true, _n2, inst.a));

	    _n.appendChild(_n2);

	    _n2 = _xvdomEl('span');

	    _n2.appendChild(inst.d = _xvdomCreateDynamic(true, _n2, inst.c));

	    _n.appendChild(_n2);

	    _n2 = _xvdomEl('span');

	    _n2.appendChild(inst.f = _xvdomCreateDynamic(true, _n2, inst.e));

	    _n.appendChild(_n2);

	    _n2 = _xvdomEl('span');

	    _n2.appendChild(inst.h = _xvdomCreateDynamic(true, _n2, inst.g));

	    _n.appendChild(_n2);

	    _n2 = _xvdomEl('span');

	    _n2.appendChild(inst.j = _xvdomCreateDynamic(true, _n2, inst.i));

	    _n.appendChild(_n2);

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.b = _xvdomUpdateDynamic(true, pInst.a, pInst.a = inst.a, pInst.b);
	    }

	    if (inst.c !== pInst.c) {
	      pInst.d = _xvdomUpdateDynamic(true, pInst.c, pInst.c = inst.c, pInst.d);
	    }

	    if (inst.e !== pInst.e) {
	      pInst.f = _xvdomUpdateDynamic(true, pInst.e, pInst.e = inst.e, pInst.f);
	    }

	    if (inst.g !== pInst.g) {
	      pInst.h = _xvdomUpdateDynamic(true, pInst.g, pInst.g = inst.g, pInst.h);
	    }

	    if (inst.i !== pInst.i) {
	      pInst.j = _xvdomUpdateDynamic(true, pInst.i, pInst.i = inst.i, pInst.j);
	    }
	  },
	  r: _index2.default.DEADPOOL
	};
	var _xvdomSpec = {
	  c: function c() {
	    var _n = _xvdomEl('b');

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
	    c: values[1 + start],
	    e: values[2 + start],
	    g: values[3 + start],
	    i: values[4 + start]
	  };
	};

	var CompPartPrefix = function CompPartPrefix(_ref2) {
	  var start = _ref2.start;
	  var values = _ref2.values;
	  return {
	    $s: _xvdomSpec3,
	    a: values[0 + start],
	    c: values[1 + start],
	    e: values[2 + start],
	    g: values[3 + start],
	    i: values[4 + start]
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

	if (window.location.search === '?test/') test();else runBenchmark();

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.createComponent = createComponent;
	/*

	Instance properties:

	$n = DOM node
	$s - spec (see below)
	$x - Pool linked list next pointer

	Spec properties:

	c - create (or render)
	u - update (or update)
	r - keyed map of unmounted instanced that can be recycled

	*/

	var isDynamicEmpty = function isDynamicEmpty(value) {
	  return value == null || value === true || value === false;
	};

	// https://esbench.com/bench/57f1459d330ab09900a1a1dd
	function dynamicType(value) {
	  if (value instanceof Object) {
	    return value instanceof Array ? 'array' : 'object';
	  }

	  return isDynamicEmpty(value) ? 'empty' : 'text';
	}

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
	var createEmptyTextNode = function createEmptyTextNode() {
	  return createTextNode('');
	};

	var replaceNode = function replaceNode(oldNode, newNode) {
	  var parentNode = oldNode.parentNode;
	  if (parentNode) parentNode.replaceChild(newNode, oldNode);
	};

	function unmountInstance(inst, parentNode) {
	  recycle(inst);
	  parentNode.removeChild(inst.$n);
	}

	function removeArrayNodes(array, parentNode, i) {
	  while (i < array.length) {
	    unmountInstance(array[i++], parentNode);
	  }
	}

	function removeArrayNodesOnlyChild(array, parentNode) {
	  var i = 0;

	  while (i < array.length) {
	    recycle(array[i++]);
	  }
	  parentNode.textContent = '';
	}

	function internalRerenderInstance(inst, prevInst) {
	  return prevInst.$s === inst.$s && (inst.$s.u(inst, prevInst), true);
	}

	function renderArrayToParentBefore(parentNode, array, i, markerNode) {
	  if (markerNode == null) renderArrayToParent(parentNode, array, i);else renderArrayToParentBeforeNode(parentNode, array, i, markerNode);
	}

	function renderArrayToParentBeforeNode(parentNode, array, i, beforeNode) {
	  while (i < array.length) {
	    parentNode.insertBefore((array[i] = internalRender(array[i])).$n, beforeNode);
	    ++i;
	  }
	}

	function renderArrayToParent(parentNode, array, i) {
	  while (i < array.length) {
	    parentNode.appendChild((array[i] = internalRender(array[i])).$n);
	    ++i;
	  }
	}

	function rerenderArrayReconcileWithMinLayout(parentNode, array, length, oldArray, oldLength, markerNode) {
	  var oldStartIndex = 0;
	  var startIndex = 0;

	  do {
	    array[startIndex] = internalRerender(oldArray[oldStartIndex], array[startIndex]);
	    ++startIndex;
	    ++oldStartIndex;
	  } while (oldStartIndex < oldLength && startIndex < length);

	  if (startIndex < length) {
	    renderArrayToParentBefore(parentNode, array, startIndex, markerNode);
	  } else {
	    removeArrayNodes(oldArray, parentNode, oldStartIndex);
	  }
	}

	function rerenderArray(markerNode, array, oldArray) {
	  var parentNode = markerNode.parentNode;
	  var length = array.length;
	  var oldLength = oldArray.length;

	  if (!length) {
	    removeArrayNodes(oldArray, parentNode, 0);
	  } else if (!oldLength) {
	    renderArrayToParentBefore(parentNode, array, 0, markerNode);
	  } else {
	    rerenderArrayReconcileWithMinLayout(parentNode, array, length, oldArray, oldLength, markerNode);
	  }
	}

	function rerenderArrayOnlyChild(parentNode, array, oldArray) {
	  var length = array.length;
	  var oldLength = oldArray.length;

	  if (!length) {
	    removeArrayNodesOnlyChild(oldArray, parentNode);
	  } else if (!oldLength) {
	    renderArrayToParent(parentNode, array, 0);
	  } else {
	    rerenderArrayReconcileWithMinLayout(parentNode, array, length, oldArray, oldLength, null);
	  }
	}

	function rerenderDynamic(isOnlyChild, value, contextNode) {
	  var node = createDynamic(isOnlyChild, contextNode.parentNode, value);
	  replaceNode(contextNode, node);
	  return node;
	}

	function rerenderText(value, contextNode, isOnlyChild) {
	  if (value instanceof Object) {
	    return rerenderDynamic(isOnlyChild, value, contextNode);
	  }

	  contextNode.nodeValue = isDynamicEmpty(value) ? '' : value;
	  return contextNode;
	}

	function rerenderInstance(value, node, isOnlyChild, prevValue) {
	  var prevRenderedInstance = void 0;
	  if (!value || !internalRerenderInstance(value, prevRenderedInstance = prevValue.$r || prevValue)) {
	    return rerenderDynamic(isOnlyChild, value, node);
	  }

	  value.$r = prevRenderedInstance;
	  return node;
	}

	// TODO: Figure out whether we're using all these arguments
	function rerenderComponent(component, props, componentInstance, instance, componentInstanceProp) {
	  var newCompInstance = component(props || EMPTY_PROPS);
	  if (!internalRerenderInstance(newCompInstance, componentInstance)) {
	    replaceNode(componentInstance.$n, (instance[componentInstanceProp] = internalRender(newCompInstance)).$n);
	  }
	}

	function rerenderArrayMaybe(array, contextNode, isOnlyChild, oldArray) {
	  var markerNode = contextNode.xvdomContext;

	  if (array instanceof Array) {
	    if (isOnlyChild) {
	      rerenderArrayOnlyChild(markerNode, array, oldArray);
	    } else {
	      rerenderArray(markerNode, array, oldArray);
	    }
	    return contextNode;
	  }

	  if (isOnlyChild) {
	    removeArrayNodesOnlyChild(oldArray, markerNode);
	    return markerNode.appendChild(createDynamic(true, markerNode, array));
	  }

	  removeArrayNodes(oldArray, markerNode.parentNode, 0);
	  return rerenderDynamic(false, array, markerNode);
	}

	function rerenderStatefulComponent(component, newProps, api) {
	  var _onProps = api._onProps;
	  var props = api.props;

	  api.props = newProps;

	  if (_onProps) componentSend(component, api, _onProps, props);else componentRerender(component, api);
	}

	function createArray(value, parentNode, isOnlyChild) {
	  var node = document.createDocumentFragment();
	  renderArrayToParent(node, value, 0);
	  node.xvdomContext = isOnlyChild ? parentNode : node.appendChild(createTextNode(''));
	  return node;
	}

	function componentRerender(component, api) {
	  var instance = internalRerender(api._instance, component(api));
	  api._instance = instance;
	  instance.$n.xvdom = api._parentInst;
	}

	function componentSend(component, api, actionFn, context) {
	  // TODO: process.ENV === 'development', console.error(`Action not found #{action}`);
	  if (!actionFn) return;

	  var newState = actionFn(api, context);
	  if (newState !== api.state) {
	    api.state = newState;
	    componentRerender(component, api);
	  }
	}

	function createStatefulComponent(component, props, instance, rerenderFuncProp, componentInstanceProp, actions) {
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
	}

	function createNoStateComponent(component, props, instance, rerenderFuncProp, componentInstanceProp) {
	  // TODO: Remove passing componentInstanceProp and rerenderFuncProp
	  //       Instead have an `updateComponent()` (match approach to dynamics)
	  instance[rerenderFuncProp] = rerenderComponent;
	  return internalRenderNoRecycle(instance[componentInstanceProp] = component(props));
	}

	function createComponent(component, actions, props, instance, rerenderFuncProp, componentInstanceProp) {
	  var createFn = actions ? createStatefulComponent : createNoStateComponent;
	  return createFn(component, props || EMPTY_PROPS, instance, rerenderFuncProp, componentInstanceProp, actions);
	};

	function internalRenderNoRecycle(instance) {
	  var node = instance.$s.c(instance);
	  instance.$n = node;
	  node.xvdom = instance;
	  return node;
	}

	function internalRender(instance) {
	  var spec = instance.$s;
	  var recycledInstance = spec.r.pop(instance.key);
	  if (recycledInstance) {
	    spec.u(instance, recycledInstance);
	    return recycledInstance;
	  }

	  internalRenderNoRecycle(instance);
	  return instance;
	}

	var CREATE_BY_TYPE = {
	  text: createTextNode,
	  object: internalRenderNoRecycle,
	  array: createArray,
	  empty: createEmptyTextNode
	};

	function createDynamic(isOnlyChild, parentNode, value) {
	  return CREATE_BY_TYPE[dynamicType(value)](value, parentNode, isOnlyChild);
	}

	var UPDATE_BY_TYPE = {
	  text: rerenderText,
	  object: rerenderInstance,
	  array: rerenderArrayMaybe,
	  empty: rerenderText
	};

	function updateDynamic(isOnlyChild, oldValue, value, contextNode) {
	  return UPDATE_BY_TYPE[dynamicType(oldValue)](value, contextNode, isOnlyChild, oldValue);
	};

	function internalRerender(prevInstance, instance) {
	  if (internalRerenderInstance(instance, prevInstance)) return prevInstance;

	  instance = internalRender(instance);
	  replaceNode(prevInstance.$n, instance.$n);
	  recycle(prevInstance);
	  return instance;
	}

	var render = exports.render = function render(instance) {
	  return internalRender(instance).$n;
	};
	var rerender = exports.rerender = function rerender(node, instance) {
	  return internalRerender(node.xvdom, instance).$n;
	};
	var unmount = exports.unmount = function unmount(node) {
	  unmountInstance(node.xvdom, node.parentNode);
	};

	exports.default = {
	  createComponent: createComponent,
	  createDynamic: createDynamic,
	  el: function el(tag) {
	    return document.createElement(tag);
	  },
	  render: render,
	  rerender: rerender,
	  unmount: unmount,
	  updateDynamic: updateDynamic,
	  Pool: Pool,
	  DEADPOOL: DEADPOOL
	};

	// Internal API

	var _ = exports._ = {
	  rerenderText: rerenderText,
	  rerenderDynamic: rerenderDynamic
	};

/***/ }
/******/ ]);