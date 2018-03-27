const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const config = require('./config');
const helper = require('./helper');
const vueLoaderConfig = require('./vue-loader.conf');
const vueWebTemp = helper.rootNode(config.templateDir);
const vueNativeTemp = helper.rootNode(config.templateDirNative);
const relativeWebEntryPath = helper.root(config.webEntryFilePath);
const relativeNativEntryPath = helper.root(config.nativeEntryFilePath);
const hasPluginInstalled = fs.existsSync(helper.rootNode(config.pluginFilePath));
const isWin = /^win/.test(process.platform);
const webEntry = {};
const weexEntry = {};

// Wraping the entry file for web and native.
const getEntryFileContent = (tplPath, entryPath, vueFilePath) => {
  let relativeVuePath = path.relative(path.join(entryPath, '../'), vueFilePath);
  let relativePluginPath = helper.rootNode(config.pluginFilePath);
  let contents = '';
  let entryContents = fs.readFileSync(tplPath).toString();
  if (isWin) {
    relativeVuePath = relativeVuePath.replace(/\\/g, '\\\\');
    relativePluginPath = relativePluginPath.replace(/\\/g, '\\\\');
  }
  if (hasPluginInstalled) {
    contents += `\n// If detact plugins/plugin.js is exist, import and the plugin.js\n`;
    contents += `import plugins from '${relativePluginPath}';\n`;
    contents += `plugins.forEach(function (plugin) {\n\tweex.install(plugin)\n});\n\n`;
    entryContents = entryContents.replace(/weex\.init/, match => `${contents}${match}`);
    contents = ''
  }
  contents += `\nconst App = require('${relativeVuePath}');\n`;
  contents += `new Vue(Vue.util.extend({el: '#root', store: new Vuex.Store(Store)}, App));\n`;
  return entryContents + contents;
}

// Retrieve entry file mappings by function recursion
const getEntryFile = (dir) => {
  dir = dir || '.';
  const directory = helper.root(dir);
  fs.readdirSync(directory).forEach((file) => {
    const fullpath = path.join(directory, file);
    const stat = fs.statSync(fullpath);
    const extname = path.extname(fullpath);
    if ( stat.isFile() && extname === '.vue') {
      const name = path.join(dir, path.basename(file, extname));
      const webEntryFile = path.join(vueWebTemp, dir, path.basename(file, extname) + '.js');
      const nativeEntryFile = path.join(vueNativeTemp, dir, path.basename(file, extname) + '.js');
      fs.outputFileSync(webEntryFile, getEntryFileContent(relativeWebEntryPath, webEntryFile, fullpath));
      fs.outputFileSync(nativeEntryFile, getEntryFileContent(relativeNativEntryPath, nativeEntryFile, fullpath));
      webEntry[name] = webEntryFile;
      weexEntry[name] = nativeEntryFile;
      // weexEntry[name] = fullpath + '?entry=true';
    }
    // else if (stat.isDirectory() && file !== 'build' && file !== 'include') {
    //   const subdir = path.join(dir, file);
    //   getEntryFile(subdir);
    // }
  });
}

// Generate an entry file array before writing a webpack configuration
getEntryFile();

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [helper.rootNode('src'), helper.rootNode('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

/**
 * Plugins for webpack configuration.
 */
const plugins = [
  /*
   * Plugin: BannerPlugin
   * Description: Adds a banner to the top of each generated chunk.
   * See: https://webpack.js.org/plugins/banner-plugin/
   */
  new webpack.BannerPlugin({
    banner: '// { "framework": "Vue"} \n',
    raw: true,
    exclude: 'Vue'
  }),
  new webpack.DefinePlugin({
    ENVIRONMENT: JSON.stringify(process.env.NODE_ENV || 'development'),
  }),
];

// Config for compile jsbundle for web.
const webConfig = {
  entry: Object.assign(
    webEntry, 
    {
      'vendor': [path.resolve('node_modules/phantom-limb/index.js')]
    }
  ),
  output: {
    path: helper.rootNode('./dist'),
    publicPath: '/',
    filename: '[name].web.js'
  },
  /**
   * Options affecting the resolving of modules.
   * See http://webpack.github.io/docs/configuration.html#resolve
   */
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': helper.resolve('src')
    }
  },
  /*
   * Options affecting the resolving of modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#module
   */
  module: {
    // webpack 2.0 
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader'
        }],
        exclude: /node_modules(?!(\/|\\).*(weex).*)/
      },
      {
        test: /\.vue(\?[^?]+)?$/,
        use: [{
          loader: 'vue-loader',
          options: Object.assign(vueLoaderConfig({useVue: true, usePostCSS: false}), {
            /**
             * important! should use postTransformNode to add $processStyle for
             * inline style prefixing.
             */
            optimizeSSR: false,
            postcss: [
              // to convert weex exclusive styles.
              require('postcss-plugin-weex')(),
              require('autoprefixer')({
                browsers: ['> 0.1%', 'ios >= 8', 'not ie < 12']
              }),
              require('postcss-plugin-px2rem')({
                // base on 750px standard.
                rootValue: 75,
                // to leave 1px alone.
                minPixelValue: 1.01
              })
            ],
            compilerModules: [
              {
                postTransformNode: el => {
                  // to convert vnode for weex components.
                  require('weex-vue-precompiler')()(el)
                }
              }
            ]
            
          })
        }]
      },
      {
        test: /\.(woff2?|eot|ttf|otf|mp3)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 2048,
          name: ('assets/icon/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 2048,
          name: ('assets/img/[name].[hash:7].[ext]')
        }
      },
    ]
  },
  /*
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: plugins
};
// Config for compile jsbundle for native.
const weexConfig = {
  entry: weexEntry,
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js'
  },
  /**
   * Options affecting the resolving of modules.
   * See http://webpack.github.io/docs/configuration.html#resolve
   */
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': helper.resolve('src')
    }
  },
  /*
   * Options affecting the resolving of modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#module
   */
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader'
        }]
      },
      {
        test: /\.vue(\?[^?]+)?$/,
        use: [{
          loader: 'weex-loader',
          options: vueLoaderConfig({useVue: false})
        }]
      },
      {
        test: /\.(woff2?|eot|ttf|otf|mp3)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 2048,
          name: ('assets/icon/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 2048,
          name: ('assets/img/[name].[hash:7].[ext]')
        }
      },
    ]
  },
  /*
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: plugins,
  /*
  * Include polyfills or mocks for various node stuff
  * Description: Node configuration
  *
  * See: https://webpack.github.io/docs/configuration.html#node
  */
  node: config.nodeConfiguration
};

module.exports = [webConfig, weexConfig];
