import assert              from 'assert';
import getHTMLString       from './utils/getHTMLString.js';
import xvdom, {REF_TO_TAG} from '../src/index.js';

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
      ? [4, ...flatten(children), 5]
      : children
  );
  return result;
};

const dynamic = (valueId)=> [2, valueId];
const _static = (valueId)=> [3, valueId];

const props = ({dynamics=[], statics=[]}={})=>{
  const result = [ dynamics.length + statics.length ];
  if(result[0]){
    return result.concat([statics.length, ...dynamics, ...statics]);
  };
  return result;
};

// 1, TAG_TO_REF[tag], statics.length, (dynamics.length + statics.length), ...dynamics, ...statics,
const el = (tag, _props, ...children)=> [
  0, TAG_TO_REF[tag],
    ...props(_props),
    ..._elChildren(children)
];

const elWithProps = el;

const trimPops = (commands)=>{
  let lastCommand;
  while(commands.length && (lastCommand = commands.pop()) === 7);
  commands.push(lastCommand);
  return commands;
};

const component = (comp, _props)=> [
  1, comp, ...props(_props)
];

const componentWithProps = component;


describe('render(bytecode, dynamics)', ()=>{
  const renderHTML = (instance)=> getHTMLString(xvdom.xrender(instance));

  const itRenders = (desc, instance, expectedHTML)=>{
    it(desc, ()=>{
      assert.strictEqual(
        renderHTML(typeof instance === 'function' ? instance() : instance),
        expectedHTML
      );
    });
  };

  itRenders('elements',
    <div>
      <span></span>
    </div>,
    '<div>'+
      '<span></span>'+
    '</div>'
  );

  itRenders('elements nesting and siblings',
    <div>
      <span>
        <i></i>
      </span>
      <b></b>
      <a></a>
    </div>,
    '<div>'+
      '<span>'+
        '<i></i>'+
      '</span>'+
      '<b></b>'+
      '<a></a>'+
    '</div>'
  );

  itRenders('elements with props',
    ()=> {
      const one   = 'one';
      const two   = 'two';
      const three = 'three';
      const four  = 'four';
      return (
        <div className={one}>
          <b className={two}>
            <i className={three}></i>
          </b>
          <span title='foo'>
            <a className={four} title='bar'></a>
          </span>
        </div>
      );
    },
    '<div class="one">'+
      '<b class="two">'+
        '<i class="three"></i>'+
      '</b>'+
      '<span title="foo">'+
        '<a class="four" title="bar"></a>'+
      '</span>'+
    '</div>'
  );

  itRenders('statics',
    <div>{'foo'}</div>,
    '<div>'+
      'foo'+
    '</div>'
  );

  itRenders('dynamics',
    ()=> {
      const msg = 'hello';
      return <div>{msg}</div>;
    },
    '<div>'+
      'hello'+
    '</div>'
  );

  itRenders('dynamics 2',
    ()=> {
      const msg = 'hello';
      const msg2 = 'world';
      return <div>
        <span>{msg}</span>
        {msg2}
      </div>;
    },
    '<div>'+
      '<span>hello</span>'+
      'world'+
    '</div>'
  );

  const Comp1 = ()=>({
    t:{
      b: elWithProps('span', {statics: [0]}),
      s: ['className', 'Comp1']
    },
    d: []
  });

  const Comp2 = ({id, title})=>({
    t:{
      b: elWithProps('span', {statics: [0], dynamics: [0, 2]}),
      s: ['className', 'Comp2']
    },
    d: ['id', id, 'title', title]
  });

  itRenders('components',
    {
      bytecode: trimPops(
        el('div', {},
          component(0, {})
        )
      ),
      statics: [Comp1]
    },
    '<div>'+
      '<span class="Comp1"></span>'+
    '</div>'
  );

  itRenders('components with props',
    {
      bytecode: trimPops(
        el('div', {},
          componentWithProps(0, {statics: [1], dynamics: [0]})
        )
      ),
      statics: [Comp2, 'id', 'hello'],
      dynamics: ['title', 'world']
    },
    '<div>'+
      '<span id="hello" title="world" class="Comp2"></span>'+
    '</div>'
  );

  const BYTECODE_CompPart = el('div', {},
    el('span', {}, dynamic(0)),
    el('span', {}, dynamic(1)),
    el('span', {}, dynamic(2)),
    el('span', {}, dynamic(3)),
    el('span', {}, dynamic(4))
  );

  const BYTECODE_CompPartPrefix = el('div', {},
    el('span', {},
      el('span', {}, _static(0)),
      dynamic(0)
    ),
    el('span', {},
      el('span', {}, _static(0)),
      dynamic(1)
    ),
    el('span', {},
      el('span', {}, _static(0)),
      dynamic(2)
    ),
    el('span', {},
      el('span', {}, _static(0)),
      dynamic(3)
    ),
    el('span', {},
      el('span', {}, _static(0)),
      dynamic(4)
    )
  );
  const CompPart = ({start, values})=>({
    t: {
      b: BYTECODE_CompPart,
      s: []
    },
    d: [
      values[0 + start],
      values[1 + start],
      values[2 + start],
      values[3 + start],
      values[4 + start]
    ]
  });

  const CompPartPrefix = ({start, values})=>({
    t: {
      b: BYTECODE_CompPartPrefix,
      s: ['prefix']
    },
    d: [
      values[0 + start],
      values[1 + start],
      values[2 + start],
      values[3 + start],
      values[4 + start]
    ]
  });

  const BYTECODE_Comp = el('div', {},
    componentWithProps(0, {dynamics: [0], statics: [2]}),
    componentWithProps(1, {dynamics: [0], statics: [4]})
  );

  const Comp = ({values})=>({
    t: {
      b: BYTECODE_Comp,
      s: [CompPart, CompPartPrefix, 'start', 0, 'start', 5]
    },
    d: ['values', values]
  });

  itRenders('benchmark: dynamics <CompPart />',
    {
      bytecode: trimPops(
        componentWithProps(0, {dynamics: [0, 2]})
      ),
      statics: [CompPart],
      dynamics: ['start', 0, 'values', ['one', 'two', 'three', 'four', 'five']]
    },
    '<div>'+
      '<span>one</span>'+
      '<span>two</span>'+
      '<span>three</span>'+
      '<span>four</span>'+
      '<span>five</span>'+
    '</div>'
  );

  itRenders('benchmark: dynamics <CompPartPrefix />',
    {
      bytecode: trimPops(
        componentWithProps(0, {dynamics: [0, 2]})
      ),
      statics: [CompPartPrefix],
      dynamics: ['start', 0, 'values', ['one', 'two', 'three', 'four', 'five']]
    },
    '<div>'+
      '<span><span>prefix</span>one</span>'+
      '<span><span>prefix</span>two</span>'+
      '<span><span>prefix</span>three</span>'+
      '<span><span>prefix</span>four</span>'+
      '<span><span>prefix</span>five</span>'+
    '</div>'
  );

  itRenders('benchmark: dynamics <Comp />',
    {
      bytecode: trimPops(
        componentWithProps(0, {dynamics: [0]})
      ),
      statics: [Comp],
      dynamics: ['values', ['one', 'two', 'three', 'four', 'five', 'pone', 'ptwo', 'pthree', 'pfour', 'pfive']]
    },
    '<div>'+
      '<div>'+
        '<span>one</span>'+
        '<span>two</span>'+
        '<span>three</span>'+
        '<span>four</span>'+
        '<span>five</span>'+
      '</div>'+
      '<div>'+
        '<span><span>prefix</span>pone</span>'+
        '<span><span>prefix</span>ptwo</span>'+
        '<span><span>prefix</span>pthree</span>'+
        '<span><span>prefix</span>pfour</span>'+
        '<span><span>prefix</span>pfive</span>'+
      '</div>'+
    '</div>'
  );
});
