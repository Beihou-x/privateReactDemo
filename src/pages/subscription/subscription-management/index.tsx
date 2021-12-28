import React, {} from 'react';
import schema from '@/schema/subscription-management.json';
import { render as renderAmis } from 'amis';
import { fetcher } from "@/utils/request";

const SubScriptionManagement = () => {
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
    )
};

export default SubScriptionManagement;