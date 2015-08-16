function spyOn(obj, funcName){
  if(!obj[funcName] || obj[funcName].isSpy) return;

  const origFunc = obj[funcName];
  function funcSpy(){
    ++funcSpy.count;
    return origFunc.apply(this, arguments);
  }
  funcSpy.count = 0;
  funcSpy.isSpy = true;
  funcSpy.uninstall = ()=>obj[funcName] = origFunc;

  spyOn.allSpies.push(obj[funcName] = funcSpy);
}
spyOn.allSpies = [];
spyOn.uninstall = ()=>{
  spyOn.allSpies.forEach(spy=>spy.uninstall());
  spyOn.allSpies = [];
};
spyOn.resetSpyCounts = ()=>spyOn.allSpies.forEach(spy=>spy.count = 0);

export default spyOn;
