(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["xvdom"] = factory();
	else
		root["xvdom"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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

	exports.__esModule = true;
	exports._ = exports.DEADPOOL = undefined;
	exports.xrender = xrender;
	exports.xrerender = xrerender;

	var _babelPluginXvdom = __webpack_require__(2);

	// Creates an empty object with no built in properties (ie. `constructor`).
	function Hash() {} /*
	                   
	                   Instance properties:
	                   
	                   $n = DOM node
	                   $s - spec (see below)
	                   $x - Pool linked list next pointer
	                   
	                   Spec properties:
	                   
	                   b - create bytecode
	                   u - update bytecode
	                   r - keyed map of unmounted instanced that can be recycled
	                   
	                   */

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

	function rerenderText(isOnlyChild, value, contextNode) {
	  switch (value && value.constructor) {
	    case String:
	    case Number:
	    case 0:
	      contextNode.nodeValue = value;
	      return contextNode;

	    case Object:
	    case Array:
	      return rerenderDynamic(isOnlyChild, value, contextNode);

	    default:
	      contextNode.nodeValue = '';
	      return contextNode;
	  }
	};

	var rerenderDynamic = function rerenderDynamic(isOnlyChild, value, contextNode) {
	  var node = createDynamic(isOnlyChild, contextNode.parentNode, value);
	  replaceNode(contextNode, node);
	  return node;
	};

	var rerenderInstance = function rerenderInstance(isOnlyChild, value, prevValue, node) {
	  var prevRenderedInstance = void 0;
	  if (value && internalRerenderInstance(value, prevRenderedInstance = prevValue.$r || prevValue)) {
	    value.$r = prevRenderedInstance;
	    return node;
	  }

	  return rerenderDynamic(isOnlyChild, value, node);
	};

	var rerenderArrayMaybe = function rerenderArrayMaybe(isOnlyChild, array, oldArray, markerNode) {
	  if (array instanceof Array) {
	    if (isOnlyChild) {
	      rerenderArrayOnlyChild(markerNode, array, oldArray);
	    } else {
	      rerenderArray(markerNode, array, oldArray);
	    }
	  } else {
	    if (isOnlyChild) {
	      removeArrayNodesOnlyChild(oldArray, markerNode);
	      return markerNode.appendChild(createDynamic(true, markerNode, array));
	    } else {
	      removeArrayNodes(oldArray, markerNode.parentNode);
	      return rerenderDynamic(false, array, markerNode);
	    }
	  }
	};

	function updateDynamic(isOnlyChild, oldValue, value, contextNode) {
	  switch (oldValue && oldValue.constructor) {
	    case Array:
	      return rerenderArrayMaybe(isOnlyChild, value, oldValue, contextNode.xvdomContext) || contextNode;

	    case Object:
	      return rerenderInstance(isOnlyChild, value, oldValue, contextNode);

	    default:
	      return rerenderText(isOnlyChild, value, contextNode);
	  }
	};

	var appendChild = function appendChild(node, child) {
	  node.appendChild(child);
	};

	function createDynamicChild(value) {
	  switch (value && value.constructor) {
	    case String:
	    case Number:
	    case 0:
	      return createTextNode(value);
	      break;

	    case Object:
	    case Array:
	      throw 'NOT IMPLEMENTED YET';

	    default:
	      return createEmptyTextNode();
	  }
	}

	function createDynamic(ctx, contextNodes, statics, dynamics) {
	  var node = createDynamicChild(dynamics[ctx.dPtr++]);
	  contextNodes.push(node);
	  appendChild(ctx.curNode, node);
	}

	function createStatic(ctx, contextNodes, statics) {
	  appendChild(ctx.curNode, createDynamicChild(statics[ctx.sPtr++]));
	}

	function assignProps(node, ctx, j, numStaticProps, statics, dynamics) {
	  var value = void 0,
	      prop = void 0;
	  while (j--) {
	    prop = statics[ctx.sPtr++];
	    value = j < numStaticProps ? statics[ctx.sPtr++] : dynamics[ctx.dPtr++];
	    if (value != null) node[prop] = value;
	  }
	}

	function createNode(ctx, contextNodes, statics, dynamics, bytecode) {
	  var node = ctx.lastNode = document.createElement(_babelPluginXvdom.REF_TO_TAG[bytecode[ctx.i++]]);
	  appendChild(ctx.curNode, node);

	  var totalProps = bytecode[ctx.i++];
	  if (totalProps > 0) {
	    assignProps(node, ctx, totalProps, bytecode[ctx.i++], statics, dynamics);
	  }
	}

	function RootNode() {
	  this.root = null;
	}
	RootNode.prototype.appendChild = function (node) {
	  return this.root = node;
	};
	RootNode.prototype.finalizeRoot = function (instance) {
	  this.root.__xvdom = instance;
	  return this.root;
	};

	var COMMANDS = [createNode, function () {}, // createComponentAllStaticProps,
	createDynamic, createStatic, function (ctx) {
	  ctx.curNode = ctx.lastNode;
	}, function (ctx) {
	  ctx.curNode = ctx.curNode.parentNode;
	}, function (ctx, contextNodes) {
	  contextNodes.push(ctx.lastNode);
	}];

	function updateElProp(staticOffsetToProp, contextNode, statics, value, prevValue) {
	  if (value !== prevValue) {
	    contextNode[statics[staticOffsetToProp]] = value;
	  }
	}

	function updateElChild(zeroIfOnlyChild, contextNode, statics, value, prevValue) {
	  if (value !== prevValue) {
	    switch (value && value.constructor) {
	      case String:
	      case Number:
	      case 0:
	        contextNode.textContent = value;
	        break;

	      case Object:
	      case Array:
	        throw 'NOT IMPLEMENTED YET';

	      default:
	        contextNode = createEmptyTextNode();
	    }
	  }
	}

	var RERENDER_COMMANDS = [updateElProp, updateElChild];

	function xrender(instance) {
	  var _instance$t = instance.t;
	  var bytecode = _instance$t.b;
	  var statics = _instance$t.s;
	  var dynamics = instance.d;

	  var rootNode = new RootNode();
	  var length = bytecode.length;
	  var contextNodes = instance.contextNodes = [];

	  // TOOD: Consider RISC approach, where all Render Commands take X params
	  //    Pros: context no longer needs `i`
	  //    Cons: wasteful (padding, params for commands that take fewer params)
	  var ctx = {
	    i: 0,
	    sPtr: 0,
	    dPtr: 0,
	    curNode: rootNode,
	    lastNode: null
	  };

	  do {
	    COMMANDS[bytecode[ctx.i++]](ctx, contextNodes, statics, dynamics, bytecode);
	  } while (length > ctx.i);

	  return rootNode.finalizeRoot(instance);
	}

	function xrerender(node, _ref) {
	  var _ref$t = _ref.t;
	  var bytecode = _ref$t.u;
	  var statics = _ref$t.s;
	  var dynamics = _ref.d;
	  var _node$__xvdom = node.__xvdom;
	  var contextNodes = _node$__xvdom.contextNodes;
	  var prevDynamics = _node$__xvdom.d;

	  var i = 0;
	  var dynamicOffset = 0;
	  while (i < bytecode.length) {
	    RERENDER_COMMANDS[bytecode[i++]](bytecode[i++], contextNodes[bytecode[i++]], statics, dynamics[dynamicOffset], prevDynamics[dynamicOffset++]);
	  }
	}

	exports.default = {
	  createDynamic: createDynamic,
	  el: function el(tag) {
	    return document.createElement(tag);
	  },
	  xrender: xrender,
	  xrerender: xrerender,
	  updateDynamic: updateDynamic,
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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.REF_TO_TAG = undefined;

	exports.default = function (_ref6) {
	  var t = _ref6.types;

	  return {
	    visitor: {
	      JSXOpeningElement: {
	        exit: function exit(_ref7 /*, parent, scope, file */) {
	          var node = _ref7.node;
	          var attributes = _ref7.node.attributes;

	          var key = void 0;
	          var recycle = false;
	          var staticProps = 0;
	          var props = attributes.reduce(function (props, attr) {
	            var propName = attr.name.name;
	            var value = transformProp(t, attr.value);
	            var _isDynamic = false;

	            if (propName === 'key') {
	              key = value;
	            } else if (propName === 'recycle') {
	              recycle = true;
	            } else if (value != null) {
	              if (!(_isDynamic = isDynamic(t, value))) staticProps++;
	              props.push({
	                isDynamic: _isDynamic,
	                name: propName,
	                value: value
	              });
	            }

	            return props;
	          }, []);

	          node.__xvdom_desc = {
	            type: isComponentName(node.name.name) ? 'component' : 'el',
	            key: key,
	            recycle: recycle,
	            props: props,
	            staticProps: staticProps,
	            el: node.name.name
	          };
	        }
	      },

	      JSXElement: {
	        exit: function exit(path, state) {
	          var node = path.node;
	          var desc = node.__xvdom_desc = node.openingElement.__xvdom_desc;
	          desc.children = (0, _helpers.buildChildren)(t, node.children).map(function (child) {
	            var isDynamicChild = isDynamic(t, child) && !t.isJSXElement(child);
	            return child.__xvdom_desc || {
	              type: isDynamicChild ? 'dynamic' : 'static',
	              node: child,
	              parent: desc
	            };
	          });

	          if (!t.isJSX(path.parent)) {
	            path.replaceWith(createInstanceObject(t, state.file, desc));
	          }
	        }
	      }
	    }
	  };
	};

	var _helpers = __webpack_require__(3);

	var BYTECODE_EL = 0;
	var BYTECODE_COMPONENT = 1;
	var BYTECODE_DYNAMIC = 2;
	var BYTECODE_STATIC = 3;
	var BYTECODE_CHILD = 4;
	var BYTECODE_PARENT = 5;
	var BYTECODE_PUSH_CONTEXTNODE = 6;

	var RERENDER_BYTECODE_ELPROP = 0;
	var RERENDER_BYTECODE_CHILD = 1;

	var REF_TO_TAG = exports.REF_TO_TAG = ['a', 'b', 'div', 'i', 'input', 'span', 'table', 'tbody', 'td', 'tr'];

	var TAG_TO_REF = REF_TO_TAG.reduce(function (acc, tag, i) {
	  return acc[tag] = i, acc;
	}, {});

	function isComponentName(name) {
	  return name && /^[A-Z]/.test(name);
	}

	function isDynamic(t, astNode) {
	  if (t.isLiteral(astNode)) {
	    return false;
	  } else if (t.isLogicalExpression(astNode) || t.isBinaryExpression(astNode)) {
	    return isDynamic(t, astNode.left) || isDynamic(t, astNode.right);
	  } else if (t.isUnaryExpression(astNode)) {
	    return isDynamic(t, astNode.argument);
	  }
	  return true;
	}

	function objProp(t, key, value) {
	  return t.objectProperty(t.isIdentifier(key) ? key : t.identifier(key), value);
	}

	function objProps(t, keyValues) {
	  return Object.keys(keyValues).map(function (key) {
	    return objProp(t, key, keyValues[key]);
	  });
	}

	function obj(t, keyValues) {
	  return t.objectExpression(objProps(t, keyValues));
	}

	function transformProp(t, prop) {
	  return t.isJSXExpressionContainer(prop) ? transformProp(t, prop.expression) : t.isJSXEmptyExpression(prop) ? null : t.isIdentifier(prop) || t.isMemberExpression(prop) ? (0, _helpers.toReference)(t, prop) : prop == null ? t.booleanLiteral(true) : prop;
	}

	var STATIC_BYTECODES = [BYTECODE_STATIC];
	function staticBytecode(t, _ref, s) {
	  var staticsAcc = _ref.staticsAcc;

	  staticsAcc.push(s.node);
	  return STATIC_BYTECODES;
	}

	var DYNAMIC_BYTECODES = [BYTECODE_DYNAMIC];
	function dynamicBytecode(t, context, d, onlyChild) {
	  var dynamicsAcc = context.dynamicsAcc;
	  var updateAcc = context.updateAcc;

	  dynamicsAcc.push(d.node);
	  updateAcc.push(t.numericLiteral(RERENDER_BYTECODE_CHILD), t.numericLiteral(onlyChild ? 0 : 1), t.numericLiteral(context.contextNodeOffset++));
	  return DYNAMIC_BYTECODES;
	}

	function elChildBytecode(t, child, onlyChild, context) {
	  switch (child.type) {
	    case 'el':
	      return elBytecode(t, context, child);
	    case 'static':
	      return staticBytecode(t, context, child);
	    case 'dynamic':
	      return dynamicBytecode(t, context, child, onlyChild);
	    case 'component':
	      return componentBytecode(t, context, child);
	    default:
	      throw 'unknown child type';
	  }
	}

	function elChildrenBytecode(t, context, children) {
	  return children && children.length ? [BYTECODE_CHILD].concat(children.reduce(function (acc, child) {
	    return acc.concat(elChildBytecode(t, child, children.length === 1, context));
	  }, []), [BYTECODE_PARENT]) : [];
	}

	function elPropsBytecode(t, context, props, staticProps) {
	  var staticsAcc = context.staticsAcc;
	  var dynamicsAcc = context.dynamicsAcc;
	  var updateAcc = context.updateAcc;

	  var numProps = props.length;
	  if (numProps === 0) return [numProps];

	  var hasDynamicProps = !!(numProps - staticProps);
	  var contextNodeOffset = hasDynamicProps ? context.contextNodeOffset++ : context.contextNodeOffset;

	  props.forEach(function (_ref2) {
	    var isDynamic = _ref2.isDynamic;
	    var name = _ref2.name;
	    var value = _ref2.value;

	    var nameOffset = staticsAcc.push(t.stringLiteral(name)) - 1;
	    if (isDynamic) {
	      dynamicsAcc.push(value);
	      updateAcc.push(t.numericLiteral(RERENDER_BYTECODE_ELPROP), t.numericLiteral(nameOffset), t.numericLiteral(contextNodeOffset));
	    } else {
	      staticsAcc.push(value);
	    }
	  }, []);

	  return [numProps, staticProps].concat(numProps - staticProps ? [BYTECODE_PUSH_CONTEXTNODE] : []);
	}

	function componentPropsBytecode(t, props, staticProps, _ref3) {
	  var staticsAcc = _ref3.staticsAcc;
	  var dynamicsAcc = _ref3.dynamicsAcc;

	  var numProps = props.length;
	  if (numProps === 0) return [numProps];

	  props.forEach(function (_ref4) {
	    var isDynamic = _ref4.isDynamic;
	    var name = _ref4.name;
	    var value = _ref4.value;

	    staticsAcc.push(t.stringLiteral(name));
	    (isDynamic ? dynamicsAcc : staticsAcc).push(value);
	  }, []);

	  return [numProps, staticProps];
	}

	function elBytecode(t, context, desc) {
	  var el = desc.el;
	  var props = desc.props;
	  var staticProps = desc.staticProps;
	  var children = desc.children;


	  return [BYTECODE_EL, TAG_TO_REF[el]].concat(elPropsBytecode(t, context, props, staticProps), elChildrenBytecode(t, context, children));
	}

	function componentBytecode(t, context, _ref5) {
	  var el = _ref5.el;
	  var props = _ref5.props;
	  var staticProps = _ref5.staticProps;

	  context.staticsAcc.push(t.identifier(el));
	  return [BYTECODE_COMPONENT].concat(componentPropsBytecode(t, props, staticProps, context));
	}

	function trimPops(t, bytecode) {
	  var code = void 0;
	  while (bytecode.length && (code = bytecode.pop()) === BYTECODE_PARENT) {}
	  bytecode.push(code);
	  return bytecode;
	}

	function specBytecode(t, root, context) {
	  return t.arrayExpression(trimPops(t, (root.type === 'el' ? elBytecode : componentBytecode)(t, context, root)).map(function (code) {
	    return t.numericLiteral(code);
	  }));
	}

	function createSpecBytecodeStaticArrays(t, desc) {
	  var context = {
	    staticsAcc: [],
	    dynamicsAcc: [],
	    updateAcc: [],
	    contextNodeOffset: 0
	  };
	  var bytecode = specBytecode(t, desc, context);

	  return {
	    bytecode: bytecode,
	    statics: t.arrayExpression(context.staticsAcc),
	    dynamics: t.arrayExpression(context.dynamicsAcc),
	    updates: t.arrayExpression(context.updateAcc)
	  };
	}

	function createSpecObject(t, file, desc) {
	  var id = file.scope.generateUidIdentifier('xvdomSpec');

	  var _createSpecBytecodeSt = createSpecBytecodeStaticArrays(t, desc);

	  var bytecode = _createSpecBytecodeSt.bytecode;
	  var statics = _createSpecBytecodeSt.statics;
	  var dynamics = _createSpecBytecodeSt.dynamics;
	  var updates = _createSpecBytecodeSt.updates;


	  file.path.unshiftContainer('body', t.variableDeclaration('var', [t.variableDeclarator(id, obj(t, {
	    b: bytecode,
	    s: statics,
	    u: updates
	  }))]));

	  return { id: id, dynamics: dynamics };
	}

	function createInstanceObject(t, file, desc) {
	  var _createSpecObject = createSpecObject(t, file, desc);

	  var id = _createSpecObject.id;
	  var dynamics = _createSpecObject.dynamics;

	  return obj(t, {
	    t: id,
	    d: dynamics
	  });
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.toReference = toReference;
	exports.buildChildren = buildChildren;
	var nonWhitespace = /\S/;
	var newlines = /\r\n?|\n/;

	// Trims the whitespace off the lines.
	function lineFilter(lines, line, i, _ref) {
	  var length = _ref.length;

	  if (i > 0) {
	    line = line.trimLeft();
	  }
	  if (i + 1 < length) {
	    line = line.trimRight();
	  }
	  if (line) {
	    lines.push(line);
	  }

	  return lines;
	}

	// Cleans the whitespace from a text node.
	function cleanText(node) {
	  if (!nonWhitespace.test(node.value)) {
	    return '';
	  }

	  var lines = node.value.split(newlines);
	  lines = lines.reduce(lineFilter, []);

	  return lines.join(' ');
	}

	// Helper to transform a JSX identifier into a normal reference.
	function toReference(t, node, identifier) {
	  if (t.isIdentifier(node)) {
	    return node;
	  } else if (t.isJSXIdentifier(node)) {
	    return identifier ? t.identifier(node.name) : t.stringLiteral(node.name);
	  } else {
	    return node;
	  }
	}

	// Filters out empty children, and transform JSX expressions
	// into normal expressions.
	function buildChildren(t, rawChildren) {
	  return rawChildren.reduce(function (children, child) {
	    if (t.isJSXExpressionContainer(child)) {
	      child = child.expression;
	    }

	    if ((t.isJSXText(child) || t.isLiteral(child)) && typeof child.value === 'string') {
	      var text = cleanText(child);
	      if (!text) {
	        return children;
	      }

	      child = t.stringLiteral(text);
	    } else if (t.isJSXEmptyExpression(child)) {
	      return children;
	    } else if (t.isArrayExpression(child)) {
	      child = t.sequenceExpression(buildChildren(t, child.elements));
	    } else if (t.isIdentifier(child) || t.isMemberExpression(child)) {
	      child = toReference(t, child);
	    }

	    children.push(child);
	    return children;
	  }, []);
	}

/***/ }
/******/ ])
});
;