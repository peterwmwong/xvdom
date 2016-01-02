const EMPTY_STRING = '';

function recycle(stash, node){
  if(stash) stash.push(node);
}

function insertBefore(parentNode, node, beforeNode){
  return beforeNode ? parentNode.insertBefore(node, beforeNode)
      : parentNode.appendChild(node);
}

function removeArrayNodes(list, parentNode){
  let item;
  while(item = list.pop()){
    recycle(item.spec.recycled, parentNode.removeChild(item._node));
  }
}

export function renderArray(frag, array){
  const length = array.length;
  let item;

  for(let i=0; i<length; ++i){
    item = array[i];
    frag.appendChild(item._node = renderInstance(item));
  }
  return frag.appendChild(document.createTextNode(EMPTY_STRING));
}

export function rerenderText(value, oldValue, contextNode, instance, rerenderFuncProp, rerenderContextNode){
  if(value == null || value.constructor === String){
    contextNode.nodeValue = value || EMPTY_STRING;
    return;
  }
  rerenderDynamic(value, oldValue, contextNode, instance, rerenderFuncProp, rerenderContextNode);
}

export function rerenderDynamic(value, oldValue, contextNode, instance, rerenderFuncProp, rerenderContextNode){
  contextNode.parentNode.replaceChild(
    createDynamic(value, instance, rerenderFuncProp, rerenderContextNode),
    contextNode
  );
}

export function rerenderInstance(value, prevValue, node, instance, rerenderFuncProp, rerenderContextNode){
  const prevSpec = prevValue.spec;

  if(prevSpec === (value && value.spec)){
    prevSpec.rerender(value, prevValue);
    return;
  }

  rerenderDynamic(value, prevValue, node, instance, rerenderFuncProp, rerenderContextNode);
}

export function renderInstance(instance){
  const spec = instance.spec;
  let node = spec.recycled && spec.recycled.pop();
  if(node){
    spec.rerender(instance, node.xvdom);
    return node;
  }

  node = spec.render(instance);
  node.xvdom = instance;
  return node;
}


function rerenderArray_addAllBefore(parentNode, list, length, markerNode){
  let i = 0;
  let value, node;

  while(i < length){
    value = list[i++];
    value._node = node = renderInstance(value);
    insertBefore(parentNode, node, markerNode);
  }
}

function rerenderArray_reconcileWithMap(parentNode, list, oldList, startIndex, endIndex, oldStartItem, oldStartIndex, oldEndItem, oldEndIndex){
  const oldListNodeKeyMap = {};
  let saveItem = oldStartItem;
  let insertBeforeNode = oldEndItem._node;
  let startItem, item, prevItem, node;

  if(oldStartIndex <= oldEndIndex){
    item = oldList[oldStartIndex++];
    oldListNodeKeyMap[item.key] = prevItem = item;
  }

  while(oldStartIndex <= oldEndIndex){
    prevItem.next = item = oldList[oldStartIndex++];
    oldListNodeKeyMap[item.key] = prevItem = item;
  }

  while(startIndex <= endIndex){
    startItem = list[startIndex++];
    item = oldListNodeKeyMap[startItem.key];

    if(item){
      if(item === oldEndItem) insertBeforeNode = insertBeforeNode.nextSibling;
      node = rerender(item._node, startItem);
      item._node = null;
    }
    else{
      node = renderInstance(startItem);
    }
    startItem._node = node;
    insertBefore(parentNode, node, insertBeforeNode);
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

function rerenderArray_reconcile(parentNode, list, length, oldList, oldLength, markerNode){
  const lastIndex   = length - 1;
  let oldEndIndex   = oldLength - 1;
  let endIndex      = lastIndex;
  let oldStartIndex = 0;
  let startIndex    = 0;
  let successful    = true;
  let oldStartItem, oldEndItem, startItem, endItem, nextItem, node, insertBeforeNode;

  outer: while(successful && oldStartIndex <= oldEndIndex && startIndex <= endIndex){
    successful = false;

    oldStartItem = oldList[oldStartIndex];
    startItem = list[startIndex];
    while (oldStartItem.key === startItem.key){
      startItem._node = rerender(oldStartItem._node, startItem);

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
      endItem._node = rerender(oldEndItem._node, endItem);

      oldEndIndex--; endIndex--;
      if (oldStartIndex > oldEndIndex || startIndex > endIndex){
        break outer;
      }
      oldEndItem = oldList[oldEndIndex];
      endItem = list[endIndex];
      successful = true;
    }

    // TODO: try endIndex < lastIndex
    nextItem = endIndex < lastIndex ? list[endIndex + 1]._node : markerNode;
    while (oldStartItem.key === endItem.key){
      endItem._node = node = rerender(oldStartItem._node, endItem);

      // TODO: Is it possible for this to be false?
      if(oldEndItem.key !== endItem.key){
        nextItem = insertBefore(parentNode, node, nextItem);
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
      startItem._node = node = rerender(oldEndItem._node, startItem);

      // TODO: Is it possible for this to be false?
      if(oldStartItem.key !== startItem.key){
        insertBefore(parentNode, node, oldStartItem._node);
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
      insertBefore(
        parentNode,
        (startItem._node = renderInstance(startItem)),
        insertBeforeNode
      );
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
    rerenderArray_reconcileWithMap(parentNode, list, oldList, startIndex, endIndex, oldStartItem, oldStartIndex, oldEndItem, oldEndIndex);
  }
}

function rerenderArrayForReal(parentNode, list, oldList, markerNode, valuesAndContext, rerenderFuncProp, rerenderContextNode){
  const length = list.length;
  const oldLength = oldList.length;
  if(!length){
    removeArrayNodes(oldList, parentNode);
  }
  else if(!oldLength){
    rerenderArray_addAllBefore(parentNode, list, length, markerNode);
  }
  else{
    rerenderArray_reconcile(parentNode, list, length, oldList, oldLength, markerNode);
  }
}

export function rerenderArray(list, oldList, markerNode, valuesAndContext, rerenderFuncProp, rerenderContextNode){
  const parentNode = markerNode.parentNode;
  if(list instanceof Array){
    rerenderArrayForReal(parentNode, list, oldList, markerNode);
  }
  else{
    removeArrayNodes(oldList, parentNode);
    rerenderDynamic(list, undefined, markerNode, valuesAndContext, rerenderFuncProp, rerenderContextNode);
  }
}

export function rerender(node, instance){
  const prevInstance = node.xvdom;
  const spec = instance.spec;
  if(spec === prevInstance.spec){
    spec.rerender(instance, prevInstance);
    return node;
  }

  const newNode = renderInstance(instance);
  node.parentNode.replaceChild(newNode, node);
  return newNode;
}

export function createDynamic(value, instance, rerenderFuncProp, rerenderContextNode){
  value                  = value || EMPTY_STRING;
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

  instance[rerenderFuncProp]    = rerenderFunc;
  instance[rerenderContextNode] = context;
  return node;
}

export function unmount(node){
  if(node.xvdom) recycle(node.xvdom.spec.recycled, node);
  if(node.parentNode) node.parentNode.removeChild(node);
}
