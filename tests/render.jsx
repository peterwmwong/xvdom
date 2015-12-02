import assert        from 'assert';
import getHTMLString from './utils/getHTMLString.js';
import * as xvdom    from '../src/index.js';

describe('render - renderInstance', ()=>{
  let resultNode, instance;

  beforeEach(()=>{
    instance = <span></span>;
    resultNode = xvdom.renderInstance(instance);
  });

  it('calls render() with values', ()=>{
    assert.equal(getHTMLString(resultNode), '<span></span>');
  });

  it('stores renderInstance on node under the `xvdom` property', ()=>{
    assert.equal(resultNode.xvdom, instance);
  });
});
