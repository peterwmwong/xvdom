import assert          from 'assert';
import getHTMLString   from './utils/getHTMLString.js';
import {
  createDynamic,
  createComponent,
  renderInstance,
  rerender
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

  const STATEFUL_COUNTER_SPEC2 = {
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

  const StatefulCounter = (state, actions)=>{
    StatefulCounter.callCount = StatefulCounter.callCount + 1;
    StatefulCounter.callsArgs.push([state, actions]);
    return (
        (!state.forceFirst && state.count % 2) ? {spec: STATEFUL_COUNTER_SPEC2, v0: `initialCount2: ${state.initialCount}, count2: ${state.count}`}
      : {spec: STATEFUL_COUNTER_SPEC, v0: `initialCount: ${state.initialCount}, count: ${state.count}`}
    );
  };
  StatefulCounter.state = {
    onInit:             props=>({...props, count: props.initialCount || 0}),
    onProps:   (state, props)=>({...state, initialCount: props.initialCount, forceFirst: props.forceFirst}),
    incrementBy: (state, amt)=>({...state, count: state.count + amt}),
    increment:        (state)=>({...state, count: state.count + 1}),
    decrement:        (state)=>({...state, count: state.count - 1}),
    noop:             (state)=>state
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
      node = renderInstance({spec: PARENT_SPEC, v0: {initialCount:777}});
    });

    it('renders', ()=>{
      assert.equal(getHTMLString(node),
        '<div>'+
          '<a>'+
            'initialCount2: 777, count2: 777'+
          '</a>'+
        '</div>'
      );
    });

    describe('calling state actions', ()=>{
      it('rerenders if action generates a new state', ()=>{
        let [/*state*/, {increment}] = StatefulCounter.callsArgs[0];
        increment();

        assert.equal(getHTMLString(node),
          '<div>'+
            '<span>'+
              'initialCount: 777, count: 778'+
            '</span>'+
          '</div>'
        );

        let [/*state*/, {incrementBy}] = StatefulCounter.callsArgs[1];

        incrementBy(5);

        assert.equal(getHTMLString(node),
          '<div>'+
            '<a>'+
              'initialCount2: 777, count2: 783'+
            '</a>'+
          '</div>'
        );

        let [/*state*/, {decrement}] = StatefulCounter.callsArgs[2];

        decrement();

        assert.equal(getHTMLString(node),
          '<div>'+
            '<span>'+
              'initialCount: 777, count: 782'+
            '</span>'+
          '</div>'
        );
      });

      it('does not rerender if action yields the same state', ()=>{
        const [/*state*/, {noop}] = StatefulCounter.callsArgs[0];
        assert.equal(StatefulCounter.callCount, 1);
        noop();
        assert.equal(StatefulCounter.callCount, 1);
        assert.equal(getHTMLString(node),
          '<div>'+
            '<a>'+
              'initialCount2: 777, count2: 777'+
            '</a>'+
          '</div>'
        );
      });
    });

    it('rerenders', ()=>{
      rerender(node, {spec: PARENT_SPEC, v0: {initialCount: 10}});
      assert.equal(getHTMLString(node),
        '<div>'+
          '<a>'+
            'initialCount2: 10, count2: 777'+
          '</a>'+
        '</div>'
      );

      rerender(node, {spec: PARENT_SPEC, v0: {initialCount: 11, forceFirst: true}});
      assert.equal(getHTMLString(node),
        '<div>'+
          '<span>'+
            'initialCount: 11, count: 777'+
          '</span>'+
        '</div>'
      );

      rerender(node, {spec: PARENT_SPEC, v0: {initialCount: 11}});
      assert.equal(getHTMLString(node),
        '<div>'+
          '<a>'+
            'initialCount2: 11, count2: 777'+
          '</a>'+
        '</div>'
      );
    });

    it('does not rerender if component props are the same', ()=>{
      assert.equal(StatefulCounter.callCount, 1);
      rerender(node, {spec: PARENT_SPEC, v0: {initialCount: 777}});
      assert.equal(StatefulCounter.callCount, 1);
      assert.equal(getHTMLString(node),
        '<div>'+
          '<a>'+
            'initialCount2: 777, count2: 777'+
          '</a>'+
        '</div>'
      );
    });
  });
});
