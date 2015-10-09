import assert          from 'assert';
import getHTMLString   from './utils/getHTMLString.js';
import {
  createDynamic,
  createComponent,
  rerender,
  renderInstance
} from '../src/index.js';

describe('Components', ()=>{
  // <span>{v0}</span>
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

  // <a>{v0}</a>
  const COUNTER_SPEC2 = {
    render: inst=>{
      const node = document.createElement('a');
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

  function Counter({type, count}){
    Counter.callCount = Counter.callCount ? Counter.callCount + 1 : 1;
    return type === 2 ? {spec: COUNTER_SPEC2, v0: `count2: ${count}`}
            : {spec: COUNTER_SPEC, v0: `count: ${count}`};
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
      node.appendChild(createComponent(Counter, inst.v0, inst, 'r0', 'c0', 'rv0'));
      return node;
    },
    rerender: (inst, pInst)=>{
      if(inst.v0 !== pInst.v0){
        pInst.r0(Counter, inst.v0, pInst.v0, pInst.rv0, pInst.c0, pInst, 'c0', 'rv0');
        pInst.v0 = inst.v0;
      }
    }
  };

  describe('Stateless', ()=>{
    let node;

    beforeEach(()=>{
      Counter.callCount = 0;
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
      rerender(node, {spec: PARENT_SPEC, v0: {count: 10}});
      assert.equal(getHTMLString(node),
        '<div>'+
          '<span>'+
            'count: 10'+
          '</span>'+
        '</div>'
      );

      rerender(node, {spec: PARENT_SPEC, v0: {count: 11}});
      assert.equal(getHTMLString(node),
        '<div>'+
          '<span>'+
            'count: 11'+
          '</span>'+
        '</div>'
      );

      rerender(node, {spec: PARENT_SPEC, v0: {type: 2, count: 20}});
      assert.equal(getHTMLString(node),
        '<div>'+
          '<a>'+
            'count2: 20'+
          '</a>'+
        '</div>'
      );

      rerender(node, {spec: PARENT_SPEC, v0: {type: 2, count: 21}});
      assert.equal(getHTMLString(node),
        '<div>'+
          '<a>'+
            'count2: 21'+
          '</a>'+
        '</div>'
      );

      rerender(node, {spec: PARENT_SPEC, v0: {count: 12}});
      assert.equal(getHTMLString(node),
        '<div>'+
          '<span>'+
            'count: 12'+
          '</span>'+
        '</div>'
      );
    });

    it('does not rerender if component props are the same', ()=>{
      assert.equal(Counter.callCount, 1);
      rerender(node, {spec: PARENT_SPEC, v0: {count: 777}});
      assert.equal(Counter.callCount, 1);
      assert.equal(getHTMLString(node),
        '<div>'+
          '<span>'+
            'count: 777'+
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
