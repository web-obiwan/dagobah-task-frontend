import tsEslintPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import js from '@eslint/js'
import eslintPluginVue from 'eslint-plugin-vue'
import ts from 'typescript-eslint'

export default [
    js.configs.recommended,
    ...ts.configs.recommended,
    ...eslintPluginVue.configs['flat/base'],
    {
        files: ['*.vue', '**/*.vue'],
        languageOptions: {
            parserOptions: {
                parser: '@typescript-eslint/parser'
            }
        },
        rules: {
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-explicit-any': 'warn',
            "no-console": [
                "error",
                {
                    "allow": [
                        "error",
                    ]
                }
            ]
        }
    },
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.mts'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: './tsconfig.eslint.json',
            }
        },
        plugins: {
            '@typescript-eslint': tsEslintPlugin
        },
        rules: {
            ...tsEslintPlugin.configs["recommended-type-checked"].rules,
            '@typescript-eslint/require-array-sort-compare': 'warn',
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-redundant-type-constituents': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            "no-console": [
                "error",
                {
                    "allow": [
                        "error",
                    ]
                }
            ]
        }
    },
    {
        ignores: ['src/components/ui/**', '.gitignore', 'dist/**', 'node_modules/**', 'vite.config.ts', 'tailwind.config.js', 'src/lib/utils.ts']
    }
];
