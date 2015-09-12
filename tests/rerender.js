import assert                     from 'assert';
import createInstance             from './utils/createInstance.js';
import getHTMLString              from './utils/getHTMLString.js';
import {rerender, renderInstance} from '../src/index.js';

describe('rerender - node, renderInstance', ()=>{
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
  const initialValues = [1, 2, 3];
  let renderCallCount, rerenderCallCount, node, rerenderArgs;

  beforeEach(()=>{
    node = renderInstance({spec, values: initialValues});
    rerenderCallCount = renderCallCount = 0;
  });

  it('calls rerender() with values and previous values w/context', ()=>{
    const mockRerenderValues = [4, 5];
    rerender(node, {spec, values: mockRerenderValues});

    assert.equal(getHTMLString(node), '<span></span>');
    assert.equal(renderCallCount,   0);
    assert.equal(rerenderCallCount, 1);
    assert.equal(rerenderArgs[0], mockRerenderValues);
    assert.equal(rerenderArgs[1], initialValues);
  });

  it('calls render() if the instance is for a different spec', ()=>{
    const parentNode = document.createElement('div');
    const mockRerenderValues = [4, 5];
    parentNode.appendChild(node);

    let newSpecRenderArgs;
    const newSpec = {
      render: (...args)=>(
        newSpecRenderArgs = args,
        document.createElement('b')
      )
    };
    const newNode = rerender(node, {spec: newSpec, values: mockRerenderValues});

    assert.equal(getHTMLString(parentNode), '<div><b></b></div>');
    assert.equal(renderCallCount,   0);
    assert.equal(rerenderCallCount, 0);
    assert.equal(newSpecRenderArgs[0], mockRerenderValues);
    assert.notEqual(newNode, node);
  });
});
