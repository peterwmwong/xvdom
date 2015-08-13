import assert from 'assert';
import HTML from 'html-parse-stringify';
import {patch} from '../src/patch.js';

describe('patch statics', ()=>{
  let target;
  function getTargetHTML(){
    return HTML.stringify(HTML.parse(target.innerHTML));
  }

  beforeEach(()=>{
    target = document.createElement('div');
  });

  it('One node', ()=>{
    patch(target, {
      template: {el: 'div'}
    });
    assert.equal(getTargetHTML(), '<div></div>');
  });

  it('Nested nodes', ()=>{
    patch(target, {
      template: {
        el: 'div',
        children: [
          {el: 'span'}
        ]
      }
    });
    assert.equal(getTargetHTML(), '<div><span></span></div>');
  });

  it('Text nodes', ()=>{
    patch(target, {
      template: {
        el: 'div',
        children: [
          'hello world'
        ]
      }
    });
    assert.equal(getTargetHTML(), '<div>hello world</div>');
  });

  it('Properties', ()=>{
    patch(target, {
      template: {
        el: 'div',
        props: {className:'foo bar'}
      }
    });
    assert.equal(getTargetHTML(), '<div class="foo bar"></div>');
  });
});
