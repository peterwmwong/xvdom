import assert        from 'assert';
import getHTMLString from './utils/getHTMLString.js';
import xvdom         from '../src/index.js';

describe('rerender(bytecode, dynamics)', ()=>{
  const itRenders = (
    desc, instance, renderArgs, expectedRenderHTML, rerenderArgs,
    expectedRerenderHTML
  )=>{
    describe(desc, () =>{
      let node;

      beforeEach(()=>{ node = xvdom.xrender(instance(...renderArgs)); });

      it('renders', ()=>{
        assert.strictEqual(
          getHTMLString(node),
          expectedRenderHTML
        );
      });

      it('rerenders', ()=>{
        xvdom.xrerender(node, instance(...rerenderArgs));
        assert.strictEqual(
          getHTMLString(node),
          expectedRerenderHTML
        );
      });
    });
  };

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
  });
});
