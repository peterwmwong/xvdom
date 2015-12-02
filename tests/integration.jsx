import assert        from 'assert';
import getHTMLString from './utils/getHTMLString.js';
import * as xvdom    from '../src/index.js';

describe('Integration', ()=>{
  const render = greeting=><div>{greeting}</div>;
  let node;

  describe('Dynamic changing type', ()=>{
    describe('From String', ()=>{
      beforeEach(()=>{
        node = xvdom.renderInstance(
          render('hello world')
        );
      });

      it('renders', ()=>{
        assert.equal(getHTMLString(node),
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
          assert.equal(getHTMLString(node),
            '<div>'+
              '<span></span>'+
            '</div>'
          );
        });
      });
    });
  });
});
