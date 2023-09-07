module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',

        'react-app/jest',
    ],
    overrides: [
        {
            files: ['**/*.ts?(x)'],
            parser: '@typescript-eslint/parser',
            rules: {
                'react/prop-types': 'off',
                'react/require-default-props': 'off',
                '@typescript-eslint/explicit-module-boundary-types': 'off',
                'no-use-before-define': 'off',
                '@typescript-eslint/no-use-before-define': ['error', { variables: false }],
                'no-useless-constructor': 'off',
                '@typescript-eslint/no-useless-constructor': 'error',
                '@typescript-eslint/no-floating-promises': 'off',
            },
            parserOptions: {
                project: [
                    './tsconfig.json',
                    './service/tsconfig.json',
                    './admin/tsconfig.json',
                    './component/tsconfig.json',
                ],
            },
        },
        {
            files: ['**/*.spec.ts?(x)'],
            rules: {
                '@typescript-eslint/unbound-method': 'off',
                'jest/unbound-method': 'error',
            },
        },
        {
            files: ['service/**/*.ts?(x)', 'service/**/*.js?(x)'],
            settings: {
                'import/resolver': {
                    typescript: {
                        project: path.resolve(`${__dirname}/service/tsconfig.json`),
                    },
                },
            },
        },
        {
            files: ['admin/**/*.ts?(x)', 'admin/**/*.js?(x)'],
            settings: {
                'import/resolver': {
                    typescript: {
                        project: path.resolve(`${__dirname}/admin/tsconfig.json`),
                    },
                },
            },
        },
        {
            files: ['component/**/*.ts?(x)', 'component/**/*.js?(x)'],
            settings: {
                'import/resolver': {
                    typescript: {
                        project: path.resolve(`${__dirname}/component/tsconfig.json`),
                    },
                },
            },
        },
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        jsx: true,
        useJSXTextNode: true,
        ecmaFeatures: { jsx: true },
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        eqeqeq: 'error', // 일치 연산자 사용 필수
        'dot-notation': 'error', // 가능하다면 dot notation 사용
        'no-unused-vars': 'error', // 사용하지 않는 변수 금지
        'react/react-in-jsx-scope': 'off',
        'react/jsx-uses-react': 'off',
    },
};
