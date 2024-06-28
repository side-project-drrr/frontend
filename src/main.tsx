import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { registerServiceWorker } from './webpush/main.ts';
import { ThemeProvider } from './ThemeContext/ThemeProvider.tsx';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

registerServiceWorker();

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                <BrowserRouter>
                    <ThemeProvider>
                        <App />
                    </ThemeProvider>
                </BrowserRouter>
            </RecoilRoot>
        </QueryClientProvider>
    </React.StrictMode>,
);
