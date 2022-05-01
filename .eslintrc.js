module.exports = {
    plugins: [
        'react',
        'react-hooks',
        'jsx-a11y',
        'jest',
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
    ],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            modules: true,
        },
    },
    // 0: off, 1: warn, 2: error
    rules: {
        //jest
        'jest/no-disabled-tests': 1,
        'jest/no-focused-tests': 2,
        'jest/no-identical-title': 2,
        'jest/prefer-to-have-length': 1,
        'jest/valid-expect': 2,
        //js
        'no-prototype-builtins': 0,
        'no-restricted-globals': 0,
        'no-unused-vars': [2, { ignoreRestSiblings: true }],
        'jsx-a11y/alt-text': 0,
        'jsx-a11y/click-events-have-key-events': 0,
        'jsx-a11y/no-static-element-interactions': 0,
        'jsx-a11y/no-autofocus': 0,
        'react/display-name': 0,
        'react/jsx-uses-vars': 2,
        'react/jsx-uses-react': 2,

        // style
        'no-extra-parens': [1, 'all', { ignoreJSX: 'multi-line' }],
        'array-bracket-newline': [0, 'consistent'],
        'array-element-newline': [0, { minItems: 4 }],
        'block-spacing': 1,
        'brace-style': 1,
        //'comma-dangle': [1, 'always-multiline', {exports: 'never'}],
        'comma-dangle': ['error', {
            'arrays': 'always-multiline',
            'objects': 'always-multiline',
            //'imports': 'never',
            //'exports': 'never',
            //'functions': 'never'
        }],
        'comma-spacing': [1, { before: false, after: true }],
        'computed-property-spacing': [1, 'never'],
        'func-call-spacing': [1, 'never'],
        'function-paren-newline': [1, 'multiline-arguments'],
        'implicit-arrow-linebreak': [1, 'beside'],
        indent: [1, 4, {
            ignoredNodes: [ 'TemplateLiteral' ],
            MemberExpression: 0,
            SwitchCase: 1,
        }],
        'template-curly-spacing': [
            'off',
        ],
        'jsx-quotes': [1, 'prefer-single'],
        'key-spacing': [1, { afterColon: true }],
        'keyword-spacing': [1, { after: true }],
        'multiline-ternary': [1, 'always-multiline'],
        'newline-per-chained-call': [1, { ignoreChainWithDepth: 2 }],
        'no-trailing-spaces': 1,
        'no-unneeded-ternary': 1,
        'nonblock-statement-body-position': [1, 'beside', { overrides: { while: 'below' } }],
        'object-curly-newline': [0, {
            minProperties: 4,
            consistent: true,
        }],
        'operator-linebreak': [1, 'before'],
        'quote-props': [1, 'as-needed'],
        quotes: [1, 'single'],
        semi: [1, 'never'],
        'space-in-parens': [1, 'never'],
        'arrow-parens': [1, 'as-needed'],
        'arrow-spacing': [1, { before: true, after: true }],
        'arrow-body-style': [1, 'as-needed'],
        'prefer-spread': 1,
        'prefer-const': 1,
    },
    env: {
        browser: true,
        es6: true,
        node: true,
        'jest/globals': true,
    },
    globals: {
        fusion: true,
        core: true,
    },
    overrides: [
        {
            files: '**/*.+(ts|tsx)',
            parser: '@typescript-eslint/parser',
            extends: [
                'plugin:@typescript-eslint/eslint-recommended', // removes redundant warnings between TS & ESLint,
                'plugin:@typescript-eslint/recommended', // rules specific to typescript, e.g., writing interfaces
            ],
            rules: {
                '@typescript-eslint/no-unused-vars': [2, { ignoreRestSiblings: true }],
            },
        },
    ],
}
