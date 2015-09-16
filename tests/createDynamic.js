import assert             from 'assert';
import getHTMLString      from './utils/getHTMLString.js';
import {
  createDynamic,
  rerenderText,
  rerenderInstance,
  rerenderArray
} from '../src/index.js';

describe('createDynamic - valuesAndContext, valueIndex, rerenderIndex, rerenderContextIndex', ()=>{
  let parentNode, resultNode;

  beforeEach(()=>{
    parentNode = document.createElement('div');
  });

  describe('String - text node', ()=>{
    let valuesAndContext;

    beforeEach(()=>{
      valuesAndContext = [
        'test string',
        null/* rerender function */,
        null/* rerender argument */
      ];
      resultNode = createDynamic(valuesAndContext, 0, 1, 2);
      parentNode.appendChild(resultNode);
    });

    it('renders text node with string', ()=>{
      assert.equal(getHTMLString(parentNode),
        '<div>test string</div>'
      );
    });

    it('sets rerender function and context', ()=>{
      assert.equal(valuesAndContext[1], rerenderText);
      assert.equal(valuesAndContext[2], parentNode.firstChild);
    });
  });

  describe('Object - render instance', ()=>{
    const RENDER_INSTANCE = {
      spec: {
        render:()=>document.createElement('span')
      }
    };
    let valuesAndContext;

    beforeEach(()=>{
      valuesAndContext = [
        RENDER_INSTANCE,
        null/* rerender function */,
        null/* rerender argument */
      ];
      resultNode = createDynamic(valuesAndContext, 0, 1, 2);
      parentNode.appendChild(resultNode);
    });

    it('renders render instance', ()=>{
      assert.equal(getHTMLString(parentNode),
        '<div><span></span></div>'
      );
    });

    it('sets rerender function and context', ()=>{
      assert.equal(valuesAndContext[1], rerenderInstance);
      assert.equal(valuesAndContext[2], parentNode.firstChild);
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
    let valuesAndContext;

    beforeEach(()=>{
      valuesAndContext = [
        [
          {key: 1, spec: ITEM_SPEC1},
          {key: 2, spec: ITEM_SPEC2}
        ],
        null/* rerender function */,
        null/* rerender argument */
      ];
      resultNode = createDynamic(valuesAndContext, 0, 1, 2);
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
      assert.equal(valuesAndContext[1], rerenderArray);
      assert.equal(valuesAndContext[2], parentNode.lastChild);
    });
  });
});
