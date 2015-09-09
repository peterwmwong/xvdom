import assert                     from 'assert';
import getHTMLString              from './utils/getHTMLString.js';
import {rerender, renderInstance} from '../src/index.js';

describe('rerender - node, renderInstance', ()=>{
  it('calls rerender() with values and previous values w/context', ()=>{
    const mockValues         = [1, 2, 3];
    const mockRerenderValues = [4, 5];

    let renderCallCount   = 0;
    let rerenderCallCount = 0;
    let rerenderArgs;

    const spec = {
      render: ()=>(
        renderCallCount++,
        document.createElement('span')
      ),
      rerender: (values, previousValuesContext)=>{
        rerenderCallCount++;
        rerenderArgs = [values, previousValuesContext];
      }
    };
    const node = renderInstance({spec, values: mockValues});
    rerender(node, {spec, values: mockRerenderValues});

    assert.equal(getHTMLString(node), '<span></span>');

    assert.equal(renderCallCount,   1);

    assert.equal(rerenderCallCount, 1);
    assert.equal(rerenderArgs[0], mockRerenderValues);
    assert.equal(rerenderArgs[1], mockValues);
  });
});
