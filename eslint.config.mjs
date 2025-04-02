import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
    baseDirectory: __dirname,
})

const eslintConfig = [
    ...compat.config({
        extends: ['next/core-web-vitals', 'next/typescript'],
        plugins: ['import'],
        rules: {
            // 导入排序规则
            'import/order': [
                'error',
                {
                    'groups': [
                        'builtin',    // 内置模块
                        'external',   // 外部模块
                        'internal',   // 内部模块
                        ['sibling', 'parent'], // 同级和父级模块
                        'index',      // 当前目录下的模块
                        'object',     // 对象导入
                        'type',       // 类型导入
                    ],
                    'newlines-between': 'always', // 不同组之间空行
                    'alphabetize': {
                        'order': 'asc', // 按字母顺序排序
                        'caseInsensitive': true, // 忽略大小写
                    },
                    'pathGroups': [
                        {
                            'pattern': 'react',
                            'group': 'external',
                            'position': 'before',
                        },
                        {
                            'pattern': '@/**',
                            'group': 'internal',
                            'position': 'after',
                        },
                    ],
                    'pathGroupsExcludedImportTypes': ['react'],
                    'distinctGroup': false,
                },
            ],
            // 类型导入规则
            '@typescript-eslint/consistent-type-imports': [
                'error',
                {
                    'prefer': 'type-imports',
                    'fixStyle': 'inline-type-imports',
                },
            ],
            // 禁止重复导入
            'import/no-duplicates': 'error',
            // Next.js 特定规则
            '@next/next/no-html-link-for-pages': 'error',
            '@next/next/no-img-element': 'error',
            // React 规则
            'react/jsx-uses-react': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react/display-name': 'off',
            // TypeScript 规则
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/explicit-function-return-type': 'off',
            // 通用规则
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'no-debugger': 'warn',
            'no-unused-vars': 'off', // 使用 TypeScript 的规则
            'prefer-const': 'error',
            'no-var': 'error',
        },
        settings: {
            'import/resolver': {
                'typescript': {
                    'alwaysTryTypes': true,
                },
            },
            'react': {
                'version': 'detect',
            },
        },
        parserOptions: {
            'sourceType': 'module',
            'ecmaVersion': 'latest',
            'ecmaFeatures': {
                'jsx': true,
            },
        },
    }),
]

export default eslintConfig
