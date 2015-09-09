import assert        from 'assert';
import getHTMLString from './utils/getHTMLString.js';
import {renderArray} from '../src/renderArray.js';

describe('rerenderArray - frag, array', ()=>{
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
    assert.strictEqual(markerNode.xvdomKeymap.one, markerNode.nextSibling);
    assert.strictEqual(markerNode.xvdomKeymap.two, markerNode.nextSibling.nextSibling);
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
