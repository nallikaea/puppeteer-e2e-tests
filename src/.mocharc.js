'use strict';

module.exports = {
    recursive: true,
    spec: 'lib/index.js',
    timeout: 70000,
    reporter: 'mocha-multi-reporters',
    'reporter-options': 'configFile=src/reporterConfig.json'
};
