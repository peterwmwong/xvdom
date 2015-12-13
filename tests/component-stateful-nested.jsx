import assert        from 'assert';
import getHTMLString from './utils/getHTMLString.js';
import * as xvdom    from '../src/index.js';


const LeafNode = (props, state)=>(
  state.spec ? <span className="spec1">{props.count}</span>
    : <span className="spec2">{props.count}</span>
);
let leafNodeDispatch;
LeafNode.getInitialState = (props, dispatch)=>(
  leafNodeDispatch = dispatch,
  {spec: false}
);
LeafNode.onProps = (props, state)=>({...state});
const toggle = (props, state)=>({spec: !state.spec});


const Node = (props, state)=><LeafNode count={state.count}/>;
let nodeDispatch;
Node.getInitialState = (props, dispatch)=>(
  nodeDispatch = dispatch,
  {count: 0}
);
const increment = (props, state)=>({count: state.count + 1});


describe('Stateful Components Nested', ()=>{
  it('renders', ()=>{
    let parentNode = document.createElement('div');
    parentNode.appendChild(xvdom.renderInstance(<Node />));

    assert.equal(getHTMLString(parentNode),
      '<div>'+
        '<span class="spec2">'+
          '0'+
        '</span>'+
      '</div>'
    );

    leafNodeDispatch(toggle);

    assert.equal(getHTMLString(parentNode),
      '<div>'+
        '<span class="spec1">'+
          '0'+
        '</span>'+
      '</div>'
    );

    nodeDispatch(increment);

    assert.equal(getHTMLString(parentNode),
      '<div>'+
        '<span class="spec1">'+
          '1'+
        '</span>'+
      '</div>'
    );


    leafNodeDispatch(toggle);

    assert.equal(getHTMLString(parentNode),
      '<div>'+
        '<span class="spec2">'+
          '1'+
        '</span>'+
      '</div>'
    );
  });
});
