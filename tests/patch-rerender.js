import assert        from 'assert';
import getHTMLString from './utils/getHTMLString.js';
import spyOn         from './utils/spyOn.js';
import {patch}       from '../src/patch.js';

describe('patch rerender', ()=>{
  const TMPL = {el: 'div', children:[0]};
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

  it('Simple Node', ()=>{
    const singleNodeTmpl = {el: 'div'};
    patch(target, {
      template: singleNodeTmpl
    });
    patch(target, {
      template: singleNodeTmpl
    });
    assert.equal(getHTMLString(target), '<div></div>');
    assert.equal(document.createElement.count, 1);
  });

  it('Properties', ()=>{
    const singleNodeWithPropTmpl = {el: 'div', props:{$className:0}};
    patch(target, {
      template: singleNodeWithPropTmpl,
      values:['foo']
    });
    spyOn.resetSpyCounts();

    patch(target, {
      template: singleNodeWithPropTmpl,
      values:['bar']
    });
    assert.equal(getHTMLString(target), '<div class="bar"></div>');
    assert.equal(document.createElement.count, 0);
    assert.equal(document.createTextNode.count, 0);


    patch(target, {
      template: singleNodeWithPropTmpl,
      values:['baz']
    });
    assert.equal(getHTMLString(target), '<div class="baz"></div>');
    assert.equal(document.createElement.count, 0);
    assert.equal(document.createTextNode.count, 0);
  });

  it('Text Nodes', ()=>{
    patch(target, {
      template: TMPL,
      values:['Hello']
    });
    assert.equal(getHTMLString(target), '<div>Hello</div>');
    spyOn.resetSpyCounts();

    patch(target, {
      template: TMPL,
      values:['World']
    });
    assert.equal(getHTMLString(target), '<div>World</div>');
    assert.equal(document.createElement.count, 0);
    assert.equal(document.createTextNode.count, 0);
    spyOn.resetSpyCounts();
  });

  it('Text to Element', ()=>{
    patch(target, {
      template: TMPL,
      values:['Hello']
    });
    assert.equal(getHTMLString(target), '<div>Hello</div>');
    spyOn.resetSpyCounts();

    patch(target, {
      template: TMPL,
      values:[
        {template:{el:'span'}}
      ]
    });
    assert.equal(getHTMLString(target), '<div><span></span></div>');
    assert.equal(document.createElement.count, 1);
    assert.equal(document.createTextNode.count, 0);
    spyOn.resetSpyCounts();

    patch(target, {
      template: TMPL,
      values:[
        {template:{el:'b'}}
      ]
    });
    assert.equal(getHTMLString(target), '<div><b></b></div>');
    assert.equal(document.createElement.count, 1);
    assert.equal(document.createTextNode.count, 0);
    spyOn.resetSpyCounts();
  });

  it('Element to Text', ()=>{
    patch(target, {
      template: TMPL,
      values:[
        {template:{el:'span'}}
      ]
    });
    assert.equal(getHTMLString(target), '<div><span></span></div>');
    spyOn.resetSpyCounts();


    patch(target, {
      template: TMPL,
      values:['Meow']
    });
    assert.equal(getHTMLString(target), '<div>Meow</div>');
    assert.equal(document.createElement.count, 0);
    assert.equal(document.createTextNode.count, 1);
    spyOn.resetSpyCounts();

    patch(target, {
      template: TMPL,
      values:['Bark']
    });
    assert.equal(getHTMLString(target), '<div>Bark</div>');
    assert.equal(document.createElement.count, 0);
    assert.equal(document.createTextNode.count, 0);
    spyOn.resetSpyCounts();

    patch(target, {
      template: TMPL,
      values:['Chirp']
    });
    assert.equal(getHTMLString(target), '<div>Chirp</div>');
    assert.equal(document.createElement.count, 0);
    assert.equal(document.createTextNode.count, 0);
    spyOn.resetSpyCounts();
  });

  it('Nested Nodes', ()=>{
    const CHILD_EL1   = {el: 'span'};
    const CHILD_EL2   = {el: 'b'};
    const CHILD_EL3   = {el: 'a'};
    patch(target, {
      template: TMPL,
      values:[
        {template:CHILD_EL1}
      ]
    });
    assert.equal(getHTMLString(target), '<div><span></span></div>');
    spyOn.resetSpyCounts();

    patch(target, {
      template: TMPL,
      values:[
        {template:CHILD_EL2}
      ]
    });
    assert.equal(getHTMLString(target), '<div><b></b></div>');
    assert.equal(document.createElement.count, 1);
    assert.equal(document.createTextNode.count, 0);
    spyOn.resetSpyCounts();

    patch(target, {
      template: TMPL,
      values:[
        {template:CHILD_EL3}
      ]
    });
    assert.equal(getHTMLString(target), '<div><a></a></div>');
    assert.equal(document.createElement.count, 1);
    assert.equal(document.createTextNode.count, 0);
    spyOn.resetSpyCounts();

    patch(target, {
      template: TMPL,
      values:['Hello World']
    });
    assert.equal(getHTMLString(target), '<div>Hello World</div>');
    assert.equal(document.createElement.count, 0);
    assert.equal(document.createTextNode.count, 1);
    spyOn.resetSpyCounts();

    patch(target, {
      template: TMPL,
      values:['Hello World2']
    });
    assert.equal(getHTMLString(target), '<div>Hello World2</div>');
    assert.equal(document.createElement.count, 0);
    assert.equal(document.createTextNode.count, 0);
  });

  describe('Arrays', ()=>{
    it('Update array elements', ()=>{
      const CHILD_EL    = {el: 'div', props:{$className:0}};

      patch(target, {
        template: TMPL,
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

      patch(target, {
        template: TMPL,
        values:[
          [
            {key: 1, template:CHILD_EL, values:['4']},
            {key: 2, template:CHILD_EL, values:['5']},
            {key: 3, template:CHILD_EL, values:['6']}
          ]
        ]
      });
      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="4"></div>'+
          '<div class="5"></div>'+
          '<div class="6"></div>'+
        '</div>'
      );
    });

    it('Reordering', ()=>{
      const CHILD_EL1   = {el: 'span'};
      const CHILD_EL2   = {el: 'b'};
      const CHILD_EL3   = {el: 'a'};

      patch(target, {
        template: TMPL,
        values:[
          [
            {key: 1, template:CHILD_EL1},
            {key: 2, template:CHILD_EL2},
            {key: 3, template:CHILD_EL3}
          ]
        ]
      });
      assert.equal(getHTMLString(target),
        '<div>'+
          '<span></span>'+
          '<b></b>'+
          '<a></a>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 4);
      assert.equal(document.createTextNode.count, 0);
      spyOn.resetSpyCounts();

      const childEl1 = target.firstChild.childNodes[0];
      const childEl2 = target.firstChild.childNodes[1];
      const childEl3 = target.firstChild.childNodes[2];

      patch(target, {
        template: TMPL,
        values:[
          [
            {key: 3, template:CHILD_EL3},
            {key: 2, template:CHILD_EL2},
            {key: 1, template:CHILD_EL1}
          ]
        ]
      });
      assert.equal(getHTMLString(target),
        '<div>'+
          '<a></a>'+
          '<b></b>'+
          '<span></span>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 0);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 2);
      assert.equal(Node.prototype.removeChild.count, 0);
      assert.equal(childEl1, target.firstChild.childNodes[2]);
      assert.equal(childEl2, target.firstChild.childNodes[1]);
      assert.equal(childEl3, target.firstChild.childNodes[0]);
      spyOn.resetSpyCounts();

      patch(target, {
        template: TMPL,
        values:[
          [
            {key: 1, template:CHILD_EL1},
            {key: 3, template:CHILD_EL3},
            {key: 2, template:CHILD_EL2}
          ]
        ]
      });
      assert.equal(getHTMLString(target),
        '<div>'+
          '<span></span>'+
          '<a></a>'+
          '<b></b>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 0);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 1);
      assert.equal(Node.prototype.removeChild.count, 0);
      assert.equal(childEl1, target.firstChild.childNodes[0]);
      assert.equal(childEl2, target.firstChild.childNodes[2]);
      assert.equal(childEl3, target.firstChild.childNodes[1]);
      spyOn.resetSpyCounts();
    });

    it('Reordering 2', ()=>{
      const CHILD_EL1   = {el: 'span', props:{className:'0'}};
      const CHILD_EL2   = {el: 'span', props:{className:'1'}};
      const CHILD_EL3   = {el: 'span', props:{className:'2'}};

      patch(target, {
        template: TMPL,
        values:[
          [
            {key: 0, template:CHILD_EL1},
            {key: 1, template:CHILD_EL2},
            {key: 2, template:CHILD_EL3}
          ]
        ]
      });

      assert.equal(getHTMLString(target),
        '<div>'+
          '<span class="0"></span>'+
          '<span class="1"></span>'+
          '<span class="2"></span>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 4);
      assert.equal(document.createTextNode.count, 0);
      spyOn.resetSpyCounts();


      patch(target, {
        template: TMPL,
        values:[
          [
            {key: 1, template:CHILD_EL2},
            {key: 0, template:CHILD_EL1},
            {key: 2, template:CHILD_EL3}
          ]
        ]
      });

      assert.equal(getHTMLString(target),
        '<div>'+
          '<span class="1"></span>'+
          '<span class="0"></span>'+
          '<span class="2"></span>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 0);
      assert.equal(document.createTextNode.count, 0);
      spyOn.resetSpyCounts();
    });

    it('Reordering 3', ()=>{
      const CHILD_EL = {el: 'span', props:{$className:0}};

      patch(target, {
        template: TMPL,
        values:[
          [
            {key: 0, template:CHILD_EL, values:['0']},
            {key: 1, template:CHILD_EL, values:['1']},
            {key: 2, template:CHILD_EL, values:['2']},
            {key: 3, template:CHILD_EL, values:['3']}
          ]
        ]
      });

      assert.equal(getHTMLString(target),
        '<div>'+
          '<span class="0"></span>'+
          '<span class="1"></span>'+
          '<span class="2"></span>'+
          '<span class="3"></span>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 5);
      assert.equal(document.createTextNode.count, 0);
      spyOn.resetSpyCounts();


      patch(target, {
        template: TMPL,
        values:[
          [
            {key: 2, template:CHILD_EL, values:['21']},
            {key: 3, template:CHILD_EL, values:['31']},
            {key: 0, template:CHILD_EL, values:['01']},
            {key: 1, template:CHILD_EL, values:['11']}
          ]
        ]
      });

      assert.equal(getHTMLString(target),
        '<div>'+
          '<span class="21"></span>'+
          '<span class="31"></span>'+
          '<span class="01"></span>'+
          '<span class="11"></span>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 0);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 4);
      assert.equal(Node.prototype.removeChild.count, 0);
      spyOn.resetSpyCounts();
    });

    it('Add to the start', ()=>{
      const CHILD_EL1   = {el: 'span'};
      const CHILD_EL2   = {el: 'b'};
      const CHILD_EL3   = {el: 'a'};

      patch(target, {
        template: TMPL,
        values:[
          [
            {key: 1, template:CHILD_EL1}
          ]
        ]
      });
      assert.equal(getHTMLString(target),
        '<div>'+
          '<span></span>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 2);
      assert.equal(document.createTextNode.count, 0);
      spyOn.resetSpyCounts();

      const childEl1 = target.firstChild.childNodes[0];

      patch(target, {
        template: TMPL,
        values:[
          [
            {key: 2, template:CHILD_EL2},
            {key: 1, template:CHILD_EL1}
          ]
        ]
      });
      assert.equal(getHTMLString(target),
        '<div>'+
          '<b></b>'+
          '<span></span>'+
        '</div>'
      );
      assert.equal(document.createElement.count , 1);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 1);
      assert.equal(Node.prototype.removeChild.count, 0);
      assert.equal(childEl1, target.firstChild.childNodes[1]);
      spyOn.resetSpyCounts();

      const childEl2 = target.firstChild.childNodes[0];

      patch(target, {
        template: TMPL,
        values:[
          [
            {key: 3, template:CHILD_EL3},
            {key: 2, template:CHILD_EL2},
            {key: 1, template:CHILD_EL1}
          ]
        ]
      });
      assert.equal(getHTMLString(target),
        '<div>'+
          '<a></a>'+
          '<b></b>'+
          '<span></span>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 1);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 1);
      assert.equal(Node.prototype.removeChild.count, 0);
      assert.equal(childEl1, target.firstChild.childNodes[2]);
      assert.equal(childEl2, target.firstChild.childNodes[1]);
      spyOn.resetSpyCounts();
    });

    it('Add in the middle', ()=>{
      patch(target, {
        template: TMPL,
        values: [
          [
            {key:0, template:TMPL, values:['0']},
            {key:1, template:TMPL, values:['1']},
            {key:2, template:TMPL, values:['2']},
            {key:3, template:TMPL, values:['3']}
          ]
        ]
      });
      assert.equal(getHTMLString(target),
        '<div>'+
          '<div>0</div>'+
          '<div>1</div>'+
          '<div>2</div>'+
          '<div>3</div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 5);
      assert.equal(document.createTextNode.count, 4);
      spyOn.resetSpyCounts();

      patch(target, {
        template: TMPL,
        values: [
          [
            {key:0, template:TMPL, values:['0']},
            {key:1, template:TMPL, values:['1']},

            {key:4, template:TMPL, values:['New 1']},
            {key:5, template:TMPL, values:['New 2']},

            {key:2, template:TMPL, values:['2']},
            {key:3, template:TMPL, values:['3']}
          ]
        ]
      });
      assert.equal(getHTMLString(target),
        '<div>'+
          '<div>0</div>'+
          '<div>1</div>'+
          '<div>New 1</div>'+
          '<div>New 2</div>'+
          '<div>2</div>'+
          '<div>3</div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 2);
      assert.equal(document.createTextNode.count, 2);
      assert.equal(Node.prototype.insertBefore.count, 2);
      assert.equal(Node.prototype.removeChild.count, 0);
      spyOn.resetSpyCounts();

      patch(target, {
        template: TMPL,
        values: [
          [
            {key:0, template:TMPL, values:['0']},
            {key:1, template:TMPL, values:['1']},

            {key:4, template:TMPL, values:['New 1']},

            {key:6, template:TMPL, values:['New 1.1']},
            {key:7, template:TMPL, values:['New 1.2']},

            {key:5, template:TMPL, values:['New 2']},

            {key:2, template:TMPL, values:['2']},
            {key:3, template:TMPL, values:['3']}
          ]
        ]
      });
      assert.equal(getHTMLString(target),
        '<div>'+
          '<div>0</div>'+
          '<div>1</div>'+
          '<div>New 1</div>'+
          '<div>New 1.1</div>'+
          '<div>New 1.2</div>'+
          '<div>New 2</div>'+
          '<div>2</div>'+
          '<div>3</div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 2);
      assert.equal(document.createTextNode.count, 2);
      assert.equal(Node.prototype.insertBefore.count, 2);
      assert.equal(Node.prototype.removeChild.count, 0);
      spyOn.resetSpyCounts();
    });

    it('Add in the middle and end', ()=>{
      patch(target, {
        template: TMPL,
        values: [
          [
            {key:0, template:TMPL, values:['0']},
            {key:1, template:TMPL, values:['1']}
          ]
        ]
      });
      assert.equal(getHTMLString(target),
        '<div>'+
          '<div>0</div>'+
          '<div>1</div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 3);
      assert.equal(document.createTextNode.count, 2);
      spyOn.resetSpyCounts();

      patch(target, {
        template: TMPL,
        values: [
          [
            {key:0, template:TMPL, values:['0']},
            {key:2, template:TMPL, values:['New 0.0']},
            {key:1, template:TMPL, values:['1']},
            {key:3, template:TMPL, values:['New 1.0']}
          ]
        ]
      });
      assert.equal(getHTMLString(target),
        '<div>'+
          '<div>0</div>'+
          '<div>New 0.0</div>'+
          '<div>1</div>'+
          '<div>New 1.0</div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 2);
      assert.equal(document.createTextNode.count, 2);
      assert.equal(Node.prototype.insertBefore.count, 3);
      assert.equal(Node.prototype.removeChild.count, 0);
      spyOn.resetSpyCounts();
    });

    it('Add to the end', ()=>{
      const CHILD_EL1   = {el: 'span'};
      const CHILD_EL2   = {el: 'b'};
      const CHILD_EL3   = {el: 'a'};

      patch(target, {
        template: TMPL,
        values:[
          [
            {key: 1, template:CHILD_EL1}
          ]
        ]
      });
      assert.equal(getHTMLString(target), '<div><span></span></div>');
      assert.equal(document.createElement.count, 2);
      assert.equal(document.createTextNode.count, 0);
      spyOn.resetSpyCounts();

      const childEl1 = target.firstChild.childNodes[0];

      patch(target, {
        template: TMPL,
        values:[
          [
            {key: 1, template:CHILD_EL1},
            {key: 2, template:CHILD_EL2}
          ]
        ]
      });
      assert.equal(getHTMLString(target),
        '<div>'+
          '<span></span>'+
          '<b></b>'+
        '</div>'
      );
      assert.equal(document.createElement.count , 1);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 1);
      assert.equal(Node.prototype.removeChild.count, 0);
      assert.equal(childEl1, target.firstChild.childNodes[0]);
      spyOn.resetSpyCounts();

      const childEl2 = target.firstChild.childNodes[1];

      patch(target, {
        template: TMPL,
        values:[
          [
            {key: 1, template:CHILD_EL1},
            {key: 2, template:CHILD_EL2},
            {key: 3, template:CHILD_EL3}
          ]
        ]
      });
      assert.equal(getHTMLString(target),
        '<div>'+
          '<span></span>'+
          '<b></b>'+
          '<a></a>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 1);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 1);
      assert.equal(Node.prototype.removeChild.count, 0);
      assert.equal(childEl1, target.firstChild.childNodes[0]);
      assert.equal(childEl2, target.firstChild.childNodes[1]);
      spyOn.resetSpyCounts();
    });

    it('Remove from the middle', ()=>{
      patch(target, {
        template: TMPL,
        values: [
          [
            {key:0, template:TMPL, values:['0']},
            {key:1, template:TMPL, values:['1']},
            {key:2, template:TMPL, values:['2']},
            {key:3, template:TMPL, values:['3']},
            {key:4, template:TMPL, values:['4']},
            {key:5, template:TMPL, values:['5']}
          ]
        ]
      });
      assert.equal(getHTMLString(target),
        '<div>'+
          '<div>0</div>'+
          '<div>1</div>'+
          '<div>2</div>'+
          '<div>3</div>'+
          '<div>4</div>'+
          '<div>5</div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 7);
      assert.equal(document.createTextNode.count, 6);
      spyOn.resetSpyCounts();

      patch(target, {
        template: TMPL,
        values: [
          [
            {key:0, template:TMPL, values:['0']},
            {key:1, template:TMPL, values:['1']},
            {key:4, template:TMPL, values:['4']},
            {key:5, template:TMPL, values:['5']}
          ]
        ]
      });
      assert.equal(getHTMLString(target),
        '<div>'+
          '<div>0</div>'+
          '<div>1</div>'+
          '<div>4</div>'+
          '<div>5</div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 0);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 0);
      assert.equal(Node.prototype.removeChild.count, 2);
      spyOn.resetSpyCounts();

      patch(target, {
        template: TMPL,
        values: [
          [
            {key:0, template:TMPL, values:['0']},
            {key:5, template:TMPL, values:['5']}
          ]
        ]
      });
      assert.equal(getHTMLString(target),
        '<div>'+
          '<div>0</div>'+
          '<div>5</div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 0);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 0);
      assert.equal(Node.prototype.removeChild.count, 2);
      spyOn.resetSpyCounts();
    });

    it('Remove from the end', ()=>{
      const CHILD_EL1   = {el: 'span'};
      const CHILD_EL2   = {el: 'b'};
      const CHILD_EL3   = {el: 'a'};

      patch(target, {
        template: TMPL,
        values:[
          [
            {key: 1, template:CHILD_EL1},
            {key: 2, template:CHILD_EL2},
            {key: 3, template:CHILD_EL3}
          ]
        ]
      });
      assert.equal(getHTMLString(target),
        '<div>'+
          '<span></span>'+
          '<b></b>'+
          '<a></a>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 4);
      assert.equal(document.createTextNode.count, 0);
      spyOn.resetSpyCounts();

      const childEl1 = target.firstChild.childNodes[0];
      const childEl2 = target.firstChild.childNodes[1];

      patch(target, {
        template: TMPL,
        values:[
          [
            {key: 1, template:CHILD_EL1},
            {key: 2, template:CHILD_EL2}
          ]
        ]
      });
      assert.equal(getHTMLString(target),
        '<div>'+
          '<span></span>'+
          '<b></b>'+
        '</div>'
      );
      assert.equal(document.createElement.count , 0);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 0);
      assert.equal(Node.prototype.removeChild.count, 1);
      assert.equal(childEl1, target.firstChild.childNodes[0]);
      assert.equal(childEl2, target.firstChild.childNodes[1]);
      spyOn.resetSpyCounts();

      patch(target, {
        template: TMPL,
        values:[
          [
            {key: 1, template:CHILD_EL1}
          ]
        ]
      });
      assert.equal(getHTMLString(target),
        '<div>'+
          '<span></span>'+
        '</div>'
      );
      assert.equal(document.createElement.count , 0);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 0);
      assert.equal(Node.prototype.removeChild.count, 1);
      assert.equal(childEl1, target.firstChild.childNodes[0]);
      spyOn.resetSpyCounts();
    });

    it('Remove from the start', ()=>{
      const CHILD_EL1   = {el: 'span'};
      const CHILD_EL2   = {el: 'b'};
      const CHILD_EL3   = {el: 'a'};

      patch(target, {
        template: TMPL,
        values:[
          [
            {key: 1, template:CHILD_EL1},
            {key: 2, template:CHILD_EL2},
            {key: 3, template:CHILD_EL3}
          ]
        ]
      });
      assert.equal(getHTMLString(target),
        '<div>'+
          '<span></span>'+
          '<b></b>'+
          '<a></a>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 4);
      assert.equal(document.createTextNode.count, 0);
      spyOn.resetSpyCounts();

      const childEl2 = target.firstChild.childNodes[1];
      const childEl3 = target.firstChild.childNodes[2];

      patch(target, {
        template: TMPL,
        values:[
          [
            {key: 2, template:CHILD_EL2},
            {key: 3, template:CHILD_EL3}
          ]
        ]
      });
      assert.equal(getHTMLString(target),
        '<div>'+
          '<b></b>'+
          '<a></a>'+
        '</div>'
      );
      assert.equal(document.createElement.count , 0);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 0);
      assert.equal(Node.prototype.removeChild.count, 1);
      assert.equal(childEl2, target.firstChild.childNodes[0]);
      assert.equal(childEl3, target.firstChild.childNodes[1]);
      spyOn.resetSpyCounts();

      patch(target, {
        template: TMPL,
        values:[
          [
            {key: 3, template:CHILD_EL3}
          ]
        ]
      });
      assert.equal(getHTMLString(target),
        '<div>'+
          '<a></a>'+
        '</div>'
      );
      assert.equal(document.createElement.count , 0);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 0);
      assert.equal(Node.prototype.removeChild.count, 1);
      assert.equal(childEl3, target.firstChild.childNodes[0]);
      spyOn.resetSpyCounts();
    });

    it('Remove from the start and end', ()=>{
      const CHILD_EL1   = {el: 'span'};
      const CHILD_EL2   = {el: 'b'};
      const CHILD_EL3   = {el: 'a'};

      patch(target, {
        template: TMPL,
        values:[
          [
            {key: 1, template:CHILD_EL1},
            {key: 2, template:CHILD_EL2},
            {key: 3, template:CHILD_EL3}
          ]
        ]
      });
      assert.equal(getHTMLString(target),
        '<div>'+
          '<span></span>'+
          '<b></b>'+
          '<a></a>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 4);
      assert.equal(document.createTextNode.count, 0);
      spyOn.resetSpyCounts();

      const childEl2 = target.firstChild.childNodes[1];

      patch(target, {
        template: TMPL,
        values:[
          [
            {key: 2, template:CHILD_EL2}
          ]
        ]
      });
      assert.equal(getHTMLString(target),
        '<div>'+
          '<b></b>'+
        '</div>'
      );
      assert.equal(document.createElement.count , 0);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 1);
      assert.equal(Node.prototype.removeChild.count, 2);
      assert.equal(childEl2, target.firstChild.childNodes[0]);
      spyOn.resetSpyCounts();
    });

    it('Simple Array of Arrays', ()=>{
      const CHILD_EL1 = {
        el: 'div', props:{$className:0, $id:1},
        children:[2]
      };

      patch(target, {
        template: TMPL,
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

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="0" id="id0">'+
            '0 Value'+
          '</div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 2);
      assert.equal(document.createTextNode.count, 1);
      spyOn.resetSpyCounts();

      patch(target, {
        template: TMPL,
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

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="02" id="id02">'+
            '0 Value2'+
          '</div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 0);
      assert.equal(document.createTextNode.count, 0);
      spyOn.resetSpyCounts();
    });

    it('Array of Arrays', ()=>{
      const CHILD_EL1 = {
        el: 'div', props:{$className:0, $id:1},
        children:[2]
      };

      patch(target, {
        template: TMPL,
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

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="0" id="id0">'+
            '0 Value'+
          '</div>'+
          '<div class="1" id="id1">'+
            '1 Value'+
          '</div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 3);
      assert.equal(document.createTextNode.count, 2);
      spyOn.resetSpyCounts();

      patch(target, {
        template: TMPL,
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

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="02" id="id02">'+
            '0 Value2'+
          '</div>'+
          '<div class="12" id="id12">'+
            '1 Value2'+
          '</div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 0);
      assert.equal(document.createTextNode.count, 0);
      spyOn.resetSpyCounts();
    });

    it('Array of Arrays of Arrays', ()=>{
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
          template: TMPL,
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

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="1">'+
            '<span class="1-1">'+
              '1-1 Text'+
            '</span>'+
          '</div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 3);
      assert.equal(document.createTextNode.count, 1);
      spyOn.resetSpyCounts();

      patch(target, render(2));

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="2">'+
            '<span class="2-1">'+
              '2-1 Text'+
            '</span>'+
          '</div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 0);
      assert.equal(document.createTextNode.count, 0);
      spyOn.resetSpyCounts();

      patch(target, render(3));

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="3">'+
            '<span class="3-1">'+
              '3-1 Text'+
            '</span>'+
          '</div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 0);
      assert.equal(document.createTextNode.count, 0);
      spyOn.resetSpyCounts();

      patch(target, render(4));

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="4">'+
            '<span class="4-1">'+
              '4-1 Text'+
            '</span>'+
          '</div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 0);
      assert.equal(document.createTextNode.count, 0);
      spyOn.resetSpyCounts();
    });

    it('All elements removed', ()=>{
      const CHILD_EL1   = {el: 'span', props:{className:'0'}};
      const CHILD_EL2   = {el: 'span', props:{className:'1'}};
      const CHILD_EL3   = {el: 'span', props:{className:'2'}};

      patch(target, {
        template: TMPL,
        values:[
          [
            {key: 0, template:CHILD_EL1},
            {key: 1, template:CHILD_EL2},
            {key: 2, template:CHILD_EL3}
          ]
        ]
      });

      assert.equal(getHTMLString(target),
        '<div>'+
          '<span class="0"></span>'+
          '<span class="1"></span>'+
          '<span class="2"></span>'+
        '</div>'
      );
      spyOn.resetSpyCounts();


      patch(target, {
        template: TMPL,
        values:[
          []
        ]
      });

      assert.equal(getHTMLString(target),
        '<div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 0);
      assert.equal(document.createTextNode.count, 0);
      spyOn.resetSpyCounts();

      patch(target, {
        template: TMPL,
        values:[
          [
            {key: 0, template:CHILD_EL1},
            {key: 1, template:CHILD_EL2},
            {key: 2, template:CHILD_EL3}
          ]
        ]
      });

      assert.equal(getHTMLString(target),
        '<div>'+
          '<span class="0"></span>'+
          '<span class="1"></span>'+
          '<span class="2"></span>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 3);
      assert.equal(document.createTextNode.count, 0);
      spyOn.resetSpyCounts();
    });

    it('Initially empty', ()=>{
      const CHILD_EL1   = {el: 'span', props:{className:'0'}};
      const CHILD_EL2   = {el: 'span', props:{className:'1'}};
      const CHILD_EL3   = {el: 'span', props:{className:'2'}};

      patch(target, {
        template: TMPL,
        values:[
          []
        ]
      });

      assert.equal(getHTMLString(target),
        '<div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 1);
      assert.equal(document.createTextNode.count, 0);
      spyOn.resetSpyCounts();

      patch(target, {
        template: TMPL,
        values:[
          [
            {key: 0, template:CHILD_EL1},
            {key: 1, template:CHILD_EL2},
            {key: 2, template:CHILD_EL3}
          ]
        ]
      });

      assert.equal(getHTMLString(target),
        '<div>'+
          '<span class="0"></span>'+
          '<span class="1"></span>'+
          '<span class="2"></span>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 3);
      assert.equal(document.createTextNode.count, 0);
      spyOn.resetSpyCounts();
    });

    it('Array to Text', ()=>{
      patch(target, {
        template: TMPL,
        values: [
          [
            {key:0, template:TMPL, values:['one']},
            {key:1, template:TMPL, values:['two']},
            {key:2, template:TMPL, values:['three']}
          ]
        ]
      });

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div>one</div>'+
          '<div>two</div>'+
          '<div>three</div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 4);
      assert.equal(document.createTextNode.count, 3);
      spyOn.resetSpyCounts();

      patch(target, {
        template: TMPL,
        values: [
          'A string'
        ]
      });

      assert.equal(getHTMLString(target),
        '<div>'+
          'A string'+
        '</div>'
      );
      assert.equal(document.createElement.count, 0);
      assert.equal(document.createTextNode.count, 1);
      spyOn.resetSpyCounts();

      patch(target, {
        template: TMPL,
        values: [
          'New string'
        ]
      });

      assert.equal(getHTMLString(target),
        '<div>'+
          'New string'+
        '</div>'
      );
      assert.equal(document.createElement.count, 0);
      assert.equal(document.createTextNode.count, 0);
      spyOn.resetSpyCounts();
    });

    it('Text to Array', ()=>{
      patch(target, {
        template: TMPL,
        values: [
          'A string'
        ]
      });
      assert.equal(getHTMLString(target),
        '<div>'+
          'A string'+
        '</div>'
      );
      assert.equal(document.createElement.count, 1);
      assert.equal(document.createTextNode.count, 1);
      spyOn.resetSpyCounts();

      patch(target, {
        template: TMPL,
        values: [
          [
            {key:0, template:TMPL, values:['one']},
            {key:1, template:TMPL, values:['two']},
            {key:2, template:TMPL, values:['three']}
          ]
        ]
      });
      assert.equal(getHTMLString(target),
        '<div>'+
          '<div>one</div>'+
          '<div>two</div>'+
          '<div>three</div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 3);
      assert.equal(document.createTextNode.count, 3);
      assert.equal(Node.prototype.insertBefore.count, 3);
      assert.equal(Node.prototype.removeChild.count, 1);
      spyOn.resetSpyCounts();

      patch(target, {
        template: TMPL,
        values: [
          [
            {key:0, template:TMPL, values:['one']},
            {key:2, template:TMPL, values:['three']}
          ]
        ]
      });
      assert.equal(getHTMLString(target),
        '<div>'+
          '<div>one</div>'+
          '<div>three</div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 0);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 0);
      assert.equal(Node.prototype.removeChild.count, 1);
      spyOn.resetSpyCounts();
    });

    it('Element to Array', ()=>{
      patch(target, {
        template: TMPL,
        values: [
          {template:TMPL, values:['one']}
        ]
      });

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div>one</div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 2);
      assert.equal(document.createTextNode.count, 1);
      spyOn.resetSpyCounts();

      patch(target, {
        template: TMPL,
        values: [
          [
            {key:0, template:TMPL, values:['one']},
            {key:1, template:TMPL, values:['two']},
            {key:2, template:TMPL, values:['three']}
          ]
        ]
      });

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div>one</div>'+
          '<div>two</div>'+
          '<div>three</div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 3);
      assert.equal(document.createTextNode.count, 3);
      assert.equal(Node.prototype.insertBefore.count, 3);
      assert.equal(Node.prototype.removeChild.count, 1);
      spyOn.resetSpyCounts();
    });

    it('Array to Element', ()=>{
      const TMPL  = {el: 'div', children:[0]};
      const TMPL2 = {el: 'span'};

      patch(target, {
        template: TMPL,
        values: [
          [
            {key:0, template:TMPL, values:['one']},
            {key:1, template:TMPL, values:['two']},
            {key:2, template:TMPL, values:['three']}
          ]
        ]
      });

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div>one</div>'+
          '<div>two</div>'+
          '<div>three</div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 4);
      assert.equal(document.createTextNode.count, 3);
      spyOn.resetSpyCounts();

      patch(target, {
        template: TMPL,
        values: [
          {template:TMPL, values:['Hello World']}
        ]
      });

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div>'+
            'Hello World'+
          '</div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 1);
      assert.equal(document.createTextNode.count, 1);
      spyOn.resetSpyCounts();

      patch(target, {
        template: TMPL,
        values: [
          {template:TMPL2}
        ]
      });

      assert.equal(getHTMLString(target),
        '<div>'+
          '<span></span>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 1);
      assert.equal(document.createTextNode.count, 0);
      spyOn.resetSpyCounts();
    });

    it('Reorder in the middle of statics', ()=>{
      const TMPL = {
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
        template: TMPL,
        values:[
          [
            {key: 1, template:CHILD_EL1},
            {key: 2, template:CHILD_EL2},
            {key: 3, template:CHILD_EL3}
          ]
        ]
      });
      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="staticBegin"></div>'+
          '<span></span>'+
          '<b></b>'+
          '<a></a>'+
          '<div class="staticEnd"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 6);
      assert.equal(document.createTextNode.count, 0);
      spyOn.resetSpyCounts();

      const childEl1 = target.querySelector('span');
      const childEl2 = target.querySelector('b');
      const childEl3 = target.querySelector('a');

      patch(target, {
        template: TMPL,
        values:[
          [
            {key: 3, template:CHILD_EL3},
            {key: 2, template:CHILD_EL2},
            {key: 1, template:CHILD_EL1}
          ]
        ]
      });
      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="staticBegin"></div>'+
          '<a></a>'+
          '<b></b>'+
          '<span></span>'+
          '<div class="staticEnd"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 0);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 2);
      assert.equal(Node.prototype.removeChild.count, 0);
      assert.equal(childEl1, target.querySelector('span'));
      assert.equal(childEl2, target.querySelector('b'));
      assert.equal(childEl3, target.querySelector('a'));
      spyOn.resetSpyCounts();
    });

    it('Add/Empty/Remove in the middle of statics', ()=>{
      const ROOT_TMPL = {
        el: 'div',
        children:[
          {el:'div', children:['static 1']},
          0,
          {el:'div', children:['static 2']}
        ]
      };

      patch(target, {
        template: ROOT_TMPL,
        values: [
          []
        ]
      });

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div>static 1</div>'+
          '<div>static 2</div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 3);
      assert.equal(document.createTextNode.count, 2);
      spyOn.resetSpyCounts();


      patch(target, {
        template: ROOT_TMPL,
        values: [
          [
            {key: 0, template:TMPL, values:['dynamic 1']}
          ]
        ]
      });

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div>static 1</div>'+
          '<div>dynamic 1</div>'+
          '<div>static 2</div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 1);
      assert.equal(document.createTextNode.count, 1);
      assert.equal(Node.prototype.insertBefore.count, 1);
      assert.equal(Node.prototype.removeChild.count, 0);
      spyOn.resetSpyCounts();

      patch(target, {
        template: ROOT_TMPL,
        values: [
          [
            {key: 0, template:TMPL, values:['dynamic 1']},
            {key: 1, template:TMPL, values:['dynamic 2']}
          ]
        ]
      });

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div>static 1</div>'+
          '<div>dynamic 1</div>'+
          '<div>dynamic 2</div>'+
          '<div>static 2</div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 1);
      assert.equal(document.createTextNode.count, 1);
      assert.equal(Node.prototype.insertBefore.count, 1);
      assert.equal(Node.prototype.removeChild.count, 0);
      spyOn.resetSpyCounts();

      patch(target, {
        template: ROOT_TMPL,
        values: [
          []
        ]
      });

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div>static 1</div>'+
          '<div>static 2</div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 0);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 0);
      assert.equal(Node.prototype.removeChild.count, 2);
      spyOn.resetSpyCounts();
    });

    it('Array item changes templates', ()=>{
      const TMPL2 = {el:'span', children:[0]};

      patch(target, {
        template: TMPL,
        values: [
          [
            {key:0, template:TMPL2, values:['0']},
            {key:1, template:TMPL2, values:['1']}
          ]
        ]
      });
      assert.equal(getHTMLString(target),
        '<div>'+
          '<span>0</span>'+
          '<span>1</span>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 3);
      assert.equal(document.createTextNode.count, 2);
      spyOn.resetSpyCounts();

      patch(target, {
        template: TMPL,
        values: [
          [
            {key:0, template:TMPL, values:[
              [
                {key:0, template:TMPL2, values:['0']},
                {key:1, template:TMPL2, values:['1']}
              ]
            ]},
            {key:1, template:TMPL, values:[
              [
                {key:0, template:TMPL2, values:['0']},
                {key:1, template:TMPL2, values:['1']}
              ]
            ]}
          ]
        ]
      });
      assert.equal(getHTMLString(target),
        '<div>'+
          '<div>'+
            '<span>0</span>'+
            '<span>1</span>'+
          '</div>'+
          '<div>'+
            '<span>0</span>'+
            '<span>1</span>'+
          '</div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 6);
      assert.equal(document.createTextNode.count, 4);
      assert.equal(Node.prototype.insertBefore.count, 4);
      assert.equal(Node.prototype.removeChild.count, 0);
      spyOn.resetSpyCounts();

      patch(target, {
        template: TMPL,
        values: [
          [
            {key:0, template:TMPL, values:[
              [
                {key:0, template:TMPL2, values:['2']},
                {key:1, template:TMPL2, values:['3']}
              ]
            ]},
            {key:1, template:TMPL, values:[
              [
                {key:0, template:TMPL2, values:['4']},
                {key:1, template:TMPL2, values:['5']}
              ]
            ]}
          ]
        ]
      });
      assert.equal(getHTMLString(target),
        '<div>'+
          '<div>'+
            '<span>2</span>'+
            '<span>3</span>'+
          '</div>'+
          '<div>'+
            '<span>4</span>'+
            '<span>5</span>'+
          '</div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 0);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 0);
      assert.equal(Node.prototype.removeChild.count, 0);
      spyOn.resetSpyCounts();
    });
  });
});
