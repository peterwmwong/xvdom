import assert        from 'assert';
import getHTMLString from './utils/getHTMLString.js';
import xvdom         from '../src/index.js';

const pairs = (array)=>{
  const result = [];
  while(array.length) result.push(array.splice(0, 2));
  return result;
};

describe('xrerender(node, instance)', ()=>{
  const itRenders = (
    desc, instance, renderArgs, expectedRenderHTML,
    ...rerenders
  )=>{
    describe(desc, () =>{
      let node;

      const rerender = ([rerenderArgs])=>
        xvdom.xrerender(node, instance(...rerenderArgs));

      beforeEach(()=>
        node = xvdom.xrender(instance(...renderArgs))
      );

      it('renders', ()=>{
        assert.strictEqual(
          getHTMLString(node),
          expectedRenderHTML
        );
      });

      pairs(rerenders).forEach(([rerenderArgs, expectedRerenderHTML], i, previous) => {
        it(`rerenders ${i++ > 0 ? i : ''}`, ()=>{
          previous.slice(0, i).forEach(rerender);
          assert.strictEqual(
            getHTMLString(node),
            expectedRerenderHTML
          );
        });
      });
    });
  };

  describe('when the instance is for a different template', ()=>{
    let node;
    beforeEach(()=>
      node = xvdom.xrender(<div>initial</div>)
    );

    it('does nothing to `node`', ()=>{
      xvdom.xrerender(node, <span>changed</span>);
      assert.strictEqual(
        getHTMLString(node),
        '<div>initial</div>'
      );
    });

    it('returns newly rendered node and replaces `node`', ()=>{
      const parentNode = document.createElement('div');
      parentNode.appendChild(node);

      const newNode = xvdom.xrerender(node, <span>changed</span>);
      assert.strictEqual(
        getHTMLString(newNode),
        '<span>changed</span>'
      );

      assert.strictEqual(
        parentNode.firstChild,
        newNode
      );
    });
  });

  describe('elements', ()=>{
    itRenders('no dynamics',
      ()=>(
        <div>
          <span></span>
        </div>
      ),
      [],
      '<div>'+
        '<span></span>'+
      '</div>',

      [],
      '<div>'+
        '<span></span>'+
      '</div>'
    );

    itRenders('dynamic prop',
      (title)=>(
        <div title={title}>
          <span></span>
        </div>
      ),
      ['yolo'],
      '<div title="yolo">'+
        '<span></span>'+
      '</div>',

      ['yolo2'],
      '<div title="yolo2">'+
        '<span></span>'+
      '</div>'
    );

    itRenders('multiple dynamic props',
      (title, className)=>(
        <div title={title}>
          <span className={className}></span>
        </div>
      ),
      ['one', 'two'],
      '<div title="one">'+
        '<span class="two"></span>'+
      '</div>',

      ['one-1', 'two-1'],
      '<div title="one-1">'+
        '<span class="two-1"></span>'+
      '</div>'
    );

    itRenders('dynamic child',
      (text)=>(<div>{text}</div>),
      ['one'],
      '<div>one</div>',

      ['two'],
      '<div>two</div>'
    );

    itRenders('multiple dynamic child',
      (text, text2)=>(<div>{text}{text2}</div>),
      ['one', 'two'],
      '<div>onetwo</div>',

      ['one-1', 'two-1'],
      '<div>one-1two-1</div>'
    );

    itRenders('dynamic props and children',
      (title, className, text, text2)=>(
        <div title={title}>
          <span className={className}></span>
          {text}
          {text2}
        </div>
      ),
      ['one', 'two', 'three', 'four'],
      '<div title="one">'+
        '<span class="two"></span>'+
        'three'+
        'four'+
      '</div>',

      ['one-1', 'two-1', 'three-1', 'four-1'],
      '<div title="one-1">'+
        '<span class="two-1"></span>'+
        'three-1'+
        'four-1'+
      '</div>'
    );

    describe('when the dynamic child...', () => {
      itRenders('is an instance',
        (child)=>(
          <div>
            {child}
          </div>
        ),

        [<a>one</a>],
        '<div>'+
          '<a>one</a>'+
        '</div>',

        [<b>two</b>],
        '<div>'+
          '<b>two</b>'+
        '</div>',

        [<span>three</span>],
        '<div>'+
          '<span>three</span>'+
        '</div>'
      );
    });
  });
});
