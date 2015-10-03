import assert         from 'assert';
import createInstance from './utils/createInstance.js';
import getHTMLString  from './utils/getHTMLString.js';
import spyOn          from './utils/spyOn.js';
import {
  createDynamic,
  renderInstance,
  rerender,
  unmount
} from '../src/index.js';

describe('rerender recycled - node, renderInstance', ()=>{
  const SPEC = {
    recycled: [],
    render: inst=>{
      const div = document.createElement('div');
      // setDynamicProp(div, 'className', inst.v0, inst, 'r0', 'c0');
      inst.c0 = div;
      div.className = inst.v0;
      return div;
    },
    rerender: (inst, pInst)=>{
      if(inst.v0 !== pInst.v0){
        // pInst.r0('className', inst.v0, pInst.c0);
        pInst.c0.className = inst.v0;
        pInst.v0 = inst.v0;
      }
    }
  };
  let node0, node1;

  beforeEach(()=>{
    spyOn.uninstall();
    spyOn(Node.prototype, 'insertBefore');
    spyOn(Node.prototype, 'appendChild');
    spyOn(Node.prototype, 'removeChild');
    spyOn(document, 'createElement');
    spyOn(document, 'createTextNode');

    node0 = renderInstance({spec: SPEC, v0:'_0'});
    node1 = renderInstance({spec: SPEC, v0:'_1'});
    assert.equal(getHTMLString(node0),
      '<div class="_0"></div>'
    );
    assert.equal(getHTMLString(node1),
      '<div class="_1"></div>'
    );
    unmount(node0);
    unmount(node1);
    spyOn.resetSpyCounts();
  });

  afterEach(()=>{
    spyOn.uninstall();
  });

  it('ressurects and rerenders unmounted render instances', ()=>{
    const newNode0 = renderInstance({spec:SPEC, v0:'_01'});
    assert.equal(newNode0, node1);
    assert.equal(getHTMLString(newNode0),
      '<div class="_01"></div>'
    );

    const newNode1 = renderInstance({spec:SPEC, v0:'_11'});
    assert.equal(newNode1, node0);
    assert.equal(getHTMLString(newNode1),
      '<div class="_11"></div>'
    );
  });

  describe('Arrays', ()=>{
    const PARENT_SPEC = {
      recycled: [],
      render: inst=>{
        const div = document.createElement('div');
        // div.appendChild(createDynamic(vc, 0, 1, 2));
        div.appendChild(createDynamic(inst.v0, inst, 'r0', 'c0'));
        return div;
      },
      rerender(inst, pInst){
        if(inst.v0 !== pInst.v0){
          pInst.r0(inst.v0, pInst.v0, pInst.c0, pInst, 'r0', 'c0');
          pInst.v0 = inst.v0;
        }
      }
    };
    const CHILD_SPEC = {
      recycled: [],
      render: inst=>{
        const div = document.createElement('div');
        div.className = inst.v0;
        inst.c0 = div;
        return div;
      },
      rerender: (inst, pInst)=>{ pInst.c0.className = inst.v0; }
    };

    it('Remove from the end', ()=>{
      const target = renderInstance(
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(0, CHILD_SPEC, ['_0']),
            createInstance(1, CHILD_SPEC, ['_1']),
            createInstance(2, CHILD_SPEC, ['_2'])
          ]
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
          '<div class="_1"></div>'+
          '<div class="_2"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 4);
      assert.equal(document.createTextNode.count, 1);
      spyOn.resetSpyCounts();

      rerender(target,
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(0, CHILD_SPEC, ['_0'])
          ]
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count , 0);
      assert.equal(document.createTextNode.count, 0);
      spyOn.resetSpyCounts();

      rerender(target,
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(0, CHILD_SPEC, ['_0']),
            createInstance(1, CHILD_SPEC, ['_1']),
            createInstance(2, CHILD_SPEC, ['_2'])
          ]
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
          '<div class="_1"></div>'+
          '<div class="_2"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 0);
      assert.equal(document.createTextNode.count, 0);
      spyOn.resetSpyCounts();

      rerender(target,
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(0, CHILD_SPEC, ['_0'])
          ]
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count , 0);
      assert.equal(document.createTextNode.count, 0);
      spyOn.resetSpyCounts();


      rerender(target,
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(0, CHILD_SPEC, ['_0']),
            createInstance(1, CHILD_SPEC, ['_1']),
            createInstance(2, CHILD_SPEC, ['_2'])
          ]
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
          '<div class="_1"></div>'+
          '<div class="_2"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 0);
      assert.equal(document.createTextNode.count, 0);
      spyOn.resetSpyCounts();
    });
  });
});
