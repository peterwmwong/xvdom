import {renderInstance}  from './renderInstance.js';

export function renderArray(frag, array){
  const length     = array.length;
  const markerNode = document.createTextNode('');
  const keyMap     = markerNode.xvdomKeymap = {};
  let item;
  frag.appendChild(markerNode);

  for(let i=0; i<length; ++i){
    item = array[i];
    frag.appendChild(
      keyMap[item.key] = renderInstance(item)
    );
  }
  return markerNode;
}
