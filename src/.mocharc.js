'use strict';

module.exports = {
    recursive: true,
    require: [
        'ts-node/register',
        'chai/register-expect.js',
        'chai/register-should.js',
        'chai/register-assert.js',
    ],
    spec: 'lib/index.js',
    timeout: 70000,
    reporter: 'mocha-multi-reporters',
    'reporter-options': 'configFile=src/reporterConfig.json'
};
