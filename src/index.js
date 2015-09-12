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
  let item;
  frag.appendChild(markerNode);

  for(let i=0; i<length; ++i){
    item = array[i];
    frag.appendChild(item._node = renderInstance(item));
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

export function rerenderDynamic(value, valuesAndContext, valueIndex, contextIndex){
  const prevNode = valuesAndContext[contextIndex + 1];
  valuesAndContext[valueIndex] = value;
  prevNode.parentNode.replaceChild(
    createDynamic(valuesAndContext, valueIndex, contextIndex),
    prevNode
  );
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

// export function rerenderArray(value, valuesAndContext, valueIndex, contextIndex){
//   const keyMap = valuesAndContext[contextIndex + 1].xvdomKeymap;
//   const length = value.length;
//   let i = 0;
//   let item, node, itemInstance;
//
//   while(i < length){
//     item         = value[i++];
//     node         = keyMap[item.key];
//     itemInstance = node.xvdom;
//
//     itemInstance.spec.rerender(item.values, itemInstance.values);
//   }
//
//   valuesAndContext[valueIndex] = value;
// }

function removeArrayNodes(list, parentNode){
  const length = list.length;
  for(let i=0; i<length; ++i){
    parentNode.removeChild(list[i]._node);
  }
}

export function rerenderArray(list, valuesAndContext, valueIndex, contextIndex){
  const markerNode = valuesAndContext[contextIndex + 1];
  const parentNode = markerNode.parentNode;

  if(!list || list.constructor !== Array){
    removeArrayNodes(valuesAndContext[valueIndex], parentNode);
    rerenderDynamic(list, valuesAndContext, valueIndex, contextIndex);
    return;
  }

  const length    = list.length;
  const oldList   = valuesAndContext[valueIndex];
  const oldLength = oldList.length;
  let i, key, node, value, insertBeforeNode;

  valuesAndContext[valueIndex] = list;

  if(length === 0){
    removeArrayNodes(oldList, parentNode);
    return;
  }

  if (oldLength === 0){
    insertBeforeNode = markerNode.nextSibling;
    i = 0;
    while(i < length){
      value = list[i++];
      parentNode.insertBefore(
        (value._node = renderInstance(value)),
        insertBeforeNode
      );
    }
    return;
  }

  const afterLastNode = oldLength ? oldList[oldLength - 1]._node.nextSibling : null;
  let oldEndIndex     = oldLength - 1;
  let endIndex        = length - 1;
  let oldStartIndex   = 0;
  let startIndex      = 0;
  let successful      = true;
  let oldStartItem, oldEndItem, startItem, endItem;

  outer: while(successful && oldStartIndex <= oldEndIndex && startIndex <= endIndex){
    successful = false;

    oldStartItem = oldList[oldStartIndex];
    startItem = list[startIndex];
    while (oldStartItem.key === startItem.key){
      node = oldStartItem._node;
      startItem._node = node.xvdom ? rerender(node, startItem) : node;

      ++oldStartIndex; ++startIndex;
      if (oldStartIndex > oldEndIndex || startIndex > endIndex){
        break outer;
      }
      oldStartItem = oldList[oldStartIndex];
      startItem = list[startIndex];
      successful = true;
    }

    oldEndItem = oldList[oldEndIndex];
    endItem = list[endIndex];
    while (oldEndItem.key === endItem.key){
      node = oldEndItem._node;
      endItem._node = node.xvdom ? rerender(node, endItem) : node;

      --oldEndIndex; --endIndex;
      if (oldStartIndex > oldEndIndex || startIndex > endIndex){
        break outer;
      }
      oldEndItem = oldList[oldEndIndex];
      endItem = list[endIndex];
      successful = true;
    }

    while (oldStartItem.key === endItem.key){
      node = oldStartItem._node;
      endItem._node = node.xvdom ? rerender(node, endItem) : node;

      if(oldEndItem.key !== endItem.key){
        parentNode.insertBefore(node, oldEndItem._node.nextSibling);
      }
      ++oldStartIndex; --endIndex;
      if (oldStartIndex > oldEndIndex || startIndex > endIndex){
        break outer;
      }
      oldStartItem = oldList[oldStartIndex];
      endItem = list[endIndex];
      successful = true;
    }

    while (oldEndItem.key === startItem.key){
      node = oldEndItem._node;
      startItem._node = node.xvdom ? rerender(node, startItem) : node;

      if(oldStartItem.key !== startItem.key){
        parentNode.insertBefore(node, oldStartItem._node);
      }
      --oldEndIndex; ++startIndex;
      if (oldStartIndex > oldEndIndex || startIndex > endIndex){
        break outer;
      }
      oldEndItem = oldList[oldEndIndex];
      startItem = list[startIndex];
      successful = true;
    }
  }
  if(oldStartIndex > oldEndIndex){
    insertBeforeNode = endItem ? endItem._node : afterLastNode;
    while(startIndex <= endIndex){
      startItem = list[startIndex++];
      parentNode.insertBefore(
        (startItem._node = renderInstance(startItem)),
        insertBeforeNode
      );
    }
  }
  else if(startIndex > endIndex){
    while(oldStartIndex <= oldEndIndex){
      oldStartItem = oldList[oldStartIndex++];
      parentNode.removeChild(oldStartItem._node);
    }
  }
  else{
    const oldListNodeKeyMap = {};
    while(oldStartItem){
      oldListNodeKeyMap[oldStartItem.key] = oldStartItem._node;
      oldStartItem = oldList[++oldStartIndex];
    }

    while(startIndex <= endIndex){
      startItem = list[startIndex++];
      node = oldListNodeKeyMap[startItem.key];
      if(!node){
        node = renderInstance(startItem);
      }
      else if(node.xvdom){
        node = rerender(node, startItem);
      }

      delete oldListNodeKeyMap[startItem.key];
      parentNode.insertBefore((startItem._node = node), afterLastNode);
    }

    for(key in oldListNodeKeyMap){
      parentNode.removeChild(oldListNodeKeyMap[key]);
    }
  }
}

export function rerender(node, instance){
  const prevInstance   = node.xvdom;
  const {spec, values} = instance;
  if(spec === prevInstance.spec){
    spec.rerender(values, prevInstance.values);
    return node;
  }

  const newNode = renderInstance(instance);
  node.parentNode.replaceChild(newNode, node);
  return newNode;

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
