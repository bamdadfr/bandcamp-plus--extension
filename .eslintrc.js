module.exports = {
  extends: '@bamdadsabbagh/eslint-config',
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        'react/require-default-props': 'off',
        'jsdoc/require-param': 'off',
        'jsdoc/require-returns': 'off',
      },
    },
  ],
};
