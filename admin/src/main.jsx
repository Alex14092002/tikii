import React from 'react';
import ReactDOM from 'react-dom/client';
import { StyleProvider } from '@ant-design/cssinjs';
import App from './App';
// import 'antd/dist/reset.css';
import './assets/css/index.css';
import { Provider } from 'react-redux';
import { store } from './stores';


ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <StyleProvider hashPriority="high">
            <App />
        </StyleProvider>
    </Provider>
);
