import assert         from 'assert';
import createInstance from './utils/createInstance.js';
import getHTMLString  from './utils/getHTMLString.js';
import spyOn          from './utils/spyOn.js';
import {
  createDynamic,
  renderInstance,
  rerender,
  setDynamicProp,
  unmount
} from '../src/index.js';

describe('rerender - node, renderInstance (recycle)', ()=>{
  const SPEC = {
    recycleKey: 'render-recycle-spec',
    render: vc=>{
      const div = document.createElement('div');
      setDynamicProp(div, 'className', vc, 0, 1, 2);
      return div;
    },
    rerender: (v, vc)=>{ vc[1]('className', v[0], vc, 0, 1, 2); }
  };
  let node0, node1;

  beforeEach(()=>{
    spyOn.uninstall();
    spyOn(Node.prototype, 'insertBefore');
    spyOn(Node.prototype, 'appendChild');
    spyOn(Node.prototype, 'removeChild');
    spyOn(document, 'createElement');
    spyOn(document, 'createTextNode');

    node0 = renderInstance({spec: SPEC, values: ['_0']});
    node1 = renderInstance({spec: SPEC, values: ['_1']});
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
    const newNode0 = renderInstance({spec: SPEC, values: ['_01']});
    assert.equal(newNode0, node1);
    assert.equal(getHTMLString(newNode0),
      '<div class="_01"></div>'
    );

    const newNode1 = renderInstance({spec: SPEC, values: ['_11']});
    assert.equal(newNode1, node0);
    assert.equal(getHTMLString(newNode1),
      '<div class="_11"></div>'
    );
  });

  describe('Arrays', ()=>{
    const PARENT_SPEC = {
      recycleKey: 'render-recycle-parent-spec',
      render: vc=>{
        const div = document.createElement('div');
        div.appendChild(createDynamic(vc, 0, 1, 2));
        return div;
      },
      rerender: (v, vc)=>{ vc[1](v[0], vc, 0, 1, 2); }
    };
    const CHILD_SPEC = {
      recycleKey: 'render-recycle-child-spec',
      render: vc=>{
        const div = document.createElement('div');
        setDynamicProp(div, 'className', vc, 0, 1, 2);
        return div;
      },
      rerender: (v, vc)=>{ vc[1]('className', v[0], vc, 0, 1, 2); }
    };

    it('Remove from the end', ()=>{
      const target = renderInstance(
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(0, CHILD_SPEC, ['_0']),
            createInstance(1, CHILD_SPEC, ['_1'])
          ]
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
          '<div class="_1"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 3);
      assert.equal(document.createTextNode.count, 1);
      spyOn.resetSpyCounts();

      rerender(target,
        createInstance(null, PARENT_SPEC, [
          []
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
        '</div>'
      );
      assert.equal(document.createElement.count , 0);
      assert.equal(document.createTextNode.count, 0);
      spyOn.resetSpyCounts();

      rerender(target,
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(0, CHILD_SPEC, ['_0']),
            createInstance(1, CHILD_SPEC, ['_1'])
          ]
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
          '<div class="_1"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 0);
      assert.equal(document.createTextNode.count, 0);
      spyOn.resetSpyCounts();
    });
  });
});
