- Try babel-preset-es2015-loose

## Revisit Stateful API

### Goals

- Fast/Low Overhead API
- Minimize re-render updates

### Proposal: Dispatch II

```js
const increment = (props, {count}, dispatch)=>({count: count++});

const Counter = (props, state)=>
  <button dispatch-onclick={increment}>Click Me</button>;

Counter.getInitialState = (props, dispatch)=>({count: props.initialCount});

// Counter.onPropsChange = (newProps, oldProps, state, dispatch)=>{
//   // whatevs...
// };
```

```js
const _xvdomSpec__Counter = {
  c: inst=>(
    const _node = document.createElement('button');
    _node.onclick = xvdom.getDispatcher(inst, inst.v0);
  ),
  u: (inst, pInst)=>{
    if(inst.v0 !== pInst.v0){
      _node.onclick = xvdom.getDispatcher(inst, pInst.v0 = inst.v0);
    }
  }
};
```

```js
const actionId = 1;

// Create Stateful component
const actions = {};
componentInst.$a = actions;
const dispatch = (action, ...args)=>{
  const newState = action.apply(undefined, [props, state, dispatch].concat(args));
  if(newState !=== componentInst.state){
    internalRerenderStatefulComponent(
      componentInst.$c(props, newState, stateActions),
      componentInst,
      parentInst,
      componentInstanceProp
    );
  }
};

componentInst.$getDispatcher = action=>{
  let id = action.__xvdomActionId;
  if(!id) action.__xvdomActionId = id = ++actionId;
  return actions[id] || (actions[id] = (...args)=>{ dispatch(action, ...args); });
}

export const getDispatcher = (inst, action)=>{
  return (
      process.ENV === 'DEV' ? (inst.getDispatcher && inst.getDispatcher(action))
    : inst.getDispatcher
  );
}
```
