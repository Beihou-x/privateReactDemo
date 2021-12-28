import React, {} from 'react';
import {
    notification,
    Upload,
    Button
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

type UploadFileProps = {
    services?: (params: {
        formData: FormData
    }) => void;
    onEmit: (type: string) => void;
};

const UploadFormItem: React.FC<UploadFileProps> = ({
                            onEmit,
    children
                        }) => {

    //自定义上传
    const customRequest = async ({ file }) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            onEmit('submit');
        } catch (e) {
            notification.error(e);
            onEmit('error');
        }


    };

    return (
        <>
            {children}
            <Dragger
                showUploadList={false}
                customRequest={customRequest}
            >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">将文件拖到此处，或点击上传</p>
            </Dragger>
        </>
    )
};

export default UploadFormItem;