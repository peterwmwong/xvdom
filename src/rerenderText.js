import {rerenderDynamic} from './rerenderDynamic.js';

export function rerenderText(value, valuesAndContext, valueIndex, contextIndex){
  if(value == null || value.constructor === String){
    valuesAndContext[valueIndex] = value;
    valuesAndContext[contextIndex + 1].nodeValue = value || '';
  }
  else{
    rerenderDynamic(value, valuesAndContext, valueIndex, contextIndex);
  }
}
