const renderQuery = (query, j)=>
  <td key={j} className="Query elapsed">
    {query.formatElapsed}
    <div className="popover left">
      <div className="popover-content">
        {query.query}
      </div>
      <div className="arrow"></div>
    </div>
  </td>;

const renderQueries = (array)=>{
  const length = array.length;
	const newArray = new Array(length);
  let i=0;
	while(i < length){
		newArray[i] = renderQuery(array[i], i);
    ++i;
	}
	return newArray;
};

const renderDatabase = ({dbname, lastSample}, i)=>
  <tr key={i}>
    <td className="dbname">
      {dbname}
    </td>
    <td className="query-count">
      <span className={lastSample.countClassName}>
        {lastSample.nbQueries}
      </span>
    </td>
    {renderQueries(lastSample.topFiveQueries)}
  </tr>;

const renderDatabases = (array)=>{
  const length = array.length;
	const newArray = new Array(length);
  let i=0;
	while(i < length){
		newArray[i] = renderDatabase(array[i], i);
    ++i;
	}
	return newArray;
};

let dbmonApp;
const render = ()=>{
  const instance = (
    <table className="table table-striped latest-data">
      <tbody>
        {renderDatabases(ENV.generateData().toArray())}
      </tbody>
    </table>
  )

  Monitoring.renderRate.ping();
  setTimeout(render, ENV.timeout);

  if(dbmonApp) xvdom.rerender(dbmonApp, instance);
  else app.appendChild(dbmonApp = xvdom.render(instance));

}

render();
