/*
 * Copyright (c) 2011-2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */
'use strict';

var fs = require('fs'),
    log = require('./log'),
    jslint = require('jslint/lib/linter').lint,
    Scan = require('scanfs'),

    lintopts = require('../config').lintopts,
    jscount,
    pending,
    errors,
    callback;


// scanfs error callback
function scanErr(err, pathname) {
    log.debug(err);
    if ('ENOENT' === err.code) {
        callback(pathname + ' does not exist.');
    } else {
        callback('Unexpected error.');
    }

    // cli does process.exit() in callback, but unit tests don't. just disable.
    callback = function () {};
}

function doneYet() {
    var errout,
        msgout;

    pending -= 1;
    if (!pending) {
        errout = Object.keys(errors).length ? errors : null;
        msgout = 'Done. No lint found in ' + jscount + ' js files.';
        callback(errout, errout ? null : msgout);
    }
}

function afterScanning(errcount, total) {
    log.debug('scanning done. errors: %d, items: %d', errcount, total);
    doneYet();
}

function afterLinting(err, pathname) {
    if (err) { // fs.readFile error?
        log.error('Unexpected problem reading', pathname);
        log.error(err);
        errors[pathname] = {line: '', col: '', msg: err.message, evidence: ''};
    }
    doneYet();
}

function onIgnored(err, pathname) {
    log.debug('ignored', pathname);
}

// save array of lint error(s) in object keyed by filename
function tally(pathname, offenses) {
    var count = offenses.length,
        plural = count > 1 ? 's' : '';

    function perOffense(o) {
        if (!errors[pathname]) {
            errors[pathname] = [];
        }

        if (o) {
            errors[pathname].push({
                line: o.line,
                col: o.character,
                msg: o.reason,
                evidence: o.evidence || ''
            });
        }
    }

    log.error('%d error%s in %s', count, plural, pathname);
    offenses.forEach(perOffense);
}

function lint(err, pathname) {
    pending += 1; // account for async fs.readFile soon-to-be in-progress
    jscount += 1;

    function onread(err, contents) {
        var results;
        if (!err) {
            /*jslint regexp:true */
            results = jslint(contents.replace(/^#!.+$/, ''), lintopts);
            if (results.ok) {
                log.debug('✔ %s', pathname);
            } else {
                tally(pathname, results.errors);
            }
        }
        afterLinting(err, pathname);
    }

    // encoding as a string param for realier versions of node
    fs.readFile(pathname, 'utf8', onread);
}

function isJs(err, pathname, stat) {
    if (stat.isFile() && ('.js' === pathname.slice(-3))) {
        return '.js';
    }
}

function main(sources, exclude, cb) {
    var scan = new Scan(exclude, isJs);

    // up-scope state
    callback = cb;
    errors = {};
    pending = 1; // count in-progress async ops. set to 1 to account for scan
    jscount = 0; // count of .js files seen

    scan.on('.js', lint);
    scan.on('ignored', onIgnored);
    scan.on('error', scanErr);
    scan.on('done', afterScanning);
    scan.relatively(sources);
}

module.exports = main;
