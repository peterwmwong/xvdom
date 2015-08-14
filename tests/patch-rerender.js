import assert from 'assert';
import HTML from 'html-parse-stringify';
import {patch} from '../src/patch.js';

describe('patch rerender', ()=>{
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
    resetCounts();

    patch(target, {
      template: TMPL,
      values:['bar']
    });
    assert.equal(getTargetHTML(), '<div class="bar"></div>');
    assert.equal(createElementCount, 0);
    assert.equal(createTextNodeCount, 0);


    patch(target, {
      template: TMPL,
      values:['baz']
    });
    assert.equal(getTargetHTML(), '<div class="baz"></div>');
    assert.equal(createElementCount, 0);
    assert.equal(createTextNodeCount, 0);
  });

  it('Text Nodes', ()=>{
    const TMPL = {el: 'div', children:[0]};
    patch(target, {
      template: TMPL,
      values:[
        'Hello'
      ]
    });
    assert.equal(getTargetHTML(), '<div>Hello</div>');
    resetCounts();

    patch(target, {
      template: TMPL,
      values:[
        'World'
      ]
    });
    assert.equal(getTargetHTML(), '<div>World</div>');
    assert.equal(createElementCount, 0);
    assert.equal(createTextNodeCount, 0);
    resetCounts();
  });

  it('Text to Element', ()=>{
    const TMPL = {el: 'div', children:[0]};
    patch(target, {
      template: TMPL,
      values:[
        'Hello'
      ]
    });
    assert.equal(getTargetHTML(), '<div>Hello</div>');
    resetCounts();

    patch(target, {
      template: TMPL,
      values:[
        {
          template:{el:'span'}
        }
      ]
    });
    assert.equal(getTargetHTML(), '<div><span></span></div>');
    assert.equal(createElementCount, 1);
    assert.equal(createTextNodeCount, 0);
    resetCounts();

    patch(target, {
      template: TMPL,
      values:[
        {
          template:{el:'b'}
        }
      ]
    });
    assert.equal(getTargetHTML(), '<div><b></b></div>');
    assert.equal(createElementCount, 1);
    assert.equal(createTextNodeCount, 0);
    resetCounts();
  });

  it('Element to Text', ()=>{
    const TMPL = {el: 'div', children:[0]};
    patch(target, {
      template: TMPL,
      values:[
        {template:{el:'span'}}
      ]
    });
    assert.equal(getTargetHTML(), '<div><span></span></div>');
    resetCounts();


    patch(target, {
      template: TMPL,
      values:[
        'Meow'
      ]
    });
    assert.equal(getTargetHTML(), '<div>Meow</div>');
    assert.equal(createElementCount, 0);
    assert.equal(createTextNodeCount, 1);
    resetCounts();

    patch(target, {
      template: TMPL,
      values:[
        'Bark'
      ]
    });
    assert.equal(getTargetHTML(), '<div>Bark</div>');
    assert.equal(createElementCount, 0);
    assert.equal(createTextNodeCount, 0);
    resetCounts();

    patch(target, {
      template: TMPL,
      values:[
        'Chirp'
      ]
    });
    assert.equal(getTargetHTML(), '<div>Chirp</div>');
    assert.equal(createElementCount, 0);
    assert.equal(createTextNodeCount, 0);
    resetCounts();
  });

  it('Nested Nodes', ()=>{
    const PARENT_TMPL = {el: 'div', children:[0]};
    const CHILD_EL1   = {el: 'span'};
    const CHILD_EL2   = {el: 'b'};
    const CHILD_EL3   = {el: 'a'};
    patch(target, {
      template: PARENT_TMPL,
      values:[
        {template:CHILD_EL1}
      ]
    });
    assert.equal(getTargetHTML(), '<div><span></span></div>');
    resetCounts();

    patch(target, {
      template: PARENT_TMPL,
      values:[
        {template:CHILD_EL2}
      ]
    });
    assert.equal(getTargetHTML(), '<div><b></b></div>');
    assert.equal(createElementCount, 1);
    assert.equal(createTextNodeCount, 0);
    resetCounts();

    patch(target, {
      template: PARENT_TMPL,
      values:[
        {template:CHILD_EL3}
      ]
    });
    assert.equal(getTargetHTML(), '<div><a></a></div>');
    assert.equal(createElementCount, 1);
    assert.equal(createTextNodeCount, 0);
    resetCounts();

    patch(target, {
      template: PARENT_TMPL,
      values:[
        'Hello World'
      ]
    });
    assert.equal(getTargetHTML(), '<div>Hello World</div>');
    assert.equal(createElementCount, 0);
    assert.equal(createTextNodeCount, 1);
    resetCounts();

    patch(target, {
      template: PARENT_TMPL,
      values:[
        'Hello World2'
      ]
    });
    assert.equal(getTargetHTML(), '<div>Hello World2</div>');
    assert.equal(createElementCount, 0);
    assert.equal(createTextNodeCount, 0);
  });

  describe('Arrays', ()=>{
    it('Update array elements', ()=>{
      const PARENT_TMPL = {el: 'div', children:[0]};
      const CHILD_EL    = {el: 'div', props:{$className:0}};

      patch(target, {
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

      patch(target, {
        template: PARENT_TMPL,
        values:[
          [
            {key: 1, template:CHILD_EL, values:['4']},
            {key: 2, template:CHILD_EL, values:['5']},
            {key: 3, template:CHILD_EL, values:['6']}
          ]
        ]
      });

      assert.equal(getTargetHTML(),
        '<div>'+
          '<div class="4"></div>'+
          '<div class="5"></div>'+
          '<div class="6"></div>'+
        '</div>'
      );
    });

    it('Reordering', ()=>{
      const PARENT_TMPL = {el: 'div', children:[0]};
      const CHILD_EL1   = {el: 'span'};
      const CHILD_EL2   = {el: 'b'};
      const CHILD_EL3   = {el: 'a'};

      patch(target, {
        template: PARENT_TMPL,
        values:[
          [
            {key: 1, template:CHILD_EL1},
            {key: 2, template:CHILD_EL2},
            {key: 3, template:CHILD_EL3}
          ]
        ]
      });

      assert.equal(getTargetHTML(),
        '<div>'+
          '<span></span>'+
          '<b></b>'+
          '<a></a>'+
        '</div>'
      );
      assert.equal(createElementCount, 4);
      assert.equal(createTextNodeCount, 0);
      resetCounts();

      const childEl1 = target.firstChild.childNodes[0];
      const childEl2 = target.firstChild.childNodes[1];
      const childEl3 = target.firstChild.childNodes[2];

      spyOnInsertBefore(target.firstChild);
      spyOnRemoveChild(target.firstChild);

      patch(target, {
        template: PARENT_TMPL,
        values:[
          [
            {key: 3, template:CHILD_EL3},
            {key: 2, template:CHILD_EL2},
            {key: 1, template:CHILD_EL1}
          ]
        ]
      });
      assert.equal(getTargetHTML(),
        '<div>'+
          '<a></a>'+
          '<b></b>'+
          '<span></span>'+
        '</div>'
      );
      assert.equal(createElementCount, 0);
      assert.equal(createTextNodeCount, 0);
      assert.equal(insertBeforeCount, 2);
      assert.equal(removeChildCount, 0);
      assert.equal(childEl1, target.firstChild.childNodes[2]);
      assert.equal(childEl2, target.firstChild.childNodes[1]);
      assert.equal(childEl3, target.firstChild.childNodes[0]);
      resetCounts();

      patch(target, {
        template: PARENT_TMPL,
        values:[
          [
            {key: 1, template:CHILD_EL1},
            {key: 3, template:CHILD_EL3},
            {key: 2, template:CHILD_EL2}
          ]
        ]
      });
      assert.equal(getTargetHTML(),
        '<div>'+
          '<span></span>'+
          '<a></a>'+
          '<b></b>'+
        '</div>'
      );
      assert.equal(createElementCount, 0);
      assert.equal(createTextNodeCount, 0);
      assert.equal(insertBeforeCount, 1);
      assert.equal(removeChildCount, 0);
      assert.equal(childEl1, target.firstChild.childNodes[0]);
      assert.equal(childEl2, target.firstChild.childNodes[2]);
      assert.equal(childEl3, target.firstChild.childNodes[1]);
      resetCounts();
    });

    it('Reordering 2', ()=>{
      const PARENT_TMPL = {el: 'div', children:[0]};
      const CHILD_EL1   = {el: 'span', props:{className:'0'}};
      const CHILD_EL2   = {el: 'span', props:{className:'1'}};
      const CHILD_EL3   = {el: 'span', props:{className:'2'}};

      patch(target, {
        template: PARENT_TMPL,
        values:[
          [
            {key: 0, template:CHILD_EL1},
            {key: 1, template:CHILD_EL2},
            {key: 2, template:CHILD_EL3}
          ]
        ]
      });

      assert.equal(getTargetHTML(),
        '<div>'+
          '<span class="0"></span>'+
          '<span class="1"></span>'+
          '<span class="2"></span>'+
        '</div>'
      );
      assert.equal(createElementCount, 4);
      assert.equal(createTextNodeCount, 0);
      resetCounts();


      patch(target, {
        template: PARENT_TMPL,
        values:[
          [
            {key: 1, template:CHILD_EL2},
            {key: 0, template:CHILD_EL1},
            {key: 2, template:CHILD_EL3}
          ]
        ]
      });

      assert.equal(getTargetHTML(),
        '<div>'+
          '<span class="1"></span>'+
          '<span class="0"></span>'+
          '<span class="2"></span>'+
        '</div>'
      );
      assert.equal(createElementCount, 0);
      assert.equal(createTextNodeCount, 0);
      resetCounts();
    });

    it('Reordering 3', ()=>{
      const PARENT_TMPL = {el: 'div', children:[0]};
      const CHILD_EL = {el: 'span', props:{$className:0}};

      patch(target, {
        template: PARENT_TMPL,
        values:[
          [
            {key: 0, template:CHILD_EL, values:['0']},
            {key: 1, template:CHILD_EL, values:['1']},
            {key: 2, template:CHILD_EL, values:['2']},
            {key: 3, template:CHILD_EL, values:['3']}
          ]
        ]
      });

      assert.equal(getTargetHTML(),
        '<div>'+
          '<span class="0"></span>'+
          '<span class="1"></span>'+
          '<span class="2"></span>'+
          '<span class="3"></span>'+
        '</div>'
      );
      assert.equal(createElementCount, 5);
      assert.equal(createTextNodeCount, 0);
      resetCounts();

      spyOnInsertBefore(target.firstChild);
      spyOnRemoveChild(target.firstChild);

      patch(target, {
        template: PARENT_TMPL,
        values:[
          [
            {key: 2, template:CHILD_EL, values:['21']},
            {key: 3, template:CHILD_EL, values:['31']},
            {key: 0, template:CHILD_EL, values:['01']},
            {key: 1, template:CHILD_EL, values:['11']}
          ]
        ]
      });

      assert.equal(getTargetHTML(),
        '<div>'+
          '<span class="21"></span>'+
          '<span class="31"></span>'+
          '<span class="01"></span>'+
          '<span class="11"></span>'+
        '</div>'
      );
      assert.equal(createElementCount, 0);
      assert.equal(createTextNodeCount, 0);
      assert.equal(insertBeforeCount, 4);
      assert.equal(removeChildCount, 0);
      resetCounts();
    });

    it('Add to the beginning', ()=>{
      const PARENT_TMPL = {el: 'div', children:[0]};
      const CHILD_EL1   = {el: 'span'};
      const CHILD_EL2   = {el: 'b'};
      const CHILD_EL3   = {el: 'a'};

      patch(target, {
        template: PARENT_TMPL,
        values:[
          [
            {key: 1, template:CHILD_EL1}
          ]
        ]
      });
      assert.equal(getTargetHTML(),
        '<div>'+
          '<span></span>'+
        '</div>'
      );
      assert.equal(createElementCount, 2);
      assert.equal(createTextNodeCount, 0);
      resetCounts();

      const childEl1 = target.firstChild.childNodes[0];
      spyOnInsertBefore(target.firstChild);
      spyOnRemoveChild(target.firstChild);

      patch(target, {
        template: PARENT_TMPL,
        values:[
          [
            {key: 2, template:CHILD_EL2},
            {key: 1, template:CHILD_EL1}
          ]
        ]
      });
      assert.equal(getTargetHTML(),
        '<div>'+
          '<b></b>'+
          '<span></span>'+
        '</div>'
      );
      assert.equal(createElementCount , 1);
      assert.equal(createTextNodeCount, 0);
      assert.equal(insertBeforeCount, 1);
      assert.equal(removeChildCount, 0);
      assert.equal(childEl1, target.firstChild.childNodes[1]);
      resetCounts();

      const childEl2 = target.firstChild.childNodes[0];

      patch(target, {
        template: PARENT_TMPL,
        values:[
          [
            {key: 3, template:CHILD_EL3},
            {key: 2, template:CHILD_EL2},
            {key: 1, template:CHILD_EL1}
          ]
        ]
      });
      assert.equal(getTargetHTML(),
        '<div>'+
          '<a></a>'+
          '<b></b>'+
          '<span></span>'+
        '</div>'
      );
      assert.equal(createElementCount, 1);
      assert.equal(createTextNodeCount, 0);
      assert.equal(insertBeforeCount, 1);
      assert.equal(removeChildCount, 0);
      assert.equal(childEl1, target.firstChild.childNodes[2]);
      assert.equal(childEl2, target.firstChild.childNodes[1]);
      resetCounts();
    });

    it('Add to the end', ()=>{
      const PARENT_TMPL = {el: 'div', children:[0]};
      const CHILD_EL1   = {el: 'span'};
      const CHILD_EL2   = {el: 'b'};
      const CHILD_EL3   = {el: 'a'};

      patch(target, {
        template: PARENT_TMPL,
        values:[
          [
            {key: 1, template:CHILD_EL1}
          ]
        ]
      });
      assert.equal(getTargetHTML(), '<div><span></span></div>');
      assert.equal(createElementCount, 2);
      assert.equal(createTextNodeCount, 0);
      resetCounts();

      const childEl1 = target.firstChild.childNodes[0];
      spyOnInsertBefore(target.firstChild);
      spyOnRemoveChild(target.firstChild);

      patch(target, {
        template: PARENT_TMPL,
        values:[
          [
            {key: 1, template:CHILD_EL1},
            {key: 2, template:CHILD_EL2}
          ]
        ]
      });
      assert.equal(getTargetHTML(),
        '<div>'+
          '<span></span>'+
          '<b></b>'+
        '</div>'
      );
      assert.equal(createElementCount , 1);
      assert.equal(createTextNodeCount, 0);
      assert.equal(insertBeforeCount, 1);
      assert.equal(removeChildCount, 0);
      assert.equal(childEl1, target.firstChild.childNodes[0]);
      resetCounts();

      const childEl2 = target.firstChild.childNodes[1];

      patch(target, {
        template: PARENT_TMPL,
        values:[
          [
            {key: 1, template:CHILD_EL1},
            {key: 2, template:CHILD_EL2},
            {key: 3, template:CHILD_EL3}
          ]
        ]
      });
      assert.equal(getTargetHTML(),
        '<div>'+
          '<span></span>'+
          '<b></b>'+
          '<a></a>'+
        '</div>'
      );
      assert.equal(createElementCount, 1);
      assert.equal(createTextNodeCount, 0);
      assert.equal(insertBeforeCount, 1);
      assert.equal(removeChildCount, 0);
      assert.equal(childEl1, target.firstChild.childNodes[0]);
      assert.equal(childEl2, target.firstChild.childNodes[1]);
      resetCounts();
    });

    it('Mixed in with statics', ()=>{
      const PARENT_TMPL = {
        el:'div',
        children:[
          {el:'div', props:{className:'staticBegin'}},
          0,
          {el:'div', props:{className:'staticEnd'}}
        ]
      };
      const CHILD_EL1   = {el:'span'};
      const CHILD_EL2   = {el:'b'};
      const CHILD_EL3   = {el:'a'};

      patch(target, {
        template: PARENT_TMPL,
        values:[
          [
            {key: 1, template:CHILD_EL1},
            {key: 2, template:CHILD_EL2},
            {key: 3, template:CHILD_EL3}
          ]
        ]
      });
      assert.equal(getTargetHTML(),
        '<div>'+
          '<div class="staticBegin"></div>'+
          '<span></span>'+
          '<b></b>'+
          '<a></a>'+
          '<div class="staticEnd"></div>'+
        '</div>'
      );
      assert.equal(createElementCount, 6);
      assert.equal(createTextNodeCount, 0);
      resetCounts();

      const childEl1 = target.querySelector('span');
      const childEl2 = target.querySelector('b');
      const childEl3 = target.querySelector('a');
      spyOnInsertBefore(target.firstChild);
      spyOnRemoveChild(target.firstChild);

      patch(target, {
        template: PARENT_TMPL,
        values:[
          [
            {key: 3, template:CHILD_EL3},
            {key: 2, template:CHILD_EL2},
            {key: 1, template:CHILD_EL1}
          ]
        ]
      });
      assert.equal(getTargetHTML(),
        '<div>'+
          '<div class="staticBegin"></div>'+
          '<a></a>'+
          '<b></b>'+
          '<span></span>'+
          '<div class="staticEnd"></div>'+
        '</div>'
      );
      assert.equal(createElementCount, 0);
      assert.equal(createTextNodeCount, 0);
      assert.equal(insertBeforeCount, 2);
      assert.equal(removeChildCount, 0);
      assert.equal(childEl1, target.querySelector('span'));
      assert.equal(childEl2, target.querySelector('b'));
      assert.equal(childEl3, target.querySelector('a'));
      resetCounts();
    });


    it('Simple Array of Arrays', ()=>{
      const PARENT_TMPL = {el: 'div', children:[0]};
      const CHILD_EL1 = {
        el: 'div', props:{$className:0, $id:1},
        children:[2]
      };

      patch(target, {
        template: PARENT_TMPL,
        values:[
          [0].map(index=>(
            {key:index, template:CHILD_EL1, values:[
              ''+index,
              'id'+index,
              index+' Value'
            ]}
          ))
        ]
      });

      assert.equal(getTargetHTML(),
        '<div>'+
          '<div class="0" id="id0">'+
            '0 Value'+
          '</div>'+
          // '<div class="1" id="id1">'+
          //   '1 Value'+
          // '</div>'+
        '</div>'
      );
      assert.equal(createElementCount, 2);
      assert.equal(createTextNodeCount, 1);
      resetCounts();

      patch(target, {
        template: PARENT_TMPL,
        values:[
          [0].map(index=>(
            {key:index, template:CHILD_EL1, values:[
              ''+index+'2',
              'id'+index+'2',
              index+' Value2'
            ]}
          ))
        ]
      });

      assert.equal(getTargetHTML(),
        '<div>'+
          '<div class="02" id="id02">'+
            '0 Value2'+
          '</div>'+
          // '<div class="12" id="id12">'+
          //   '1 Value2'+
          // '</div>'+
        '</div>'
      );
      assert.equal(createElementCount, 0);
      assert.equal(createTextNodeCount, 0);
      resetCounts();
    });

    it('Array of Arrays', ()=>{
      const PARENT_TMPL = {el: 'div', children:[0]};
      const CHILD_EL1 = {
        el: 'div', props:{$className:0, $id:1},
        children:[2]
      };

      patch(target, {
        template: PARENT_TMPL,
        values:[
          [0, 1].map(index=>(
            {key:index, template:CHILD_EL1, values:[
              ''+index,
              'id'+index,
              index+' Value'
            ]}
          ))
        ]
      });

      assert.equal(getTargetHTML(),
        '<div>'+
          '<div class="0" id="id0">'+
            '0 Value'+
          '</div>'+
          '<div class="1" id="id1">'+
            '1 Value'+
          '</div>'+
        '</div>'
      );
      assert.equal(createElementCount, 3);
      assert.equal(createTextNodeCount, 2);
      resetCounts();

      patch(target, {
        template: PARENT_TMPL,
        values:[
          [0, 1].map(index=>(
            {key:index, template:CHILD_EL1, values:[
              ''+index+'2',
              'id'+index+'2',
              index+' Value2'
            ]}
          ))
        ]
      });

      assert.equal(getTargetHTML(),
        '<div>'+
          '<div class="02" id="id02">'+
            '0 Value2'+
          '</div>'+
          '<div class="12" id="id12">'+
            '1 Value2'+
          '</div>'+
        '</div>'
      );
      assert.equal(createElementCount, 0);
      assert.equal(createTextNodeCount, 0);
      resetCounts();
    });

    it('Array of Arrays of Arrays', ()=>{
      const PARENT_TMPL = {el: 'div', children:[0]};
      const CHILD_TMPL = {
        el: 'div', props:{$className:0},
        children:[1]
      };

      const GRAND_CHILD_TMPL = {
        el: 'span', props:{$className:0},
        children:[1]
      };

      function render(num){
        return {
          template: PARENT_TMPL,
          values:[
            [
              {
                key:0,
                template:CHILD_TMPL,
                values:[
                  ''+num,
                  [
                    {
                      key:0,
                      template:GRAND_CHILD_TMPL,
                      values:[
                        num+'-1',
                        num+'-1 Text'
                      ]
                    }
                  ]
                ]
              }
            ]
          ]
        };
      }

      patch(target, render(1));

      assert.equal(getTargetHTML(),
        '<div>'+
          '<div class="1">'+
            '<span class="1-1">'+
              '1-1 Text'+
            '</span>'+
          '</div>'+
        '</div>'
      );
      assert.equal(createElementCount, 3);
      assert.equal(createTextNodeCount, 1);
      resetCounts();

      patch(target, render(2));

      assert.equal(getTargetHTML(),
        '<div>'+
          '<div class="2">'+
            '<span class="2-1">'+
              '2-1 Text'+
            '</span>'+
          '</div>'+
        '</div>'
      );
      assert.equal(createElementCount, 0);
      assert.equal(createTextNodeCount, 0);
      resetCounts();

      patch(target, render(3));

      assert.equal(getTargetHTML(),
        '<div>'+
          '<div class="3">'+
            '<span class="3-1">'+
              '3-1 Text'+
            '</span>'+
          '</div>'+
        '</div>'
      );
      assert.equal(createElementCount, 0);
      assert.equal(createTextNodeCount, 0);
      resetCounts();

      patch(target, render(4));

      assert.equal(getTargetHTML(),
        '<div>'+
          '<div class="4">'+
            '<span class="4-1">'+
              '4-1 Text'+
            '</span>'+
          '</div>'+
        '</div>'
      );
      assert.equal(createElementCount, 0);
      assert.equal(createTextNodeCount, 0);
      resetCounts();
    });
  });
});
