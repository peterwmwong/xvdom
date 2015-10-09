import assert                     from 'assert';
import getHTMLString              from './utils/getHTMLString.js';
import {rerender, renderInstance} from '../src/index.js';

describe('rerender - node, renderInstance', ()=>{
  let renderCallCount, rerenderCallCount, node, rerenderArgs;
  const spec = {
    recycled: [],
    render: ()=>(
      renderCallCount++,
      document.createElement('span')
    ),
    rerender: (...args)=>{
      rerenderCallCount++;
      rerenderArgs = args;
    }
  };
  const instance = {spec};

  beforeEach(()=>{
    node = renderInstance(instance);
    rerenderCallCount = renderCallCount = 0;
  });

  it('calls rerender() with values and previous values w/context', ()=>{
    const newInstance = {spec};
    rerender(node, newInstance);

    assert.equal(getHTMLString(node), '<span></span>');
    assert.equal(renderCallCount,   0);
    assert.equal(rerenderCallCount, 1);
    assert.equal(rerenderArgs[0], newInstance);
    assert.equal(rerenderArgs[1], instance);
  });


  describe('when the instance is for a different spec', ()=>{
    let parentNode, newSpecRenderArgs, newInstance, newNode;

    beforeEach(()=>{
      parentNode = document.createElement('div');
      parentNode.appendChild(node);

      const newSpec = {
        render: (...args)=>(
          newSpecRenderArgs = args,
          document.createElement('b')
        )
      };
      newInstance = {spec:newSpec};
      newNode = rerender(node, newInstance);
    });

    it('calls render()', ()=>{
      assert.equal(getHTMLString(parentNode), '<div><b></b></div>');
      assert.equal(renderCallCount,   0);
      assert.equal(rerenderCallCount, 0);
      assert.equal(newSpecRenderArgs[0], newInstance);
      assert.notEqual(newNode, node);
    });

    it('recycles', ()=>{
      assert.equal(spec.recycled[0], node);
    });
  });
});
