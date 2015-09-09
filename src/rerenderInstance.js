import {rerenderDynamic} from './rerenderDynamic.js';

export function rerenderInstance(value, valuesAndContext, valueIndex, contextIndex){
  const node     = valuesAndContext[contextIndex + 1];
  const prevSpec = node.xvdom.spec;

  if(prevSpec === (value && value.spec)){
    prevSpec.rerender(value.values, node.xvdom.values);
    valuesAndContext[valueIndex] = node.xvdom = value;
  }
  else{
    rerenderDynamic(value, valuesAndContext, valueIndex, contextIndex);
  }
}
