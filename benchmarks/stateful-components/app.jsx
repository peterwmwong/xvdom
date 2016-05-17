import xvdom from '../../src/index.js';

const plusOne = ({props: {value}})=> ({value: value + 1});
const noChange = ({props, state})=> state;

const makeState = (i)=>{
  switch(i % 5){
    case 0: return {
      onInit:  plusOne,
      action1: noChange,
      action2: noChange,
      action3: noChange,
      action4: noChange
    };

    case 1: return {
      onInit:  plusOne,
      action1: noChange,
      action2: noChange,
      action3: noChange,
      action4: noChange,
      action5: noChange
    };

    case 2: return {
      onInit:  plusOne,
      action1: noChange,
      action2: noChange,
      action3: noChange,
      action4: noChange,
      action5: noChange,
      action6: noChange
    };

    case 3: return {
      onInit:  plusOne,
      action1: noChange,
      action2: noChange,
      action3: noChange,
      action4: noChange,
      action5: noChange,
      action6: noChange,
      action7: noChange
    };

    case 4: return {
      onInit:  plusOne,
      action1: noChange,
      action2: noChange,
      action3: noChange,
      action4: noChange,
      action5: noChange,
      action6: noChange,
      action7: noChange,
      action8: noChange
    };
  };
};

let stateNum = 0;

const LeafNode = ({props, state})=> <div>{state.value}</div>;
LeafNode.state = makeState(stateNum++);

const Comp16 = ()=>{
  const result = [];
  let i = 25;
  while(i--){
    result.push(<LeafNode key={i} value={i} />);
  }

  return <div>{result}</div>;
};

const Comp15 = ({state})=> <Comp16 value={state.value} />;
Comp15.state = makeState(stateNum++);

const Comp14 = ({state})=> <Comp15 value={state.value} />;
Comp14.state = makeState(stateNum++);

const Comp13 = ({state})=> <Comp14 value={state.value} />;
Comp13.state = makeState(stateNum++);

const Comp12 = ({state})=> <Comp13 value={state.value} />;
Comp12.state = makeState(stateNum++);

const Comp11 = ({state})=> <Comp12 value={state.value} />;
Comp11.state = makeState(stateNum++);

const Comp10 = ({state})=> <Comp11 value={state.value} />;
Comp10.state = makeState(stateNum++);

const Comp9 = ({state})=> <Comp10 value={state.value} />;
Comp9.state = makeState(stateNum++);

const Comp8 = ({state})=> <Comp9 value={state.value} />;
Comp8.state = makeState(stateNum++);

const Comp7 = ({state})=> <Comp8 value={state.value} />;
Comp7.state = makeState(stateNum++);

const Comp6 = ({state})=> <Comp7 value={state.value} />;
Comp6.state = makeState(stateNum++);

const Comp5 = ({state})=> <Comp6 value={state.value} />;
Comp5.state = makeState(stateNum++);

const Comp4 = ({state})=> <Comp5 value={state.value} />;
Comp4.state = makeState(stateNum++);

const Comp3 = ({state})=> <Comp4 value={state.value} />;
Comp3.state = makeState(stateNum++);

const Comp2 = ({state})=> <Comp3 value={state.value} />;
Comp2.state = makeState(stateNum++);

const Comp1 = ({state})=> <Comp2 value={state.value} />;
Comp1.state = makeState(stateNum++);

const render = ()=> xvdom.render(<Comp1 value={100} />);

const benchmark = ()=>{
  let i=0;
  while(i++ < 10000){
    render();
  }
};

const EXPECTED_TEXT_CONTENT = '25242322212019181716151413121110987654321';

if(window.location.search === '?test'){
  const {textContent} = render();
  const pass = textContent === EXPECTED_TEXT_CONTENT;
  console.log(
    pass
      ? 'SUCCESS'
      : `FAIL: expected textContent to be ${EXPECTED_TEXT_CONTENT}, but got ${textContent}`
  );
}
else {
  console.time('benchmark');
  benchmark();
  console.timeEnd('benchmark');
}
