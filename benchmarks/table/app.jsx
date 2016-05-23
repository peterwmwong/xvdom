import xvdom from '../../dist/xvdom.min.js';

const COLS    = 100;
const ROWS    = 100;
const randInt = maxValue=>(Math.random()*maxValue)|0;
const cellId  = (row, cell)=>`${row}-${cell}`;
const genRows = ()=>{
  const rows = new Array(ROWS);

  for(let row=0; row<ROWS; ++row){
    let cols = rows[row] = new Array(COLS);

    for(let col=0; col<COLS; ++col){
      cols[col] = randInt(COLS);
    }
  }
  return rows;
};

const Cell = ({state})=>
  <td className={state > 50 ? 'high' : 'low'}>{state}</td>;

Cell.state = {
  onInit: ({props: {initialValue, row, cell, cellUpdaters}, bindSend})=>{
    cellUpdaters[cellId(row, cell)] = bindSend('update');
    return initialValue;
  },
  update: (component, newValue)=>newValue
};

const App = ({state: {rows, cellUpdaters}})=>
  <table>
    {rows.map((row, i)=>
      <tr key={i}>
        {row.map((cell, j)=>
          <Cell key={j} initialValue={cell} row={i} cell={j} cellUpdaters={cellUpdaters} />
        )}
      </tr>
    )}
  </table>;

App.state = {
  onInit: ()=>{
    const cellUpdaters = {};
    const update = ()=>{
      for(let i=0; i<300; ++i){
        cellUpdaters[cellId(randInt(ROWS - 1), randInt(COLS - 1))](randInt(COLS));
      }
      requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
    return {rows:genRows(), cellUpdaters};
  }
};

window.app.appendChild(
  xvdom.render(<App />)
);
