import assert          from 'assert';
import getHTMLString   from './utils/getHTMLString.js';
import {
  createDynamic,
  createComponent,
  rerender,
  renderInstance
} from '../src/index.js';

describe('Components', ()=>{
  // <span>{v0}</span>
  const COUNTER_SPEC = {
    render: inst=>{
      const node = document.createElement('span');
      node.appendChild(createDynamic(inst.v0, inst, 'r0', 'c0'));
      return node;
    },
    rerender: (inst, pInst)=>{
      if(inst.v0 !== pInst.v0){
        pInst.r0(inst.v0, pInst.v0, pInst.c0, pInst, 'r0', 'c0');
        pInst.v0 = inst.v0;
      }
    }
  };

  // <a>{v0}</a>
  const COUNTER_SPEC2 = {
    render: inst=>{
      const node = document.createElement('a');
      node.appendChild(createDynamic(inst.v0, inst, 'r0', 'c0'));
      return node;
    },
    rerender: (inst, pInst)=>{
      if(inst.v0 !== pInst.v0){
        pInst.r0(inst.v0, pInst.v0, pInst.c0, pInst, 'r0', 'c0');
        pInst.v0 = inst.v0;
      }
    }
  };

  function Counter({type, count}){
    Counter.callCount = Counter.callCount ? Counter.callCount + 1 : 1;
    return type === 2 ? {spec: COUNTER_SPEC2, v0: `count2: ${count}`}
            : {spec: COUNTER_SPEC, v0: `count: ${count}`};
  }

  // <div className={"count-" + v0}>
  //    <Counter type={v0 % 2} count={v0}/>
  // </div>
  const CONTAINER_SPEC = {
    render: inst=>createComponent(Counter, inst.v0, inst, 'r0', 'c0', 'rv0'),
    rerender: (inst, pInst)=>{
      pInst.r0(Counter, inst.v0, pInst.v0, pInst.rv0, pInst.c0, pInst, 'c0', 'rv0');
      pInst.v0 = inst.v0;
    }
  };

  function Container({count}){
    return {
      spec: CONTAINER_SPEC,
      v0: {count, type: count % 3}
    };
  }

  function Counter({type, count}){
    Counter.callCount = Counter.callCount ? Counter.callCount + 1 : 1;
    return type === 2 ? {spec: COUNTER_SPEC2, v0: `count2: ${count}`}
            : {spec: COUNTER_SPEC, v0: `count: ${count}`};
  }

  const PARENT_SPEC = {
    render: inst=>{
      const node = document.createElement('div');
      node.appendChild(createComponent(Counter, inst.v0, inst, 'r0', 'c0', 'rv0'));
      return node;
    },
    rerender: (inst, pInst)=>{
      if(inst.v0 !== pInst.v0){
        pInst.r0(Counter, inst.v0, pInst.v0, pInst.rv0, pInst.c0, pInst, 'c0', 'rv0');
        pInst.v0 = inst.v0;
      }
    }
  };

  const PARENT2_SPEC = {
    render: inst=>{
      const node = document.createElement('div');
      node.appendChild(createComponent(Container, inst.v0, inst, 'r0', 'c0', 'rv0'));
      return node;
    },
    rerender: (inst, pInst)=>{
      pInst.r0(Container, inst.v0, pInst.v0, pInst.rv0, pInst.c0, pInst, 'c0', 'rv0');
      pInst.v0 = inst.v0;
    }
  };

  describe('Stateless', ()=>{
    let node;

    beforeEach(()=>{
      Counter.callCount = 0;
      node = renderInstance({
        spec: PARENT_SPEC,
        v0: {count:777}
      });
    });

    it('renders', ()=>{
      assert.equal(getHTMLString(node),
        '<div>'+
          '<span>'+
            'count: 777'+
          '</span>'+
        '</div>'
      );
    });

    it('rerenders', ()=>{
      rerender(node, {spec: PARENT_SPEC, v0: {count: 10}});
      assert.equal(getHTMLString(node),
        '<div>'+
          '<span>'+
            'count: 10'+
          '</span>'+
        '</div>'
      );

      rerender(node, {spec: PARENT_SPEC, v0: {count: 11}});
      assert.equal(getHTMLString(node),
        '<div>'+
          '<span>'+
            'count: 11'+
          '</span>'+
        '</div>'
      );

      rerender(node, {spec: PARENT_SPEC, v0: {type: 2, count: 20}});
      assert.equal(getHTMLString(node),
        '<div>'+
          '<a>'+
            'count2: 20'+
          '</a>'+
        '</div>'
      );

      rerender(node, {spec: PARENT_SPEC, v0: {type: 2, count: 21}});
      assert.equal(getHTMLString(node),
        '<div>'+
          '<a>'+
            'count2: 21'+
          '</a>'+
        '</div>'
      );

      rerender(node, {spec: PARENT_SPEC, v0: {count: 12}});
      assert.equal(getHTMLString(node),
        '<div>'+
          '<span>'+
            'count: 12'+
          '</span>'+
        '</div>'
      );
    });
  });

  it('handles null props (no props)', ()=>{
    const NO_PROPS_COMP_SPEC = {
      render: ()=>{
        const node = document.createElement('span');
        node.appendChild(document.createTextNode('test'));
        return node;
      }
    };

    function NoPropsComp(props){
      NoPropsComp.callArgs.push(props);
      return {spec: NO_PROPS_COMP_SPEC};
    }
    NoPropsComp.callArgs = [];

    const PARENT_SPEC2 = {
      render: inst=>{
        const node = document.createElement('div');
        node.appendChild(createComponent(NoPropsComp, null, inst, 'r0', 'c0', 'rv0'));
        return node;
      }
    };

    const node = renderInstance({spec: PARENT_SPEC2});

    assert.deepEqual(NoPropsComp.callArgs[0], {});
    assert.equal(getHTMLString(node),
      '<div>'+
        '<span>'+
          'test'+
        '</span>'+
      '</div>'
    );
  });

  describe('Nested Stateless', ()=>{
    let node;

    beforeEach(()=>{
      Counter.callCount = 0;
      node = renderInstance({spec: PARENT2_SPEC, v0: {count:0}});
    });

    it('renders', ()=>{
      assert.equal(getHTMLString(node),
        '<div>'+
          '<span>'+
            'count: 0'+
          '</span>'+
        '</div>'
      );
    });

    it('rerenders', ()=>{
      rerender(node, {spec: PARENT2_SPEC, v0: {count: 1}});
      assert.equal(getHTMLString(node),
        '<div>'+
          '<span>'+
            'count: 1'+
          '</span>'+
        '</div>'
      );

      rerender(node, {spec: PARENT2_SPEC, v0: {count: 0}});
      assert.equal(getHTMLString(node),
        '<div>'+
          '<span>'+
            'count: 0'+
          '</span>'+
        '</div>'
      );

      rerender(node, {spec: PARENT2_SPEC, v0: {count: 2}});
      assert.equal(getHTMLString(node),
        '<div>'+
          '<a>'+
            'count2: 2'+
          '</a>'+
        '</div>'
      );

      rerender(node, {spec: PARENT2_SPEC, v0: {count: 5}});
      assert.equal(getHTMLString(node),
        '<div>'+
          '<a>'+
            'count2: 5'+
          '</a>'+
        '</div>'
      );

      rerender(node, {spec: PARENT2_SPEC, v0: {count: 1}});
      assert.equal(getHTMLString(node),
        '<div>'+
          '<span>'+
            'count: 1'+
          '</span>'+
        '</div>'
      );
    });
  });
});
