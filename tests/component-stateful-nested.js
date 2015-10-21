import assert          from 'assert';
import getHTMLString   from './utils/getHTMLString.js';
import {
  createDynamic,
  createComponent,
  renderInstance,
  rerender
} from '../src/index.js';

// let leafNodeToggle;
// const LeafNode = (props, state, {toggle})=>{
//   leafNodeToggle = toggle;
//   return (
//     state.spec ? <span className="spec1">{props.count}</span>
//       : <span className="spec2">{props.count}</span>
//   );
// };
// LeafNode.state = {
//   onInit:             props=>({spec: false}),
//   onProps:   (props, state)=>({...state}),
//   increment: (props, state)=>({spec: !state.spec})
// };
//
// let nodeIncrement;
// const Node = (props, state, {increment})=>{
//   nodeIncrement = increment;
//   return <LeafNode count={state.count}/>;
// };
// Node.state = {
//   onInit:             props=>({count: 0}),
//   increment: (props, state)=>({count: state.count + 1})
// };
//
// let parentNode = document.createElement('div');
// parentNode.appendChild(renderInstance(<Node />));

describe('Stateful Components Nested', ()=>{
  it('renders', ()=>{
    const _xvdomSpec4 = {
      render: function render(inst) {
        var _n = xvdom.createComponent(Node, null, inst, "r0", "c0", "w0");

        return _n;
      }
    };
    const _xvdomSpec3 = {
      render: function render(inst) {
        var _n = xvdom.createComponent(LeafNode, {
          count: inst.p0count
        }, inst, "r0", "c0", "w0");

        return _n;
      },
      rerender: function rerender(inst, pInst) {
        if (inst.p0count !== pInst.p0count) {
          pInst.r0(LeafNode, {
            count: inst.p0count
          }, null, pInst.w0, pInst.c0, pInst, "c0", "w0");
          pInst.p0count = inst.p0count;
        }
      }
    };
    const _xvdomSpec2 = {
      render: function render(inst) {
        var _n = document.createElement("span");

        _n.className = "spec2";

        _n.appendChild(xvdom.createDynamic(inst.v0, inst, "r0", "c0"));

        return _n;
      },
      rerender: function rerender(inst, pInst) {
        if (inst.v0 !== pInst.v0) {
          pInst.r0(inst.v0, pInst.v0, pInst.c0, pInst, "r0", "c0");
          pInst.v0 = inst.v0;
        }
      }
    };
    const _xvdomSpec = {
      render: function render(inst) {
        var _n = document.createElement("span");

        _n.className = "spec1";

        _n.appendChild(xvdom.createDynamic(inst.v0, inst, "r0", "c0"));

        return _n;
      },
      rerender: function rerender(inst, pInst) {
        if (inst.v0 !== pInst.v0) {
          pInst.r0(inst.v0, pInst.v0, pInst.c0, pInst, "r0", "c0");
          pInst.v0 = inst.v0;
        }
      }
    };

    let leafNodeToggle;
    var LeafNode = function LeafNode(props, state, _ref) {
      var toggle = _ref.toggle;

      leafNodeToggle = toggle;
      return state.spec ? {
        spec: _xvdomSpec,
        _node: null,
        v0: props.count,
        r0: null,
        c0: null
      } : {
        spec: _xvdomSpec2,
        _node: null,
        v0: props.count,
        r0: null,
        c0: null
      };
    };
    LeafNode.state = {
      onInit:             props=>({spec: false}),
      onProps:   (props, state)=>({...state}),
      toggle: (props, state)=>({spec: !state.spec})
    };

    let nodeIncrement;
    var Node = function Node(props, state, _ref2) {
      var increment = _ref2.increment;

      nodeIncrement = increment;
      return {
        spec: _xvdomSpec3,
        _node: null,
        r0: null,
        c0: null,
        w0: null,
        p0count: state.count
      };
    };
    Node.state = {
      onInit:             props=>({count: 0}),
      increment: (props, state)=>({count: state.count + 1})
    };

    const parentNode = document.createElement('div');
    parentNode.appendChild(renderInstance({
      spec: _xvdomSpec4,
      _node: null,
      r0: null,
      c0: null,
      w0: null
    }));

    assert.equal(getHTMLString(parentNode),
      '<div>'+
        '<span class="spec2">'+
          '0'+
        '</span>'+
      '</div>'
    );

    leafNodeToggle();

    assert.equal(getHTMLString(parentNode),
      '<div>'+
        '<span class="spec1">'+
          '0'+
        '</span>'+
      '</div>'
    );

    nodeIncrement();

    assert.equal(getHTMLString(parentNode),
      '<div>'+
        '<span class="spec1">'+
          '1'+
        '</span>'+
      '</div>'
    );


    leafNodeToggle();

    assert.equal(getHTMLString(parentNode),
      '<div>'+
        '<span class="spec2">'+
          '1'+
        '</span>'+
      '</div>'
    );
  });
});
