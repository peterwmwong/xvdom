import assert           from 'assert';
import getHTMLString    from './utils/getHTMLString.js';
import {renderInstance} from '../src/index.js';

describe('render - renderInstance', ()=>{
  const mockValues = [1, 2, 3];
  let renderArgs, resultNode, instance;

  beforeEach(()=>{
    instance = {
      spec: {
        render: (...args)=>(
          renderArgs = args,
          document.createElement('span')
        )
      },
      values: mockValues
    };
    resultNode = renderInstance(instance);
  });

  it('calls render() with values', ()=>{
    assert.equal(getHTMLString(resultNode), '<span></span>');
    assert.equal(renderArgs[0], mockValues);
  });

  it('stores renderInstance on node under the `xvdom` property', ()=>{
    assert.equal(resultNode.xvdom, instance);
  });
});
