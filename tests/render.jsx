import assert        from 'assert';
import getHTMLString from './utils/getHTMLString.js';
import xvdom         from '../src/index.js';

describe('render - instance', ()=>{
  let resultNode, instance;

  beforeEach(()=>{
    instance = <span></span>;
    resultNode = xvdom.render(instance);
  });

  it('calls render() with values', ()=>{
    assert.strictEqual(getHTMLString(resultNode), '<span></span>');
  });

  it('stores renderInstance on node under the `xvdom` property', ()=>{
    assert.strictEqual(resultNode.xvdom, instance);
  });
});
