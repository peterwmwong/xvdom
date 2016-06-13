import assert        from 'assert';
import getHTMLString from './utils/getHTMLString.js';
import xvdom         from '../src/index.js';

const INVISIBLE_DYNAMIC_VALUES = [null, undefined, true, false];

describe('createDynamic - isOnlyChild, parentNode, value, replace', ()=>{
  let parentNode;

  const otherChild = (isOnlyChild)=>
    isOnlyChild ? '' : '<span></span>';

  const _render = (isOnlyChild, value)=>
    isOnlyChild
      ? <div>{value}</div>
      : <div><span></span>{value}</div>;

  const render = (isOnlyChild, value)=>
    parentNode = xvdom.render(_render(isOnlyChild, value));

  const rerender = (isOnlyChild, value)=>{
    const tmpRootNode = document.createElement('div');
    tmpRootNode.appendChild(parentNode);
    xvdom.rerender(parentNode, _render(isOnlyChild, value));
    parentNode = tmpRootNode.firstChild;
  };

  const itRerenders = (isOnlyChild, expectedEmpty)=>{
    describe('rerenders', ()=>{
      INVISIBLE_DYNAMIC_VALUES.forEach(value=>{
        it(`${value}`, ()=>{
          rerender(isOnlyChild, value);
          assert.strictEqual(getHTMLString(parentNode),
            '<div>'+
              otherChild(isOnlyChild)+
              expectedEmpty +
            '</div>'
          );
        });
      });

      it('strings', ()=>{
        rerender(isOnlyChild, 'rerender hello');
        assert.strictEqual(getHTMLString(parentNode),
          '<div>'+
            otherChild(isOnlyChild)+
            'rerender hello'+
          '</div>'
        );
      });

      it('strings (empty string)', ()=>{
        rerender(isOnlyChild, '');
        assert.strictEqual(getHTMLString(parentNode),
          '<div>'+
            otherChild(isOnlyChild)+
            ''+
          '</div>'
        );
      });

      it('numbers (zero)', ()=>{
        rerender(isOnlyChild, 0);
        assert.strictEqual(getHTMLString(parentNode),
          '<div>'+
            otherChild(isOnlyChild)+
            '0'+
          '</div>'
        );
      });

      it('numbers', ()=>{
        rerender(isOnlyChild, 7);
        assert.strictEqual(getHTMLString(parentNode),
          '<div>'+
            otherChild(isOnlyChild)+
            '7'+
          '</div>'
        );
      });

      it('instances', ()=>{
        const renderChild = (text)=> <span>{text}</span>;
        rerender(isOnlyChild, renderChild('hello world1'));

        assert.strictEqual(getHTMLString(parentNode),
          '<div>'+
            otherChild(isOnlyChild)+
            '<span>'+
              'hello world1'+
            '</span>'+
          '</div>'
        );

        rerender(isOnlyChild, renderChild('hello world2'));
        assert.strictEqual(getHTMLString(parentNode),
          '<div>'+
            otherChild(isOnlyChild)+
            '<span>'+
              'hello world2'+
            '</span>'+
          '</div>'
        );

        rerender(isOnlyChild, renderChild('hello world3'));
        assert.strictEqual(getHTMLString(parentNode),
          '<div>'+
            otherChild(isOnlyChild)+
            '<span>'+
              'hello world3'+
            '</span>'+
          '</div>'
        );

        rerender(isOnlyChild, renderChild('hello world4'));
        assert.strictEqual(getHTMLString(parentNode),
          '<div>'+
            otherChild(isOnlyChild)+
            '<span>'+
              'hello world4'+
            '</span>'+
          '</div>'
        );
      });

      it('arrays', ()=>{
        rerender(isOnlyChild, [
          <div key={1}>rerender array 1</div>,
          <span key={2}>rerender array 2</span>
        ]);
        assert.strictEqual(getHTMLString(parentNode),
          '<div>'+
            otherChild(isOnlyChild)+
            '<div>rerender array 1</div>'+
            '<span>rerender array 2</span>'+
          '</div>'
        );
      });
    });
  };

  const itRenders = (isOnlyChild)=>{
    describe(`isOnlyChild === ${isOnlyChild}`, ()=>{
      INVISIBLE_DYNAMIC_VALUES.forEach(value=>{
        describe(`${value}`, ()=>{
          beforeEach(()=>{
            render(isOnlyChild, value);
          });

          it('renders as a comment', ()=>{
            assert.strictEqual(getHTMLString(parentNode),
              '<div>'+
                otherChild(isOnlyChild)+
              '</div>'
            );
          });

          itRerenders(isOnlyChild, '');
        });
      });

      describe('String - text node', ()=>{
        beforeEach(()=>{
          render(isOnlyChild, 'test string');
        });

        it('renders text node with string', ()=>{
          assert.strictEqual(getHTMLString(parentNode),
            '<div>'+
              otherChild(isOnlyChild)+
              'test string'+
            '</div>'
          );
        });

        itRerenders(isOnlyChild, '');
      });

      describe('Number - text node', ()=>{
        beforeEach(()=>{
          render(isOnlyChild, 0);
        });

        it('renders text node with string', ()=>{
          assert.strictEqual(getHTMLString(parentNode),
            '<div>'+
              otherChild(isOnlyChild)+
              '0'+
            '</div>'
          );
        });

        itRerenders(isOnlyChild, '');
      });

      describe('Object - instance', ()=>{
        beforeEach(()=>{
          render(isOnlyChild, <b></b>);
        });

        // TODO: render <b> or something different
        it('renders render instance', ()=>{
          assert.strictEqual(getHTMLString(parentNode),
            '<div>'+
              otherChild(isOnlyChild)+
              '<b></b>'+
            '</div>'
          );
        });

        itRerenders(isOnlyChild, '');
      });

      describe('Array', ()=>{
        beforeEach(()=>{
          render(isOnlyChild, [
            <a key={0} className="one"></a>,
            <b key={1} className="two"></b>
          ]);
        });

        it('renders array of items', ()=>{
          assert.strictEqual(getHTMLString(parentNode),
            '<div>'+
              otherChild(isOnlyChild)+
              '<a class="one"></a>'+
              '<b class="two"></b>'+
            '</div>'
          );
        });

        itRerenders(isOnlyChild, '');
      });
    });
  };

  itRenders(true);
  itRenders(false);
});
