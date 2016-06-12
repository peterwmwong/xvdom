import assert        from 'assert';
import getHTMLString from './utils/getHTMLString.js';
import xvdom         from '../src/index.js';

describe('Integration', ()=>{
  const render = greeting=><div>{greeting}</div>;
  let node;

  describe('Dynamic changing type', ()=>{
    describe('From String', ()=>{
      beforeEach(()=>{
        node = xvdom.render(
          render('hello world')
        );
      });

      it('renders', ()=>{
        assert.strictEqual(getHTMLString(node),
          '<div>hello world</div>'
        );
      });

      describe('To Object - render instance', ()=>{
        beforeEach(()=>{
          xvdom.rerender(
            node,
            render(<span />)
          );
        });

        it('rerenders', ()=>{
          assert.strictEqual(getHTMLString(node),
            '<div>'+
              '<span></span>'+
            '</div>'
          );
        });
      });
    });
  });
});
