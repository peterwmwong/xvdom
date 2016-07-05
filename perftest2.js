function a(){
  console.log(typeof null, typeof null === 'undefined');
}

a();
%OptimizeFunctionOnNextCall(a);
a();
