import React, { useState, useEffect } from 'react';
import {
  Upload,
  Button,
  message,
  notification
} from 'antd';
import {
  LoadingOutlined,
  UploadOutlined
} from '@ant-design/icons';

const UploadFile = ({
  services,
  submit,
  children
}) => {
  const [uploadLoading, setUploadLoading] = useState(false);

  const customRequest = async ({ file }) => {
    try {
      setUploadLoading(true);

      if (/(.xlsx)/.test(file.name)) {
        const formData = new FormData();
        formData.append('file', file);

        await services({
          formData
        });
        setUploadLoading(false);
      } else {
        setUploadLoading(false);
        message.info('上传的格式必须为xlsx');
      }
    } catch (e) {

    }
  };

  return (
    <Upload showUploadList={false}
      customRequest={customRequest}
    >
      <Button icon={uploadLoading ? <LoadingOutlined /> : <UploadOutlined />}
        type="primary">{children}</Button>
    </Upload>
  )
};


UploadFile.defaultProps = {

};

export default UploadFile;
