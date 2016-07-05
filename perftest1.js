#!/usr/bin/env node --allow-natives-syntax

'use strict';

function hasFastElements(obj) {
  return (
       %HasFastSmiElements(obj)
    || %HasFastSmiOrObjectElements(obj)
    || %HasFastObjectElements(obj)
    || %HasFastDoubleElements(obj)
    || %HasFastHoleyElements(obj)
  );
}
//
// console.log(hasFastElements({
//   a: 0,
//   b: {z: 1},
//   c: "yolo",
//   d: [
//     {key: 2, test: "val1"},
//     {key: 3, test: "val2"},
//     {key: 4, test: "val3"}
//   ]
// }));

console.log(%HasFastSmiOrObjectElements([1,2,3,4,"hello",6,7,8,9,10]))
