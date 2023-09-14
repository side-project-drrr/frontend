import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
    'service/*',
    'admin/*',
    'component/*',
    {
        extends: './vitest.config.ts',
        test: {
            name: '@monorepo/service',
            include: ['service/*.{test,spec}.{ts,js,tsx}'],
            environment: 'jsdom',
        },
    },
    {
        extends: './vitest.config.ts',
        test: {
            name: '@monorepo/admin',
            include: ['admin/*.{test,spec}.{ts,js,tsx}'],
            environment: 'jsdom',
        },
    },
    {
        extends: './vitest.config.ts',
        test: {
            name: '@monorepo/component',
            include: ['component/*.{test,spec}.{ts,js,tsx}'],
            environment: 'jsdom',
        },
    },
]);
