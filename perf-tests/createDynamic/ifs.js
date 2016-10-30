var {
  makeDynamic,
  text,
  empty,
  object,
  array,

  ITERATIONS,
  start,
  stop
} = require('./common');

function foo(v){
  if(v instanceof Object){
    return v instanceof Array ? array() : object();
  };
  return v == null || v === true || v === false ? empty() : text();
}

start();

var sum = 0;
for(var i = 0; i < ITERATIONS; ++i){
  sum += foo(makeDynamic(i));
}

stop();
