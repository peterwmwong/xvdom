(function(){
  'use strict';

  var TMPL_TABLE = {
    c: function(inst){
      var table = document.createElement('table');
      var tbody = document.createElement('tbody');
      return (
        (table.className = 'table table-striped latest-data'),
        table.appendChild(tbody),
        tbody.appendChild(xvdom.createDynamic(true, tbody, inst.v0, inst, 'r0', 'c0')),
        table
      );
    },
    u: function(inst, pInst){
      if(inst.v0 !== pInst.v0){
        pInst.v0 = pInst.r0(true, inst.v0, pInst.v0, pInst.c0, pInst, 'r0', 'c0');
      }
    },
    r: null
  };

  var TMPL_ROW = {
    c: function(inst){
      var tr      = document.createElement('tr');
      var td      = document.createElement('td');
      var tdQuery = document.createElement('td');
      var span    = document.createElement('span');
      return (
        (td.className = 'dbname'),
        td.appendChild(xvdom.createDynamic(true, td, inst.v0, inst, 'r0', 'c0')),
        (span.className = inst.v1, inst.c1 = span),
        span.appendChild(xvdom.createDynamic(true, td, inst.v2, inst, 'r2', 'c2')),
        (tdQuery.className = 'query-count'),
        tdQuery.appendChild(span),
        tr.appendChild(td),
        tr.appendChild(tdQuery),
        tr.appendChild(xvdom.createDynamic(true, tr, inst.v3, inst, 'r3', 'c3')),
        tr
      );
    },
    u: function(inst, pInst){
      if(inst.v0 !== pInst.v0){
        pInst.v0 = pInst.r0(true, inst.v0, pInst.v0, pInst.c0, pInst, 'r0', 'c0');
      }

      if(inst.v1 !== pInst.v1){
        pInst.c1.className = pInst.v1 = inst.v1;
      }

      if(inst.v2 !== pInst.v2){
        pInst.v2 = pInst.r2(true, inst.v2, pInst.v2, pInst.c2, pInst, 'r2', 'c2');
      }

      if(inst.v3 !== pInst.v3){
        pInst.v3 = pInst.r3(true, inst.v3, pInst.v3, pInst.c3, pInst, 'r3', 'c3');
      }
    },
    r: null
  };

  var TMPL_SAMPLE_CELLS = {
    c: function(inst){
      var td             = document.createElement('td');
      var popover        = document.createElement('div');
      var popoverContent = document.createElement('div');
      var popoverArrow   = document.createElement('div');
      return (
        (td.className = 'Query elapsed'),
        td.appendChild(xvdom.createDynamic(false, td, inst.v0, inst, 'r0', 'c0')),
        popoverContent.appendChild(xvdom.createDynamic(true, popoverContent, inst.v1, inst, 'r1', 'c1')),
        (popoverContent.className = 'popover-content'),
        popover.appendChild(popoverContent),
        (popoverArrow.className = 'arrow'),
        popover.appendChild(popoverArrow),
        popover.className = 'popover left',
        td.appendChild(popover),
        td
      )
    },
    u: function(inst, pInst){
      if(inst.v0 !== pInst.v0){
        pInst.v0 = pInst.r0(false, inst.v0, pInst.v0, pInst.c0, pInst, 'r0', 'c0');
      }

      if(inst.v1 !== pInst.v1){
        pInst.v1 = pInst.r1(true, inst.v1, pInst.v1, pInst.c1, pInst, 'r1', 'c1');
      }
    },
    r: null
  };

  function renderQuery(query, j){
    return {
      key: j,
      $s:TMPL_SAMPLE_CELLS,
      $n:null,
      next:null,

      v0:query.formatElapsed,
      c0:null,
      r0:null,

      v1:query.query,
      c1:null,
      r1:null
    };
  }

  function renderDatabase(db, i){
    var lastSample = db.lastSample;
    return {
      key:i,
      $s:TMPL_ROW,
      $n:null,

      v0:db.dbname,
      c0:null,
      r0:null,

      v1:lastSample.countClassName,
      c1:null,
      r1:null,

      v2:lastSample.nbQueries,
      c2:null,
      r2:null,

      v3:renderQueries(lastSample.topFiveQueries),
      c3:null,
      r3:null
    }
  }

	function renderDatabases(array) {
    var length = array.length;
		var newArray = new Array(length);
    var i=0;
		while(i < length) {
			newArray[i] = renderDatabase(array[i], i);
      ++i;
		}
		return newArray;
	}

	function renderQueries(array) {
    var length = array.length;
		var newArray = new Array(length);
    var i=0;
		while(i < length) {
			newArray[i] = renderQuery(array[i], i);
      ++i;
		}
		return newArray;
	}


  var dbmonApp;
  function render() {
    var instance = {
      key:null,
      $s:TMPL_TABLE,
      $n:null,

      v0:renderDatabases(ENV.generateData().toArray()),
      c0:null,
      r0:null
    };

    if(dbmonApp) xvdom.rerender(dbmonApp, instance);
    else app.appendChild(dbmonApp = xvdom.render(instance));

    Monitoring.renderRate.ping();
    setTimeout(render, ENV.timeout);
  }
  render();

})();
