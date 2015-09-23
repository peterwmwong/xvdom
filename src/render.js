function recycle(stash, node){
  if(stash) stash.push(node);
}

function getRecycled(stash){
  if(stash) return stash.pop();
}

export function rerenderProp(attr, value, valuesAndContext, valueIndex, rerenderIndex, rerenderContextIndex){
  valuesAndContext[valueIndex] = value;
  valuesAndContext[rerenderContextIndex][attr] = value;
}

export function setDynamicProp(node, attr, valueContext, valueIndex, rerenderIndex, rerenderContextIndex){
  node[attr] = valueContext[valueIndex];
  valueContext[rerenderIndex] = rerenderProp;
  valueContext[rerenderContextIndex] = node;
}

export function renderArray(frag, array){
  const length     = array.length;
  let item;

  for(let i=0; i<length; ++i){
    item = array[i];
    frag.appendChild(item._node = renderInstance(item));
  }
  return frag.appendChild(document.createTextNode(''));
}

export function rerenderText(value, valuesAndContext, valueIndex, rerenderIndex, rerenderContextIndex){
  if(value == null || value.constructor === String){
    valuesAndContext[valueIndex] = value;
    valuesAndContext[rerenderContextIndex].nodeValue = value || '';
  }
  else{
    rerenderDynamic(value, valuesAndContext, valueIndex, rerenderIndex, rerenderContextIndex);
  }
}

export function rerenderDynamic(value, valuesAndContext, valueIndex, rerenderIndex, rerenderContextIndex){
  const prevNode = valuesAndContext[rerenderContextIndex];
  valuesAndContext[valueIndex] = value;
  prevNode.parentNode.replaceChild(
    createDynamic(valuesAndContext, valueIndex, rerenderIndex, rerenderContextIndex),
    prevNode
  );
}

export function rerenderInstance(value, valuesAndContext, valueIndex, rerenderIndex, rerenderContextIndex){
  const node     = valuesAndContext[rerenderContextIndex];
  const prevSpec = node.xvdom.spec;

  if(prevSpec === (value && value.spec)){
    prevSpec.rerender(value.values, node.xvdom.values);
    valuesAndContext[valueIndex] = node.xvdom = value;
  }
  else{
    rerenderDynamic(value, valuesAndContext, valueIndex, rerenderIndex, rerenderContextIndex);
  }
}

export function renderInstance(instance){
  const {spec, values} = instance;
  let node = getRecycled(spec.recycled);
  if(node){
    spec.rerender(values, node.xvdom.values);
    return node;
  }

  node       = spec.render(values);
  node.xvdom = instance;
  return node;
}

function removeArrayNodes(list, parentNode){
  let item, node;
  while(item = list.pop()){
    recycle(item.spec.recycled, node = item._node);
    parentNode.removeChild(node);
  }
}

export function rerenderArray(list, valuesAndContext, valueIndex, rerenderIndex, rerenderContextIndex){
  const markerNode = valuesAndContext[rerenderContextIndex];
  const parentNode = markerNode.parentNode;

  if(!list || list.constructor !== Array){
    removeArrayNodes(valuesAndContext[valueIndex], parentNode);
    rerenderDynamic(list, valuesAndContext, valueIndex, rerenderIndex, rerenderContextIndex);
    return;
  }

  const length    = list.length;
  const oldList   = valuesAndContext[valueIndex];
  const oldLength = oldList.length;
  let i, node, value, insertBeforeNode;

  valuesAndContext[valueIndex] = list;
  if(length === 0){
    removeArrayNodes(oldList, parentNode);
    return;
  }

  if (oldLength === 0){
    i = 0;
    while(i < length){
      value = list[i++];
      value._node = node = renderInstance(value);
      parentNode.insertBefore(node, markerNode);
    }
    return;
  }

  let oldEndIndex     = oldLength - 1;
  let endIndex        = length - 1;
  let oldStartIndex   = 0;
  let startIndex      = 0;
  let successful      = true;
  let oldStartItem, oldEndItem, startItem, endItem, nextItem;

  outer: while(successful && oldStartIndex <= oldEndIndex && startIndex <= endIndex){
    successful = false;

    oldStartItem = oldList[oldStartIndex];
    startItem = list[startIndex];
    while (oldStartItem.key === startItem.key){
      node = oldStartItem._node;
      startItem._node = rerender(node, startItem);

      oldStartIndex++; startIndex++;
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
      endItem._node = rerender(node, endItem);

      oldEndIndex--; endIndex--;
      if (oldStartIndex > oldEndIndex || startIndex > endIndex){
        break outer;
      }
      oldEndItem = oldList[oldEndIndex];
      endItem = list[endIndex];
      successful = true;
    }

    while (oldStartItem.key === endItem.key){
      nextItem = endIndex + 1 < length ? list[endIndex + 1]._node : markerNode;
      node = oldStartItem._node;
      endItem._node = node = rerender(node, endItem);
      if(oldEndItem.key !== endItem.key){
        parentNode.insertBefore(node, nextItem);
      }
      oldStartIndex++; endIndex--;
      if (oldStartIndex > oldEndIndex || startIndex > endIndex){
        break outer;
      }
      oldStartItem = oldList[oldStartIndex];
      endItem = list[endIndex];
      successful = true;
    }

    while (oldEndItem.key === startItem.key){
      node = oldEndItem._node;
      startItem._node = node = rerender(node, startItem);
      nextItem = oldStartItem._node;
      if(oldStartItem.key !== startItem.key){
        if(nextItem){
          parentNode.insertBefore(node, nextItem);
        }
        else{
          parentNode.appendChild(node);
        }
      }
      oldEndIndex--; startIndex++;
      if (oldStartIndex > oldEndIndex || startIndex > endIndex){
        break outer;
      }
      oldEndItem = oldList[oldEndIndex];
      startItem = list[startIndex];
      successful = true;
    }
  }
  if(oldStartIndex > oldEndIndex){
    insertBeforeNode = endItem ? endItem._node : markerNode;
    while(startIndex <= endIndex){
      startItem = list[startIndex++];
      startItem._node = node = renderInstance(startItem);
      parentNode.insertBefore(node, insertBeforeNode);
    }
  }
  else if(startIndex > endIndex){
    while(oldStartIndex <= oldEndIndex){
      oldStartItem = oldList[oldStartIndex++];
      recycle(oldStartItem.spec.recycled, node = oldStartItem._node);
      parentNode.removeChild(node);
    }
  }
  else{
    const oldListNodeKeyMap = {};
    let saveItem = oldStartItem;
    let item, prevItem;
    i = oldStartIndex;

    if(i <= oldEndIndex){
      item = oldList[i++];
      oldListNodeKeyMap[item.key] = prevItem = item;
    }

    while(i <= oldEndIndex){
      prevItem.next = item = oldList[i++];
      oldListNodeKeyMap[item.key] = prevItem = item;
    }

    while(startIndex <= endIndex){
      startItem = list[startIndex++];
      item = oldListNodeKeyMap[startItem.key];
      if(item){
        node = rerender(item._node, startItem);
        item._node = null;

      }
      else{
        node = renderInstance(startItem);
      }
      startItem._node = node;
      parentNode.insertBefore(node, markerNode);
    }

    while(saveItem){
      node = saveItem._node;
      if(node){
        recycle(saveItem.spec.recycled, node);
        parentNode.removeChild(node);
      }
      saveItem = saveItem.next;
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

export function createDynamic(valuesAndContext, valueIndex, rerenderIndex, rerenderContextIndex){
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

  valuesAndContext[rerenderIndex]     = rerenderFunc;
  valuesAndContext[rerenderContextIndex] = context;
  return node;
}

export function unmount(node){
  if(node.xvdom){
    recycle(node.xvdom.spec.recycled, node);
  }
  if(node.parentNode) node.parentNode.removeChild(node);
}
