// TODO(babel-plugin-xvdom): Remove this when you can simply add the `recycle`
//                           attribute (ex. `<div recycle />`) to make specs as
//                           recyclable.
export default inst=>(
  inst.$s.recycled = inst.$s.recycled || [],
  inst
);
