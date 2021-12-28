import React, {useContext} from 'react';
import {
    notification,
    Upload,
    message
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { DefaultPubSubContext } from '@components/PubSubscribe';

const { Dragger } = Upload;

type UploadFileProps = {
    services?: (params: {
        formData: FormData
    }) => void;
    onEmit: (type: string) => void;
};

const UploadForm: React.FC<UploadFileProps> = ({
                                                       onEmit,
                                                   }) => {
    const { pushlist } = useContext(DefaultPubSubContext);

    //自定义上传
    const customRequest = async ({ file }) => {
        try {
            if (/(.json)/.test(file.name)) {
               const stearm = new FileReader();

               stearm.addEventListener('load', (reader: any) => {
                   if (reader && reader.target && reader.target.result) {
                       pushlist('dragger:jsonresult', JSON.parse(reader.target.result));
                   }
               });

                stearm.readAsText(file);

            } else {
                message.info('上传的格式必须为json');
            }

            onEmit('submit');
        } catch (e:any) {
            notification.error(e);
            onEmit('error');
        }


    };

    return (
        <>
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

export default UploadForm;