import assert from 'assert';
import HTML from 'html-parse-stringify';
import patch from '../src/patch.js';

describe('patch dynamics', ()=>{
  let target;
  function getTargetHTML(){
    return HTML.stringify(HTML.parse(target.innerHTML));
  }

  beforeEach(()=>{
    target = document.createElement('div');
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
      assert.equal(getTargetHTML(), '<div><span class="foo bar baz"></span>hello world<b class="qux"></b></div>');
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
      assert.equal(getTargetHTML(),
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
      assert.equal(getTargetHTML(),
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
