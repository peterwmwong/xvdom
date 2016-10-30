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

var CREATE_BY_TYPE = {
  text: text,
  empty: empty,
  object: object,
  array: array
}

function foo(type){
  return CREATE_BY_TYPE[type]();
}

start();

var sum = 0;
for(var i = 0; i < ITERATIONS; ++i){
  sum += foo(dynamicType(makeDynamic(i)));
}

stop();
