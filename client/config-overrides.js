const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  // do stuff with the webpack config...
//  const newConfig = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], config);
  let newConfig = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
  // change importing css to less
  newConfig = rewireLess.withLoaderOptions({
    modifyVars: { '@primary-color': '#EAAF00' },
  })(newConfig, env);

  return newConfig;
};
