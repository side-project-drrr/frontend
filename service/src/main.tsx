import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
//import { worker } from './mocks/brower.ts';
import { ThemeProvider } from './ThemeContext/ThemeProvider.tsx';
import { RecoilRoot } from 'recoil';

// if (import.meta.env.MODE === 'development') {
//     worker.start();
// }

ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
        <RecoilRoot>
            <BrowserRouter>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </BrowserRouter>
        </RecoilRoot>
    // </React.StrictMode>
);
