import React, {} from 'react';
import schema from '@/schema/device-application.json';
import { render as renderAmis } from 'amis';
import { fetcher } from "@/utils/request";

const Application = () => {
    return (
        <div>
            {
                renderAmis(
                    schema,
                    {
                    },
                    {
                        fetcher: fetcher,
                        isCancel: (value: any) => value,
                        copy: content => content,
                        //theme: 'antd'
                    }
                )
            }
        </div>
    );
};

export default Application;