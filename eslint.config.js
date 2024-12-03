import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import globals from 'globals'
import tseslint from 'typescript-eslint'


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      '**/dist/**', 
      '**/dist/assets/**',
      '**/node_modules/**' 
    ],
  },

  { files: [ '**/*.{js,mjs,cjs,ts,jsx,tsx}' ], },
  {
    languageOptions: { globals: globals.browser },
    settings: { react: { version: 'detect' } }
  },
  pluginJs.configs.recommended,
  tseslint.configs.base,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      quotes: [ 'error', 'single' ],
      semi: [ 'error', 'never' ],
      indent: [ 'error', 2 ],
      'react/jsx-indent-props': [ 'error', 2 ],
      'react/jsx-indent': [ 'error', 2 ],
      'array-bracket-spacing': [ 'error', 'always' ],
      'block-spacing': [ 'error', 'always' ],
      'space-in-parens': [ 'error', 'never' ],
      'comma-spacing': 'error',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-child-element-spacing': 'error',
      'react/jsx-closing-bracket-location': [ 'error', 'line-aligned' ],
      'react/jsx-closing-tag-location': [ 'error', 'line-aligned' ],
      'react/jsx-curly-brace-presence': [ 'error', 'never' ],
      'no-unused-vars': 'off',
      'react/jsx-newline': 'warn',
      'react/jsx-curly-spacing': 'error',
      'react/jsx-max-props-per-line': [
        'error', {
          maximum: 1,
          when: 'multiline' 
        }
      ],
      'react/jsx-first-prop-new-line': [ 'error', 'multiprop' ],
      'react/jsx-equals-spacing': [ 'error', 'never' ],
      'react/jsx-sort-props': [
        'error', {
          ignoreCase: true,
          callbacksLast: true,
          shorthandFirst: true,
          reservedFirst: true,
          multiline: 'first',
        }
      ],
      'react/no-unused-prop-types': 'warn',
      'react/no-unused-state': 'warn',
      'react/jsx-tag-spacing': [
        'error', {
          'closingSlash': 'never',
          'beforeSelfClosing': 'always',
          'afterOpening': 'never',
          'beforeClosing': 'allow'
        }
      ],
      'no-undef': 'warn',
      'no-useless-escape': 'warn',
      'react/jsx-key': 'warn',
      'no-constant-binary-expression': 'warn',
      'react/no-unescaped-entities': 'warn',
      'camelcase': 'warn',
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: [
            'multiline-const',
            'multiline-let',
            'block-like',
            'function',
            'multiline-var',
            'multiline-block-like',
            'multiline-expression',
            'import',
          ],
          next: '*',
        },
        {
          blankLine: 'never',
          prev: [
            'singleline-const',
            'singleline-let',
            'singleline-var',
          ],
          next: [
            'singleline-const',
            'singleline-let',
            'singleline-var',
          ],
        },
        {
          blankLine: 'always',
          prev: [
            'singleline-const',
            'singleline-let',
            'singleline-var',
          ],
          next: [
            'multiline-const',
            'multiline-let',
            'block-like',
            'function',
            'multiline-var',
            'multiline-block-like',
            'multiline-expression',
            'import',
          ],
        },
        {
          blankLine: 'never',
          prev: [ 'import' ],
          next: [ 'import' ],
        },
      ],
      'sort-vars': [
        'error',
        { ignoreCase: true },
      ],
      'curly': [ 'error', 'all' ],
      'brace-style': [
        'error',
        '1tbs',
        { allowSingleLine: false },
      ],
      'function-paren-newline': [ 'error', 'multiline' ],
      'array-element-newline': [ 'error', 'consistent' ],
      'array-bracket-newline': [
        'error',
        {
          multiline: true,
          minItems: 3,
        },
      ],
      'object-property-newline': [ 'error', { 'allowAllPropertiesOnSameLine': false } ],
      'object-curly-spacing': [ 'error', 'always' ],
      'object-curly-newline': [
        'error', {
          ImportDeclaration: {
            multiline: true,
            minProperties: 2,
          },
          ObjectExpression: {
            multiline: true,
            minProperties: 2,
          },
        },
      ],
    }
  }
]