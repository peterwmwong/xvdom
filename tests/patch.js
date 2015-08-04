import assert from 'assert';
import HTML from 'html-parse-stringify';
import patch from '../src/patch.js';

describe('patch', ()=>{
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

  describe('Dynamic values', ()=>{
    describe('Children', ()=>{
      it('Deeply nested', ()=>{
        patch(target, {
          template: {
            el: 'div',
            children: [0]
          },
          values:[
            {
              template: {
                el: 'span',
                props: {$className:0},
                children:[1]
              },
              values: [
                'foo bar baz',
                'hello world'
              ]
            }
          ]
        });
        assert.equal(getTargetHTML(), '<div><span class="foo bar baz">hello world</span></div>');
      });

      it('Element', ()=>{
        patch(target, {
          template: {
            el: 'div',
            children: [0]
          },
          values:[
            {template:{el:'span'}}
          ]
        });
        assert.equal(getTargetHTML(), '<div><span></span></div>');
      });

      it('String', ()=>{
        patch(target, {
          template: {
            el: 'div',
            children: [0]
          },
          values:[
            'yolo'
          ]
        });
        assert.equal(getTargetHTML(), '<div>yolo</div>');
      });

      it('Array of Elements or Strings', ()=>{
        patch(target, {
          template: {
            el: 'div',
            children: [0]
          },
          values:[
            {
              template: {
                el: 'span',
                props: {$className:0},
                children:[1]
              },
              values: [
                'foo bar baz',
                'hello world'
              ]
            }
          ]
        });
        assert.equal(getTargetHTML(), '<div><span class="foo bar baz">hello world</span></div>');
      });
    });

    it('Text nodes', ()=>{
      patch(target, {
        template: {
          el: 'div',
          children: [0]
        },
        values: ['yolo']
      });
      assert.equal(getTargetHTML(), '<div>yolo</div>');
    });

    it('Properties', ()=>{
      patch(target, {
        template: {
          el: 'div',
          props: {$className:0}
        },
        values:[
          'baz qux'
        ]
      });
      assert.equal(getTargetHTML(), '<div class="baz qux"></div>');
    });

    it('Mixed with statics', ()=>{
      patch(target, {
        template: {
          el: 'div',
          children: [
            {
              el: 'span',
              props: {className:'one'}
            },
            0,
            {
              el: 'span',
              props: {className:'two'}
            },
            1
          ]
        },
        values:[
          'bubbles',
          {
            template: {
              el: 'span',
              props: {className:'three'}
            }
          }
        ]
      });
      assert.equal(getTargetHTML(),
        '<div><span class="one"></span>bubbles<span class="two"></span><span class="three"></span></div>'
      );
    });
  });

  describe('Rerender', ()=>{
    let createElementCount = 0;
    let createTextNodeCount = 0;
    let createElement = document.createElement;
    let createTextNode = document.createTextNode;

    beforeEach(()=>{
      createElementCount = 0;
      createTextNodeCount = 0;

      document.createElement = (...args)=>{
        ++createElementCount;
        return createElement.apply(document, args);
      }

      document.createTextNode = (...args)=>{
        ++createTextNodeCount;
        return createTextNode.apply(document, args);
      }
    });

    afterEach(()=>{
      document.createElement  = createElement;
      document.createTextNode = createTextNode;
    });

    it('Simple Node', ()=>{
      const TMPL = {el: 'div'};
      patch(target, {
        template: TMPL
      });
      patch(target, {
        template: TMPL
      });
      assert.equal(getTargetHTML(), '<div></div>');
      assert.equal(createElementCount, 1);
    });

    it('Properties', ()=>{
      const TMPL = {el: 'div', props:{$className:0}};
      patch(target, {
        template: TMPL,
        values:['foo']
      });
      patch(target, {
        template: TMPL,
        values:['bar']
      });
      assert.equal(getTargetHTML(), '<div class="bar"></div>');
      patch(target, {
        template: TMPL,
        values:['baz']
      });
      assert.equal(getTargetHTML(), '<div class="baz"></div>');
      assert.equal(createElementCount, 1);
    });

    it('Nested Nodes', ()=>{
      const PARENT_TMPL = {el: 'div', children:[0]};
      const CHILD_EL1 = {el: 'span'};
      const CHILD_EL2 = {el: 'b'};
      const CHILD_EL3 = {el: 'a'};
      // const CHILD_ARRAY = {el: 'a'};
      patch(target, {
        template: PARENT_TMPL,
        values:[
          {template:CHILD_EL1}
        ]
      });
      assert.equal(getTargetHTML(), '<div><span></span></div>');
      assert.equal(createElementCount, 2);
      assert.equal(createTextNodeCount, 0);

      patch(target, {
        template: PARENT_TMPL,
        values:[
          {template:CHILD_EL2}
        ]
      });
      assert.equal(getTargetHTML(), '<div><b></b></div>');
      assert.equal(createElementCount, 3);
      assert.equal(createTextNodeCount, 0);

      patch(target, {
        template: PARENT_TMPL,
        values:[
          {template:CHILD_EL3}
        ]
      });
      assert.equal(getTargetHTML(), '<div><a></a></div>');
      assert.equal(createElementCount, 4);
      assert.equal(createTextNodeCount, 0);

      patch(target, {
        template: PARENT_TMPL,
        values:[
          'Hello World'
        ]
      });
      assert.equal(getTargetHTML(), '<div>Hello World</div>');
      assert.equal(createElementCount, 4);
      assert.equal(createTextNodeCount, 1);

      patch(target, {
        template: PARENT_TMPL,
        values:[
          'Hello World2'
        ]
      });
      assert.equal(getTargetHTML(), '<div>Hello World2</div>');
      assert.equal(createElementCount, 4);
      assert.equal(createTextNodeCount, 1);
    });
  });
});
