export default (inst, onRender, onRerender)=>{
  if(!inst.spec.isTrackingCount){
    inst.spec.isTrackingCount = true;

    const origRender = inst.spec.render;
    inst.spec.render = (...args)=>(
      onRender(),
      origRender(...args)
    );

    const origRerender = inst.spec.rerender;
    inst.spec.rerender = (...args)=>(
      onRerender(),
      origRerender(...args)
    );
  }
  return inst;
};
