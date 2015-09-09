import {renderInstance}   from './renderInstance.js';
import {renderArray}      from './renderArray.js';

import {rerenderText}     from './rerenderText.js';
import {rerenderInstance} from './rerenderInstance.js';
import {rerenderArray}    from './rerenderArray.js';

export function createDynamic(valuesAndContext, valueIndex, contextIndex){
  const value            = valuesAndContext[valueIndex] || '';
  const valueConstructor = value.constructor;
  let node, context, rerenderFunc;

  if(valueConstructor === Object){
    rerenderFunc = rerenderInstance;
    context = node = renderInstance(value);
  }
  else if(valueConstructor === String){
    rerenderFunc = rerenderText;
    context = node = document.createTextNode(value);
  }
  else if(valueConstructor === Array){
    rerenderFunc = rerenderArray;
    node = document.createDocumentFragment();
    context = renderArray(node, value);
  }

  valuesAndContext[contextIndex]     = rerenderFunc;
  valuesAndContext[contextIndex + 1] = context;
  return node;
}
