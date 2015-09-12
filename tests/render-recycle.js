import assert        from 'assert';
import getHTMLString from './utils/getHTMLString.js';
import spyOn         from './utils/spyOn.js';
import {
  unmount,
  renderInstance,
  setDynamicProp
} from '../src/index.js';

describe('rerender - node, renderInstance', ()=>{
  const spec = {
    recycleKey: 123,
    render: vc=>{
      const div = document.createElement('div');
      setDynamicProp(div, 'className', vc, 0, 1);
      return div;
    },
    rerender: (v, vc)=>{ vc[1]('className', v[0], vc, 0, 1); }
  };
  let node;

  beforeEach(()=>{
    spyOn.uninstall();
    spyOn(Node.prototype, 'insertBefore');
    spyOn(Node.prototype, 'appendChild');
    spyOn(Node.prototype, 'removeChild');
    spyOn(document, 'createElement');
    spyOn(document, 'createTextNode');

    node = renderInstance({spec, values: ['_0']});
    assert.equal(getHTMLString(node),
      '<div class="_0"></div>'
    );
    unmount(node);
    spyOn.resetSpyCounts();
  });

  afterEach(()=>{
    spyOn.uninstall();
  });

  it('ressurects and rerenders unmounted render instances', ()=>{
    const node2 = renderInstance({spec, values: ['_1']});
    assert.equal(node2, node);
    assert.equal(getHTMLString(node2),
      '<div class="_1"></div>'
    );
  });
});
