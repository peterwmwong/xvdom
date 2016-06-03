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

	var _xvdomSpec3 = {
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
	var _xvdomSpec2 = {
	  c: function c(inst) {
	    var _n = document.createElement('div'),
	        _n2,
	        _n3,
	        _n4,
	        _n5,
	        _n6,
	        _n7,
	        _n8,
	        _n9,
	        _n10,
	        _n11,
	        _n12,
	        _n13,
	        _n14,
	        _n15,
	        _n16,
	        _n17,
	        _n18,
	        _n19,
	        _n20,
	        _n21,
	        _n22,
	        _n23,
	        _n24,
	        _n25,
	        _n26,
	        _n27,
	        _n28,
	        _n29,
	        _n30,
	        _n31,
	        _n32,
	        _n33,
	        _n34,
	        _n35,
	        _n36,
	        _n37,
	        _n38,
	        _n39,
	        _n40,
	        _n41,
	        _n42,
	        _n43,
	        _n44,
	        _n45,
	        _n46,
	        _n47,
	        _n48,
	        _n49,
	        _n50,
	        _n51,
	        _n52;

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

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.p, inst, 'q', 'r'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.s, inst, 't', 'u'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.v, inst, 'w', 'x'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.y, inst, 'z', 'A'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.B, inst, 'C', 'D'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.E, inst, 'F', 'G'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.H, inst, 'I', 'J'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.K, inst, 'L', 'M'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.N, inst, 'O', 'P'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.Q, inst, 'R', 'S'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.T, inst, 'U', 'V'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.W, inst, 'X', 'Y'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.Z, inst, 'a1', 'b1'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.c1, inst, 'd1', 'e1'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.f1, inst, 'g1', 'h1'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.i1, inst, 'j1', 'k1'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.l1, inst, 'm1', 'n1'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.o1, inst, 'p1', 'q1'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.r1, inst, 's1', 't1'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.u1, inst, 'v1', 'w1'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.x1, inst, 'y1', 'z1'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.A1, inst, 'B1', 'C1'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.D1, inst, 'E1', 'F1'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.G1, inst, 'H1', 'I1'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.J1, inst, 'K1', 'L1'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.M1, inst, 'N1', 'O1'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.P1, inst, 'Q1', 'R1'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.S1, inst, 'T1', 'U1'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.V1, inst, 'W1', 'X1'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.Y1, inst, 'Z1', 'a2'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.b2, inst, 'c2', 'd2'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.e2, inst, 'f2', 'g2'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.h2, inst, 'i2', 'j2'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.k2, inst, 'l2', 'm2'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.n2, inst, 'o2', 'p2'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.q2, inst, 'r2', 's2'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.t2, inst, 'u2', 'v2'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.w2, inst, 'x2', 'y2'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.z2, inst, 'A2', 'B2'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.C2, inst, 'D2', 'E2'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.F2, inst, 'G2', 'H2'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.I2, inst, 'J2', 'K2'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.L2, inst, 'M2', 'N2'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.O2, inst, 'P2', 'Q2'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');

	    _n2.appendChild(_index2.default.createDynamic(true, _n2, inst.R2, inst, 'S2', 'T2'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n3 = document.createElement('span');

	    _n3.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n3);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.U2, inst, 'V2', 'W2'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n4 = document.createElement('span');

	    _n4.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n4);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.X2, inst, 'Y2', 'Z2'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n5 = document.createElement('span');

	    _n5.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n5);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.a3, inst, 'b3', 'c3'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n6 = document.createElement('span');

	    _n6.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n6);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.d3, inst, 'e3', 'f3'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n7 = document.createElement('span');

	    _n7.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n7);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.g3, inst, 'h3', 'i3'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n8 = document.createElement('span');

	    _n8.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n8);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.j3, inst, 'k3', 'l3'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n9 = document.createElement('span');

	    _n9.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n9);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.m3, inst, 'n3', 'o3'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n10 = document.createElement('span');

	    _n10.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n10);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.p3, inst, 'q3', 'r3'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n11 = document.createElement('span');

	    _n11.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n11);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.s3, inst, 't3', 'u3'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n12 = document.createElement('span');

	    _n12.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n12);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.v3, inst, 'w3', 'x3'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n13 = document.createElement('span');

	    _n13.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n13);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.y3, inst, 'z3', 'A3'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n14 = document.createElement('span');

	    _n14.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n14);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.B3, inst, 'C3', 'D3'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n15 = document.createElement('span');

	    _n15.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n15);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.E3, inst, 'F3', 'G3'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n16 = document.createElement('span');

	    _n16.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n16);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.H3, inst, 'I3', 'J3'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n17 = document.createElement('span');

	    _n17.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n17);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.K3, inst, 'L3', 'M3'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n18 = document.createElement('span');

	    _n18.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n18);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.N3, inst, 'O3', 'P3'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n19 = document.createElement('span');

	    _n19.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n19);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.Q3, inst, 'R3', 'S3'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n20 = document.createElement('span');

	    _n20.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n20);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.T3, inst, 'U3', 'V3'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n21 = document.createElement('span');

	    _n21.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n21);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.W3, inst, 'X3', 'Y3'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n22 = document.createElement('span');

	    _n22.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n22);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.Z3, inst, 'a4', 'b4'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n23 = document.createElement('span');

	    _n23.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n23);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.c4, inst, 'd4', 'e4'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n24 = document.createElement('span');

	    _n24.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n24);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.f4, inst, 'g4', 'h4'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n25 = document.createElement('span');

	    _n25.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n25);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.i4, inst, 'j4', 'k4'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n26 = document.createElement('span');

	    _n26.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n26);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.l4, inst, 'm4', 'n4'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n27 = document.createElement('span');

	    _n27.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n27);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.o4, inst, 'p4', 'q4'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n28 = document.createElement('span');

	    _n28.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n28);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.r4, inst, 's4', 't4'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n29 = document.createElement('span');

	    _n29.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n29);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.u4, inst, 'v4', 'w4'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n30 = document.createElement('span');

	    _n30.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n30);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.x4, inst, 'y4', 'z4'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n31 = document.createElement('span');

	    _n31.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n31);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.A4, inst, 'B4', 'C4'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n32 = document.createElement('span');

	    _n32.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n32);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.D4, inst, 'E4', 'F4'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n33 = document.createElement('span');

	    _n33.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n33);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.G4, inst, 'H4', 'I4'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n34 = document.createElement('span');

	    _n34.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n34);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.J4, inst, 'K4', 'L4'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n35 = document.createElement('span');

	    _n35.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n35);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.M4, inst, 'N4', 'O4'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n36 = document.createElement('span');

	    _n36.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n36);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.P4, inst, 'Q4', 'R4'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n37 = document.createElement('span');

	    _n37.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n37);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.S4, inst, 'T4', 'U4'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n38 = document.createElement('span');

	    _n38.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n38);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.V4, inst, 'W4', 'X4'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n39 = document.createElement('span');

	    _n39.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n39);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.Y4, inst, 'Z4', 'a5'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n40 = document.createElement('span');

	    _n40.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n40);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.b5, inst, 'c5', 'd5'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n41 = document.createElement('span');

	    _n41.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n41);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.e5, inst, 'f5', 'g5'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n42 = document.createElement('span');

	    _n42.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n42);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.h5, inst, 'i5', 'j5'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n43 = document.createElement('span');

	    _n43.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n43);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.k5, inst, 'l5', 'm5'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n44 = document.createElement('span');

	    _n44.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n44);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.n5, inst, 'o5', 'p5'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n45 = document.createElement('span');

	    _n45.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n45);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.q5, inst, 'r5', 's5'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n46 = document.createElement('span');

	    _n46.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n46);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.t5, inst, 'u5', 'v5'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n47 = document.createElement('span');

	    _n47.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n47);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.w5, inst, 'x5', 'y5'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n48 = document.createElement('span');

	    _n48.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n48);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.z5, inst, 'A5', 'B5'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n49 = document.createElement('span');

	    _n49.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n49);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.C5, inst, 'D5', 'E5'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n50 = document.createElement('span');

	    _n50.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n50);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.F5, inst, 'G5', 'H5'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n51 = document.createElement('span');

	    _n51.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n51);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.I5, inst, 'J5', 'K5'));

	    _n.appendChild(_n2);

	    _n2 = document.createElement('span');
	    _n52 = document.createElement('span');

	    _n52.appendChild(document.createTextNode(('prefix') || ''));

	    _n2.appendChild(_n52);

	    _n2.appendChild(_index2.default.createDynamic(false, _n2, inst.L5, inst, 'M5', 'N5'));

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

	    if (inst.p !== pInst.p) {
	      pInst.p = pInst.q(true, inst.p, pInst.p, pInst.r, pInst, 'q', 'r');
	    }

	    if (inst.s !== pInst.s) {
	      pInst.s = pInst.t(true, inst.s, pInst.s, pInst.u, pInst, 't', 'u');
	    }

	    if (inst.v !== pInst.v) {
	      pInst.v = pInst.w(true, inst.v, pInst.v, pInst.x, pInst, 'w', 'x');
	    }

	    if (inst.y !== pInst.y) {
	      pInst.y = pInst.z(true, inst.y, pInst.y, pInst.A, pInst, 'z', 'A');
	    }

	    if (inst.B !== pInst.B) {
	      pInst.B = pInst.C(true, inst.B, pInst.B, pInst.D, pInst, 'C', 'D');
	    }

	    if (inst.E !== pInst.E) {
	      pInst.E = pInst.F(true, inst.E, pInst.E, pInst.G, pInst, 'F', 'G');
	    }

	    if (inst.H !== pInst.H) {
	      pInst.H = pInst.I(true, inst.H, pInst.H, pInst.J, pInst, 'I', 'J');
	    }

	    if (inst.K !== pInst.K) {
	      pInst.K = pInst.L(true, inst.K, pInst.K, pInst.M, pInst, 'L', 'M');
	    }

	    if (inst.N !== pInst.N) {
	      pInst.N = pInst.O(true, inst.N, pInst.N, pInst.P, pInst, 'O', 'P');
	    }

	    if (inst.Q !== pInst.Q) {
	      pInst.Q = pInst.R(true, inst.Q, pInst.Q, pInst.S, pInst, 'R', 'S');
	    }

	    if (inst.T !== pInst.T) {
	      pInst.T = pInst.U(true, inst.T, pInst.T, pInst.V, pInst, 'U', 'V');
	    }

	    if (inst.W !== pInst.W) {
	      pInst.W = pInst.X(true, inst.W, pInst.W, pInst.Y, pInst, 'X', 'Y');
	    }

	    if (inst.Z !== pInst.Z) {
	      pInst.Z = pInst.a1(true, inst.Z, pInst.Z, pInst.b1, pInst, 'a1', 'b1');
	    }

	    if (inst.c1 !== pInst.c1) {
	      pInst.c1 = pInst.d1(true, inst.c1, pInst.c1, pInst.e1, pInst, 'd1', 'e1');
	    }

	    if (inst.f1 !== pInst.f1) {
	      pInst.f1 = pInst.g1(true, inst.f1, pInst.f1, pInst.h1, pInst, 'g1', 'h1');
	    }

	    if (inst.i1 !== pInst.i1) {
	      pInst.i1 = pInst.j1(true, inst.i1, pInst.i1, pInst.k1, pInst, 'j1', 'k1');
	    }

	    if (inst.l1 !== pInst.l1) {
	      pInst.l1 = pInst.m1(true, inst.l1, pInst.l1, pInst.n1, pInst, 'm1', 'n1');
	    }

	    if (inst.o1 !== pInst.o1) {
	      pInst.o1 = pInst.p1(true, inst.o1, pInst.o1, pInst.q1, pInst, 'p1', 'q1');
	    }

	    if (inst.r1 !== pInst.r1) {
	      pInst.r1 = pInst.s1(true, inst.r1, pInst.r1, pInst.t1, pInst, 's1', 't1');
	    }

	    if (inst.u1 !== pInst.u1) {
	      pInst.u1 = pInst.v1(true, inst.u1, pInst.u1, pInst.w1, pInst, 'v1', 'w1');
	    }

	    if (inst.x1 !== pInst.x1) {
	      pInst.x1 = pInst.y1(true, inst.x1, pInst.x1, pInst.z1, pInst, 'y1', 'z1');
	    }

	    if (inst.A1 !== pInst.A1) {
	      pInst.A1 = pInst.B1(true, inst.A1, pInst.A1, pInst.C1, pInst, 'B1', 'C1');
	    }

	    if (inst.D1 !== pInst.D1) {
	      pInst.D1 = pInst.E1(true, inst.D1, pInst.D1, pInst.F1, pInst, 'E1', 'F1');
	    }

	    if (inst.G1 !== pInst.G1) {
	      pInst.G1 = pInst.H1(true, inst.G1, pInst.G1, pInst.I1, pInst, 'H1', 'I1');
	    }

	    if (inst.J1 !== pInst.J1) {
	      pInst.J1 = pInst.K1(true, inst.J1, pInst.J1, pInst.L1, pInst, 'K1', 'L1');
	    }

	    if (inst.M1 !== pInst.M1) {
	      pInst.M1 = pInst.N1(true, inst.M1, pInst.M1, pInst.O1, pInst, 'N1', 'O1');
	    }

	    if (inst.P1 !== pInst.P1) {
	      pInst.P1 = pInst.Q1(true, inst.P1, pInst.P1, pInst.R1, pInst, 'Q1', 'R1');
	    }

	    if (inst.S1 !== pInst.S1) {
	      pInst.S1 = pInst.T1(true, inst.S1, pInst.S1, pInst.U1, pInst, 'T1', 'U1');
	    }

	    if (inst.V1 !== pInst.V1) {
	      pInst.V1 = pInst.W1(true, inst.V1, pInst.V1, pInst.X1, pInst, 'W1', 'X1');
	    }

	    if (inst.Y1 !== pInst.Y1) {
	      pInst.Y1 = pInst.Z1(true, inst.Y1, pInst.Y1, pInst.a2, pInst, 'Z1', 'a2');
	    }

	    if (inst.b2 !== pInst.b2) {
	      pInst.b2 = pInst.c2(true, inst.b2, pInst.b2, pInst.d2, pInst, 'c2', 'd2');
	    }

	    if (inst.e2 !== pInst.e2) {
	      pInst.e2 = pInst.f2(true, inst.e2, pInst.e2, pInst.g2, pInst, 'f2', 'g2');
	    }

	    if (inst.h2 !== pInst.h2) {
	      pInst.h2 = pInst.i2(true, inst.h2, pInst.h2, pInst.j2, pInst, 'i2', 'j2');
	    }

	    if (inst.k2 !== pInst.k2) {
	      pInst.k2 = pInst.l2(true, inst.k2, pInst.k2, pInst.m2, pInst, 'l2', 'm2');
	    }

	    if (inst.n2 !== pInst.n2) {
	      pInst.n2 = pInst.o2(true, inst.n2, pInst.n2, pInst.p2, pInst, 'o2', 'p2');
	    }

	    if (inst.q2 !== pInst.q2) {
	      pInst.q2 = pInst.r2(true, inst.q2, pInst.q2, pInst.s2, pInst, 'r2', 's2');
	    }

	    if (inst.t2 !== pInst.t2) {
	      pInst.t2 = pInst.u2(true, inst.t2, pInst.t2, pInst.v2, pInst, 'u2', 'v2');
	    }

	    if (inst.w2 !== pInst.w2) {
	      pInst.w2 = pInst.x2(true, inst.w2, pInst.w2, pInst.y2, pInst, 'x2', 'y2');
	    }

	    if (inst.z2 !== pInst.z2) {
	      pInst.z2 = pInst.A2(true, inst.z2, pInst.z2, pInst.B2, pInst, 'A2', 'B2');
	    }

	    if (inst.C2 !== pInst.C2) {
	      pInst.C2 = pInst.D2(true, inst.C2, pInst.C2, pInst.E2, pInst, 'D2', 'E2');
	    }

	    if (inst.F2 !== pInst.F2) {
	      pInst.F2 = pInst.G2(true, inst.F2, pInst.F2, pInst.H2, pInst, 'G2', 'H2');
	    }

	    if (inst.I2 !== pInst.I2) {
	      pInst.I2 = pInst.J2(true, inst.I2, pInst.I2, pInst.K2, pInst, 'J2', 'K2');
	    }

	    if (inst.L2 !== pInst.L2) {
	      pInst.L2 = pInst.M2(true, inst.L2, pInst.L2, pInst.N2, pInst, 'M2', 'N2');
	    }

	    if (inst.O2 !== pInst.O2) {
	      pInst.O2 = pInst.P2(true, inst.O2, pInst.O2, pInst.Q2, pInst, 'P2', 'Q2');
	    }

	    if (inst.R2 !== pInst.R2) {
	      pInst.R2 = pInst.S2(true, inst.R2, pInst.R2, pInst.T2, pInst, 'S2', 'T2');
	    }

	    if (inst.U2 !== pInst.U2) {
	      pInst.U2 = pInst.V2(false, inst.U2, pInst.U2, pInst.W2, pInst, 'V2', 'W2');
	    }

	    if (inst.X2 !== pInst.X2) {
	      pInst.X2 = pInst.Y2(false, inst.X2, pInst.X2, pInst.Z2, pInst, 'Y2', 'Z2');
	    }

	    if (inst.a3 !== pInst.a3) {
	      pInst.a3 = pInst.b3(false, inst.a3, pInst.a3, pInst.c3, pInst, 'b3', 'c3');
	    }

	    if (inst.d3 !== pInst.d3) {
	      pInst.d3 = pInst.e3(false, inst.d3, pInst.d3, pInst.f3, pInst, 'e3', 'f3');
	    }

	    if (inst.g3 !== pInst.g3) {
	      pInst.g3 = pInst.h3(false, inst.g3, pInst.g3, pInst.i3, pInst, 'h3', 'i3');
	    }

	    if (inst.j3 !== pInst.j3) {
	      pInst.j3 = pInst.k3(false, inst.j3, pInst.j3, pInst.l3, pInst, 'k3', 'l3');
	    }

	    if (inst.m3 !== pInst.m3) {
	      pInst.m3 = pInst.n3(false, inst.m3, pInst.m3, pInst.o3, pInst, 'n3', 'o3');
	    }

	    if (inst.p3 !== pInst.p3) {
	      pInst.p3 = pInst.q3(false, inst.p3, pInst.p3, pInst.r3, pInst, 'q3', 'r3');
	    }

	    if (inst.s3 !== pInst.s3) {
	      pInst.s3 = pInst.t3(false, inst.s3, pInst.s3, pInst.u3, pInst, 't3', 'u3');
	    }

	    if (inst.v3 !== pInst.v3) {
	      pInst.v3 = pInst.w3(false, inst.v3, pInst.v3, pInst.x3, pInst, 'w3', 'x3');
	    }

	    if (inst.y3 !== pInst.y3) {
	      pInst.y3 = pInst.z3(false, inst.y3, pInst.y3, pInst.A3, pInst, 'z3', 'A3');
	    }

	    if (inst.B3 !== pInst.B3) {
	      pInst.B3 = pInst.C3(false, inst.B3, pInst.B3, pInst.D3, pInst, 'C3', 'D3');
	    }

	    if (inst.E3 !== pInst.E3) {
	      pInst.E3 = pInst.F3(false, inst.E3, pInst.E3, pInst.G3, pInst, 'F3', 'G3');
	    }

	    if (inst.H3 !== pInst.H3) {
	      pInst.H3 = pInst.I3(false, inst.H3, pInst.H3, pInst.J3, pInst, 'I3', 'J3');
	    }

	    if (inst.K3 !== pInst.K3) {
	      pInst.K3 = pInst.L3(false, inst.K3, pInst.K3, pInst.M3, pInst, 'L3', 'M3');
	    }

	    if (inst.N3 !== pInst.N3) {
	      pInst.N3 = pInst.O3(false, inst.N3, pInst.N3, pInst.P3, pInst, 'O3', 'P3');
	    }

	    if (inst.Q3 !== pInst.Q3) {
	      pInst.Q3 = pInst.R3(false, inst.Q3, pInst.Q3, pInst.S3, pInst, 'R3', 'S3');
	    }

	    if (inst.T3 !== pInst.T3) {
	      pInst.T3 = pInst.U3(false, inst.T3, pInst.T3, pInst.V3, pInst, 'U3', 'V3');
	    }

	    if (inst.W3 !== pInst.W3) {
	      pInst.W3 = pInst.X3(false, inst.W3, pInst.W3, pInst.Y3, pInst, 'X3', 'Y3');
	    }

	    if (inst.Z3 !== pInst.Z3) {
	      pInst.Z3 = pInst.a4(false, inst.Z3, pInst.Z3, pInst.b4, pInst, 'a4', 'b4');
	    }

	    if (inst.c4 !== pInst.c4) {
	      pInst.c4 = pInst.d4(false, inst.c4, pInst.c4, pInst.e4, pInst, 'd4', 'e4');
	    }

	    if (inst.f4 !== pInst.f4) {
	      pInst.f4 = pInst.g4(false, inst.f4, pInst.f4, pInst.h4, pInst, 'g4', 'h4');
	    }

	    if (inst.i4 !== pInst.i4) {
	      pInst.i4 = pInst.j4(false, inst.i4, pInst.i4, pInst.k4, pInst, 'j4', 'k4');
	    }

	    if (inst.l4 !== pInst.l4) {
	      pInst.l4 = pInst.m4(false, inst.l4, pInst.l4, pInst.n4, pInst, 'm4', 'n4');
	    }

	    if (inst.o4 !== pInst.o4) {
	      pInst.o4 = pInst.p4(false, inst.o4, pInst.o4, pInst.q4, pInst, 'p4', 'q4');
	    }

	    if (inst.r4 !== pInst.r4) {
	      pInst.r4 = pInst.s4(false, inst.r4, pInst.r4, pInst.t4, pInst, 's4', 't4');
	    }

	    if (inst.u4 !== pInst.u4) {
	      pInst.u4 = pInst.v4(false, inst.u4, pInst.u4, pInst.w4, pInst, 'v4', 'w4');
	    }

	    if (inst.x4 !== pInst.x4) {
	      pInst.x4 = pInst.y4(false, inst.x4, pInst.x4, pInst.z4, pInst, 'y4', 'z4');
	    }

	    if (inst.A4 !== pInst.A4) {
	      pInst.A4 = pInst.B4(false, inst.A4, pInst.A4, pInst.C4, pInst, 'B4', 'C4');
	    }

	    if (inst.D4 !== pInst.D4) {
	      pInst.D4 = pInst.E4(false, inst.D4, pInst.D4, pInst.F4, pInst, 'E4', 'F4');
	    }

	    if (inst.G4 !== pInst.G4) {
	      pInst.G4 = pInst.H4(false, inst.G4, pInst.G4, pInst.I4, pInst, 'H4', 'I4');
	    }

	    if (inst.J4 !== pInst.J4) {
	      pInst.J4 = pInst.K4(false, inst.J4, pInst.J4, pInst.L4, pInst, 'K4', 'L4');
	    }

	    if (inst.M4 !== pInst.M4) {
	      pInst.M4 = pInst.N4(false, inst.M4, pInst.M4, pInst.O4, pInst, 'N4', 'O4');
	    }

	    if (inst.P4 !== pInst.P4) {
	      pInst.P4 = pInst.Q4(false, inst.P4, pInst.P4, pInst.R4, pInst, 'Q4', 'R4');
	    }

	    if (inst.S4 !== pInst.S4) {
	      pInst.S4 = pInst.T4(false, inst.S4, pInst.S4, pInst.U4, pInst, 'T4', 'U4');
	    }

	    if (inst.V4 !== pInst.V4) {
	      pInst.V4 = pInst.W4(false, inst.V4, pInst.V4, pInst.X4, pInst, 'W4', 'X4');
	    }

	    if (inst.Y4 !== pInst.Y4) {
	      pInst.Y4 = pInst.Z4(false, inst.Y4, pInst.Y4, pInst.a5, pInst, 'Z4', 'a5');
	    }

	    if (inst.b5 !== pInst.b5) {
	      pInst.b5 = pInst.c5(false, inst.b5, pInst.b5, pInst.d5, pInst, 'c5', 'd5');
	    }

	    if (inst.e5 !== pInst.e5) {
	      pInst.e5 = pInst.f5(false, inst.e5, pInst.e5, pInst.g5, pInst, 'f5', 'g5');
	    }

	    if (inst.h5 !== pInst.h5) {
	      pInst.h5 = pInst.i5(false, inst.h5, pInst.h5, pInst.j5, pInst, 'i5', 'j5');
	    }

	    if (inst.k5 !== pInst.k5) {
	      pInst.k5 = pInst.l5(false, inst.k5, pInst.k5, pInst.m5, pInst, 'l5', 'm5');
	    }

	    if (inst.n5 !== pInst.n5) {
	      pInst.n5 = pInst.o5(false, inst.n5, pInst.n5, pInst.p5, pInst, 'o5', 'p5');
	    }

	    if (inst.q5 !== pInst.q5) {
	      pInst.q5 = pInst.r5(false, inst.q5, pInst.q5, pInst.s5, pInst, 'r5', 's5');
	    }

	    if (inst.t5 !== pInst.t5) {
	      pInst.t5 = pInst.u5(false, inst.t5, pInst.t5, pInst.v5, pInst, 'u5', 'v5');
	    }

	    if (inst.w5 !== pInst.w5) {
	      pInst.w5 = pInst.x5(false, inst.w5, pInst.w5, pInst.y5, pInst, 'x5', 'y5');
	    }

	    if (inst.z5 !== pInst.z5) {
	      pInst.z5 = pInst.A5(false, inst.z5, pInst.z5, pInst.B5, pInst, 'A5', 'B5');
	    }

	    if (inst.C5 !== pInst.C5) {
	      pInst.C5 = pInst.D5(false, inst.C5, pInst.C5, pInst.E5, pInst, 'D5', 'E5');
	    }

	    if (inst.F5 !== pInst.F5) {
	      pInst.F5 = pInst.G5(false, inst.F5, pInst.F5, pInst.H5, pInst, 'G5', 'H5');
	    }

	    if (inst.I5 !== pInst.I5) {
	      pInst.I5 = pInst.J5(false, inst.I5, pInst.I5, pInst.K5, pInst, 'J5', 'K5');
	    }

	    if (inst.L5 !== pInst.L5) {
	      pInst.L5 = pInst.M5(false, inst.L5, pInst.L5, pInst.N5, pInst, 'M5', 'N5');
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

	var Comp = function Comp(_ref) {
	  var values = _ref.values;
	  return {
	    $s: _xvdomSpec2,
	    a: values[0],
	    d: values[1],
	    g: values[2],
	    j: values[3],
	    m: values[4],
	    p: values[5],
	    s: values[6],
	    v: values[7],
	    y: values[8],
	    B: values[9],
	    E: values[10],
	    H: values[11],
	    K: values[12],
	    N: values[13],
	    Q: values[14],
	    T: values[15],
	    W: values[16],
	    Z: values[17],
	    c1: values[18],
	    f1: values[19],
	    i1: values[20],
	    l1: values[21],
	    o1: values[22],
	    r1: values[23],
	    u1: values[24],
	    x1: values[25],
	    A1: values[26],
	    D1: values[27],
	    G1: values[28],
	    J1: values[29],
	    M1: values[30],
	    P1: values[31],
	    S1: values[32],
	    V1: values[33],
	    Y1: values[34],
	    b2: values[35],
	    e2: values[36],
	    h2: values[37],
	    k2: values[38],
	    n2: values[39],
	    q2: values[40],
	    t2: values[41],
	    w2: values[42],
	    z2: values[43],
	    C2: values[44],
	    F2: values[45],
	    I2: values[46],
	    L2: values[47],
	    O2: values[48],
	    R2: values[49],
	    U2: values[50],
	    X2: values[51],
	    a3: values[52],
	    d3: values[53],
	    g3: values[54],
	    j3: values[55],
	    m3: values[56],
	    p3: values[57],
	    s3: values[58],
	    v3: values[59],
	    y3: values[60],
	    B3: values[61],
	    E3: values[62],
	    H3: values[63],
	    K3: values[64],
	    N3: values[65],
	    Q3: values[66],
	    T3: values[67],
	    W3: values[68],
	    Z3: values[69],
	    c4: values[70],
	    f4: values[71],
	    i4: values[72],
	    l4: values[73],
	    o4: values[74],
	    r4: values[75],
	    u4: values[76],
	    x4: values[77],
	    A4: values[78],
	    D4: values[79],
	    G4: values[80],
	    J4: values[81],
	    M4: values[82],
	    P4: values[83],
	    S4: values[84],
	    V4: values[85],
	    Y4: values[86],
	    b5: values[87],
	    e5: values[88],
	    h5: values[89],
	    k5: values[90],
	    n5: values[91],
	    q5: values[92],
	    t5: values[93],
	    w5: values[94],
	    z5: values[95],
	    C5: values[96],
	    F5: values[97],
	    I5: values[98],
	    L5: values[99]
	  };
	};

	var renderInstance = function renderInstance(values) {
	  return {
	    $s: _xvdomSpec3,
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

	if (window.location.search === '?test') {
	  var EXPECTED_TEXT_CONTENT = 'helloKhelloLhelloMhelloNhelloOhelloPhelloQhelloRhelloShelloThelloUhelloVhelloWhelloXhelloYhelloZhelloAhelloBhelloChelloDhelloEhelloFhelloGhelloHhelloIhelloJhelloKhelloLhelloMhelloNhelloOhelloPhelloQhelloRhelloShelloThelloUhelloVhelloWhelloXhelloYprefixhelloZprefixhelloAprefixhelloBprefixhelloCprefixhelloDprefixhelloEprefixhelloFprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixprefixprefixprefixprefixprefixprefixprefix';
	  var EXPECTED_TEXT_CONTENT_RERENDER = 'hellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohelloOhelloPhelloQhelloRhelloShelloThelloUhelloVhelloWhelloXhelloYprefixhelloZprefixhelloAprefixhelloBprefixhelloCprefixhelloDprefixhelloEprefixhelloFprefixhelloGprefixhelloHprefixhelloIprefixhelloJprefixhelloKprefixhelloLprefixhelloMprefixhelloNprefixhelloOprefixhelloPprefixhelloQprefixhelloRprefixhelloSprefixhelloTprefixhelloUprefixhelloVprefixhelloWprefixhelloXprefixhelloYprefixhelloZprefixhelloAprefixhelloBprefixhelloCprefixhelloDprefixhelloEprefixhelloFprefixhelloGprefixhelloHprefixhelloIprefixhelloJprefixprefixprefixprefixprefixprefixprefixprefixprefixprefixprefixprefixprefix';
	  var node = render();
	  var textContent = node.textContent.replace(/\s+/g, '');
	  var pass = textContent === EXPECTED_TEXT_CONTENT;
	  console.log(pass ? 'SUCCESS' : 'FAIL: expected textContent to be...\n"' + EXPECTED_TEXT_CONTENT + '"\nbut got...\n"' + textContent + '"');

	  rerender(node);

	  var textContentRerender = node.textContent.replace(/\s+/g, '');
	  var passRerender = textContentRerender === EXPECTED_TEXT_CONTENT_RERENDER;
	  console.log(passRerender ? 'RERENDER SUCCESS' : 'RERENDER FAIL: expected textContent to be...\n"' + EXPECTED_TEXT_CONTENT_RERENDER + '"\nbut got...\n"' + textContentRerender + '"');
	} else {
	  console.time('render');
	  benchmark();
	  console.timeEnd('render');
	}

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
	var MARKER_NODE = document.createComment('');
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

	var getMarkerNode = function getMarkerNode() {
	  return MARKER_NODE.cloneNode(false);
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
	  if (value == null) {
	    contextNode.nodeValue = '';
	  } else if (value.constructor === String || value.constructor === Number) {
	    contextNode.nodeValue = value;
	  } else {
	    rerenderDynamic(isOnlyChild, value, null, contextNode, instance, rerenderFuncProp, rerenderContextNode);
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

	var createDynamic = exports.createDynamic = function createDynamic(isOnlyChild, parentNode, value, instance, rerenderFuncProp, rerenderContextNode) {
	  var node = void 0,
	      context = void 0,
	      rerenderFunc = void 0;
	  var valueConstructor = void 0;
	  if (value == null || (valueConstructor = value.constructor) === Boolean) {
	    rerenderFunc = rerenderDynamic;
	    context = node = getMarkerNode();
	  } else if (valueConstructor === Object) {
	    rerenderFunc = rerenderInstance;
	    context = node = internalRenderNoRecycle(value);
	  } else if (valueConstructor === String || valueConstructor === Number) {
	    rerenderFunc = rerenderText;
	    context = node = document.createTextNode(value);
	  } else if (valueConstructor === Array) {
	    node = document.createDocumentFragment();
	    renderArrayToParent(node, value, value.length);

	    rerenderFunc = rerenderArrayMaybe;
	    context = isOnlyChild ? parentNode : node.appendChild(getMarkerNode());
	  }

	  instance[rerenderFuncProp] = rerenderFunc;
	  instance[rerenderContextNode] = context;
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