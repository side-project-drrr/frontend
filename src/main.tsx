import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { registerServiceWorker } from './webpush/main.ts';
import { ThemeProvider } from './ThemeContext/ThemeProvider.tsx';
import { RecoilRoot } from 'recoil';

registerServiceWorker();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RecoilRoot>
            <BrowserRouter>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </BrowserRouter>
        </RecoilRoot>
    </React.StrictMode>,
);
