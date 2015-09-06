const TodoItem = ({todo:{title, isDone}})=>
  <li>{title} {isDone ? "Done" : ""}</li>;

const TodoList = props=>
  <ul>
    {props.todos.map(todo=>
      <TodoItem todo={todo} />
    )}
  </ul>;

const xvdom.createRerenderable = (/*node, rerender, values...*/)=>
  node.xvdom__rerenderable = arguments,
  node;

const TodoItem = props=>{
  // Render Context
  let todoTitleTextNode;

  return xvdom.createRerenderable(
    // Initial Render
    vc=>
      xvdom.createElement('li'/*tag*/, null/*key*/, null/*props*/,
        /*Children varargs...*/
        xvdom.createDynamic(vc[0], vc),
        xvdom.createText(' '),
        xvdom.createDynamic(vc[1], vc)
      ),

    // Re-render
    (v, vc)=>{
      /* title */
      xvdom.rerender(v[0], vc[0], vc[2]);

      /* isDone */
      xvdom.rerender(v[1], vc[1], vc[3]);
    },

    // Current input values varargs
    props.todo.title,

    (props.todo.isDone ? "Done": "")
  );
};


const TodoList = ({todos})=>{
  return xvdom.createRerenderable(
    // Initial Render
    vc=>
      xvdom.createElement('ul', null/*key*/, null/*props*/,
        xvdom.createDynamic(vc[0], vc)
      ),

    // Re-render
    (v, vc)=>{
      /*OPT: v[0] !== vc[0] && */xvdom.rerender(v[0], vc[0], vc[1]);
    },

    todos.map(todo=>
      xvdom.createRerenderable(
        // Initial Render
        vc=>xvdom.createComponent(TodoItem, {todo:vc[0]}, vc),

        // Re-render
        (v, vc)=>{
          if(v[0] !== vc[0]){
            xvdom.rerenderComponent(TodoItem, {todo:v[0]}, vc[1]);
          }
        },

        todo
      )
    )
  );
};
