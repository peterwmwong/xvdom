## Perf Trial: `rerenderInstance` update instance or previous instance?

## Perf Trial: store `__xvdomDynContextNodes` on the instance instead of the node

  - I believe `__xvdomDynContextNodes` is only used for dynamics
  - We may not be using the `__xvdomDynContextNodes` if the dynamic is NOT an instance (text, array)
