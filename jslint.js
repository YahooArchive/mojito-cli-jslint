/*
 * Copyright (c) 2011-2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */
'use strict';

var lintifier = require('./lib/lintifier'),
    reporter = require('./lib/reporter'),
    config = require('./config'),
    log = require('./lib/log'),
    usage;


function main(env, cb) {
    var exclude = config.exclude.always.concat(env.opts.exclude || []),
        type = env.args.shift() || '',
        sources = env.args.concat(),
        output = reporter(env, cb); // to format & output lint data

    if (env.opts.loglevel) {
        log.level = env.opts.loglevel;
    }

    // BC
    switch (type.toLowerCase()) {
    case 'app':
        break;
    case 'mojit':
        // todo: convert mojit to source path(s)
        break;
    case 'mojito':
        sources = [env.mojito.path];
        break;
    default:
        // no known type provided, assume pathname
        sources.unshift(type || env.cwd);
        type = 'app';
    }

    // directories to exclude
    env.opts.exclude = exclude.concat(config.exclude[type]);

    // exec
    lintifier(sources, env.opts.exclude, output);
}


module.exports = main;

module.exports.usage = usage = [
    'Usage: mojito jslint [options] [type] [source]',
    '  type    "app", "mojit", or "mojito"',
    '  source  mojit name or path',
    '',
    'Options:',
    '  --directory          directory to save results. Default is artifacts/jslint',
    '  -d                   short for --directory',
    '  --exclude <pattern>  pattern of pathnames to exclude from linting',
    '  -e <pattern>         short for -e',
    '  --print              print results to stdout ',
    '  -p                   short for --print',
    '',
    'Examples:',
    '  Run jslint on the app in the current directory',
    '    mojito jslint app',
    '',
    '  Run jslint on mojits/Bar',
    '    mojito jslint mojit mojits/Bar',
    '    mojito jslint mojit Bar',
    '',
    '  Run jslint on the mojito framework',
    '    mojito jslint mojito'
].join('\n');

module.exports.options = [
    {shortName: 'd', hasValue: true, longName: 'directory'},
    {shortName: 'e', hasValue: [String, Array],  longName: 'exclude'},
    {shortName: 'p', hasValue: false, longName: 'print'}
];
