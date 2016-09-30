var modify = require('modify-babel-preset');

module.exports = modify('es2015-loose', {
  'babel-plugin-transform-es2015-typeof-symbol': false,
});
