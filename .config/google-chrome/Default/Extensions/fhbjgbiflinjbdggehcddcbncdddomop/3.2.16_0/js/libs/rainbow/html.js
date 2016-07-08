/**
 * HTML patterns
 *
 * @author Craig Campbell
 * @version 1.0.9
 */
Rainbow.extend('html', [
    {
        'name': 'source.php.embedded',
        'matches': {
            2: {
                'language': 'php'
            }
        },
        'pattern': /&lt;\?=?(?!xml)(php)?([\s\S]*?)(\?&gt;)/gm
    },
    {
        'name': 'source.css.embedded',
        'matches': {
            1: {
                'matches': {
                    1: 'rainbow.support.tag.style',
                    2: [
                        {
                            'name': 'rainbow.entity.tag.style',
                            'pattern': /^style/g
                        },
                        {
                            'name': 'rainbow.string',
                            'pattern': /('|")(.*?)(\1)/g
                        },
                        {
                            'name': 'entity.tag.style.attribute',
                            'pattern': /(\w+)/g
                        }
                    ],
                    3: 'rainbow.support.tag.style'
                },
                'pattern': /(&lt;\/?)(style.*?)(&gt;)/g
            },
            2: {
                'language': 'css'
            },
            3: 'rainbow.support.tag.style',
            4: 'rainbow.entity.tag.style',
            5: 'rainbow.support.tag.style'
        },
        'pattern': /(&lt;style.*?&gt;)([\s\S]*?)(&lt;\/)(style)(&gt;)/gm
    },
    {
        'name': 'source.js.embedded',
        'matches': {
            1: {
                'matches': {
                    1: 'rainbow.support.tag.script',
                    2: [
                        {
                            'name': 'rainbow.entity.tag.script',
                            'pattern': /^script/g
                        },

                        {
                            'name': 'rainbow.string',
                            'pattern': /('|")(.*?)(\1)/g
                        },
                        {
                            'name': 'rainbow.entity.tag.script.attribute',
                            'pattern': /(\w+)/g
                        }
                    ],
                    3: 'rainbow.support.tag.script'
                },
                'pattern': /(&lt;\/?)(script.*?)(&gt;)/g
            },
            2: {
                'language': 'javascript'
            },
            3: 'rainbow.support.tag.script',
            4: 'rainbow.entity.tag.script',
            5: 'rainbow.support.tag.script'
        },
        'pattern': /(&lt;script(?! src).*?&gt;)([\s\S]*?)(&lt;\/)(script)(&gt;)/gm
    },
    {
        'name': 'rainbow.comment.html',
        'pattern': /&lt;\!--[\S\s]*?--&gt;/g
    },
    {
        'matches': {
            1: 'rainbow.support.tag.open',
            2: 'rainbow.support.tag'
        },
        'pattern': /(&lt;)|(\/?\??&gt;)/g
    },
    {
        'name': 'support.tag',
        'matches': {
            1: 'rainbow.support.tag',
            2: 'rainbow.support.tag.special',
            3: 'rainbow.support.tag-name'
        },
        'pattern': /(&lt;\??)(\/|\!?)(\w+)/g
    },
    {
        'matches': {
            1: 'rainbow.support.attribute'
        },
        'pattern': /([a-z-]+)(?=\=)/gi
    },
    {
        'matches': {
            1: 'rainbow.support.operator',
            2: 'rainbow.string.quote',
            3: 'rainbow.string.value',
            4: 'rainbow.string.quote'
        },
        'pattern': /(=)('|")(.*?)(\2)/g
    },
    {
        'matches': {
            1: 'rainbow.support.operator',
            2: 'rainbow.support.value'
        },
        'pattern': /(=)([a-zA-Z\-0-9]*)\b/g
    },
    {
        'matches': {
            1: 'rainbow.support.attribute'
        },
        'pattern': /\s(\w+)(?=\s|&gt;)(?![\s\S]*&lt;)/g
    },
    {
        'matches': {
            1: 'rainbow.support.plainText'
        },
        'pattern': /\<\/span\>(.+)(?=<span>)/g
    }
], true);