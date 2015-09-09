export function rerenderProp(attr, value, valuesAndContext, valueIndex, contextIndex){
  valuesAndContext[valueIndex] = value;
  valuesAndContext[contextIndex + 1][attr] = value;
}

export function setDynamicProp(node, attr, valueContext, valueIndex, contextIndex){
  node[attr] = valueContext[valueIndex];
  valueContext[contextIndex] = rerenderProp;
  valueContext[contextIndex + 1] = node;
}
