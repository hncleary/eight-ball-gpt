import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
    js.configs.recommended,
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: './tsconfig.json'
            },
            globals: {
                console: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                setInterval: 'readonly',
                clearInterval: 'readonly'
            }
        },
        plugins: {
            '@typescript-eslint': typescript
        },
                    rules: {
                ...typescript.configs.recommended.rules,
                'indent': ['error', 4],
                '@typescript-eslint/indent': ['error', 4],
                'semi': ['error', 'always'],
                'quotes': ['error', 'single'],
                '@typescript-eslint/quotes': ['error', 'single'],
                'comma-dangle': ['error', 'never'],
                'no-trailing-spaces': 'error',
                'eol-last': ['error', 'always'],
                '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }]
            }
    },
    {
        files: ['**/*.spec.ts', '**/*.test.ts'],
        languageOptions: {
            globals: {
                describe: 'readonly',
                it: 'readonly',
                expect: 'readonly',
                beforeEach: 'readonly',
                afterEach: 'readonly',
                beforeAll: 'readonly',
                afterAll: 'readonly'
            }
        }
    },
    {
        files: ['**/*.js', '**/*.jsx'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module'
        },
        rules: {
            'indent': ['error', 4],
            'semi': ['error', 'always'],
            'quotes': ['error', 'single'],
            'comma-dangle': ['error', 'never'],
            'no-trailing-spaces': 'error',
            'eol-last': ['error', 'always']
        }
    }
]; 