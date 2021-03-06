import assert        from 'assert';
import getHTMLString from './utils/getHTMLString.js';
import xvdom         from '../src/index.js';

const Counter = ({type, count})=>(
  (Counter.callCount = Counter.callCount ? Counter.callCount + 1 : 1),
  type === 2 ?
    <a>count2: {count}</a> :
    <span>count: {count}</span>
);

const NoPropsComp = (props)=>(
  NoPropsComp.callArgs.push(props),
  <span>test</span>
);

const Container = ({count})=><Counter type={count % 3} count={count} />;

describe('Component', ()=>{

  describe('Stateless', ()=>{
    let node;
    const render = ({type, count})=>
      <div>
        <Counter type={type} count={count} />
      </div>;

    beforeEach(()=>{
      Counter.callCount = 0;
      node = xvdom.render(render({count:777}));
    });

    it('renders', ()=>{
      assert.strictEqual(getHTMLString(node),
        '<div>'+
          '<span>'+
            'count: 777'+
          '</span>'+
        '</div>'
      );
    });

    it('rerenders', ()=>{
      xvdom.rerender(node, render({count:10}));
      assert.strictEqual(getHTMLString(node),
        '<div>'+
          '<span>'+
            'count: 10'+
          '</span>'+
        '</div>'
      );

      xvdom.rerender(node, render({count:11}));
      assert.strictEqual(getHTMLString(node),
        '<div>'+
          '<span>'+
            'count: 11'+
          '</span>'+
        '</div>'
      );

      xvdom.rerender(node, render({type:2, count:20}));
      assert.strictEqual(getHTMLString(node),
        '<div>'+
          '<a>'+
            'count2: 20'+
          '</a>'+
        '</div>'
      );

      xvdom.rerender(node, render({type: 2, count: 21}));
      assert.strictEqual(getHTMLString(node),
        '<div>'+
          '<a>'+
            'count2: 21'+
          '</a>'+
        '</div>'
      );

      xvdom.rerender(node, render({count: 12}));
      assert.strictEqual(getHTMLString(node),
        '<div>'+
          '<span>'+
            'count: 12'+
          '</span>'+
        '</div>'
      );
    });
  });

  it('handles null props (no props)', ()=>{
    NoPropsComp.callArgs = [];
    const node = xvdom.render(<NoPropsComp />);

    assert.deepEqual(NoPropsComp.callArgs[0], {});
    assert.strictEqual(getHTMLString(node),
      '<span>'+
        'test'+
      '</span>'
    );
  });

  describe('Nested Stateless', ()=>{
    let node;
    const render2 = count=>
      <div>
        <Container count={count} />
      </div>;

    beforeEach(()=>{
      Counter.callCount = 0;
      node = xvdom.render(render2(0));
    });

    it('renders', ()=>{
      assert.strictEqual(getHTMLString(node),
        '<div>'+
          '<span>'+
            'count: 0'+
          '</span>'+
        '</div>'
      );
    });

    it('rerenders', ()=>{
      xvdom.rerender(node, render2(1));
      assert.strictEqual(getHTMLString(node),
        '<div>'+
          '<span>'+
            'count: 1'+
          '</span>'+
        '</div>'
      );

      xvdom.rerender(node, render2(0));
      assert.strictEqual(getHTMLString(node),
        '<div>'+
          '<span>'+
            'count: 0'+
          '</span>'+
        '</div>'
      );

      xvdom.rerender(node, render2(2));
      assert.strictEqual(getHTMLString(node),
        '<div>'+
          '<a>'+
            'count2: 2'+
          '</a>'+
        '</div>'
      );

      xvdom.rerender(node, render2(5));
      assert.strictEqual(getHTMLString(node),
        '<div>'+
          '<a>'+
            'count2: 5'+
          '</a>'+
        '</div>'
      );

      xvdom.rerender(node, render2(1));
      assert.strictEqual(getHTMLString(node),
        '<div>'+
          '<span>'+
            'count: 1'+
          '</span>'+
        '</div>'
      );
    });
  });
});
