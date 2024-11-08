import pluginJs from '@eslint/js'
import prettier from 'eslint-config-prettier'
import pluginReact from 'eslint-plugin-react'
import sort from 'eslint-plugin-sort'
import globals from 'globals'
import tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
  sort.configs['flat/recommended'],
  prettier,
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  {
    files: ['index.ts'],
    rules: {
      'sort/exports': [
        'error',
        {
          caseSensitive: false,
          groups: [],
          natural: true,
          typeOrder: 'preserve',
        },
      ],
    },
  },
  {
    rules: {
      'sort/imports': [
        'warn',
        {
          groups: [
            { order: 10, type: 'side-effect' },
            { order: 20, type: 'dependency' },
            { order: 30, regex: '^(.*?)atoms(.*?)$' },
            { order: 31, regex: '^(.*?)molecules(.*?)$' },
            { order: 32, regex: '^(.*?)organisms(.*?)$' },
            { order: 33, regex: '^(.*?)templates(.*?)$' },
            { order: 30, type: 'other' },
          ],
          separator: '\n',
        },
      ],
    },
  },
  {
    rules: {
      'sort/object-properties': [
        'error',
        { caseSensitive: false, natural: true },
      ],
    },
  },
  {
    ignores: ['dist'],
  },
]
