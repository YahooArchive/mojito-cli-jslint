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

test('lint ./fixtures/linty', function(t) {
    
    function cb(err, msg) {
        var files = Object.keys(err);//console.log(err);

        t.equal(files.length, 2);
        t.equal(err[files[0]].length, 7);
        t.equal(err[files[0]][0].msg,  "Expected ';' and instead saw 'function'.");
        t.equal(err[files[0]][1].msg,  "Missing 'use strict' statement.");
        t.equal(err[files[0]][2].msg,  "['bar'] is better written in dot notation.");
        t.equal(msg, null);
    }
    
    t.plan(6);
    fn([join(__dirname, '/fixtures/linty')], ['ignored'], cb);
});

test('lint nonesuch', function(t) {
    
    function cb(err, msg) {
        t.equal(err, 'nonesuch does not exist.');
        t.equal(msg, undefined);
    }
    
    t.plan(2);
    fn(['nonesuch'], [], cb);
});
