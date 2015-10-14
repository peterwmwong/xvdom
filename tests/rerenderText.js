import assert         from 'assert';
import {rerenderText} from '../src/index.js';

describe('rerenderText - value, contextNode, instance, rerenderIndex, rerenderContextIndex', ()=>{
  const initialValue = 'initial text';
  let textNode, instance;

  beforeEach(()=>{
    textNode = document.createTextNode(initialValue);
    instance = {spec:null};
  });

  describe('When `newValue` is a string', ()=>{
    beforeEach(()=>{
      rerenderText('new text', initialValue, textNode, instance, 'r0', 'c0');
    });

    it('updates text node value', ()=>{
      assert.equal(textNode.nodeValue, 'new text');
    });
  });

  describe('When `newValue` is a number', ()=>{
    beforeEach(()=>{
      rerenderText(0, initialValue, textNode, instance, 'r0', 'c0');
    });

    it('updates text node value', ()=>{
      assert.equal(textNode.nodeValue, '0');
    });
  });

  describe('When `newValue` is null or undefined', ()=>{
    it('updates text node value to ""', ()=>{
      rerenderText(null, initialValue, textNode, instance, 'r0', 'c0');
      assert.equal(textNode.nodeValue, '');

      rerenderText(undefined, initialValue, textNode, instance, 'r0', 'c0');
      assert.equal(textNode.nodeValue, '');
    });
  });
});
