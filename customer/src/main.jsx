import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/css/index.css';
import { Provider } from 'react-redux';
import { store } from './stores';
import HttpsRedirect from 'react-https-redirect';


ReactDOM.createRoot(document.getElementById('root')).render(
    <HttpsRedirect>
        <Provider store={store}>
            <App />
        </Provider>,
    </HttpsRedirect>
);
