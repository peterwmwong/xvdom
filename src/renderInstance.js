export function renderInstance(value){
  const node = value.spec.render(value.values);
  node.xvdom = value;
  return node;
}
