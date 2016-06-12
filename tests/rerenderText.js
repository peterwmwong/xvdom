import assert from 'assert';
import xvdom, {_}  from '../src/index.js';

describe('_.rerenderText - value, contextNode', ()=>{
  const initialValue = 'initial text';
  let textNode, returnValue;

  beforeEach(()=>{
    textNode = document.createTextNode(initialValue);
  });

  describe('When `newValue` is a string', ()=>{
    beforeEach(()=>{
      returnValue = _.rerenderText(true, 'new text', textNode);
    });

    it('updates text node value', ()=>{
      assert.strictEqual(textNode.nodeValue, 'new text');
    });

    it('returns `newValue`', ()=>{
      assert.strictEqual(returnValue, textNode);
    });
  });

  describe('When `newValue` is a number', ()=>{
    beforeEach(()=>{
      returnValue = _.rerenderText(true, 0, textNode);
    });

    it('updates text node value', ()=>{
      assert.strictEqual(textNode.nodeValue, '0');
    });

    it('returns `newValue`', ()=>{
      assert.strictEqual(returnValue, textNode);
    });
  });

  [null, undefined].forEach(value=>{
    describe(`When newValue is ${value}`, ()=>{
      it('updates text node value to ""', ()=>{
        const result = _.rerenderText(true, value, textNode);
        assert.strictEqual(textNode.nodeValue, '');
        assert.strictEqual(result, textNode);
      });
    });
  });
});
