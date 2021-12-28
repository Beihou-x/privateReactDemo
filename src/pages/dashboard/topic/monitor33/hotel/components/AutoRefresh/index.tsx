import React, { useEffect, useState } from 'react';

type AutoRefreshProps = {
    autorefresh?: boolean;
    services?: Promise<any> | Array<() => Promise<any>> | (() => Promise<any>);
    time?: number;
    children: ((datasource: any) => React.ReactElement) | React.ReactElement;
};

const AutoRefresh: React.FC<AutoRefreshProps> = ({
    autorefresh = false,
    services,
    time = 10000,
    children
}) => {
    const [datasource, setData] = useState([]);
    let timer: any = null;

    useEffect(() => {
        if (autorefresh) {
            handleAutoRefresh();
        } else {
            fetch();
        }

        // return () => {
        //     clearTimeout(timer);
        // }
    }, []);

    const handleAutoRefresh = () => {

        if (typeof services !== "function") {
            if (services && services instanceof Array) {

                Promise.all([...services])
                    .then((res: any) => {
                        setData((res && res || []));

                        timer = setTimeout(handleAutoRefresh.bind(this), time);
                    })
                    .catch(error => {
                        console.error(error);
                    })
            }
        } else {
            (services as any)()
                .then(response => {
                    setData(response && response || []);

                    timer = setTimeout(handleAutoRefresh.bind(this), time);
                })
                .catch(error => {
                    console.error(error);
                })
        }
    };

    const fetch = () => {
        if (services && typeof services === 'function') {
            (services as any)()
                .then((response: any) => {
                    setData(response && response || []);
                })
                .catch(error => {
                    console.error(error);
                })
        } else if (services && services instanceof Array) {
            Promise.all([...services])
                .then((res: any) => {
                    setData((res && res || []));
                })
                .catch(error => {
                    console.log(error);
                })
        }
    };

    return typeof children === 'function' ? (children(datasource)) : (
        React.cloneElement((children as React.ReactElement), {
            data: datasource
        })
    )
};

export default AutoRefresh;