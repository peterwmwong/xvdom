var objs = [
  {aaa:1, bbb:2, ccc:3, ddd:4, eee:5},
  {aaa:2, bbb:2, ccc:3, ddd:4},
  {aaa:3, bbb:2, ccc:3},
  {aaa:4, bbb:2},
  {aaa:5},
  {bbb:2, ccc:3, ddd:4, eee:5},
  {ccc:3, ddd:4, eee:5},
  {ddd:4, eee:5},
  {eee:5},
  {aaa:1, bbb:2, ddd:4, eee:5},
  {aaa:1, ccc:3, ddd:4, eee:5},
  {aaa:1, bbb:2, ccc:3, eee:5},
  {aaa:1, ddd:4, eee:5},
  {aaa:1, bbb:2, eee:5},
];

var NUM = objs.length;

var keyValues = objs.map(o =>
  Object.keys(o).reduce(
    ((acc, key)=> {
      acc.push(key);
      acc.push(o[key]);
      return acc;
    }),
    []
  )
);

var keys = objs.map(o => Object.keys(o));
var values = objs.map(o =>
  Object.keys(o).map((key)=> o[key])
);

function objAssign(dest, i) {
  return Object.assign(dest, objs[i]);
}

function keyValuesAssign(dest, i) {
  var zip    = keyValues[i];
  var length = zip.length;
  var j      = 0;
  while(j < length){
    dest[zip[j++]] = zip[j++];
  }
  return dest;
}

function seprateKeyValuesAssign(dest, i) {
  var _keys   = keys[i];
  var _values = values[i];
  var length  = _keys.length;
  var j       = 0;
  while(j < length){
    dest[_keys[j]] = _values[j++];
  }
  return dest;
}

function bench() {
  var sum=0;
  var result;
  for(var i=0; i<1000; ++i){
    // result = objAssign({}, i % NUM);
    result = keyValuesAssign({}, i % NUM);
    // result = seprateKeyValuesAssign({}, i % NUM);
    sum += result.aaa || 0;
  }
  return sum;
}

var start  = process.hrtime();
var result = bench();
var end    = process.hrtime(start);
console.log(result, Math.round((end[0]*1000) + (end[1]/1000000)), 'ms');
