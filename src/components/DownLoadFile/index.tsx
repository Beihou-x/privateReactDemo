import React, { useState } from 'react';
import { Button, message } from 'antd';
import { ButtonProps } from 'antd/es/button/index';

interface DownLoadFileProps extends ButtonProps {
    services: (params) => any;
    children: any;
};

const DownLoadFile: React.FC<DownLoadFileProps> = ({
    children,
    services,
    type = 'primary',
    ...props
}) => {

    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        try {
            setLoading(true);
            const response = await services({});
            console.log('response==', response)
            if (response) {
                window.open(response);
            }
            setLoading(false);
        } catch (e) {
            message.error(`${e}`)
        }
    };

    return (
        <Button type={type} loading={loading} onClick={() => handleClick()} {...props}>{children}</Button>
    );
};

export default DownLoadFile;
