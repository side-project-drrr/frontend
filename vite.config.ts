import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                manualChunks: id => {
                    if (id && id.indexOf('node_modules') !== -1) {
                        const modulePath = id.split('node_modules/').pop(); // 이 시점에서 undefined인지 확인
                        if (modulePath) {
                            const module = modulePath.split('/')[0];
                            return `vendor-${module}`;
                        }
                    }
                },
            },
        },
    },
});
