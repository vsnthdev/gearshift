module.exports = {
    root: true,
    ignorePatterns: ['dist'],
    parser: '@typescript-eslint/parser',
    env: { es2021: true, browser: true },
    settings: {
        react: {
            version: 'detect'
        }
    },
    'parserOptions': {
        'sourceType': 'module',
        'ecmaVersion': 'latest'
    },
    'plugins': [
        '@typescript-eslint',
        'perfectionist',
        'react',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:react/recommended',
        'plugin:tailwindcss/recommended',
    ],
    overrides: [
        {
            'env': {
                'node': true
            },
            'files': [
                '.eslintrc.{js,cjs}'
            ],
            'parserOptions': {
                'sourceType': 'script'
            }
        }
    ],
    rules: {
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        'indent': [
            'error',
            4
        ],
        'semi': [
            'error',
            'never'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'perfectionist/sort-objects': [
            'error',
            {
                order: 'asc',
                'ignore-case': true,
                type: 'line-length',
                'partition-by-comment': true,
            },
        ],
        'perfectionist/sort-imports': [
            'error',
            {
                order: 'asc',
                type: 'line-length',
                'newlines-between': 'never',
                groups: [
                    'type',
                    'nanostores',
                    ['builtin', 'external'],
                    'internal-type',
                    'internal',
                    ['parent-type', 'sibling-type', 'index-type'],
                    ['parent', 'sibling', 'index'],
                    'side-effect',
                    'style',
                    'object',
                    'unknown',
                ],
            },
        ]
    },
}
