import {createDynamic} from './createDynamic.js';

function removeArrayNodes(keyMap, parentNode){
  for(let key in keyMap){
    parentNode.removeChild(keyMap[key]);
  }
}

function replacePrevNode(prevNode, newNode){
  const parentNode = prevNode.parentNode;
  if(prevNode.xvdomKeymap){
    removeArrayNodes(prevNode.xvdomKeymap, parentNode);
  }

  parentNode.replaceChild(newNode, prevNode);
}

export function rerenderDynamic(value, valuesAndContext, valueIndex, contextIndex){
  const prevNode = valuesAndContext[contextIndex + 1];
  valuesAndContext[valueIndex] = value;
  replacePrevNode(prevNode, createDynamic(valuesAndContext, valueIndex, contextIndex));
}
