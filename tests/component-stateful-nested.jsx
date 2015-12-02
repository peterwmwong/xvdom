import assert        from 'assert';
import getHTMLString from './utils/getHTMLString.js';
import * as xvdom    from '../src/index.js';

let leafNodeToggle;
const LeafNode = (props, state, {toggle})=>(
  leafNodeToggle = toggle,
  state.spec ? <span className="spec1">{props.count}</span>
    : <span className="spec2">{props.count}</span>
);
LeafNode.state = {
  onInit : props          => ({spec: false}),
  onProps: (props, state) => ({...state}),
  toggle : (props, state) => ({spec: !state.spec})
};

let nodeIncrement;
const Node = (props, state, {increment})=>(
  nodeIncrement = increment,
  <LeafNode count={state.count}/>
);
Node.state = {
  onInit   : props          => ({count: 0}),
  increment: (props, state) => ({count: state.count + 1})
};

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

    leafNodeToggle();

    assert.equal(getHTMLString(parentNode),
      '<div>'+
        '<span class="spec1">'+
          '0'+
        '</span>'+
      '</div>'
    );

    nodeIncrement();

    assert.equal(getHTMLString(parentNode),
      '<div>'+
        '<span class="spec1">'+
          '1'+
        '</span>'+
      '</div>'
    );


    leafNodeToggle();

    assert.equal(getHTMLString(parentNode),
      '<div>'+
        '<span class="spec2">'+
          '1'+
        '</span>'+
      '</div>'
    );
  });
});
