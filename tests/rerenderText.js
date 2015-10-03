import assert         from 'assert';
import {rerenderText} from '../src/index.js';

describe('rerenderText - value, contextNode, instance, rerenderIndex, rerenderContextIndex', ()=>{
  let textNode, instance;

  beforeEach(()=>{
    const initialValue = 'initial text';
    textNode = document.createTextNode(initialValue);
    instance = {spec:null}
  });

  describe('When `newValue` is a string', ()=>{
    beforeEach(()=>{
      rerenderText('new text', textNode, instance, 'r0', 'c0');
    });

    it('updates text node value', ()=>{
      assert.equal(textNode.nodeValue, 'new text');
    });
  });

  describe('When `newValue` is null or undefined', ()=>{
    it('updates text node value to ""', ()=>{
      rerenderText(null, textNode, instance, 'r0', 'c0');
      assert.equal(textNode.nodeValue, '');

      rerenderText(undefined, textNode, instance, 'r0', 'c0');
      assert.equal(textNode.nodeValue, '');
    });
  });
});
