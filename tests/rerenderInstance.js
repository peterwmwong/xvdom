import assert             from 'assert';
import {rerenderInstance} from '../src/rerenderInstance.js';

describe('rerenderInstance - newValue, previousValueAndContext, valueIndex, contextIndex', ()=>{
  let node, valueContext, specRerenderArgs, specRerenderCallCount;
  const MOCK_RERENDER_VALUES = [1, 2, 3];
  const SPEC = {
    rerender: (...args)=>{
      specRerenderArgs = args;
      specRerenderCallCount++;
    }
  };

  beforeEach(()=>{
    const initialValue = 'initial text';
    node = document.createElement('div');

    valueContext = [
      initialValue,
      rerenderInstance,
      node
    ];

    // Previous Render Instance
    node.xvdom = {
      spec: SPEC,
      values: valueContext
    };

    specRerenderArgs = null;

    specRerenderCallCount = 0;
  });

  describe('When `newValue` is a render instance with the same spec', ()=>{
    let instance;

    beforeEach(()=>{
      instance = {spec: SPEC, values: MOCK_RERENDER_VALUES};
      rerenderInstance(instance, valueContext, 0, 1);
    });

    it('calls spec `rerender()`', ()=>{
      assert.equal(specRerenderCallCount, 1);
      assert.equal(specRerenderArgs[0], MOCK_RERENDER_VALUES);
      assert.equal(specRerenderArgs[1], valueContext);
    });

    it('updates `node.xvdom` with latest instance', ()=>{
      assert.equal(node.xvdom, instance);
    });

    it('previousValuesContext value is updated', ()=>{
      assert.equal(valueContext[0], instance);
    });

    it('previousValuesContext rerender function is `rerenderInstance`', ()=>{
      assert.equal(valueContext[1], rerenderInstance);
    });

    it('previousValuesContext context is the node', ()=>{
      assert.equal(valueContext[2], node);
    });
  });
});
