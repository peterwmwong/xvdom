import config from './rollup.config';

export default Object.assign(config, {
  format:     'iife',
  moduleName: 'xvdom',
  dest:       'dist/xvdom.js'
});
