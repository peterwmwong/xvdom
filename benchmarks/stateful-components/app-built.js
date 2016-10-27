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
	    _xvdomUpdateComponent = _index2.default.updateComponent,
	    _xvdomUpdateDynamic = _index2.default.updateDynamic;
	var _xvdomSpec19 = {
	  c: function c(inst) {
	    var _n = _xvdomCreateComponent(Comp1, Comp1.state, {
	      value: 100
	    }, inst).$n;

	    return _n;
	  },
	  u: function u() {},
	  r: _index2.default.DEADPOOL
	};
	var _xvdomSpec18 = {
	  c: function c(inst) {
	    var _n = (inst.b = _xvdomCreateComponent(Comp2, Comp2.state, {
	      value: inst.a
	    }, inst)).$n;

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.b = _xvdomUpdateComponent(Comp2, Comp2.state, {
	        value: pInst.a = inst.a
	      }, pInst.b);
	    }
	  },
	  r: _index2.default.DEADPOOL
	};
	var _xvdomSpec17 = {
	  c: function c(inst) {
	    var _n = (inst.b = _xvdomCreateComponent(Comp3, Comp3.state, {
	      value: inst.a
	    }, inst)).$n;

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.b = _xvdomUpdateComponent(Comp3, Comp3.state, {
	        value: pInst.a = inst.a
	      }, pInst.b);
	    }
	  },
	  r: _index2.default.DEADPOOL
	};
	var _xvdomSpec16 = {
	  c: function c(inst) {
	    var _n = (inst.b = _xvdomCreateComponent(Comp4, Comp4.state, {
	      value: inst.a
	    }, inst)).$n;

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.b = _xvdomUpdateComponent(Comp4, Comp4.state, {
	        value: pInst.a = inst.a
	      }, pInst.b);
	    }
	  },
	  r: _index2.default.DEADPOOL
	};
	var _xvdomSpec15 = {
	  c: function c(inst) {
	    var _n = (inst.b = _xvdomCreateComponent(Comp5, Comp5.state, {
	      value: inst.a
	    }, inst)).$n;

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.b = _xvdomUpdateComponent(Comp5, Comp5.state, {
	        value: pInst.a = inst.a
	      }, pInst.b);
	    }
	  },
	  r: _index2.default.DEADPOOL
	};
	var _xvdomSpec14 = {
	  c: function c(inst) {
	    var _n = (inst.b = _xvdomCreateComponent(Comp6, Comp6.state, {
	      value: inst.a
	    }, inst)).$n;

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.b = _xvdomUpdateComponent(Comp6, Comp6.state, {
	        value: pInst.a = inst.a
	      }, pInst.b);
	    }
	  },
	  r: _index2.default.DEADPOOL
	};
	var _xvdomSpec13 = {
	  c: function c(inst) {
	    var _n = (inst.b = _xvdomCreateComponent(Comp7, Comp7.state, {
	      value: inst.a
	    }, inst)).$n;

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.b = _xvdomUpdateComponent(Comp7, Comp7.state, {
	        value: pInst.a = inst.a
	      }, pInst.b);
	    }
	  },
	  r: _index2.default.DEADPOOL
	};
	var _xvdomSpec12 = {
	  c: function c(inst) {
	    var _n = (inst.b = _xvdomCreateComponent(Comp8, Comp8.state, {
	      value: inst.a
	    }, inst)).$n;

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.b = _xvdomUpdateComponent(Comp8, Comp8.state, {
	        value: pInst.a = inst.a
	      }, pInst.b);
	    }
	  },
	  r: _index2.default.DEADPOOL
	};
	var _xvdomSpec11 = {
	  c: function c(inst) {
	    var _n = (inst.b = _xvdomCreateComponent(Comp9, Comp9.state, {
	      value: inst.a
	    }, inst)).$n;

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.b = _xvdomUpdateComponent(Comp9, Comp9.state, {
	        value: pInst.a = inst.a
	      }, pInst.b);
	    }
	  },
	  r: _index2.default.DEADPOOL
	};
	var _xvdomSpec10 = {
	  c: function c(inst) {
	    var _n = (inst.b = _xvdomCreateComponent(Comp10, Comp10.state, {
	      value: inst.a
	    }, inst)).$n;

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.b = _xvdomUpdateComponent(Comp10, Comp10.state, {
	        value: pInst.a = inst.a
	      }, pInst.b);
	    }
	  },
	  r: _index2.default.DEADPOOL
	};
	var _xvdomSpec9 = {
	  c: function c(inst) {
	    var _n = (inst.b = _xvdomCreateComponent(Comp11, Comp11.state, {
	      value: inst.a
	    }, inst)).$n;

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.b = _xvdomUpdateComponent(Comp11, Comp11.state, {
	        value: pInst.a = inst.a
	      }, pInst.b);
	    }
	  },
	  r: _index2.default.DEADPOOL
	};
	var _xvdomSpec8 = {
	  c: function c(inst) {
	    var _n = (inst.b = _xvdomCreateComponent(Comp12, Comp12.state, {
	      value: inst.a
	    }, inst)).$n;

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.b = _xvdomUpdateComponent(Comp12, Comp12.state, {
	        value: pInst.a = inst.a
	      }, pInst.b);
	    }
	  },
	  r: _index2.default.DEADPOOL
	};
	var _xvdomSpec7 = {
	  c: function c(inst) {
	    var _n = (inst.b = _xvdomCreateComponent(Comp13, Comp13.state, {
	      value: inst.a
	    }, inst)).$n;

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.b = _xvdomUpdateComponent(Comp13, Comp13.state, {
	        value: pInst.a = inst.a
	      }, pInst.b);
	    }
	  },
	  r: _index2.default.DEADPOOL
	};
	var _xvdomSpec6 = {
	  c: function c(inst) {
	    var _n = (inst.b = _xvdomCreateComponent(Comp14, Comp14.state, {
	      value: inst.a
	    }, inst)).$n;

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.b = _xvdomUpdateComponent(Comp14, Comp14.state, {
	        value: pInst.a = inst.a
	      }, pInst.b);
	    }
	  },
	  r: _index2.default.DEADPOOL
	};
	var _xvdomSpec5 = {
	  c: function c(inst) {
	    var _n = (inst.b = _xvdomCreateComponent(Comp15, Comp15.state, {
	      value: inst.a
	    }, inst)).$n;

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.b = _xvdomUpdateComponent(Comp15, Comp15.state, {
	        value: pInst.a = inst.a
	      }, pInst.b);
	    }
	  },
	  r: _index2.default.DEADPOOL
	};
	var _xvdomSpec4 = {
	  c: function c(inst) {
	    var _n = (inst.b = _xvdomCreateComponent(Comp16, Comp16.state, {
	      value: inst.a
	    }, inst)).$n;

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.b = _xvdomUpdateComponent(Comp16, Comp16.state, {
	        value: pInst.a = inst.a
	      }, pInst.b);
	    }
	  },
	  r: _index2.default.DEADPOOL
	};
	var _xvdomSpec3 = {
	  c: function c(inst) {
	    var _n = _xvdomEl('div');

	    inst.b = _xvdomCreateDynamic(true, _n, inst.a);
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
	    var _n = (inst.b = _xvdomCreateComponent(LeafNode, LeafNode.state, {
	      value: inst.a
	    }, inst)).$n;

	    return _n;
	  },
	  u: function u(inst, pInst) {
	    var v;

	    if (inst.a !== pInst.a) {
	      pInst.b = _xvdomUpdateComponent(LeafNode, LeafNode.state, {
	        value: pInst.a = inst.a
	      }, pInst.b);
	    }
	  },
	  r: _index2.default.DEADPOOL
	};
	var _xvdomSpec = {
	  c: function c(inst) {
	    var _n = _xvdomEl('div');

	    inst.b = _xvdomCreateDynamic(true, _n, inst.a);
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

	var isDynamicEmpty = function isDynamicEmpty(v) {
	  return v == null || v === true || v === false;
	};

	// https://esbench.com/bench/57f1459d330ab09900a1a1dd
	function dynamicType(v) {
	  if (v instanceof Object) return v instanceof Array ? 'array' : 'object';

	  return isDynamicEmpty(v) ? 'empty' : 'text';
	}

	var EMPTY_PROPS = {};
	var DEADPOOL = exports.DEADPOOL = {
	  push: function push() {},
	  pop: function pop() {}
	};

	// Creates an empty object with no built in properties (ie. `constructor`).
	function Hash() {}
	Hash.prototype = Object.create(null);

	// TODO: Benchmark whether this is slower than Function/Prototype
	function Pool() {
	  this.map = new Hash();
	}

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

	function internalRerenderInstance(prevInst, inst) {
	  return prevInst.$s === inst.$s && (inst.$s.u(inst, prevInst), true);
	}

	function renderArrayToParentBefore(parentNode, array, i, markerNode) {
	  if (markerNode === null) renderArrayToParent(parentNode, array, i);else renderArrayToParentBeforeNode(parentNode, array, i, markerNode);
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

	function rerenderDynamic(isOnlyChild, value, contextNode) {
	  var frag = document.createDocumentFragment();
	  var node = createDynamic(isOnlyChild, frag, value);
	  replaceNode(contextNode, frag);
	  return node;
	}

	function rerenderArrayReconcileWithMinLayout(parentNode, array, oldArray, markerNode) {
	  var i = 0;
	  for (; i < array.length && i < oldArray.length; i++) {
	    array[i] = internalRerender(oldArray[i], array[i]);
	  }

	  if (i < array.length) {
	    renderArrayToParentBefore(parentNode, array, i, markerNode);
	  } else {
	    removeArrayNodes(oldArray, parentNode, i);
	  }
	}

	function rerenderArrayOnlyChild(parentNode, array, oldArray) {
	  if (!oldArray.length) {
	    renderArrayToParent(parentNode, array, 0);
	  } else if (!array.length) {
	    removeArrayNodesOnlyChild(oldArray, parentNode);
	  } else {
	    rerenderArrayReconcileWithMinLayout(parentNode, array, oldArray, null);
	  }
	}

	function rerenderArray(array, parentOrMarkerNode, isOnlyChild, oldArray) {
	  if (array instanceof Array) {
	    return isOnlyChild ? rerenderArrayOnlyChild(parentOrMarkerNode, array, oldArray) : rerenderArrayReconcileWithMinLayout(parentOrMarkerNode.parentNode, array, oldArray, parentOrMarkerNode), parentOrMarkerNode;
	  }

	  if (isOnlyChild) {
	    removeArrayNodesOnlyChild(oldArray, parentOrMarkerNode);
	    return createDynamic(true, parentOrMarkerNode, array);
	  }

	  removeArrayNodes(oldArray, parentOrMarkerNode.parentNode, 0);
	  return rerenderDynamic(false, array, parentOrMarkerNode);
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
	  if (!value || !internalRerenderInstance(prevRenderedInstance = prevValue.$r || prevValue, value)) {
	    return rerenderDynamic(isOnlyChild, value, node);
	  }

	  // TODO: What is $r? Is this trying to track the original rendered instnace?
	  value.$r = prevRenderedInstance;
	  return node;
	}

	function StatefulComponent(render, props, instance, actions) {
	  this._boundActions = new Hash();
	  this._parentInst = instance;
	  this.actions = actions;
	  this.props = props;
	  this.render = render;
	  this.bindSend = this.bindSend.bind(this);
	  this.state = actions.onInit(this);
	  this.$n = internalRenderNoRecycle(this._instance = render(this));
	}

	StatefulComponent.prototype.updateProps = function (newProps) {
	  var props = this.props;

	  this.props = newProps;

	  if (this.actions.onProps) this.send('onProps', props);else this.rerender();

	  return this;
	};

	StatefulComponent.prototype.bindSend = function (action) {
	  return this._boundActions[action] || (this._boundActions[action] = this.send.bind(this, action));
	};

	StatefulComponent.prototype.send = function (actionName, context) {
	  var newState = void 0;
	  var actionFn = this.actions[actionName];
	  // TODO: process.ENV === 'development', console.error(`Action not found #{action}`);
	  if (!actionFn || (newState = actionFn(this, context)) == this.state) return;

	  this.state = newState;
	  this.rerender();
	};

	StatefulComponent.prototype.rerender = function () {
	  var instance = internalRerender(this._instance, this.render(this));
	  this._instance = instance;
	  instance.$n.xvdom = this._parentInst;
	};

	function createStatefulComponent(component, props, instance, actions) {
	  return new StatefulComponent(component, props, instance, actions);
	}

	function createStatelessComponent(component, props) {
	  var instance = component(props);
	  internalRenderNoRecycle(instance);
	  return instance;
	}

	function createComponent(component, actions, props, parentInstance) {
	  if (false) performance.mark('createComponent.start(' + component.name + ')');

	  var result = (actions ? createStatefulComponent : createStatelessComponent)(component, props || EMPTY_PROPS, parentInstance, actions);

	  if (false) {
	    performance.mark('createComponent.end(' + component.name + ')');
	    performance.measure('<' + component.name + '/>', 'createComponent.start(' + component.name + ')', 'createComponent.end(' + component.name + ')');
	  }
	  return result;
	};

	function updateComponent(component, actions, props, componentInstance) {
	  if (false) performance.mark('updateComponent.start(' + component.name + ')');

	  var result = actions ? componentInstance.updateProps(props) : internalRerender(componentInstance, component(props));

	  if (false) {
	    performance.mark('updateComponent.end(' + component.name + ')');
	    performance.measure('<' + component.name + '/>', 'updateComponent.start(' + component.name + ')', 'updateComponent.end(' + component.name + ')');
	  }
	  return result;
	}

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
	  text: function text(node, value) {
	    return node.appendChild(createTextNode(value));
	  },
	  empty: function empty(node) {
	    return node.appendChild(createTextNode(''));
	  },
	  object: function object(node, value) {
	    return node.appendChild(internalRenderNoRecycle(value));
	  },
	  array: function array(node, value, isOnlyChild) {
	    return renderArrayToParent(node, value, 0), isOnlyChild ? node : node.appendChild(createTextNode(''));
	  }
	};

	function createDynamic(isOnlyChild, parentNode, value) {
	  return CREATE_BY_TYPE[dynamicType(value)](parentNode, value, isOnlyChild);
	}

	var UPDATE_BY_TYPE = {
	  text: rerenderText,
	  object: rerenderInstance,
	  array: rerenderArray,
	  empty: rerenderText
	};

	function updateDynamic(isOnlyChild, oldValue, value, contextNode) {
	  return UPDATE_BY_TYPE[dynamicType(oldValue)](value, contextNode, isOnlyChild, oldValue);
	}

	function internalRerender(prevInstance, instance) {
	  if (internalRerenderInstance(prevInstance, instance)) return prevInstance;

	  replaceNode(prevInstance.$n, (instance = internalRender(instance)).$n);
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
	  updateComponent: updateComponent,
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