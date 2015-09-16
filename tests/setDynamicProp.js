import assert                         from 'assert';
import {setDynamicProp, rerenderProp} from '../src/index.js';

describe('setDynamicProp - node, attr, valueAndContext, valueIndex, rerenderIndex, rerenderContextIndex', ()=>{
  let node, valueContext;

  beforeEach(()=>{
    node = document.createElement('div');
    valueContext = [
      'initial value',
      null,
      null
    ];

    setDynamicProp(node, 'className', valueContext, 0, 1, 2);
  });

  it('updates node property', ()=>{
    assert.equal(node.className, 'initial value');
  });

  it('updates valueContext value', ()=>{
    assert.equal(valueContext[0], 'initial value');
  });

  it('updates valueContext rerender function', ()=>{
    assert.equal(valueContext[1], rerenderProp);
  });

  it('updates valueContext context is the node', ()=>{
    assert.equal(valueContext[2], node);
  });
});
