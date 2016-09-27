import {startFPSMonitor, initProfiler, startProfile, endProfile} from 'perf-monitor';
import xvdom from '../../dist/xvdom.min.js';
import {DatabaseList} from './data.js';

const MUTATION_RATE = 0.5;
const dbs = new DatabaseList(50);

const entryFormatElapsed = (v)=> v.toFixed(2);

const counterClasses = (count)=>
    count >= 20 ? 'label label-important'
  : count >= 10 ? 'label label-warning'
  : 'label label-success';

const queryClasses = (elapsed)=>
    elapsed >= 20 ? 'Query elapsed warn_long'
  : elapsed >= 10 ? 'Query elapsed warn'
  : 'Query elapsed short';

const map = (array, fn)=> {
  const length = array.length;
	const newArray = new Array(length);
  let i = 0;
	while(i < length){
		newArray[i] = fn(array[i], i);
    ++i;
	}
	return newArray;
};

const renderQuery = ({elapsed, query}, j)=>
  <td key={j} className={queryClasses(elapsed)}>
    {entryFormatElapsed(elapsed)}
    <div className="popover left">
      <div className="popover-content">
        {query}
      </div>
      <div className="arrow"></div>
    </div>
  </td>;

const renderDatabase = (db, i)=> {
  const count = db.queries.length;
  return (
    <tr key={i}>
      <td className="dbname">
        {db.name}
      </td>
      <td className="query-count">
        <span className={counterClasses(count)}>
          {count}
        </span>
      </td>
      {map(db.getTopFiveQueries(), renderQuery)}
    </tr>
  );
};

const renderTable = (data)=>
  <table className="table table-striped latest-data">
    <tbody>
      {map(data, renderDatabase)}
    </tbody>
  </table>;


let dbmonApp;
startFPSMonitor();
initProfiler('data');
initProfiler('view');

const render = ()=>{
  startProfile('data');
  dbs.randomUpdate(MUTATION_RATE);
  endProfile('data');

  startProfile('view');
  xvdom.rerender(dbmonApp, renderTable(dbs.dbs));
  endProfile('view');

  requestAnimationFrame(render);
};

window.app.appendChild(
  dbmonApp = xvdom.render(
    renderTable(dbs.dbs)
  )
);
requestAnimationFrame(render);
