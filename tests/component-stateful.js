import assert          from 'assert';
import getHTMLString   from './utils/getHTMLString.js';
import {
  createDynamic,
  createComponent,
  renderInstance
} from '../src/index.js';

describe('Stateful Components', ()=>{
  // <span>{v0}</span>
  const STATEFUL_COUNTER_SPEC = {
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

  const StatefulCounter = (props, state, actions)=>{
    StatefulCounter.callCount = StatefulCounter.callCount + 1;
    StatefulCounter.callsArgs.push([props, state, actions]);
    return {
      spec: STATEFUL_COUNTER_SPEC,
      v0: `initialCount: ${props.initialCount}, count: ${state.count}`
    };
  };
  StatefulCounter.state = {
    init:                        props=>({count: props.initialCount || 0}),
    incrementBy: (props, {count}, amt)=>({count: count + amt}),
    increment:        (props, {count})=>({count: count + 1}),
    decrement:        (props, {count})=>({count: count - 1})
  };

  const PARENT_SPEC = {
    render: inst=>{
      const node = document.createElement('div');
      node.appendChild(createComponent(StatefulCounter, inst.v0, inst, 'r0', 'c0', 'rv0'));
      return node;
    },
    rerender: (inst, pInst)=>{
      if(inst.v0 !== pInst.v0){
        pInst.r0(StatefulCounter, inst.v0, pInst.v0, pInst.rv0, pInst.c0, pInst, 'c0', 'rv0');
        pInst.v0 = inst.v0;
      }
    }
  };

  describe('Stateful', ()=>{
    let node;

    beforeEach(()=>{
      StatefulCounter.callCount = 0;
      StatefulCounter.callsArgs = [];
      node = renderInstance({
        spec: PARENT_SPEC,
        v0: {initialCount:777}
      });
    });

    it('renders', ()=>{
      assert.equal(getHTMLString(node),
        '<div>'+
          '<span>'+
            'initialCount: 777, count: 777'+
          '</span>'+
        '</div>'
      );
    });

    describe('calling state actions', ()=>{
      it('rerenders if action generates a new state', ()=>{
        const [/*props*/, /*state*/, {increment, incrementBy, decrement}] = StatefulCounter.callsArgs[0];
        increment();

        assert.equal(getHTMLString(node),
          '<div>'+
            '<span>'+
              'initialCount: 777, count: 778'+
            '</span>'+
          '</div>'
        );

        incrementBy(5);

        assert.equal(getHTMLString(node),
          '<div>'+
            '<span>'+
              'initialCount: 777, count: 783'+
            '</span>'+
          '</div>'
        );

        decrement();

        assert.equal(getHTMLString(node),
          '<div>'+
            '<span>'+
              'initialCount: 777, count: 782'+
            '</span>'+
          '</div>'
        );
      });
    });

    // it('rerenders', ()=>{
    //   rerender(node, {spec: PARENT_SPEC, v0: {count: 10}});
    //   assert.equal(getHTMLString(node),
    //     '<div>'+
    //       '<span>'+
    //         'count: 10'+
    //       '</span>'+
    //     '</div>'
    //   );
    //
    //   rerender(node, {spec: PARENT_SPEC, v0: {count: 11}});
    //   assert.equal(getHTMLString(node),
    //     '<div>'+
    //       '<span>'+
    //         'count: 11'+
    //       '</span>'+
    //     '</div>'
    //   );
    //
    //   rerender(node, {spec: PARENT_SPEC, v0: {type: 2, count: 20}});
    //   assert.equal(getHTMLString(node),
    //     '<div>'+
    //       '<a>'+
    //         'count2: 20'+
    //       '</a>'+
    //     '</div>'
    //   );
    //
    //   rerender(node, {spec: PARENT_SPEC, v0: {type: 2, count: 21}});
    //   assert.equal(getHTMLString(node),
    //     '<div>'+
    //       '<a>'+
    //         'count2: 21'+
    //       '</a>'+
    //     '</div>'
    //   );
    //
    //   rerender(node, {spec: PARENT_SPEC, v0: {count: 12}});
    //   assert.equal(getHTMLString(node),
    //     '<div>'+
    //       '<span>'+
    //         'count: 12'+
    //       '</span>'+
    //     '</div>'
    //   );
    // });

    // it('does not rerender if component props are the same', ()=>{
    //   assert.equal(Counter.callCount, 1);
    //   rerender(node, {spec: PARENT_SPEC, v0: {count: 777}});
    //   assert.equal(Counter.callCount, 1);
    //   assert.equal(getHTMLString(node),
    //     '<div>'+
    //       '<span>'+
    //         'count: 777'+
    //       '</span>'+
    //     '</div>'
    //   );
    // });
  });
});
