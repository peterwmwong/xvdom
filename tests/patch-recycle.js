import assert from 'assert';
import spyOn from './utils/spyOn.js';
import getHTMLString from './utils/getHTMLString.js';
import {patch, unmount} from '../src/patch.js';

describe('patch recycle', ()=>{
  let target;

  beforeEach(()=>{
    target = document.createElement('div');

    spyOn.uninstall();
    spyOn(Node.prototype, 'insertBefore');
    spyOn(Node.prototype, 'appendChild');
    spyOn(Node.prototype, 'removeChild');
    spyOn(document, 'createElement');
    spyOn(document, 'createTextNode');
    spyOn.resetSpyCounts();
  });

  afterEach(()=>{
    spyOn.uninstall();
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

    assert.equal(getHTMLString(target),
      '<div>'+
        '<div class="1"></div>'+
        '<div class="2"></div>'+
        '<div class="3"></div>'+
      '</div>'
    );

    assert.equal(document.createElement.count, 4);
    assert.equal(document.createTextNode.count, 0);
    assert.equal(Node.prototype.insertBefore.count, 0);
    assert.equal(Node.prototype.appendChild.count, 4);
    assert.equal(Node.prototype.removeChild.count, 0);

    unmount(target);
    spyOn.resetSpyCounts();

    assert.equal(getHTMLString(target), '');

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

    assert.equal(document.createElement.count, 0);
    assert.equal(document.createTextNode.count, 0);
    assert.equal(Node.prototype.insertBefore.count, 0);
    assert.equal(Node.prototype.appendChild.count, 1);
    assert.equal(Node.prototype.removeChild.count, 0);

  });
});
