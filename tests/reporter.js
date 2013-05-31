var test = require('tap').test,
    join = require('path').join,
    log = require('../lib/log'),
    fn = require('../lib/reporter');


log.pause();

test('zzz', function(t) {

    function cb(err, msg) {
        t.equal(err, 'Total of 1 error found in 1 file.');
        t.equal(msg, undefined);
    }

    function print(str) {
        t.equal(str.slice(0, 13), 'JSLint Report');
    }

    var env = {opts:{print:true}, cwd:__dirname},
        rep = fn(env, print, cb),
        offenses = {
            'lib/foo.js': [{
                line: 41,
                col: 1,
                msg: "Expected 'bar' at column 9, not column 1.",
                evidence: 'bar(errors);'
            }]
        };

    t.plan(3);
    rep(offenses, cb, 'ohhai');
});


test('yyy', function(t) {

    function cb(err, msg) {
        t.equal(err, 'Total of 3 errors found in 2 files.');
        t.equal(msg, undefined);
    }

    var env = {opts:{}, cwd:__dirname},
        rep = fn(env, function(){}, cb),
        offenses = {
            'lib/foo.js': [
                {
                    line: 41,
                    col: 1,
                    msg: "Expected 'bar' at column 9, not column 1.",
                    evidence: 'bar();'
                },
                {
                    line: 55,
                    col: 1,
                    msg: "Expected 'zoo' at column 9, not column 1.",
                    evidence: 'zoo();'
                }
            ],
            'lib/bar.js': [
                {
                    line: 41,
                    col: 1,
                    msg: "Expected 'bar' at column 9, not column 1.",
                    evidence: 'bar();'
                }
            ],
        };

    t.plan(2);
    rep(offenses, 'ohhai');
});


test('reporter gets an error string', function(t) {

    function cb(err, msg) {
        t.equal(err, 'ohnoes.');
        t.equal(msg, undefined);
    }

    var env = {opts:{}, cwd:__dirname},
        rep = fn(env, function(){}, cb),
        offenses = 'ohnoes.';

    t.plan(2);
    rep(offenses, 'ohhai');
});
