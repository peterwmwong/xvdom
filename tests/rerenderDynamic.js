import assert from 'assert';
import {_}  from '../src/index.js';

describe('rerenderDynamic - isOnlyChild, value, contextNode', ()=>{
  const initialValue = 'initial text';
  let textNode, parentNode, returnValue;

  beforeEach(()=>{
    parentNode = document.createElement('div');
    textNode = document.createTextNode(initialValue);
    parentNode.appendChild(textNode);
  });

  describe('When node has been removed', ()=>{
    beforeEach(()=>{
      parentNode.removeChild(textNode);
    });

    it('does nothing and does not throw error', ()=>{
      try{
        _.rerenderDynamic(true, 'new text', textNode);
        assert.equal(parentNode.children.length, 0);
      }
      catch(e){
        assert.ok(false);
      }
    });
  });

  describe('When `newValue` is a string', ()=>{
    beforeEach(()=>{
      returnValue = _.rerenderDynamic(true, 'new text', textNode);
    });

    it('updates text node value', ()=>{
      assert.equal(parentNode.firstChild.nodeValue, 'new text');
    });

    it('returns text node', ()=>{
      assert.equal(returnValue, parentNode.firstChild);
    });
  });

  describe('When `newValue` is a number', ()=>{
    beforeEach(()=>{
      returnValue = _.rerenderDynamic(true, 0, textNode);
    });

    it('updates text node value', ()=>{
      assert.equal(parentNode.firstChild.nodeValue, '0');
    });

    it('returns text node', ()=>{
      assert.equal(returnValue, parentNode.firstChild);
    });
  });

  [null, undefined].forEach(value=>{
    describe(`When newValue is ${value}`, ()=>{
      it('updates text node value to ""', ()=>{
        const result = _.rerenderDynamic(true, value, textNode);
        assert.equal(parentNode.firstChild.nodeValue, '');
        assert.equal(result, parentNode.firstChild);
      });
    });
  });
});
