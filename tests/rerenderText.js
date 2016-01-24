import assert from 'assert';
import xvdom, {_}  from '../src/index.js';

describe('_.rerenderText - value, contextNode, instance, rerenderIndex, rerenderContextIndex', ()=>{
  const initialValue = 'initial text';
  let textNode, instance, returnValue;

  beforeEach(()=>{
    textNode = document.createTextNode(initialValue);
    instance = {spec:null};
  });

  describe('When `newValue` is a string', ()=>{
    beforeEach(()=>{
      returnValue = _.rerenderText(true, 'new text', initialValue, textNode, instance, 'r0', 'c0');
    });

    it('updates text node value', ()=>{
      assert.equal(textNode.nodeValue, 'new text');
    });

    it('returns `newValue`', ()=>{
      assert.equal(returnValue, 'new text');
    });
  });

  describe('When `newValue` is a number', ()=>{
    beforeEach(()=>{
      returnValue = _.rerenderText(true, 0, initialValue, textNode, instance, 'r0', 'c0');
    });

    it('updates text node value', ()=>{
      assert.equal(textNode.nodeValue, '0');
    });

    it('returns `newValue`', ()=>{
      assert.equal(returnValue, 0);
    });
  });

  [null, undefined].forEach(value=>{
    describe(`When newValue is ${value}`, ()=>{
      it('updates text node value to ""', ()=>{
        const result = _.rerenderText(true, value, initialValue, textNode, instance, 'r0', 'c0');
        assert.equal(textNode.nodeValue, '');
        assert.equal(result, value);
      });
    });
  });
});
