import assert from 'assert';
import xvdom, {_}  from '../src/index.js';

describe('rerenderDynamic - value, contextNode, instance, rerenderIndex, rerenderContextIndex', ()=>{
  const initialValue = 'initial text';
  let textNode, instance, parentNode, returnValue;

  beforeEach(()=>{
    parentNode = document.createElement('div');
    textNode = document.createTextNode(initialValue);
    parentNode.appendChild(textNode);
    instance = {spec:null};
  });

  describe('When node has been removed', ()=>{
    beforeEach(()=>{
      parentNode.removeChild(textNode);
    });

    it('does nothing and does not throw error', ()=>{
      try{
        _.rerenderDynamic('new text', initialValue, textNode, instance, 'r0', 'c0');
        assert.equal(parentNode.children.length, 0);
      }
      catch(e){
        assert.ok(false);
      }
    });
  });

  describe('When `newValue` is a string', ()=>{
    beforeEach(()=>{
      returnValue = _.rerenderDynamic('new text', initialValue, textNode, instance, 'r0', 'c0');
    });

    it('updates text node value', ()=>{
      assert.equal(parentNode.firstChild.nodeValue, 'new text');
    });

    it('returns `newValue`', ()=>{
      assert.equal(returnValue, 'new text');
    });
  });

  describe('When `newValue` is a number', ()=>{
    beforeEach(()=>{
      returnValue = _.rerenderDynamic(0, initialValue, textNode, instance, 'r0', 'c0');
    });

    it('updates text node value', ()=>{
      assert.equal(parentNode.firstChild.nodeValue, '0');
    });

    it('returns `newValue`', ()=>{
      assert.equal(returnValue, 0);
    });
  });

  [null, undefined].forEach(value=>{
    describe(`When newValue is ${value}`, ()=>{
      it('updates text node value to ""', ()=>{
        const result = _.rerenderDynamic(value, initialValue, textNode, instance, 'r0', 'c0');
        assert.equal(parentNode.firstChild.nodeValue, '');
        assert.equal(result, value);
      });
    });
  });
});
