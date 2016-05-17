import assert        from 'assert';
import getHTMLString from './utils/getHTMLString.js';
import xvdom         from '../src/index.js';

let leafNode;
const LeafNode = (component)=>{
  const {props, state} = component;
  leafNode = component;
  return state.spec
    ? <span className="spec1">{props.count}</span>
    : <span className="spec2">{props.count}</span>;
};
LeafNode.state = {
  onInit :        () => ({spec: false}),
  onProps: ({state}) => ({...state}),
  toggle : ({state}) => ({spec: !state.spec})
};

let node;
const Node = (component)=>{
  node = component;
  return <LeafNode count={component.state.count}/>;
};
Node.state = {
  onInit   :        () => ({count: 0}),
  increment: ({state}) => ({count: state.count + 1})
};

describe('Stateful Components Nested', ()=>{
  it('renders', ()=>{
    let parentNode = document.createElement('div');
    parentNode.appendChild(xvdom.render(<Node />));

    assert.equal(getHTMLString(parentNode),
      '<div>'+
        '<span class="spec2">'+
          '0'+
        '</span>'+
      '</div>'
    );

    leafNode.bindSend('toggle')();

    assert.equal(getHTMLString(parentNode),
      '<div>'+
        '<span class="spec1">'+
          '0'+
        '</span>'+
      '</div>'
    );

    node.bindSend('increment')();

    assert.equal(getHTMLString(parentNode),
      '<div>'+
        '<span class="spec1">'+
          '1'+
        '</span>'+
      '</div>'
    );


    leafNode.bindSend('toggle')();

    assert.equal(getHTMLString(parentNode),
      '<div>'+
        '<span class="spec2">'+
          '1'+
        '</span>'+
      '</div>'
    );
  });
});
