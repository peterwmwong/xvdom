function applyPropValue(node, prop, value){
  node[prop] = value;
  return applyPropValue.bind(null, node, prop);
}

function applyProp(node, prop, propValue, values){
  if(prop[0] === '$'){
    const actualProp = prop.slice(1);
    applyPropValue(node, actualProp, values[propValue]);

    // Since there's a one-to-one mapping to value to node,
    // we store the function to apply a new value upon rerender
    values.push(applyPropValue.bind(null, node, actualProp));
  }
  else{
    applyPropValue(node, prop, propValue);
  }
}

function applyProps(node, props, values){
  for(let key in props) applyProp(node, key, props[key], values);
}

function createAddChildren(parentNode, vchildren, values){
  const length = vchildren.length;
  for(let i=0; i<length; ++i){
    parentNode.appendChild(createNode(vchildren[i], values, parentNode));
  }
}

function createElement({el, props, children}, values){
  const node = document.createElement(el);
  if(props)    applyProps(node, props, values);
  if(children) createAddChildren(node, children, values);
  return node;
}

function rerenderTextNodeValue(parentNode, node, prevValue, value){
  if(typeof value === 'string'){
    if(prevValue !== value) node.textContent = value;
    return rerenderTextNodeValue.bind(null, parentNode, node, value);
  }
  return rerenderValue(parentNode, node, prevValue, value);
}

function rerenderValue(parentNode, node, prevValue, value){
  const newNode = createNodeFromValue(value);
  parentNode.replaceChild(newNode, node);
  return getRerenderFuncForValue(value).bind(null, parentNode, newNode, value);
}

function getRerenderFuncForValue(value){
  return typeof value === 'string' ? rerenderTextNodeValue : rerenderValue;
}

function createNodeFromValue(value){
    return typeof value === 'string' ? document.createTextNode(value)
  : createNode(value.template, value.values);
}

function createAndRegisterFromArrayValue(arrayValue, values){
  const frag = document.createDocumentFragment();
  const length = arrayValue.length;
  for(let i=0; i<length; ++i){
    frag.appendChild(createNodeFromValue(arrayValue[i]));
  }
  return frag;
}

function createAndRegisterNodeFromValue(value, parentNode, values){
  let node, rerenderFunc;
  if(value instanceof Array){
    return createAndRegisterFromArrayValue(value, values);
  }
  else{
    node         = createNodeFromValue(value);
    rerenderFunc = typeof value === 'string' ? rerenderTextNodeValue : rerenderValue;
    values.push(rerenderFunc.bind(null, parentNode, node, value));
  }
  return node;
}

/*
  vnode  : valueRef(number) | vnode({el, props, children})
  values : Array<any>
*/
function createNode(vnode, values, parentNode){
  switch(typeof vnode){
  case 'number':
    return createAndRegisterNodeFromValue(values[vnode], parentNode, values);
  case 'string':
    return document.createTextNode(vnode);
  default:
    return createElement(vnode, values);
  }
}

function initialPatch(node, spec){
  node.appendChild(createNode(spec.template, spec.values));
  node.xvdom = {spec};
}

function rerender(node, {values:newValues}){
  const values = node.xvdom.spec.values;
  let newValue;

  // Only rerender if there are dynamic values
  if(values){
    const length = values.length>>1;
    for(let i=0; i<length; ++i){
      newValue = newValues[i];
      if(values[i] !== newValue){
        newValues.push(values[i+length](newValue));
      }
    }
    node.xvdom.spec.values = newValues;
  }
}

export default function(node, spec){
  if(node.xvdom) rerender(node, spec);
  else initialPatch(node, spec);
}
