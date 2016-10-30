# Perf: Seperate values from instance (optimize monomorphic ICs)

see [todo-perf-instance-values-prop.md]


# Perf: Remove or limit recycling

Recycling was originally introduced to get a better (A L O T better... like "cheating the benchmark"
better) score in the [http://vdom-benchmark.github.io/vdom-benchmark/](vdom-benchmark).  Since then,
major flaws have been found with vdom-benchmark and noone seems to be using this benchmark as
credible measure of vdom performance.

As such it maybe time to revisit the real world benefits of keyed recyling and weighed
against the benefits of removing the feature from xvdom:

- Remove hot path Megamorphic IC (see [todo-perf-instance-values-prop.md])
- Reduce work done in hot path for rendering/rendering anything (component's, dynamic instances,
  array instances)


# Perf: Dynamic Hinting

- Option 1: attribute annotation
  ```jsx
  <div xvdom-child-text>
    {myString}
  </div>

  <div xvdom-child-array>
    {[1,2,3].map(el => <div key={el} />)}
  </div>

  <div xvdom-child-jsx>
    {<a>yolo</a>}
  </div>
  ```
- Option 2: asm.js-like type annotation
  - number: {num | 0}
  - string: {num + ""} {String(num)}
  - array: {num + ""} {String(num)}
  - jsx: ???


# Port enhancements from bytecode-wip

- Only child specialization
