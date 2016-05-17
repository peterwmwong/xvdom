Expected `textContent`: 25242322212019181716151413121110987654321

## Current

1527.121ms
1592.787ms
1492.100ms

## Before refactor-component-api branch

"build:benchmarks-stateful-components":
  "cd benchmarks/stateful-components; webpack --config webpack.config.js; uglifyjs --compress --mangle -- app-built.js > app-built.min.js",


### Modifications to benchmark

- `({props, state})=>` -> `({props, state})=>`
- Downgrade babel-plugin-xvdom
  - calls `createComponent()` with `component.state` as 2nd argument

2092.536ms
2170.070ms
2079.904ms
