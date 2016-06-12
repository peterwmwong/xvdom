import assert                  from 'assert';
import getHTMLString           from './utils/getHTMLString.js';
import wrapSpecRenderFunctions from './utils/wrapSpecRenderFunctions';
import spyOn                   from './utils/spyOn.js';
import xvdom                   from '../src/index.js';

describe('rerender - node, instance', ()=>{
  let renderCallCount, rerenderCallCount, node;

  const render = ()=>
    wrapSpecRenderFunctions(
      <span recycle></span>,
      ()=>renderCallCount++,
      ()=>rerenderCallCount++
    );

  beforeEach(()=>{
    spyOn.uninstall();
    spyOn(document, 'createElement');

    node = xvdom.render(render());
    rerenderCallCount = renderCallCount = 0;
  });

  afterEach(()=>{
    spyOn.uninstall();
  });

  it('calls rerender() with values and previous values w/context', ()=>{
    xvdom.rerender(node, render());

    assert.strictEqual(getHTMLString(node), '<span></span>');

    assert.strictEqual(renderCallCount,   0);
    assert.strictEqual(rerenderCallCount, 1);
  });

  describe('when the instance is for a different spec', ()=>{
    let parentNode, newNode;

    beforeEach(()=>{
      parentNode = document.createElement('div');
      parentNode.appendChild(node);
      newNode = xvdom.rerender(node, <b></b>);
    });

    it('calls render()', ()=>{
      assert.strictEqual(getHTMLString(parentNode), '<div><b></b></div>');
      assert.strictEqual(renderCallCount,   0);
      assert.strictEqual(rerenderCallCount, 0);
      assert.notStrictEqual(newNode, node);
    });

    it('recycles', ()=>{
      spyOn.resetSpyCounts();
      xvdom.rerender(newNode, render());

      assert.strictEqual(getHTMLString(parentNode), '<div><span></span></div>');
      assert.strictEqual(renderCallCount,   0);
      assert.strictEqual(rerenderCallCount, 1);
      assert.strictEqual(document.createElement.count, 0);
    });
  });
});
