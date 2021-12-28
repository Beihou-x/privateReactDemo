import React, {useContext, useEffect, useState} from 'react';
import {
    Select,
    notification
} from 'antd';
import { serverSearch, serverDiscription, serverAdd } from '@/services/v1';
import FormModal from '@components/DiscriptionFormModal';
import {DefaultPubSubContext} from "@components/PubSubscribe";

const {
    Option
} = Select;

const NodeSelection = ({
    value,
    onChange
                       }: any) => {
    const [serverList, setServer] = useState([]);
    const { pushlist, subscribe, unsubscribe } = useContext(DefaultPubSubContext);

    useEffect(() => {
        fetchServer();
        subscribe('modal:ok', fetchServer);

        return () => unsubscribe('modal:ok', fetchServer);
    }, []);

    //查询所有服务器
    const fetchServer = async () => {
        try {
            const response = await serverSearch({});

            setServer(response && response.items || []);
        } catch (e) {
            notification.error({
                message: `${e}`
            })
        }
    };

    return (
        <div>
            <Select style={{ width: '80%' }} value={value} onChange={onChange}>
                {
                    (serverList || []).map((item: any, index) => (
                        <Option value={item.id} key={index}>{item.name}</Option>
                    ))
                }
            </Select>
            <a style={{ display: 'inline-block' }} onClick={() => {
                pushlist('modal:visible', true);
            }}>+添加节点</a>

            <FormModal
                title="新增节点"
                services={serverDiscription}
                addServices={serverAdd}
            />
        </div>
    );
};

export default NodeSelection;