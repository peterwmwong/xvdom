import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: 'tests/index.js',
  plugins: [
    babel(),
    nodeResolve({
      main:    true,
      browser: true,
      jsnext:  true,
      preferBuiltins: false
    }),
    commonjs()
  ],
  format: 'iife',
  sourceMap: false,
  dest: 'dist/xvdom-test.js'
};
