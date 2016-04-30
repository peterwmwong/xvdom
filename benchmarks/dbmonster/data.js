export class Query {
  constructor(elapsed, query) {
    this.elapsed = elapsed;
    this.query = query;
  }

  static rand() {
    let elapsed = Math.random() * 15;
    let query;

    if (Math.random() < 0.1) {
      query = 'vacuum';
    } else if (Math.random() < 0.2) {
      query = '<IDLE> in transaction';
    } else {
      query = 'SELECT blah FROM something';
    }

    return new Query(elapsed, query);
  }
};

const EMPTY_QUERY = new Query(0.0, '');

let DB_nextId = 0;
export class DB {
  constructor(name) {
    this.id = DB_nextId++;
    this.name = name;
    this.queries = null;

    this.update();
  }

  update() {
    let queries = [];
    let r = Math.floor((Math.random() * 10) + 1);
    let j = 0;
    for (; j < r; j++) {
      queries.push(Query.rand());
    }

    this.queries = queries;
  }

  getTopFiveQueries() {
    let qs = this.queries.slice();
    qs.sort(function(a, b) {
      return a.elapsed - b.elapsed;
    });
    qs = qs.slice(0, 5);
    while (qs.length < 5) {
      qs.push(EMPTY_QUERY);
    }
    return qs;
  }
}

/**
 * @final
 */
export class DatabaseList {
  constructor(n) {
    this.dbs = [];
    let i = 0;
    for (; i < n; i++) {
      this.dbs.push(new DB(`cluster${i}`));
      this.dbs.push(new DB(`cluster${i}slave`));
    }
  }

  update() {
    let dbs = this.dbs;
    let i=0;
    for (; i < dbs.length; i++) {
      dbs[i] = new DB(dbs[i].name);
    }
  }

  randomUpdate(r) {
    let dbs = this.dbs;
    let i = 0;
    for (; i < dbs.length; i++) {
      if (Math.random() < r) {
        dbs[i] = new DB(dbs[i].name);
      }
    }
  }
}
