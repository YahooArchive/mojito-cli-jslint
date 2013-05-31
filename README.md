mojito-jslint
==========
[![Build Status](https://travis-ci.org/isao/mojito-cli-jslint.png?branch=rewrite)](https://travis-ci.org/isao/mojito-cli-jslint)

This package provides the `jslint` command for the [`mojito-cli`](https://github.com/yahoo/mojito-cli). Install it with `npm install -g mojito-cli`.

Usage
-----

Scan files or paths for javascript files, and check their contents with [jslint](http://www.jslint.com/):

    mojito jslint [options] [app|mojit|mojito] [path(s)]

The default jslint options used, and the patterns of files or directories that will be ignored, are listed in `config.js`.

Type arguments "app" and "mojit" are provided for backwards compatibility. If a type argument of "mojito" used, the mojito library will be linted.

To run JSLint on a specific mojit:

    mojito jslint mojit <mojit-name-or-path>

### Options

    --print             Print the lint results, if any, to the console. Otherwise
    -p                  lint results, if any, are saved in a file named "jslint.html"
                        in the directory specified by -d.

    --exclude <pattern> File or directory patterns to exclude from linting.
    -e                  This option can be used multiple times.

    --directory         Destination directory of the lint report, if --print
    -d                  is not specified. Default is "artifacts/jslint/".

Discussion/Forums
-----------------

http://developer.yahoo.com/forum/Yahoo-Mojito

Licensing and Contributions
---------------------------

BSD licensed (see LICENSE.txt). To contribute to the Mojito project, please
see [Contributing](https://github.com/yahoo/mojito/wiki/Contributing-Code-to-Mojito).

The Mojito project is a [meritocratic, consensus-based community project](https://github.com/yahoo/mojito/wiki/Governance-Model),
which allows anyone to contribute and gain additional responsibilities.
