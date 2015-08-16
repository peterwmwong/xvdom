import assert        from 'assert';
import spyOn         from './utils/spyOn.js';
import getHTMLString from './utils/getHTMLString.js';
import {patch}       from '../src/patch.js';

describe('patch dynamics', ()=>{
  let target;

  beforeEach(()=>{
    target = document.createElement('div');
    spyOn.uninstall();
    spyOn(Node.prototype, 'insertBefore');
    spyOn(Node.prototype, 'removeChild');
    spyOn(document, 'createElement');
    spyOn(document, 'createTextNode');
    spyOn.resetSpyCounts();
  });

  afterEach(()=>{
    spyOn.uninstall();
  });

  it('Text nodes', ()=>{
    patch(target, {
      template: {
        el: 'div',
        children: [0]
      },
      values: ['yolo']
    });
    assert.equal(getHTMLString(target), '<div>yolo</div>');
    assert.equal(document.createElement.count, 1);
    assert.equal(document.createTextNode.count, 1);
    assert.equal(Node.prototype.insertBefore.count, 0);
    assert.equal(Node.prototype.removeChild.count, 0);
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
    assert.equal(getHTMLString(target), '<div class="baz qux"></div>');
    assert.equal(document.createElement.count, 1);
    assert.equal(document.createTextNode.count, 0);
    assert.equal(Node.prototype.insertBefore.count, 0);
    assert.equal(Node.prototype.removeChild.count, 0);
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
    assert.equal(getHTMLString(target),
      '<div>'+
        '<span class="one"></span>'+
        'bubbles'+
        '<span class="two"></span>'+
        '<span class="three"></span>'+
      '</div>'
    );
    assert.equal(document.createElement.count, 4);
    assert.equal(document.createTextNode.count, 1);
    assert.equal(Node.prototype.insertBefore.count, 0);
    assert.equal(Node.prototype.removeChild.count, 0);
  });

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
      assert.equal(getHTMLString(target),
        '<div>'+
          '<span class="foo bar baz">hello world</span>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 2);
      assert.equal(document.createTextNode.count, 1);
      assert.equal(Node.prototype.insertBefore.count, 0);
      assert.equal(Node.prototype.removeChild.count, 0);
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
      assert.equal(getHTMLString(target),
        '<div>'+
          '<span></span>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 2);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 0);
      assert.equal(Node.prototype.removeChild.count, 0);
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
      assert.equal(getHTMLString(target),
        '<div>'+
          'yolo'+
        '</div>'
      );
      assert.equal(document.createElement.count, 1);
      assert.equal(document.createTextNode.count, 1);
      assert.equal(Node.prototype.insertBefore.count, 0);
      assert.equal(Node.prototype.removeChild.count, 0);
    });

    it('Array of Elements or Strings', ()=>{
      patch(target, {
        template: {
          el: 'div',
          children: [0]
        },
        values:[
          [
            {
              template:{
                el:'span', props:{className:'foo bar baz'}
              }
            },
            'hello world',
            {
              template:{
                el:'b', props:{className:'qux'}
              }
            }
          ]
        ]
      });
      assert.equal(getHTMLString(target),
        '<div>'+
          '<span class="foo bar baz"></span>'+
          'hello world'+
          '<b class="qux"></b>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 3);
      assert.equal(document.createTextNode.count, 1);
      assert.equal(Node.prototype.insertBefore.count, 0);
      assert.equal(Node.prototype.removeChild.count, 0);
    });

    it('Array of Elements or Strings mixed with statics', ()=>{
      patch(target, {
        template: {
          el: 'div',
          children: [
            {el:'div', props:{className:'static one'}},
            'static two',
            {el:'div', props:{className:'static three'}},
            0,
            {el:'div', props:{className:'static seven'}}
          ]
        },
        values:[
          [
            {template:{el:'div', props:{className:'four'}}},
            'five',
            {template:{el:'div', props:{className:'six'}}}
          ]
        ]
      });
      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="static one"></div>'+
          'static two'+
          '<div class="static three"></div>'+
          '<div class="four"></div>'+
          'five'+
          '<div class="six"></div>'+
          '<div class="static seven"></div>'+
        '</div>'
      );

      assert.equal(document.createElement.count, 6);
      assert.equal(document.createTextNode.count, 2);
      assert.equal(Node.prototype.insertBefore.count, 0);
      assert.equal(Node.prototype.removeChild.count, 0);
    });

    it('Array of Elements or Strings mixed with statics (surrounding statics)', ()=>{
      patch(target, {
        template: {
          el: 'div',
          children: [
            0,
            {el:'div', props:{className:'static four'}},
            1
          ]
        },
        values:[
          [
            {template:{el:'div', props:{className:'one'}}},
            'two',
            {template:{el:'div', props:{className:'three'}}}
          ],
          [
            {template:{el:'div', props:{className:'five'}}},
            'six',
            {template:{el:'div', props:{className:'seven'}}}
          ]
        ]
      });
      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="one"></div>'+
          'two'+
          '<div class="three"></div>'+
          '<div class="static four"></div>'+
          '<div class="five"></div>'+
          'six'+
          '<div class="seven"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 6);
      assert.equal(document.createTextNode.count, 2);
      assert.equal(Node.prototype.insertBefore.count, 0);
      assert.equal(Node.prototype.removeChild.count, 0);
    });

    it('Array of Arrays', ()=>{
      const PARENT_TMPL = {el: 'div', children:[0]};
      const CHILD_EL1 = {
        el: 'div', props:{className:'1', $id:0},
        children:[1]
      };
      const CHILD_EL1_1 = {
        el: 'div', props:{className:'1-1', $id:0},
        children:[1]
      };

      patch(target, {
        template: PARENT_TMPL,
        values:[
          [
            {key: 1, template:CHILD_EL1, values:[
              'id1',
              {template:CHILD_EL1_1, values:[
                'id11',
                '1-1 Value'
              ]}
            ]}
          ]
        ]
      });
      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="1" id="id1">'+
            '<div class="1-1" id="id11">'+
              '1-1 Value'+
            '</div>'+
          '</div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 3);
      assert.equal(document.createTextNode.count, 1);
      assert.equal(Node.prototype.insertBefore.count, 0);
      assert.equal(Node.prototype.removeChild.count, 0);
    });
  });
});
