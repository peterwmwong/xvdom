import assert          from 'assert';
import getHTMLString   from './utils/getHTMLString.js';
import {
  createDynamic,
  rerender,
  renderInstance
} from '../src/index.js';

describe('Integration', ()=>{
  const SPEC = {
    render: inst=>{
      const node = document.createElement('div');
      node.appendChild(createDynamic(inst.v0, inst, 'r0', 'c0'));
      return node;
    },
    rerender: (inst, pInst)=>{
      if(inst.v0 !== pInst.v0){
        pInst.r0(inst.v0, pInst.c0, pInst, 'r0', 'c0');
        pInst.v0 = inst.v0;
      }
    }
  };
  let node;

  describe('Dynamic changing type', ()=>{
    describe('From String', ()=>{
      beforeEach(()=>{
        node = renderInstance({spec:SPEC, v0:'hello world'});
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
          rerender(node, {spec:SPEC, v0:renderInstance});
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
