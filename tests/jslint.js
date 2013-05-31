var test = require('tap').test,
    log = require('../lib/log'),
    fn = require('../jslint');


function getEnv(args, opts) {
    return {
        args: args || [],
        opts: opts || {},
        cwd: __dirname
    };
}

test('jslint (no args)', function(t) {
    var argv = [],
        opts = {loglevel:'error'};

    function cb(err, msg) {
        t.equal(msg, 'Done. No lint found in 0 js files.');
    }
    
    t.plan(1);
    fn(getEnv(argv, opts), cb);
});

test('jslint app', function(t) {
    var argv = ['app'],
        opts = {};

    function cb(err, msg) {
        t.equal(msg, 'Done. No lint found in 0 js files.');
    }
    
    t.plan(1);
    fn(getEnv(argv, opts), cb);
});

test('jslint mojit', function(t) {
    var argv = ['mojit'],
        opts = {};

    function cb(err, msg) {
        t.equal(msg, 'Done. No lint found in 0 js files.');
    }
    
    t.plan(1);
    fn(getEnv(argv, opts), cb);
});

test('jslint mojito', function(t) {
    var argv = ['mojito'],
        opts = {libmojito:__dirname},
        env = getEnv(argv, opts);

    env.mojito = {path:__dirname};

    function cb(err, msg) {
        t.equal(msg, 'Done. No lint found in 0 js files.');
    }
    
    t.plan(1);
    fn(env, cb);
});

test('jslint mojito (missing mojito)', function(t) {
    var argv = ['mojito'],
        opts = {},
        env = getEnv(argv, opts);

    env.mojito = null;

    function cb(err, msg) {
        t.equal(err, 'Mojito is not available. Please install it.');
    }
    
    t.plan(1);
    fn(env, cb);
});
