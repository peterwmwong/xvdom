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

function isDynamicEmpty(v){
  return v == null || v === true || v === false;
};

function dynamicType(v){
  if(v instanceof Object){
    return v instanceof Array ? 'array' : 'object';
  };
  return isDynamicEmpty(v) ? 'empty' : 'text';
}

function foo(type){
  switch(type){
    case 'text':   return text();
    case 'empty':  return empty();
    case 'object': return object();
    case 'array':  return array();
  }
}

start();

var sum = 0;
for(var i = 0; i < ITERATIONS; ++i){
  sum += foo(dynamicType(makeDynamic(i)));
}

stop();
