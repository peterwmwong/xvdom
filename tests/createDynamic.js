import assert             from 'assert';
import getHTMLString      from './utils/getHTMLString.js';
import {
  createDynamic,
  rerenderText,
  rerenderInstance,
  rerenderArray
} from '../src/index.js';

describe('createDynamic - value, instance, rerenderIndex, rerenderContextIndex', ()=>{
  let parentNode, resultNode;

  beforeEach(()=>{
    parentNode = document.createElement('div');
  });

  describe('String - text node', ()=>{
    let instance;

    beforeEach(()=>{
      instance = {spec:null, v0:'test string'};
      resultNode = createDynamic(instance.v0, instance, 'r0', 'c0');
      parentNode.appendChild(resultNode);
    });

    it('renders text node with string', ()=>{
      assert.equal(getHTMLString(parentNode),
        '<div>test string</div>'
      );
    });

    it('sets rerender function and context', ()=>{
      assert.equal(instance.r0, rerenderText);
      assert.equal(instance.c0, parentNode.firstChild);
    });
  });

  describe('Object - render instance', ()=>{
    const RENDER_INSTANCE = {
      spec: {
        render:()=>document.createElement('span')
      }
    };
    let parentInstance;

    beforeEach(()=>{
      parentInstance = {spec:null, v0:RENDER_INSTANCE};
      resultNode = createDynamic(parentInstance.v0, parentInstance, 'r0', 'c0');
      parentNode.appendChild(resultNode);
    });

    it('renders render instance', ()=>{
      assert.equal(getHTMLString(parentNode),
        '<div><span></span></div>'
      );
    });

    it('sets rerender function and context', ()=>{
      assert.equal(parentInstance.r0, rerenderInstance);
      assert.equal(parentInstance.c0, parentNode.firstChild);
    });
  });

  describe('Array', ()=>{
    const ITEM_SPEC1 = {
      render:()=>{
        const node = document.createElement('span');
        node.appendChild(document.createTextNode('one'));
        return node;
      }
    };
    const ITEM_SPEC2 = {
      render:()=>{
        const node = document.createElement('span');
        node.appendChild(document.createTextNode('two'));
        return node;
      }
    };
    let instance;

    beforeEach(()=>{
      instance = {
        spec: null,
        v0: [
          {key: 1, spec: ITEM_SPEC1},
          {key: 2, spec: ITEM_SPEC2}
        ]
      };
      resultNode = createDynamic(instance.v0, instance, 'r0', 'c0');
      parentNode.appendChild(resultNode);
    });

    it('renders array of items', ()=>{
      assert.equal(getHTMLString(parentNode),
        '<div>'+
          '<span>one</span>'+
          '<span>two</span>'+
        '</div>'
      );
    });

    it('sets rerender function and context', ()=>{
      assert.equal(instance.r0, rerenderArray);
      assert.equal(instance.c0, parentNode.lastChild);
    });
  });
});
