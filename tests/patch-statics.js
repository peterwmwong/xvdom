import assert from 'assert';
import getHTMLString from './utils/getHTMLString.js';
import {patch} from '../src/patch.js';

describe('patch statics', ()=>{
  let target;

  beforeEach(()=>{
    target = document.createElement('div');
  });

  it('One node', ()=>{
    patch(target, {
      template: {el: 'div'}
    });
    assert.equal(getHTMLString(target), '<div></div>');
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
    assert.equal(getHTMLString(target), '<div><span></span></div>');
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
    assert.equal(getHTMLString(target), '<div>hello world</div>');
  });

  it('Properties', ()=>{
    patch(target, {
      template: {
        el: 'div',
        props: {className:'foo bar'}
      }
    });
    assert.equal(getHTMLString(target), '<div class="foo bar"></div>');
  });
});
