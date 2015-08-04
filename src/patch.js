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
  for(let i=0; i<vchildren.length; ++i){
    parentNode.appendChild(createNode(vchildren[i], values, parentNode));
  }
}

function createElement({el, props, children}, values){
  const node = document.createElement(el);
  if(props)    applyProps(node, props, values);
  if(children) createAddChildren(node, children, values);
  return node;
}

function rerenderValue(parentNode, node, prevValue, value){
  if(typeof prevValue === 'string'){
    if(typeof value === 'string' && prevValue !== value){
      node.textContent = value;
      return rerenderValue.bind(null, parentNode, node, value);
    }
  }
  else{
    const newNode = createNodeFromValue(value);
    parentNode.replaceChild(newNode, node);
    return rerenderValue.bind(null, parentNode, newNode, value);
  }
}

function createNodeFromValue(value, parentNode, values){
  return (
      typeof value === 'string' ? document.createTextNode(value)
    // : value instanceof Array    ?
    : createNodeFromSpec(value, values, parentNode)
  );
}

function createAndRegisterNodeFromValue(value, parentNode, values){
  const node = createNodeFromValue(value);
  values.push(rerenderValue.bind(null, parentNode, node, value));
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

function createNodeFromSpec({template, values}){
  return createNode(template, values);
}

function initialPatch(node, spec){
  node.appendChild(createNodeFromSpec(spec));
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
