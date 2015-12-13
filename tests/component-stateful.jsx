import assert                  from 'assert';
import wrapSpecRenderFunctions from './utils/wrapSpecRenderFunctions.js';
import getHTMLString           from './utils/getHTMLString.js';
import * as xvdom              from '../src/index.js';

let renderCountSpec1, renderCountSpec2;

const StatefulCounter = (props, state)=>{
  StatefulCounter.callCount = StatefulCounter.callCount + 1;
  if(!state.forceFirst && state.count % 2){
    return wrapSpecRenderFunctions(
      <a>{`initialCount2: ${props.initialCount}, count2: ${state.count}`}</a>,
      ()=>renderCountSpec2++,
      ()=>{}
    );
  }
  else{
    return wrapSpecRenderFunctions(
      <span>{`initialCount: ${props.initialCount}, count: ${state.count}`}</span>,
      ()=>renderCountSpec1++,
      ()=>{}
    );
  }
};

let statefulCounterDispatch = null;
StatefulCounter.getInitialState = (props, dispatch)=>(
  (statefulCounterDispatch = dispatch),
  {count: props.initialCount || 0}
);

StatefulCounter.onProps = (props, state, dispatch)=>
  ({...state, forceFirst: props.forceFirst});

const incrementBy = (amt, props, state, dispatch) => ({count: state.count + amt});
const increment   = (props, state, dispatch)      => ({count: state.count + 1});
const decrement   = (props, state, dispatch)      => ({count: state.count - 1});
const noop        = (props, state, dispatch)      => state;

const NoOnPropsComp = props=>
  props.message === 'hello' ? <h1>{props.message}</h1> : <h2>{props.message}</h2>;

NoOnPropsComp.getInitialState = props=>({});

describe('Stateful Components', ()=>{
  describe('No `onProps`', ()=>{
    let node, parentNode;
    const render = message=>
      <NoOnPropsComp message={message} />;

    beforeEach(()=>{
      parentNode = document.createElement('div');
      node = xvdom.renderInstance(render('hello'));
      parentNode.appendChild(node);
    });

    it('renders', ()=>{
      assert.equal(getHTMLString(parentNode),
        '<div>'+
          '<h1>'+
            'hello'+
          '</h1>'+
        '</div>'
      );
    });

    it('rerenders when props change', ()=>{
      xvdom.rerender(parentNode.firstChild, render('goodbye'));
      assert.equal(getHTMLString(parentNode),
        '<div>'+
          '<h2>'+
            'goodbye'+
          '</h2>'+
        '</div>'
      );
    });
  });

  describe('With actions', ()=>{
    let node, parentNode;

    const render = (initialCount, forceFirst)=>
      <StatefulCounter initialCount={initialCount} forceFirst={forceFirst} />;

    beforeEach(()=>{
      renderCountSpec1 = renderCountSpec2 = 0;
      StatefulCounter.callCount = 0;
      parentNode = document.createElement('div');
      node = xvdom.renderInstance(render(777));
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
        statefulCounterDispatch(increment);

        assert.equal(getHTMLString(parentNode),
          '<div>'+
            '<span>'+
              'initialCount: 777, count: 778'+
            '</span>'+
          '</div>'
        );

        statefulCounterDispatch(incrementBy, 5);

        assert.equal(getHTMLString(parentNode),
          '<div>'+
            '<a>'+
              'initialCount2: 777, count2: 783'+
            '</a>'+
          '</div>'
        );

        statefulCounterDispatch(decrement);

        assert.equal(getHTMLString(parentNode),
          '<div>'+
            '<span>'+
              'initialCount: 777, count: 782'+
            '</span>'+
          '</div>'
        );
      });

      it('does not blow up if unmounted', ()=>{
        xvdom.unmount(node);
        assert.equal(StatefulCounter.callCount, 1);

        statefulCounterDispatch(increment);

        assert.equal(StatefulCounter.callCount, 2);
      });

      it('does not rerender if action yields the same state', ()=>{
        assert.equal(StatefulCounter.callCount, 1);

        statefulCounterDispatch(noop);

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
      assert.equal(renderCountSpec1, 0);
      assert.equal(renderCountSpec2, 1);

      xvdom.rerender(parentNode.firstChild, render(10));
      assert.equal(renderCountSpec1, 0);
      assert.equal(renderCountSpec2, 1);
      assert.equal(getHTMLString(parentNode),
        '<div>'+
          '<a>'+
            'initialCount2: 10, count2: 777'+
          '</a>'+
        '</div>'
      );

      xvdom.rerender(parentNode.firstChild, render(11, true));
      assert.equal(renderCountSpec1, 1);
      assert.equal(renderCountSpec2, 1);
      assert.equal(getHTMLString(parentNode),
        '<div>'+
          '<span>'+
            'initialCount: 11, count: 777'+
          '</span>'+
        '</div>'
      );

      xvdom.rerender(parentNode.firstChild, render(12));
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
