import assert from 'assert';
import HTML from 'html-parse-stringify';
import {patch, unmount} from '../src/patch.js';

describe('patch recycle', ()=>{
  let target;
  let createElementCount  = 0;
  let createTextNodeCount = 0;
  let insertBeforeCount   = 0;
  let removeChildCount    = 0;
  let createElement       = document.createElement;
  let createTextNode      = document.createTextNode;

  function spyOnInsertBefore(target){
    if(target.insertBefore === HTMLElement.prototype.insertBefore){
      const insertBefore = target.insertBefore;
      target.insertBefore = (...args)=>{
        ++insertBeforeCount;
        return insertBefore.apply(target, args);
      };
    }
  }

  function spyOnRemoveChild(target){
    if(target.removeChild === HTMLElement.prototype.removeChild){
      const removeChild = target.removeChild;
      target.removeChild = (...args)=>{
        ++removeChildCount;
        return removeChild.apply(target, args);
      };
    }
  }

  function getTargetHTML(){
    return HTML.stringify(HTML.parse(target.innerHTML));
  }

  function resetCounts(){
    insertBeforeCount = removeChildCount = createTextNodeCount = createElementCount = 0;
  }

  beforeEach(()=>{
    target = document.createElement('div');
    resetCounts();

    document.createElement = (...args)=>{
      ++createElementCount;
      return createElement.apply(document, args);
    };

    document.createTextNode = (...args)=>{
      ++createTextNodeCount;
      return createTextNode.apply(document, args);
    };
  });

  afterEach(()=>{
    document.createElement  = createElement;
    document.createTextNode = createTextNode;
  });

  it('Update array elements', ()=>{
    const PARENT_TMPL = {el: 'div', children:[0]};
    const CHILD_EL    = {el: 'div', props:{$className:0}};

    patch(target, {
      recycleKey: 123,
      template: PARENT_TMPL,
      values:[
        [
          {key: 1, template:CHILD_EL, values:['1']},
          {key: 2, template:CHILD_EL, values:['2']},
          {key: 3, template:CHILD_EL, values:['3']}
        ]
      ]
    });

    assert.equal(getTargetHTML(),
      '<div>'+
        '<div class="1"></div>'+
        '<div class="2"></div>'+
        '<div class="3"></div>'+
      '</div>'
    );

    assert.equal(createElementCount, 4);
    assert.equal(createTextNodeCount, 0);

    unmount(target);
    resetCounts();

    assert.equal(getTargetHTML(), '');

    patch(target, {
      recycleKey: 123,
      template: PARENT_TMPL,
      values:[
        [
          {key: 1, template:CHILD_EL, values:['4']},
          {key: 2, template:CHILD_EL, values:['5']},
          {key: 3, template:CHILD_EL, values:['6']}
        ]
      ]
    });

    assert.equal(createElementCount, 0);
    assert.equal(createTextNodeCount, 0);

  });
});
