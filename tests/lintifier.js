var test = require('tap').test,
    join = require('path').join,
    log = require('../lib/log'),
    fn = require('../lib/lintifier');


log.pause();

test('lint ./fixtures/lintfree', function(t) {

    function cb(err, msg) {
        t.equal(err, null);
        t.equal(msg, 'Done. No lint found in 1 js files.');
    }

    t.plan(2);
    fn([join(__dirname, '/fixtures/lintfree')], ['ignored'], cb);
});

test('lint ./fixtures/linty (fubar.js symlinked)', function(t) {
    var dir = join(__dirname, '/fixtures/linty'),
        fubarpath = join(dir, 'fubar.js'),
        only1path = join(dir, 'only-one-error.js');

    function cb(err, msg) {
        var files = Object.keys(err),
            fubarlint = err[fubarpath],
            only1lint = err[only1path];

        t.equal(files.length, 2, 'expected 2 files with lint errors');

        t.equal(only1lint.length, 1, 'expected 1 lint offense in "only-one-error.js"');
        t.equal(only1lint[0].msg, "Missing 'use strict' statement.");

        t.equal(fubarlint.length, 7, 'expected 7 lint offenses in "fubar.js"');
        t.equal(fubarlint[0].msg, "Expected ';' and instead saw 'function'.");
        t.equal(fubarlint[1].msg, "Missing 'use strict' statement.");
        t.equal(fubarlint[2].msg, "['bar'] is better written in dot notation.");

        t.equal(msg, null);
    }

    t.plan(8);
    fn([dir], ['ignored'], cb);
});

test('lint nonesuch', function(t) {

    function cb(err, msg) {
        t.equal(err, 'nonesuch does not exist.');
        t.equal(msg, undefined);
    }

    t.plan(2);
    fn(['nonesuch'], [], cb);
});
