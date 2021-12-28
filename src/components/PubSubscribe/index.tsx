import React, { Context, useContext } from 'react';

type PubSubscribeProps = {
    subscribe?: (e: string, callback: () => void) => void;
    pushlist?: (e: string, params: object) => void;
    unsubscribe?: (e: string, callback: () => void) => void;
};

const DefaultPubSubContext: PubSubscribeProps | any = React.createContext(null);

const usePubSubscribe = () => {
    const subscribes = {};

    const subscribe = (event, callback) => {
        if (typeof callback !== 'function') {
            throw new Error("Second parameter must be a function");
        }

        if (subscribes[event]) {
            subscribes[event].push(callback);
        } else {
            subscribes[event] = [callback];
        }
    };

    const pushlist = (event, params) => {
        if (subscribes[event]) {
            (subscribes[event] || []).map(item => {
                item(params);
            })
        }
    };

    const unsubscribe = (event, callback) => {
        if (subscribes && subscribes[event]) {
            let newSubscribes = (subscribes[event] || []).filter(q => q !== callback);
            subscribes[event] = newSubscribes;
        }
    };

    return {
        subscribe,
        pushlist,
        unsubscribe,
    };
};

export {
    usePubSubscribe,
    DefaultPubSubContext
};