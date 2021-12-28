import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import store from './store';
import './index.css';

import App from '@/pages/App';
import { usePubSubscribe, DefaultPubSubContext } from "@components/PubSubscribe";

const pubsub = usePubSubscribe();

ReactDom.render(
    <Provider store={store}>
        <ConfigProvider locale={zhCN}>
            <DefaultPubSubContext.Provider value={{
                ...pubsub
            }}>
                <App />
            </DefaultPubSubContext.Provider>
        </ConfigProvider>
    </Provider>
    ,
    document.getElementById('root')
);
