import React from "react";
import { Upload, Button, notification, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { lowerFirst } from "lodash";

const { Dragger } = Upload;

type UploadFileProps = {
  services: any;
  onEmit?: (type: string,res:any) => void;
};

const UploadFile: React.FC<UploadFileProps> = ({
  services,
  onEmit = () => {},
}) => {
  //自定义上传
  const customRequest = async ({
    action,
    data,
    file,
    filename,
    headers,
    onError,
    onProgress,
    onSuccess,
    withCredentials,
  }: any) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      await services({
        formData,
      }).then((res) => {
        if (res) {
          onEmit("submit",res);
        } else {
          onEmit("error",'');
        }
      });
    } catch (e: any) {
      notification.error(e);
      onEmit("error",e);
    }
  };

  return (
    <>
      <Dragger
        // showUploadList={false}
        customRequest={customRequest}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">将文件拖到此处，或点击上传</p>
      </Dragger>
      <div style={{ color: "red", marginTop: 10 }}>
        注: 只可上传.xls、.xlsx格式文件
      </div>
    </>
  );
};

export default UploadFile;
