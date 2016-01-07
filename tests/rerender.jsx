import assert                  from 'assert';
import getHTMLString           from './utils/getHTMLString.js';
import makeRecyclable          from './utils/makeRecyclable.js';
import wrapSpecRenderFunctions from './utils/wrapSpecRenderFunctions';
import spyOn                   from './utils/spyOn.js';
import xvdom                   from '../src/index.js';

describe('rerender - node, instance', ()=>{
  let renderCallCount, rerenderCallCount, node;

  const render = ()=>
    makeRecyclable(
      wrapSpecRenderFunctions(
        <span></span>,
        ()=>renderCallCount++,
        ()=>rerenderCallCount++
      )
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

    assert.equal(getHTMLString(node), '<span></span>');

    assert.equal(renderCallCount,   0);
    assert.equal(rerenderCallCount, 1);
  });

  describe('when the instance is for a different spec', ()=>{
    let parentNode, newNode;

    beforeEach(()=>{
      parentNode = document.createElement('div');
      parentNode.appendChild(node);
      newNode = xvdom.rerender(node, <b></b>);
    });

    it('calls render()', ()=>{
      assert.equal(getHTMLString(parentNode), '<div><b></b></div>');
      assert.equal(renderCallCount,   0);
      assert.equal(rerenderCallCount, 0);
      assert.notEqual(newNode, node);
    });

    it('recycles', ()=>{
      spyOn.resetSpyCounts();
      xvdom.rerender(newNode, render());

      assert.equal(getHTMLString(parentNode), '<div><span></span></div>');
      assert.equal(renderCallCount,   0);
      assert.equal(rerenderCallCount, 1);
      assert.equal(document.createElement.count, 0);
    });
  });
});
