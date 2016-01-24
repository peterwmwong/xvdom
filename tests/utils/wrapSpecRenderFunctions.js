export default (inst, onRender, onRerender)=>{
  if(!inst.$s.isTrackingCount){
    inst.$s.isTrackingCount = true;

    const {c, u} = inst.$s;
    inst.$s.c = (...args)=>(
      onRender(),
      c(...args)
    );

    inst.$s.u = (...args)=>(
      onRerender(),
      u(...args)
    );
  }
  return inst;
};
