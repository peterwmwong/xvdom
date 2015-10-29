import assert             from 'assert';
import {rerenderInstance} from '../src/index.js';

describe('rerenderInstance - value, prevValue, node, instance, rerenderFuncProp, rerenderContextNode', ()=>{
  let node, initialInstance, specRerenderArgs, specRerenderCallCount;
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

    initialInstance = {
      spec: SPEC,
      v0: initialValue,
      r0: rerenderInstance,
      c0: node
    };

    // Previous Render Instance
    node.xvdom = initialInstance;

    specRerenderArgs = null;

    specRerenderCallCount = 0;
  });


  describe('When `newValue` is not the same spec', ()=>{
    let returnValue;

    beforeEach(()=>{
      returnValue = rerenderInstance('yolo', initialInstance, node, 'r0', 'c0');
    });

    it('calls spec `rerender()`', ()=>{
      assert.equal(specRerenderCallCount, 0);
    });

    it('returns `newValue`', ()=>{
      assert.equal(returnValue, 'yolo');
    });
  });

  describe('When `newValue` is a render instance with the same spec', ()=>{
    let instance, returnValue;

    beforeEach(()=>{
      instance = {spec:SPEC, v0:MOCK_RERENDER_VALUES};
      returnValue = rerenderInstance(instance, initialInstance, node, 'r0', 'c0');
    });

    it('calls spec `rerender()`', ()=>{
      assert.equal(specRerenderCallCount, 1);
      assert.equal(specRerenderArgs[0], instance);
      assert.equal(specRerenderArgs[1], initialInstance);
    });

    it('`node.xvdom` continues to be initial instance object', ()=>{
      assert.equal(node.xvdom, initialInstance);
    });

    it('initial instance rerender function is `rerenderInstance`', ()=>{
      assert.equal(initialInstance.r0, rerenderInstance);
    });

    it('initial instance context node is the node', ()=>{
      assert.equal(initialInstance.c0, node);
    });

    it('returns old instance', ()=>{
      assert.equal(returnValue, initialInstance);
    });
  });
});
