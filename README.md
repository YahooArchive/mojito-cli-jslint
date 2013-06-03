mojito-jslint
==========
[![Build Status](https://travis-ci.org/yahoo/mojito-cli-jslint.png?branch=rewrite)](https://travis-ci.org/yahoo/mojito-cli-jslint)

This package provides the `jslint` command for the [`mojito-cli`](https://github.com/yahoo/mojito-cli). Install it with `npm install -g mojito-cli`.

Usage
-----

Scan files or paths for javascript files, and check their contents with [jslint](http://www.jslint.com/):

    mojito jslint [options] [app|mojit|mojito] [path(s)]

The default jslint options used, and the patterns of files or directories that will be ignored, are listed in `config.js`.

This command can be used generally, if these defaults are acceptable. In other words:

    mojito jslint [optional file(s) or path(s)]

...will find jslint errors, if any, on all files ending in `.js` in any of the files or directories specified as arguments. If no paths are specified, the current working directory is assumed.

Type arguments "app" and "mojit" are provided for backwards compatibility. If a type argument of "mojito" is used, the mojito library will be linted. This additional type is provided to support the old behavior `mojito jslint`, with no arguments, would act on the mojito library.

To run JSLint on a specific mojit:

    mojito jslint mojit <path/to/mojit>

### Options

    --directory <path>  Destination directory of the lint report, if --print
    -d <path>           is not specified. Default is "artifacts/jslint/". The
                        lint report file is named "jslint.html".

    --exclude <pattern> File or directory patterns to exclude from linting.
    -e <pattern>        This option can be used multiple times.

    --print             Print the lint results, if any, to the console.
    -p

Discussion/Forums
-----------------

http://developer.yahoo.com/forum/Yahoo-Mojito

Licensing and Contributions
---------------------------

This software is free to use under the Yahoo! Inc. BSD license. See LICENSE.txt. To contribute to the Mojito project, please
see [Contributing](https://github.com/yahoo/mojito/wiki/Contributing-Code-to-Mojito).

The Mojito project is a [meritocratic, consensus-based community project](https://github.com/yahoo/mojito/wiki/Governance-Model),
which allows anyone to contribute and gain additional responsibilities.
