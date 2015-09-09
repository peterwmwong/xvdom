export default function rerender(node, instance){
  const prevInstance = node.xvdom;
  instance.spec.rerender(instance.values, prevInstance.values);
}
