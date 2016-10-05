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
	var _xvdomSpec19 = {
	  c: function c(inst) {
	    var _n = _xvdomCreateComponent(Comp1, Comp1.state, {
	      value: 100
	    }, inst, 'a', 'b');

	    return _n;
	  },
	  u: function u() {},
	  r: _index2.default.DEADPOOL
	};
	var _xvdomSpec18 = {
	  c: function c(inst) {
	    var _n = _xvdomCreateComponent(Comp2, Comp2.state, {
	      value: inst.a
	    }, inst, 'b', 'c');

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.b(Comp2, {
	        value: inst.a
	      }, pInst.c, pInst, 'c');
	      pInst.a = inst.a;
	    }
	  },
	  r: _index2.default.DEADPOOL
	};
	var _xvdomSpec17 = {
	  c: function c(inst) {
	    var _n = _xvdomCreateComponent(Comp3, Comp3.state, {
	      value: inst.a
	    }, inst, 'b', 'c');

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.b(Comp3, {
	        value: inst.a
	      }, pInst.c, pInst, 'c');
	      pInst.a = inst.a;
	    }
	  },
	  r: _index2.default.DEADPOOL
	};
	var _xvdomSpec16 = {
	  c: function c(inst) {
	    var _n = _xvdomCreateComponent(Comp4, Comp4.state, {
	      value: inst.a
	    }, inst, 'b', 'c');

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.b(Comp4, {
	        value: inst.a
	      }, pInst.c, pInst, 'c');
	      pInst.a = inst.a;
	    }
	  },
	  r: _index2.default.DEADPOOL
	};
	var _xvdomSpec15 = {
	  c: function c(inst) {
	    var _n = _xvdomCreateComponent(Comp5, Comp5.state, {
	      value: inst.a
	    }, inst, 'b', 'c');

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.b(Comp5, {
	        value: inst.a
	      }, pInst.c, pInst, 'c');
	      pInst.a = inst.a;
	    }
	  },
	  r: _index2.default.DEADPOOL
	};
	var _xvdomSpec14 = {
	  c: function c(inst) {
	    var _n = _xvdomCreateComponent(Comp6, Comp6.state, {
	      value: inst.a
	    }, inst, 'b', 'c');

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.b(Comp6, {
	        value: inst.a
	      }, pInst.c, pInst, 'c');
	      pInst.a = inst.a;
	    }
	  },
	  r: _index2.default.DEADPOOL
	};
	var _xvdomSpec13 = {
	  c: function c(inst) {
	    var _n = _xvdomCreateComponent(Comp7, Comp7.state, {
	      value: inst.a
	    }, inst, 'b', 'c');

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.b(Comp7, {
	        value: inst.a
	      }, pInst.c, pInst, 'c');
	      pInst.a = inst.a;
	    }
	  },
	  r: _index2.default.DEADPOOL
	};
	var _xvdomSpec12 = {
	  c: function c(inst) {
	    var _n = _xvdomCreateComponent(Comp8, Comp8.state, {
	      value: inst.a
	    }, inst, 'b', 'c');

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.b(Comp8, {
	        value: inst.a
	      }, pInst.c, pInst, 'c');
	      pInst.a = inst.a;
	    }
	  },
	  r: _index2.default.DEADPOOL
	};
	var _xvdomSpec11 = {
	  c: function c(inst) {
	    var _n = _xvdomCreateComponent(Comp9, Comp9.state, {
	      value: inst.a
	    }, inst, 'b', 'c');

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.b(Comp9, {
	        value: inst.a
	      }, pInst.c, pInst, 'c');
	      pInst.a = inst.a;
	    }
	  },
	  r: _index2.default.DEADPOOL
	};
	var _xvdomSpec10 = {
	  c: function c(inst) {
	    var _n = _xvdomCreateComponent(Comp10, Comp10.state, {
	      value: inst.a
	    }, inst, 'b', 'c');

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.b(Comp10, {
	        value: inst.a
	      }, pInst.c, pInst, 'c');
	      pInst.a = inst.a;
	    }
	  },
	  r: _index2.default.DEADPOOL
	};
	var _xvdomSpec9 = {
	  c: function c(inst) {
	    var _n = _xvdomCreateComponent(Comp11, Comp11.state, {
	      value: inst.a
	    }, inst, 'b', 'c');

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.b(Comp11, {
	        value: inst.a
	      }, pInst.c, pInst, 'c');
	      pInst.a = inst.a;
	    }
	  },
	  r: _index2.default.DEADPOOL
	};
	var _xvdomSpec8 = {
	  c: function c(inst) {
	    var _n = _xvdomCreateComponent(Comp12, Comp12.state, {
	      value: inst.a
	    }, inst, 'b', 'c');

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.b(Comp12, {
	        value: inst.a
	      }, pInst.c, pInst, 'c');
	      pInst.a = inst.a;
	    }
	  },
	  r: _index2.default.DEADPOOL
	};
	var _xvdomSpec7 = {
	  c: function c(inst) {
	    var _n = _xvdomCreateComponent(Comp13, Comp13.state, {
	      value: inst.a
	    }, inst, 'b', 'c');

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.b(Comp13, {
	        value: inst.a
	      }, pInst.c, pInst, 'c');
	      pInst.a = inst.a;
	    }
	  },
	  r: _index2.default.DEADPOOL
	};
	var _xvdomSpec6 = {
	  c: function c(inst) {
	    var _n = _xvdomCreateComponent(Comp14, Comp14.state, {
	      value: inst.a
	    }, inst, 'b', 'c');

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.b(Comp14, {
	        value: inst.a
	      }, pInst.c, pInst, 'c');
	      pInst.a = inst.a;
	    }
	  },
	  r: _index2.default.DEADPOOL
	};
	var _xvdomSpec5 = {
	  c: function c(inst) {
	    var _n = _xvdomCreateComponent(Comp15, Comp15.state, {
	      value: inst.a
	    }, inst, 'b', 'c');

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.b(Comp15, {
	        value: inst.a
	      }, pInst.c, pInst, 'c');
	      pInst.a = inst.a;
	    }
	  },
	  r: _index2.default.DEADPOOL
	};
	var _xvdomSpec4 = {
	  c: function c(inst) {
	    var _n = _xvdomCreateComponent(Comp16, Comp16.state, {
	      value: inst.a
	    }, inst, 'b', 'c');

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.b(Comp16, {
	        value: inst.a
	      }, pInst.c, pInst, 'c');
	      pInst.a = inst.a;
	    }
	  },
	  r: _index2.default.DEADPOOL
	};
	var _xvdomSpec3 = {
	  c: function c(inst) {
	    var _n = _xvdomEl('div');

	    _n.appendChild(inst.b = _xvdomCreateDynamic(true, _n, inst.a));

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.b = _xvdomUpdateDynamic(true, pInst.a, pInst.a = inst.a, pInst.b);
	    }
	  },
	  r: _index2.default.DEADPOOL
	};
	var _xvdomSpec2 = {
	  c: function c(inst) {
	    var _n = _xvdomCreateComponent(LeafNode, LeafNode.state, {
	      value: inst.a
	    }, inst, 'b', 'c');

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.b(LeafNode, {
	        value: inst.a
	      }, pInst.c, pInst, 'c');
	      pInst.a = inst.a;
	    }
	  },
	  r: _index2.default.DEADPOOL
	};
	var _xvdomSpec = {
	  c: function c(inst) {
	    var _n = _xvdomEl('div');

	    _n.appendChild(inst.b = _xvdomCreateDynamic(true, _n, inst.a));

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.b = _xvdomUpdateDynamic(true, pInst.a, pInst.a = inst.a, pInst.b);
	    }
	  },
	  r: _index2.default.DEADPOOL
	};


	var plusOne = function plusOne(_ref) {
	  var value = _ref.props.value;
	  return { value: value + 1 };
	};
	var noChange = function noChange(_ref2) {
	  var props = _ref2.props;
	  var state = _ref2.state;
	  return state;
	};

	var makeState = function makeState(i) {
	  switch (i % 5) {
	    case 0:
	      return {
	        onInit: plusOne,
	        action1: noChange,
	        action2: noChange,
	        action3: noChange,
	        action4: noChange
	      };

	    case 1:
	      return {
	        onInit: plusOne,
	        action1: noChange,
	        action2: noChange,
	        action3: noChange,
	        action4: noChange,
	        action5: noChange
	      };

	    case 2:
	      return {
	        onInit: plusOne,
	        action1: noChange,
	        action2: noChange,
	        action3: noChange,
	        action4: noChange,
	        action5: noChange,
	        action6: noChange
	      };

	    case 3:
	      return {
	        onInit: plusOne,
	        action1: noChange,
	        action2: noChange,
	        action3: noChange,
	        action4: noChange,
	        action5: noChange,
	        action6: noChange,
	        action7: noChange
	      };

	    case 4:
	      return {
	        onInit: plusOne,
	        action1: noChange,
	        action2: noChange,
	        action3: noChange,
	        action4: noChange,
	        action5: noChange,
	        action6: noChange,
	        action7: noChange,
	        action8: noChange
	      };
	  };
	};

	var stateNum = 0;

	var LeafNode = function LeafNode(_ref3) {
	  var props = _ref3.props;
	  var state = _ref3.state;
	  return {
	    $s: _xvdomSpec,
	    a: state.value
	  };
	};
	LeafNode.state = makeState(stateNum++);

	var Comp16 = function Comp16() {
	  var result = [];
	  var i = 25;
	  while (i--) {
	    result.push({
	      $s: _xvdomSpec2,
	      a: i,
	      key: i
	    });
	  }

	  return {
	    $s: _xvdomSpec3,
	    a: result
	  };
	};

	var Comp15 = function Comp15(_ref4) {
	  var state = _ref4.state;
	  return {
	    $s: _xvdomSpec4,
	    a: state.value
	  };
	};
	Comp15.state = makeState(stateNum++);

	var Comp14 = function Comp14(_ref5) {
	  var state = _ref5.state;
	  return {
	    $s: _xvdomSpec5,
	    a: state.value
	  };
	};
	Comp14.state = makeState(stateNum++);

	var Comp13 = function Comp13(_ref6) {
	  var state = _ref6.state;
	  return {
	    $s: _xvdomSpec6,
	    a: state.value
	  };
	};
	Comp13.state = makeState(stateNum++);

	var Comp12 = function Comp12(_ref7) {
	  var state = _ref7.state;
	  return {
	    $s: _xvdomSpec7,
	    a: state.value
	  };
	};
	Comp12.state = makeState(stateNum++);

	var Comp11 = function Comp11(_ref8) {
	  var state = _ref8.state;
	  return {
	    $s: _xvdomSpec8,
	    a: state.value
	  };
	};
	Comp11.state = makeState(stateNum++);

	var Comp10 = function Comp10(_ref9) {
	  var state = _ref9.state;
	  return {
	    $s: _xvdomSpec9,
	    a: state.value
	  };
	};
	Comp10.state = makeState(stateNum++);

	var Comp9 = function Comp9(_ref10) {
	  var state = _ref10.state;
	  return {
	    $s: _xvdomSpec10,
	    a: state.value
	  };
	};
	Comp9.state = makeState(stateNum++);

	var Comp8 = function Comp8(_ref11) {
	  var state = _ref11.state;
	  return {
	    $s: _xvdomSpec11,
	    a: state.value
	  };
	};
	Comp8.state = makeState(stateNum++);

	var Comp7 = function Comp7(_ref12) {
	  var state = _ref12.state;
	  return {
	    $s: _xvdomSpec12,
	    a: state.value
	  };
	};
	Comp7.state = makeState(stateNum++);

	var Comp6 = function Comp6(_ref13) {
	  var state = _ref13.state;
	  return {
	    $s: _xvdomSpec13,
	    a: state.value
	  };
	};
	Comp6.state = makeState(stateNum++);

	var Comp5 = function Comp5(_ref14) {
	  var state = _ref14.state;
	  return {
	    $s: _xvdomSpec14,
	    a: state.value
	  };
	};
	Comp5.state = makeState(stateNum++);

	var Comp4 = function Comp4(_ref15) {
	  var state = _ref15.state;
	  return {
	    $s: _xvdomSpec15,
	    a: state.value
	  };
	};
	Comp4.state = makeState(stateNum++);

	var Comp3 = function Comp3(_ref16) {
	  var state = _ref16.state;
	  return {
	    $s: _xvdomSpec16,
	    a: state.value
	  };
	};
	Comp3.state = makeState(stateNum++);

	var Comp2 = function Comp2(_ref17) {
	  var state = _ref17.state;
	  return {
	    $s: _xvdomSpec17,
	    a: state.value
	  };
	};
	Comp2.state = makeState(stateNum++);

	var Comp1 = function Comp1(_ref18) {
	  var state = _ref18.state;
	  return {
	    $s: _xvdomSpec18,
	    a: state.value
	  };
	};
	Comp1.state = makeState(stateNum++);

	var render = function render() {
	  return _index2.default.render({
	    $s: _xvdomSpec19
	  });
	};

	var benchmark = function benchmark() {
	  var i = 0;
	  while (i++ < 10000) {
	    render();
	  }
	};

	var EXPECTED_TEXT_CONTENT = '25242322212019181716151413121110987654321';

	if (window.location.search === '?test') {
	  var _render = render();

	  var textContent = _render.textContent;

	  var pass = textContent === EXPECTED_TEXT_CONTENT;
	  console.log(pass ? 'SUCCESS' : 'FAIL: expected textContent to be ' + EXPECTED_TEXT_CONTENT + ', but got ' + textContent);
	} else {
	  console.time('benchmark');
	  benchmark();
	  console.timeEnd('benchmark');
	}

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