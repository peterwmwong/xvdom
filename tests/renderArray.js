import assert        from 'assert';
import getHTMLString from './utils/getHTMLString.js';
import {renderArray} from '../src/index.js';

describe('renderArray - frag, array', ()=>{
  const INSTANCE1 = {
    key: 'one',
    spec:{render: ()=>document.createElement('a')}
  };
  const INSTANCE2 = {
    key: 'two',
    spec:{render: ()=>document.createElement('i')}
  };
  let markerNode, frag;

  beforeEach(()=>{
    frag = document.createDocumentFragment();
    markerNode = renderArray(frag, [INSTANCE1, INSTANCE2]);
  });

  it('returns marker node (empty text node) with map (key to node)', ()=>{
    assert(markerNode instanceof Text);
  });

  it('renders array items to `frag`', ()=>{
    const parentNode = document.createElement('div');
    parentNode.appendChild(frag);

    assert.equal(getHTMLString(parentNode),
      '<div>'+
        '<a></a>'+
        '<i></i>'+
      '</div>'
    );
  });
});
