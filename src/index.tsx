import React from 'react';
import ReactDOM from 'react-dom/client';
// NOTE:: Do not change below order of CSS import
import './common/css/reset.css';
import './index.css';
import './common/css/common.css';
import { BrowserRouter } from "react-router-dom";

import App from './_app/App';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
