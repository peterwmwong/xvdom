
export function rerenderArray(list, oldList, markerNode, valuesAndContext, rerenderFuncProp, rerenderContextNode){
  const parentNode = markerNode.parentNode;

  if(!list || list.constructor !== Array){
    removeArrayNodes(oldList, parentNode);
    rerenderDynamic(list, oldList, markerNode, valuesAndContext, rerenderFuncProp, rerenderContextNode);
    return;
  }

  const length    = list.length;
  const oldLength = oldList.length;
  let i, node, value, insertBeforeNode;

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

    nextItem = endIndex + 1 < length ? list[endIndex + 1]._node : markerNode;
    while (oldStartItem.key === endItem.key){
      node = oldStartItem._node;
      endItem._node = node = rerender(node, endItem);
      if(oldEndItem.key !== endItem.key){
        nextItem = parentNode.insertBefore(node, nextItem);
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
    insertBeforeNode = oldEndItem._node;
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
        if(item === oldEndItem) insertBeforeNode = insertBeforeNode.nextSibling;
        node = rerender(item._node, startItem);
        item._node = null;
      }
      else{
        node = renderInstance(startItem);
      }
      startItem._node = node;
      parentNode.insertBefore(node, insertBeforeNode);
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
