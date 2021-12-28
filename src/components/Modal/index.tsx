import React, {useEffect, useState, useContext, ReactElement} from 'react';
import {
    message,
    Modal,
    Button
} from 'antd';
import {DefaultPubSubContext} from '@components/PubSubscribe';


interface ModalComponentProps {
    width?: number;
    title?: string;
    services?: (params: object) => void;
    subscribeName?: string;
    children?: any;
};

const ModalComponent: React.FC<ModalComponentProps> = ({
                                                           width = 680,
                                                           title = "",
                                                           services,
                                                           subscribeName = "",
                                                           children
                                                       }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const {pushlist, subscribe, unsubscribe}:any = useContext(DefaultPubSubContext);

    useEffect(() => {
        subscribe(subscribeName, setModalVisible);

        return () => unsubscribe(subscribeName, setModalVisible);
    }, []);

    //关闭弹窗
    const onCancel = () => {
        setModalVisible(false);
    };

    //确认按钮
    const okHandle = () => {
        try {
            // pushlist(subscribeName, {});
            setModalVisible(false);
        } catch (e) {
            message.error(`${e}`);
        }
    };

    return (
        <Modal
            maskClosable={false}
            destroyOnClose
            width={width}
            title={title}
            // onOk={okHandle}
            onCancel={() => onCancel()}
            visible={modalVisible}
            footer={[
                <Button key="2" onClick={()=>onCancel()}>取消</Button>,
                <Button key="1" type="primary" onClick={()=>okHandle()}>确定</Button>
                ]}
        >
            {children}
        </Modal>
    )
};

export default ModalComponent;