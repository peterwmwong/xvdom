export function rerenderProp(attr, value, valuesAndContext, valueIndex, contextIndex){
  valuesAndContext[valueIndex] = value;
  valuesAndContext[contextIndex + 1][attr] = value;
}

export function setDynamicProp(node, attr, valueContext, valueIndex, contextIndex){
  node[attr] = valueContext[valueIndex];
  valueContext[contextIndex] = rerenderProp;
  valueContext[contextIndex + 1] = node;
}

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

export function rerenderText(value, valuesAndContext, valueIndex, contextIndex){
  if(value == null || value.constructor === String){
    valuesAndContext[valueIndex] = value;
    valuesAndContext[contextIndex + 1].nodeValue = value || '';
  }
  else{
    rerenderDynamic(value, valuesAndContext, valueIndex, contextIndex);
  }
}


export function rerenderArray(value, valuesAndContext, valueIndex, contextIndex){
  throw 'rerenderArray: Not implemented yet';
}

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

export function renderInstance(value){
  const node = value.spec.render(value.values);
  node.xvdom = value;
  return node;
}

export function rerender(node, instance){
  const prevInstance = node.xvdom;
  instance.spec.rerender(instance.values, prevInstance.values);
}

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
