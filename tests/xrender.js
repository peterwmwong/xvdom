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

// 1, TAG_TO_REF[tag], statics.length, (dynamics.length + statics.length), ...dynamics, ...statics,
const elWithProps = (tag, _props, ...children)=> [
  1, TAG_TO_REF[tag],
    ...props(_props),
    ..._elChildren(children)
];

const trimPops = (commands)=>{
  let lastCommand;
  while(commands.length && (lastCommand = commands.pop()) === 7);
  commands.push(lastCommand);
  return commands;
};

const component = (comp)=> [
  2, comp
];

const componentWithProps = (comp, _props)=> [
  3, comp, ...props(_props)
];


describe('render(spec, dynamics)', ()=>{
  const renderHTML = (bytecode, statics, dynamics)=> {
    const result = getHTMLString(xvdom.xrender({bytecode, statics, dynamics}));
    return result;
  };

  describe('el(tag:String, children:Array)', () => {
    it('one child', () => {
      assert.deepEqual(
        trimPops(
          el('div',
            el('span')
          )
        ),
        [
          0, TAG_TO_REF.div,
            6,
              0, TAG_TO_REF.span
        ]
      );
    });

    it('many children', () => {
      assert.deepEqual(
        trimPops(
          el('div',
            el('span',
              el('i')
            ),
            el('b'),
            el('a')
          )
        ),
        [
          0, TAG_TO_REF.div,
            6,
              0, TAG_TO_REF.span,
                6,
                  0, TAG_TO_REF.i,
                7,
              0, TAG_TO_REF.b,
              0, TAG_TO_REF.a
        ]
      );
    });

    it('with dynamics', () => {
      assert.deepEqual(
        trimPops(
          el('div',
            dynamic(0)
          )
        ),
        [
          0, TAG_TO_REF.div,
            6,
              4, 0
        ]
      );
    });

    it('with dynamics 2', () => {
      assert.deepEqual(
        trimPops(
          el('div',
            el('a',
              dynamic(0)
            ),
            el('b')
          )
        ),
        [
          0, TAG_TO_REF.div,
            6,
              0, TAG_TO_REF.a,
                6,
                  4, 0,
                7,
              0, TAG_TO_REF.b
        ]
      );
    });


    it('with dynamics 3', () => {
      assert.deepEqual(
        trimPops(
          el('div',
            el('span', dynamic(0)),
            dynamic(1)
          )
        ),
        [
          0, TAG_TO_REF.div,
            6,
              0, TAG_TO_REF.span,
                6,
                  4, 0,
                7,
              4, 1
        ]
      );
    });
  });


  it('componentWithProps', () => {
    assert.deepEqual(
      trimPops(
        componentWithProps(0, {dynamics: [2], statics:[4]})
      ),
      [
        3, 0, 1, 2, 2, 4
      ]
    );
  });

  describe('elWithProps', () => {
    it('nesting', () => {
      assert.deepEqual(
        trimPops(
          elWithProps('div', {dynamics: [0]},
            elWithProps('span', {statics: [0]},
              elWithProps('a', {dynamics: [2], statics: [2]})
            )
          )
        ),
        [
          1, TAG_TO_REF.div, 0, 1, 0,
            6,
              1, TAG_TO_REF.span, 1, 1, 0,
              6,
                1, TAG_TO_REF.a, 1, 2, 2, 2
        ]
      );
    });

    it('many children', () => {
      assert.deepEqual(
        trimPops(
          elWithProps('div', {dynamics: [0]},
            elWithProps('span', {statics: [0]}),
            elWithProps('a', {dynamics: [2], statics: [2]})
          )
        ),
        [
          1, TAG_TO_REF.div, 0, 1, 0,
            6,
              1, TAG_TO_REF.span, 1, 1, 0,
              1, TAG_TO_REF.a, 1, 2, 2, 2
        ]
      );
    });
  });

  const itRenders = (desc, {spec, statics=[], dynamics=[]}, expectedHTML)=>{
    it(desc, ()=>{
      assert.strictEqual(
        renderHTML(spec, statics, dynamics),
        expectedHTML
      );
    });
  };

  itRenders('elements',
    {
      spec: trimPops(
        el('div',
          el('span')
        )
      )
    },
    '<div>'+
      '<span>'+
      '</span>'+
    '</div>'
  );

  itRenders('elements nesting and siblings',
    {
      spec: trimPops(
        el('div',
          el('span',
            el('i')
          ),
          el('b'),
          el('a')
        )
      )
    },
    '<div>'+
      '<span>'+
        '<i></i>'+
      '</span>'+
      '<b></b>'+
      '<a></a>'+
    '</div>'
  );

  itRenders('elements with props',
    {
      spec: trimPops(
        elWithProps('div', {dynamics: [0]},
          elWithProps('b', {dynamics: [2]},
            elWithProps('i', {dynamics: [4]})
          ),
          elWithProps('span', {statics: [0]},
            elWithProps('a', {dynamics: [6], statics: [2]})
          )
        )
      ),
      statics: ['title', 'foo', 'title', 'bar'],
      dynamics: ['className', 'one', 'className', 'two', 'className', 'three', 'className', 'four']
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

  itRenders('dynamics',
    {
      spec: trimPops(
        el('div',
          dynamic(0)
        )
      ),
      dynamics: ['hello']
    },
    '<div>'+
      'hello'+
    '</div>'
  );

  itRenders('dynamics 2',
    {
      spec: trimPops(
        el('div',
          el('span', dynamic(0)),
          dynamic(1)
        )
      ),
      dynamics: ['hello', 'world']
    },
    '<div>'+
      '<span>hello</span>'+
      'world'+
    '</div>'
  );

  const Comp1 = ()=>({
    bytecode: elWithProps('span', {statics: [0]}),
    statics: ['className', 'Comp1'],
    dynamics: []
  });

  const Comp2 = ({id, title})=>({
    bytecode: elWithProps('span', {statics: [0], dynamics: [0, 2]}),
    statics: ['className', 'Comp2'],
    dynamics: ['id', id, 'title', title]
  });

  itRenders('components',
    {
      spec: trimPops(
        el('div',
          component(0)
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
      spec: trimPops(
        el('div',
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

  const BYTECODE_CompPart = el('div',
    el('span', dynamic(0)),
    el('span', dynamic(1)),
    el('span', dynamic(2)),
    el('span', dynamic(3)),
    el('span', dynamic(4))
  );

  const BYTECODE_CompPartPrefix = el('div',
    el('span',
      el('span', _static(0)),
      dynamic(0)
    ),
    el('span',
      el('span', _static(0)),
      dynamic(1)
    ),
    el('span',
      el('span', _static(0)),
      dynamic(2)
    ),
    el('span',
      el('span', _static(0)),
      dynamic(3)
    ),
    el('span',
      el('span', _static(0)),
      dynamic(4
    ))
  );
  const CompPart = ({start, values})=>({
    bytecode: BYTECODE_CompPart,
    dynamics: [
      values[0 + start],
      values[1 + start],
      values[2 + start],
      values[3 + start],
      values[4 + start]
    ]
  });

  const CompPartPrefix = ({start, values})=>({
    bytecode: BYTECODE_CompPartPrefix,
    statics: ['prefix'],
    dynamics: [
      values[0 + start],
      values[1 + start],
      values[2 + start],
      values[3 + start],
      values[4 + start]
    ]
  });

  const BYTECODE_Comp = el('div',
    componentWithProps(0, {dynamics: [0], statics: [2]}),
    componentWithProps(1, {dynamics: [0], statics: [4]})
  );

  const Comp = ({values})=>({
    bytecode: BYTECODE_Comp,
    statics: [CompPart, CompPartPrefix, 'start', 0, 'start', 5],
    dynamics: ['values', values]
  });

  itRenders('benchmark: dynamics <CompPart />',
    {
      spec: trimPops(
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
      spec: trimPops(
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
      spec: trimPops(
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
