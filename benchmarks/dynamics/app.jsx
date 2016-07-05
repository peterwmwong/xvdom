import xvdom, {REF_TO_TAG} from '../../src/index.js';

const TAG_TO_REF = REF_TO_TAG.reduce(
  (acc, tag, i)=>(
    (acc[tag] = i),
    acc
  ),
  {}
);

const flatten = (arrayOfArrays)=>
  arrayOfArrays.reduce(
    (acc, arr)=> acc.concat(arr),
    []
  );

const _elChildren = (children=[])=> {
  const result = (
    children.length
      ? [6, ...flatten(children), 7]
      : children
  );
  return result;
};

const _static = (valueId)=> [5, valueId];
const dynamic = (valueId)=> [4, valueId];

const props = ({dynamics=[], statics=[]})=>[
  statics.length,
  (dynamics.length + statics.length),
  ...dynamics,
  ...statics
];

const el = (tag, ...children)=> [
  0, TAG_TO_REF[tag],
    ..._elChildren(children)
];

const componentWithProps = (comp, _props)=> [
  3, comp, ...props(_props)
];


// Generated by instrumenting xvdom to count every dynamic rendered for a
// non-trivial app (currently ticker).
const COUNTS = {
  boolean :  1,
  null    : 10,
  string  : 49,
  number  :  0,
  instance: 36,
  array   :  5
};

const DYNAMIC_FACTORIES = {
  string:   (i)=> `hello ${String.fromCharCode(65 + (i % 26))}`,
  instance: (i)=> <b>hello</b>,
  null:     (i)=> null,
  array:    (i)=> [],
  boolean:  (i)=> !(i % 2),
  number:   (i)=> i
};

const createValues = (counts, numValues, reverse)=>{
  const keys = (reverse ? (a=>a.reverse()) : (a=>a))(Object.keys(counts));
  const sum = keys.reduce(((sum, key) => sum + counts[key]), 0);
  const values = [];
  let i=0;

  keys.forEach(key =>{
    let numOfDynamics = (100 * (counts[key] / sum))|0;
    while(numOfDynamics--){
      values[i++] = DYNAMIC_FACTORIES[key](i);
    }
  });

  return values;
};


// const BYTECODE_CompPart = window.BYTECODE_CompPart = el('div',
//   el('span', dynamic(0)),
//   el('span', dynamic(1)),
//   el('span', dynamic(2)),
//   el('span', dynamic(3)),
//   el('span', dynamic(4))
// );
const BYTECODE_CompPart = {
  b: [0,2,6,0,4,6,4,0,7,0,4,6,4,1,7,0,4,6,4,2,7,0,4,6,4,3,7,0,4,6,4,4,7,7],
  s: []
};

const CompPart = ({start, values})=> {
  return {
    t: BYTECODE_CompPart,
    d: [
      values[0 + start],
      values[1 + start],
      values[2 + start],
      values[3 + start],
      values[4 + start]
    ]
  };
};

const BYTECODE_CompPartPrefix = {
  b: [0,2,6,0,4,6,0,4,6,5,0,7,4,0,7,0,4,6,0,4,6,5,0,7,4,1,7,0,4,6,0,4,6,5,0,7,4,2,7,0,4,6,0,4,6,5,0,7,4,3,7,0,4,6,0,4,6,5,0,7,4,4,7,7],
  s: ['prefix']
};
// const BYTECODE_CompPartPrefix = window.BYTECODE_CompPartPrefix =  el('div',
//   el('span',
//     el('span', _static(0)),
//     dynamic(0)
//   ),
//   el('span',
//     el('span', _static(0)),
//     dynamic(1)
//   ),
//   el('span',
//     el('span', _static(0)),
//     dynamic(2)
//   ),
//   el('span',
//     el('span', _static(0)),
//     dynamic(3)
//   ),
//   el('span',
//     el('span', _static(0)),
//     dynamic(4
//   ))
// );

const CompPartPrefix = ({start, values})=>({
  t: BYTECODE_CompPartPrefix,
  d: [
    values[0 + start],
    values[1 + start],
    values[2 + start],
    values[3 + start],
    values[4 + start]
  ]
});

// const BYTECODE_Comp = window.BYTECODE_Comp = el('div',
//   componentWithProps(0, {dynamics: [0], statics: [2]}),
//   componentWithProps(0, {dynamics: [0], statics: [4]}),
//   componentWithProps(0, {dynamics: [0], statics: [6]}),
//   componentWithProps(0, {dynamics: [0], statics: [8]}),
//   componentWithProps(0, {dynamics: [0], statics: [10]}),
//   componentWithProps(0, {dynamics: [0], statics: [12]}),
//   componentWithProps(0, {dynamics: [0], statics: [14]}),
//   componentWithProps(0, {dynamics: [0], statics: [16]}),
//   componentWithProps(0, {dynamics: [0], statics: [18]}),
//   componentWithProps(0, {dynamics: [0], statics: [20]}),
//
//   componentWithProps(1, {dynamics: [0], statics: [22]}),
//   componentWithProps(1, {dynamics: [0], statics: [24]}),
//   componentWithProps(1, {dynamics: [0], statics: [26]}),
//   componentWithProps(1, {dynamics: [0], statics: [28]}),
//   componentWithProps(1, {dynamics: [0], statics: [30]}),
//   componentWithProps(1, {dynamics: [0], statics: [32]}),
//   componentWithProps(1, {dynamics: [0], statics: [34]}),
//   componentWithProps(1, {dynamics: [0], statics: [36]}),
//   componentWithProps(1, {dynamics: [0], statics: [38]}),
//   componentWithProps(1, {dynamics: [0], statics: [40]})
// );
const BYTECODE_Comp = {
  b: [0,2,6,3,0,1,2,0,2,3,0,1,2,0,4,3,0,1,2,0,6,3,0,1,2,0,8,3,0,1,2,0,10,3,0,1,2,0,12,3,0,1,2,0,14,3,0,1,2,0,16,3,0,1,2,0,18,3,0,1,2,0,20,3,1,1,2,0,22,3,1,1,2,0,24,3,1,1,2,0,26,3,1,1,2,0,28,3,1,1,2,0,30,3,1,1,2,0,32,3,1,1,2,0,34,3,1,1,2,0,36,3,1,1,2,0,38,3,1,1,2,0,40,7],
  s: [
    CompPart,
    CompPartPrefix,
    'start', 0,
    'start', 5,
    'start', 10,
    'start', 15,
    'start', 20,
    'start', 25,
    'start', 30,
    'start', 35,
    'start', 40,
    'start', 45,

    'start', 50,
    'start', 55,
    'start', 60,
    'start', 65,
    'start', 70,
    'start', 75,
    'start', 80,
    'start', 85,
    'start', 90,
    'start', 92
  ]
};

const Comp = ({values})=>({
  t: BYTECODE_Comp,
  d: ['values', values]
});

// const BYTECODE_MAIN = window.BYTECODE_MAIN = componentWithProps(0, {dynamics: [0]});
const BYTECODE_MAIN = {
  b: [3, 0, 0, 1, 0],
  s: [Comp]
};

// const renderInstance = (values)=> <Comp values={values} />;
const renderInstance = (values)=> ({
  t: BYTECODE_MAIN,
  d: ['values', values]
});

// const render = ()=>
//   xvdom.render(renderInstance(createValues(COUNTS, 100)));
const render = ()=>{
  return xvdom.xrender(renderInstance(createValues(COUNTS, 100)));
};

// const rerender = (node)=>
//   xvdom.rerender(node, renderInstance(createValues(COUNTS, 100, true)));

const benchmark = ()=>{
  let i=0;
  // let node;
  while(i++ < 1000){
    /*node = */render();
    // rerender(node);
  }
};

const test = ()=>{
  const EXPECTED_TEXT_CONTENT          = 'helloKhelloLhelloMhelloNhelloOhelloPhelloQhelloRhelloShelloThelloUhelloVhelloWhelloXhelloYhelloZhelloAhelloBhelloChelloDhelloEhelloFhelloGhelloHhelloIhelloJhelloKhelloLhelloMhelloNhelloOhelloPhelloQhelloRhelloShelloThelloUhelloVhelloWhelloXhelloYprefixhelloZprefixhelloAprefixhelloBprefixhelloCprefixhelloDprefixhelloEprefixhelloFprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixhelloprefixprefixprefixprefixprefixprefixprefixprefix';
  // const EXPECTED_TEXT_CONTENT_RERENDER = 'hellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohelloOhelloPhelloQhelloRhelloShelloThelloUhelloVhelloWhelloXhelloYprefixhelloZprefixhelloAprefixhelloBprefixhelloCprefixhelloDprefixhelloEprefixhelloFprefixhelloGprefixhelloHprefixhelloIprefixhelloJprefixhelloKprefixhelloLprefixhelloMprefixhelloNprefixhelloOprefixhelloPprefixhelloQprefixhelloRprefixhelloSprefixhelloTprefixhelloUprefixhelloVprefixhelloWprefixhelloXprefixhelloYprefixhelloZprefixhelloAprefixhelloBprefixhelloCprefixhelloDprefixhelloEprefixhelloFprefixhelloGprefixhelloHprefixhelloIprefixhelloJprefixprefixprefixprefixprefixprefixprefixprefixprefixprefixprefixprefixprefix';
  const node = render();

  let textContent = node.textContent.replace(/\s+/g, '');
  let pass = textContent === EXPECTED_TEXT_CONTENT;
  let message = '';
  message += (
    pass
      ? 'SUCCESS'
      : `FAIL: expected textContent to be...\n"${EXPECTED_TEXT_CONTENT}"\nbut got...\n"${textContent}"`
  );

  // rerender(node);
  //
  // textContent = node.textContent.replace(/\s+/g, '');
  // pass = textContent === EXPECTED_TEXT_CONTENT_RERENDER;
  // message += (
  //   pass
  //     ? 'RERENDER SUCCESS'
  //     : `RERENDER FAIL: expected textContent to be...\n"${EXPECTED_TEXT_CONTENT_RERENDER}"\nbut got...\n"${textContent}"`
  // );

  document.write(message);
};

const runBenchmark = ()=>{
  var end;
  var start = window.performance.now();
  benchmark();
  end = window.performance.now();
  document.write((end - start).toFixed(3) + 'ms');
}

if(window.location.search === '?test/') test();
else runBenchmark();
