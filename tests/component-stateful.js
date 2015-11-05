import assert          from 'assert';
import getHTMLString   from './utils/getHTMLString.js';
import {
  createDynamic,
  createComponent,
  renderInstance,
  rerender
} from '../src/index.js';

describe('Stateful Components', ()=>{
  let renderCountSpec1, renderCountSpec2;

  // <span>{v0}</span>
  const STATEFUL_COUNTER_SPEC = {
    render: inst=>{
      renderCountSpec1++;
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
      renderCountSpec2++;
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

  const StatefulCounter = (props, state, dispatch)=>{
    StatefulCounter.callCount = StatefulCounter.callCount + 1;
    StatefulCounter.callsArgs.push([props, state, dispatch]);
    return (
        (!state.forceFirst && state.count % 2) ? {spec: STATEFUL_COUNTER_SPEC2, v0: `initialCount2: ${props.initialCount}, count2: ${state.count}`}
      : {spec: STATEFUL_COUNTER_SPEC, v0: `initialCount: ${props.initialCount}, count: ${state.count}`}
    );
  };

  const getInitialState = (props, state, dispatch)      => ({count: props.initialCount || 0});
  const incrementBy     = (props, state, dispatch, amt) => ({count: state.count + amt});
  const increment       = (props, state, dispatch)      => ({count: state.count + 1});
  const decrement       = (props, state, dispatch)      => ({count: state.count - 1});
  const noop            = (props, state, dispatch)      => state;
  const redirect        = (props, state, dispatch)      => dispatch(increment);
  StatefulCounter.getInitialState = (props, state, dispatch)=>dispatch(getInitialState);
  StatefulCounter.onProps = (props, state, dispatch)=>({...state, forceFirst: props.forceFirst});

  const PARENT_SPEC = {
    render: inst=>{
      return createComponent(StatefulCounter, inst.v0, inst, 'r0', 'c0', 'rv0');
    },
    rerender: (inst, pInst)=>{
      if(inst.v0 !== pInst.v0){
        pInst.r0(StatefulCounter, inst.v0, pInst.v0, pInst.rv0, pInst.c0, pInst, 'c0', 'rv0');
        pInst.v0 = inst.v0;
      }
    }
  };

  describe('Stateful', ()=>{
    let node, parentNode;

    beforeEach(()=>{
      renderCountSpec1 = renderCountSpec2 = 0;
      StatefulCounter.callCount = 0;
      StatefulCounter.callsArgs = [];
      parentNode = document.createElement('div');
      node = renderInstance({spec: PARENT_SPEC, v0: {initialCount:777}});
      parentNode.appendChild(node);
    });

    it('renders', ()=>{
      assert.equal(getHTMLString(parentNode),
        '<div>'+
          '<a>'+
            'initialCount2: 777, count2: 777'+
          '</a>'+
        '</div>'
      );
    });

    describe('calling state actions', ()=>{
      it('rerenders if action generates a new state', ()=>{
        let [/*props*/, /*state*/, dispatch] = StatefulCounter.callsArgs[0];
        dispatch(increment);

        assert.equal(getHTMLString(parentNode),
          '<div>'+
            '<span>'+
              'initialCount: 777, count: 778'+
            '</span>'+
          '</div>'
        );

        assert.deepEqual(dispatch(incrementBy, 5), {count: 783});

        assert.equal(getHTMLString(parentNode),
          '<div>'+
            '<a>'+
              'initialCount2: 777, count2: 783'+
            '</a>'+
          '</div>'
        );

        assert.deepEqual(dispatch(decrement), {count: 782});

        assert.equal(getHTMLString(parentNode),
          '<div>'+
            '<span>'+
              'initialCount: 777, count: 782'+
            '</span>'+
          '</div>'
        );

        assert.equal(StatefulCounter.callCount, 4);
        assert.deepEqual(dispatch(redirect), {count: 783});
        assert.equal(StatefulCounter.callCount, 5);

        assert.equal(getHTMLString(parentNode),
          '<div>'+
            '<a>'+
              'initialCount2: 777, count2: 783'+
            '</a>'+
          '</div>'
        );
      });

      it('does not rerender if action yields the same state', ()=>{
        const [/*props*/, /*state*/, dispatch] = StatefulCounter.callsArgs[0];
        assert.equal(StatefulCounter.callCount, 1);
        dispatch(noop);
        assert.equal(StatefulCounter.callCount, 1);
        assert.equal(getHTMLString(parentNode),
          '<div>'+
            '<a>'+
              'initialCount2: 777, count2: 777'+
            '</a>'+
          '</div>'
        );
      });
    });

    it('rerenders', ()=>{
      assert.equal(renderCountSpec2, 1);
      rerender(parentNode.firstChild, {spec: PARENT_SPEC, v0: {initialCount: 10}});
      assert.equal(renderCountSpec1, 0);
      assert.equal(renderCountSpec2, 1);
      assert.equal(getHTMLString(parentNode),
        '<div>'+
          '<a>'+
            'initialCount2: 10, count2: 777'+
          '</a>'+
        '</div>'
      );

      rerender(parentNode.firstChild, {spec: PARENT_SPEC, v0: {initialCount: 11, forceFirst: true}});
      assert.equal(renderCountSpec1, 1);
      assert.equal(renderCountSpec2, 1);
      assert.equal(getHTMLString(parentNode),
        '<div>'+
          '<span>'+
            'initialCount: 11, count: 777'+
          '</span>'+
        '</div>'
      );

      rerender(parentNode.firstChild, {spec: PARENT_SPEC, v0: {initialCount: 12}});
      assert.equal(renderCountSpec1, 1);
      assert.equal(renderCountSpec2, 2);
      assert.equal(getHTMLString(parentNode),
        '<div>'+
          '<a>'+
            'initialCount2: 12, count2: 777'+
          '</a>'+
        '</div>'
      );

    });
  });
});
