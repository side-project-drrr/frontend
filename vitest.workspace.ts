import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
    'service/*',
    'admin/*',
    'component/*',
    {
        extends: './vite.config.ts',
        test: {
            name: '@monorepo/service',
            root: '@monorepo/service',
            include: ['service/*.{test,spec}.{ts,js,tsx}'],
            environment: 'jsdom',
            setupFiles: ['service/tests/setup.ts'],
        },
    },
    {
        extends: './vite.config.ts',
        test: {
            name: '@monorepo/admin',
            include: ['admin/*.{test,spec}.{ts,js,tsx}'],
            environment: 'jsdom',
            setupFiles: ['admin/tests/setup.ts'],
        },
    },
    {
        extends: './vite.config.ts',
        test: {
            name: '@monorepo/component',
            include: ['component/*.{test,spec}.{ts,js,tsx}'],
            environment: 'jsdom',
            setupFiles: ['component/tests/setup.ts'],
        },
    },
]);
