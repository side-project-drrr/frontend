module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        // 'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
        'react-app',
        'plugin:vitest-globals/recommended',
    ],
    //parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        jsx: true,
        tsconfigRootDir: __dirname,
        useJSXTextNode: true,
        ecmaFeatures: { jsx: true },
    },
    plugins: ['react', 'eslint-plugin-prettier'],
    rules: {
        'prettier/prettier': 'error',
        eqeqeq: 'error', // 일치 연산자 사용 필수
        'dot-notation': 'error', // 가능하다면 dot notation 사용
        'no-unused-vars': 'error', // 사용하지 않는 변수 금지
        'react/react-in-jsx-scope': 'off',
        'react/jsx-uses-react': 'off',
    },
};
