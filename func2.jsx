const xvdom = {
  createDynamic(){},
  createDynamicProp(){}
};

const TodoItem = ({todo})=>({
  render: vc=>{
    let n;
    return (
      (n = document.createElement('li'),
        n.appendChild(xvdom.createDynamic(vc, 0, 2)),
        (n = document.createElement('span'),
          n.appendChild(document.createTextNode(' - ')),
          n.className = 'spacer',
         n),
        n.appendChild(xvdom.createDynamic(vc, 1, 3)),
        n.className = 'yolo',
        xvdom.setDynamicProp(n, 'className', vc, 2, 4),
       n)
    );
  },

  rerender: (v, vc)=>{
    if(v[0] !== vc[0]) vc[2](v[0], vc, 3);
    if(v[1] !== vc[1]) vc[2](v[1], vc, 5);
  },

  values: [
    todo.title,
    todo.isDone ? 'Done': '',
    null /* `todo.title`  rerender function */,
    null /* `todo.title`  rerender context  */,
    null /* `todo.isDone` rerender function */,
    null /* `todo.isDone` rerender context  */
  ]
});

const TodoList = ({todos})=>({
  render: vc=>{
    let n;
    return (
      (n = document.createElement('el'),
        n.appendChild(xvdom.createDynamic(vc, 0, 1)),
       n)
    );
  },

  rerender: (v, vc)=>{
    if(v[0] !== vc[0]) vc[2](v[0], vc, 1);
  },

  values: [
    todos.map(todo=>({
      key: todo.id,
      component: TodoItem,
      props: {todo}
    })),
    null /* rerender function */,
    null /* rerender context  */
  ]
});


const Parent = ({todo})=>({
  render: vc=>{
    let n;
    return (
      (n = document.createElement('div'),
        n.appendChild(xvdom.createDynamic(vc, 0, 1)),
       n)
    );
  },

  rerender: (v, vc)=>{
    if(v[0] !== vc[0]) vc[2](v[0], vc, 1);
  },

  values: [
    {component: TodoItem, props: {todo}},
    null /* rerender function */,
    null /* rerender context  */
  ]
});

const Parent2 = ({isDone})=>
  <div>
    {isDone ? <div></div> : null}
  </div>;


const Parent2 = ({isDone})=>({
  spec: {
    render: vc=>{
      let n;
      return (
        (n = document.createElement('div'),
          n.appendChild(xvdom.createDynamic(vc, 0, 1)),
         n)
      );
    },

    rerender: (v, vc)=>{
      if(v[0] !== vc[0]) vc[2](v[0], vc, 1);
    }
  },

  values: [
    (isDone ? {spec: {render: ()=>document.createElement('div')}} : null),
    null /* rerender function */,
    null /* rerender context  */
  ]
});


document.body.appendChild(
  xvdom.render({
    component: Parent,
    props: {
      todo: {title:'', isDone:false}
    }
  })
);

document.body.appendChild(
  xvdom.render({
    component: TodoList,
    props: {
      todos:[
        {title:'', isDone:false}
      ]
    }
  })
);
