import React, { useState } from 'react';
import { Button, message } from 'antd';
import { ButtonProps } from 'antd/es/button/index';

interface DownLoadFileProps extends ButtonProps {
  services: () => any;
  children: any;
};

const DownLoadFile: React.FC<DownLoadFileProps> = ({
  children,
  services,
  ...props
}) => {

  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await services();

      if (response) {
        window.open(response);
      }
      setLoading(false);
    } catch (e) {
      message.error(`${e}`)
    }
  };

  return (
    <a style={{ textDecoration: 'none', color: '#1890ff', cursor: 'pointer' }} loading={String(loading)} onClick={() => handleClick()} {...props}>{children}</a>
  );
};

export default DownLoadFile;
