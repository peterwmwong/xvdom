const TEMPLATE = {
  el: 'ul',
  children: [0]
};

const TodoList = ({todos})=>{
  return { // 1
    template: TEMPLATE,
    values: [ // 2
      todos.map(todo=>({
        template: {
          el: TodoItem,
          props: {todo}
        }
      }))
    ]
  }
}

const TodoList = ({todos})=>{
  return { // 1
    render: vc=>
      xvdom.createElement('ul', null/*key*/, null/*props*/,
        xvdom.createDynamic(vc[0], vc)
      ),

    rerender: (v, vc)=>{
      if(v[0] != vc[0]) xvdom.rerender(v[0], vc[0], vc[1]);
    }

    values: todos.map(todo=>({
      template: {
        el: TodoItem,
        props: {todo}
      }
    }))
  };
}

const INITIAL_RENDER = 0;
const RERENDER = 1;
const FIRST_VALUE = 2;
const slice = Array.prototype.slice;

function createRerenderable(initialRender, rerender/*, values...*/){
  initialRender.rerender = rerender;
  values

  arguments[INITIAL_RENDER](slice.call(arguments, FIRST_VALUE));

  arguments[RERENDER](slice.call(arguments, FIRST_VALUE));
}
