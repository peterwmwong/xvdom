import assert         from 'assert';
import {rerenderText} from '../src/rerenderText.js';

describe('rerenderText - newValue, previousValueAndContext, valueIndex, contextIndex', ()=>{
  let textNode, valueContext;

  beforeEach(()=>{
    const initialValue = 'initial text';
    textNode = document.createTextNode(initialValue);
    valueContext = [
      initialValue,
      rerenderText,
      textNode
    ];
  });

  describe('When `newValue` is a string', ()=>{
    beforeEach(()=>{
      rerenderText('new text', valueContext, 0, 1);
    });

    it('updates text node value', ()=>{
      assert.equal(textNode.nodeValue, 'new text');
    });

    it('previousValuesContext value is updated', ()=>{
      assert.equal(valueContext[0], 'new text');
    });

    it('previousValuesContext rerender function is `rerenderText`', ()=>{
      assert.equal(valueContext[1], rerenderText);
    });

    it('previousValuesContext context is the node', ()=>{
      assert.equal(valueContext[2], textNode);
    });
  });

  describe('When `newValue` is null', ()=>{
    beforeEach(()=>{
      rerenderText(null, valueContext, 0, 1);
    });

    it('updates text node value', ()=>{
      assert.equal(textNode.nodeValue, '');
    });

    it('previousValuesContext value is updated', ()=>{
      assert.equal(valueContext[0], null);
    });

    it('previousValuesContext rerender function is `rerenderText`', ()=>{
      assert.equal(valueContext[1], rerenderText);
    });

    it('previousValuesContext context is the node', ()=>{
      assert.equal(valueContext[2], textNode);
    });
  });

  describe('When `newValue` is undefined', ()=>{
    beforeEach(()=>{
      rerenderText(undefined, valueContext, 0, 1);
    });

    it('updates text node value', ()=>{
      assert.equal(textNode.nodeValue, '');
    });

    it('previousValuesContext value is updated', ()=>{
      assert.equal(valueContext[0], undefined);
    });

    it('previousValuesContext rerender function is `rerenderText`', ()=>{
      assert.equal(valueContext[1], rerenderText);
    });

    it('previousValuesContext context is the node', ()=>{
      assert.equal(valueContext[2], textNode);
    });
  });
});
