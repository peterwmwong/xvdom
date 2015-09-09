import assert          from 'assert';
import getHTMLString   from './utils/getHTMLString.js';
import {
  createDynamic,
  rerender,
  renderInstance
} from '../src/index.js';

describe('Integration', ()=>{
  const SPEC = {
    render: vc=>{
      const node = document.createElement('div');
      node.appendChild(createDynamic(vc, 0, 1));
      return node;
    },
    rerender: (v, vc)=>{
      if(v[0] !== vc[0]) vc[1](v[0], vc, 0, 1);
    }
  };
  let node;

  describe('Dynamic changing type', ()=>{
    describe('From String', ()=>{
      beforeEach(()=>{
        node = renderInstance({spec: SPEC, values: ['hello world']});
      });

      it('renders', ()=>{
        assert.equal(getHTMLString(node),
          '<div>hello world</div>'
        );
      });

      describe('To Object - render instance', ()=>{
        const renderInstance = {
          spec: {
            render:()=>document.createElement('span')
          }
        };

        beforeEach(()=>{
          rerender(node, {spec:SPEC, values: [renderInstance]});
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
