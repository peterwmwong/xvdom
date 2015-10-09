import assert          from 'assert';
import getHTMLString   from './utils/getHTMLString.js';
import {
  createDynamic,
  createComponent,
  rerender,
  renderInstance
} from '../src/index.js';

describe('Components', ()=>{
  // <div>{v0}</div>
  const COUNTER_SPEC = {
    render: inst=>{
      const node = document.createElement('span');
      node.appendChild(createDynamic(inst.v0, inst, 'r0', 'c0'));
      return node;
    },
    rerender: (inst, pInst)=>{
      if(inst.v0 !== pInst.v0){
        pInst.r0(inst.v0, pInst.v0, pInst.c0, pInst, 'r0', 'c0');
        pInst.v0 = inst.v0;
      }
    }
  };

  function Counter({count, increment, decrement}){
    return {
      spec: COUNTER_SPEC,
      v0: `count: ${count}`
    };
  }

  // const StatefulCounter = {
  //   state: {
  //     initial:              props=>({count: props.initialCount || 0}),
  //     increment: (props, {count})=>({count: count + 1}),
  //     decrement: (props, {count})=>({count: count - 1})
  //   },
  //   // <div>{`one: ${one}, two: ${two}`}</div>
  //   render: (props, state, actions)=> Counter(Object.assign({}, props, actions))
  // };

  const PARENT_SPEC = {
    render: inst=>{
      const node = document.createElement('div');
      node.appendChild(createComponent(Counter, inst.v0, inst, 'r0', 'c0', 'rv0', 'rr0'));
      return node;
    },
    rerender: (inst, pInst)=>{
      if(inst.v0 !== pInst.v0){
        pInst.r0(Counter, inst.v0, pInst.v0, pInst.rv0, pInst.c0, pInst, 'r0', 'c0', 'rv0', 'rr0');
        pInst.v0 = inst.v0;
      }
    }
  };

  describe('Stateless', ()=>{
    let node;

    beforeEach(()=>{
      node = renderInstance({
        spec: PARENT_SPEC,
        v0: {count:777}
      });
    });

    it('renders', ()=>{
      assert.equal(getHTMLString(node),
        '<div>'+
          '<span>'+
            'count: 777'+
          '</span>'+
        '</div>'
      );
    });

    it('rerenders', ()=>{
      rerender(node, {spec: PARENT_SPEC, v0: {count: 42}});
      assert.equal(getHTMLString(node),
        '<div>'+
          '<span>'+
            'count: 42'+
          '</span>'+
        '</div>'
      );
    });
  });

  // describe('Stateful', ()=>{
  //   let node;
  //
  //   beforeEach(()=>{
  //     node = renderComponent(StatefulCounter, {count: 777});
  //   });
  //
  //   it('renders', ()=>{
  //     assert.equal(getHTMLString(node),
  //       '<div>'+
  //         'count: 777'+
  //       '</div>'
  //     );
  //   });
  // });
});
