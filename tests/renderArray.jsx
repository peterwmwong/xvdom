// import assert        from 'assert';
// import getHTMLString from './utils/getHTMLString.js';
// import xvdom    from '../src/index.js';
//
// describe('renderArray - frag, array', ()=>{
//   let markerNode, frag;
//
//   beforeEach(()=>{
//     frag = document.createDocumentFragment();
//     markerNode = xvdom.renderArray(
//       frag,
//       [
//         <a key='one'></a>,
//         <i key='two'></i>
//       ]
//     );
//   });
//
//   it('returns marker node (empty text node) with map (key to node)', ()=>{
//     assert(markerNode instanceof Text);
//   });
//
//   it('renders array items to `frag`', ()=>{
//     const parentNode = document.createElement('div');
//     parentNode.appendChild(frag);
//
//     assert.equal(getHTMLString(parentNode),
//       '<div>'+
//         '<a></a>'+
//         '<i></i>'+
//       '</div>'
//     );
//   });
// });
