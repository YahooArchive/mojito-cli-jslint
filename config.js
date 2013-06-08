module.exports = {
    "lintopts": {
        "continue": true,
        "node": true,
        "predef": [
            "__dirname", "__filename", "console", "document", "exports",
            "global", "module", "navigator", "process", "require", "window",
            "Y", "YAHOO_config", "YAHOO", "YUI_config", "YUI"
        ]
    },
    "exclude": {
        "always": [
            /(^|\/)\.git$/,
            /(^|\/)\.svn$/
        ],
        "mojito": [
            /(^|\/)artifacts$/,
            /(^|\/)docs$/,
            /(^|\/)examples$/,
            /(^|\/)mojito\/node_modules$/,
            /(^|\/)tests$/
        ],
        "app": [
            /(^|\/)artifacts$/,
            /(^|\/)node_modules$/,
            /(^|\/)tests$/
        ],
        "mojit": [
            /(^|\/)artifacts$/,
            /(^|\/)node_modules$/,
            /(^|\/)tests$/
        ]
    }
};
