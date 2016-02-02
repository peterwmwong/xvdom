import assert                  from 'assert';
import wrapSpecRenderFunctions from './utils/wrapSpecRenderFunctions.js';
import getHTMLString           from './utils/getHTMLString.js';
import xvdom                   from '../src/index.js';

let renderCountSpec1, renderCountSpec2;

const StatefulCounter = (props, state, actions)=>{
  StatefulCounter.callCount = StatefulCounter.callCount + 1;
  StatefulCounter.callsArgs.push([props, state, actions]);
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

StatefulCounter.state = {
  onInit:      (props, state, actions)=>actions.onInit2(),
  onInit2:      props=>({count: props.initialCount || 0}),
  onProps:     (props, state, actions)=>({...state, forceFirst: props.forceFirst}),
  incrementBy: (props, state, actions, amt)=>({count: state.count + amt}),
  increment:   (props, state, actions)=>({count: state.count + 1}),
  decrement:   (props, state, actions)=>({count: state.count - 1}),
  noop:        (props, state, actions)=>state,
  noopUndef:   (props, state, actions)=>undefined,
  redirect:    (props, state, actions)=>actions.increment()
};

const NoOnPropsComp = (props, state)=>
  props.message === 'hello' ? <h1>{props.message} {state}</h1> : <h2>{props.message} {state}</h2>;

NoOnPropsComp.state = {
  onInit: props=>'world'
};

describe('Stateful Components', ()=>{
  describe('No `onProps`', ()=>{
    let node, parentNode;
    const render = message=>
      <NoOnPropsComp message={message} />;

    beforeEach(()=>{
      parentNode = document.createElement('div');
      node = xvdom.render(render('hello'));
      parentNode.appendChild(node);
    });

    it('renders', ()=>{
      assert.equal(getHTMLString(parentNode),
        '<div>'+
          '<h1>'+
            'hello'+
            'world'+
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
            'world'+
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
      StatefulCounter.callsArgs = [];
      parentNode = document.createElement('div');
      node = xvdom.render(render(777));
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
        let [/*props*/, /*state*/, {increment}] = StatefulCounter.callsArgs[0];
        increment();

        assert.equal(getHTMLString(parentNode),
          '<div>'+
            '<span>'+
              'initialCount: 777, count: 778'+
            '</span>'+
          '</div>'
        );

        let [/*props*/, /*state*/, {incrementBy}] = StatefulCounter.callsArgs[1];

        assert.deepEqual(incrementBy(5), {count: 783});

        assert.equal(getHTMLString(parentNode),
          '<div>'+
            '<a>'+
              'initialCount2: 777, count2: 783'+
            '</a>'+
          '</div>'
        );

        let [/*props*/, /*state*/, {decrement}] = StatefulCounter.callsArgs[2];

        assert.deepEqual(decrement(), {count: 782});

        assert.equal(getHTMLString(parentNode),
          '<div>'+
            '<span>'+
              'initialCount: 777, count: 782'+
            '</span>'+
          '</div>'
        );

        let [/*props*/, /*state*/, {redirect}] = StatefulCounter.callsArgs[2];

        assert.equal(StatefulCounter.callCount, 4);
        assert.deepEqual(redirect(), {count: 783});
        assert.equal(StatefulCounter.callCount, 5);

        assert.equal(getHTMLString(parentNode),
          '<div>'+
            '<a>'+
              'initialCount2: 777, count2: 783'+
            '</a>'+
          '</div>'
        );
      });

      it('does not blow up if unmounted', ()=>{
        xvdom.unmount(node);

        const [/*props*/, /*state*/, {increment}] = StatefulCounter.callsArgs[0];
        assert.equal(StatefulCounter.callCount, 1);
        increment();
        assert.equal(StatefulCounter.callCount, 2);
      });

      it('does not rerender if action yields the same state', ()=>{
        const [/*props*/, /*state*/, {noop}] = StatefulCounter.callsArgs[0];
        assert.equal(StatefulCounter.callCount, 1);
        noop();
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
