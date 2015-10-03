import assert           from 'assert';
import getHTMLString    from './utils/getHTMLString.js';
import {renderInstance} from '../src/index.js';

describe('render - renderInstance', ()=>{
  let renderArgs, resultNode, instance;

  beforeEach(()=>{
    instance = {
      spec: {
        render:(...args)=>(
          renderArgs = args,
          document.createElement('span')
        )
      },
      v0: 1,
      v1: 2,
      v2: 3
    };
    resultNode = renderInstance(instance);
  });

  it('calls render() with values', ()=>{
    assert.equal(getHTMLString(resultNode), '<span></span>');
    assert.equal(renderArgs[0], instance);
    assert.equal(renderArgs.length, 1);
  });

  it('stores renderInstance on node under the `xvdom` property', ()=>{
    assert.equal(resultNode.xvdom, instance);
  });
});
