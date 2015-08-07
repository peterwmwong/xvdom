import assert from 'assert';
import HTML from 'html-parse-stringify';
import patch from '../src/patch.js';

describe('patch rerender', ()=>{
  let target;
  let createElementCount  = 0;
  let createTextNodeCount = 0;
  let insertBeforeCount   = 0;
  let removeChildCount    = 0;
  let createElement       = document.createElement;
  let createTextNode      = document.createTextNode;

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

      assert.equal(getTargetHTML(), '<div><span></span><b></b><a></a></div>');
      assert.equal(createElementCount, 4);
      assert.equal(createTextNodeCount, 0);
      resetCounts();

      const childEl1 = target.firstChild.childNodes[0];
      const childEl2 = target.firstChild.childNodes[1];
      const childEl3 = target.firstChild.childNodes[2];

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
      assert.equal(getTargetHTML(), '<div><a></a><b></b><span></span></div>');
      assert.equal(createElementCount, 0);
      assert.equal(createTextNodeCount, 0);
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
      assert.equal(getTargetHTML(), '<div><span></span><a></a><b></b></div>');
      assert.equal(createElementCount, 0);
      assert.equal(createTextNodeCount, 0);
      assert.equal(childEl1, target.firstChild.childNodes[0]);
      assert.equal(childEl2, target.firstChild.childNodes[2]);
      assert.equal(childEl3, target.firstChild.childNodes[1]);
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
      assert.equal(getTargetHTML(), '<div><span></span></div>');
      assert.equal(createElementCount, 2);
      assert.equal(createTextNodeCount, 0);
      resetCounts();

      const childEl1 = target.firstChild.childNodes[0];
      const insertBefore = target.firstChild.insertBefore;
      target.firstChild.insertBefore = (...args)=>{
        ++insertBeforeCount;
        return insertBefore.apply(target.firstChild, args);
      };

      const removeChild = target.firstChild.removeChild;
      target.firstChild.removeChild = (...args)=>{
        ++removeChildCount;
        return removeChild.apply(target.firstChild, args);
      };

      patch(target, {
        template: PARENT_TMPL,
        values:[
          [
            {key: 2, template:CHILD_EL2},
            {key: 1, template:CHILD_EL1}
          ]
        ]
      });
      assert.equal(getTargetHTML(), '<div><b></b><span></span></div>');
      assert.equal(createElementCount, 1);
      assert.equal(createTextNodeCount, 0);
      assert.equal(insertBeforeCount, 1); //TODO(pwong): 1
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
      assert.equal(getTargetHTML(), '<div><a></a><b></b><span></span></div>');
      assert.equal(createElementCount, 1);
      assert.equal(createTextNodeCount, 0);
      assert.equal(childEl1, target.firstChild.childNodes[2]);
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
      assert.equal(childEl1, target.querySelector('span'));
      assert.equal(childEl2, target.querySelector('b'));
      assert.equal(childEl3, target.querySelector('a'));
      resetCounts();
    });
  });
});