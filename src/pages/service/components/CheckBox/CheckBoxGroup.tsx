import React, {useEffect, useState} from 'react';
import {
    notification
} from 'antd';

const CheckBoxGroup = ({
    services,
    id,
    children
                       }) => {
    useEffect( () => {
        handleSearch();
    }, []);

    const [data, setData] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await services({
                id
            });

            setData(response && response.dependency_services || []);
        } catch (e) {
            notification.error({
                message: `${e}`
            });
        }
    };

    return (
        <div>
            {
                children(data)
            }
        </div>
    )
};

export default CheckBoxGroup;