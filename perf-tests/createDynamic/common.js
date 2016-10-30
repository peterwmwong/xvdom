var time;
module.exports = {
  makeDynamic(seed){
    switch(seed % 4){
      case 0: return 'text';
      case 1: return null;
      case 2: return {};
      case 3: return [];
    }
  },

  text(){ return 0; },
  empty(){ return 1; },
  object(){ return 2; },
  array(){ return 3; },

  ITERATIONS: 1e6,
  start(){
    time = process.hrtime();
  },
  stop(){
    var duration = process.hrtime(time);
    console.log(duration[0]*1e3 + duration[1]/ 1e6);
  }
};
