import assert         from 'assert';
import {rerenderDynamic} from '../src/index.js';

describe('rerenderDynamic - value, contextNode, instance, rerenderIndex, rerenderContextIndex', ()=>{
  const initialValue = 'initial text';
  let textNode, instance, parentNode;

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
        rerenderDynamic('new text', initialValue, textNode, instance, 'r0', 'c0');
        assert.equal(parentNode.children.length, 0);
      }
      catch(e){
        assert.ok(false);
      }
    });
  });

  describe('When `newValue` is a string', ()=>{
    beforeEach(()=>{
      rerenderDynamic('new text', initialValue, textNode, instance, 'r0', 'c0');
    });

    it('updates text node value', ()=>{
      assert.equal(parentNode.firstChild.nodeValue, 'new text');
    });
  });

  describe('When `newValue` is a number', ()=>{
    beforeEach(()=>{
      rerenderDynamic(0, initialValue, textNode, instance, 'r0', 'c0');
    });

    it('updates text node value', ()=>{
      assert.equal(parentNode.firstChild.nodeValue, '0');
    });
  });

  [null, undefined].forEach(value=>{
    describe(`When newValue is ${value}`, ()=>{
      it('updates text node value to ""', ()=>{
        rerenderDynamic(value, initialValue, textNode, instance, 'r0', 'c0');
        assert.equal(parentNode.firstChild.nodeValue, '');
      });
    });
  });
});
