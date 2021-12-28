import React, { useEffect, useState } from "react";
import { Card, Form, Input, Button, message } from "antd";
import { subscribePlatformDetail } from "@/services/v2";
import VForm from '@components/VForm'
import { CopyToClipboard } from 'react-copy-to-clipboard';
const PlatformConfig = (props) => {
  const form = Form.useForm();
  const [data, setData]: any = useState({});
  const [value, setValue]: any = useState('');
  const [value1, setValue1]: any = useState('');
  const [value2, setValue2]: any = useState('');
  const [value3, setValue3]: any = useState('');
  useEffect(() => {
    subscribePlatformDetail().then((res) => {
      if (res) {
        setData(res)
        const { platform_code = '' } = res
        if (platform_code) {
          setValue(platform_code.substr(0, 6));
          setValue1(platform_code.substr(6, 2));
          setValue2(platform_code.substr(8, 2));
          setValue3(platform_code.substr(-6, 6));
        }

      }
    });
  }, []);

  const columns = [
    {
      name: 'platform_code', label: '平台编码', type: 'render', render: () => <>
        <Input
          type="text"
          value={value}
          style={{ width: 160 }}
          readOnly
        />
        <Input
          type="text"
          value={value1}
          style={{ width: 100, marginLeft: 20 }}
          readOnly
        />
        <Input
          type="text"
          value={value2}
          style={{ width: 100, marginLeft: 20 }}
          readOnly
        />
        <span style={{ color: '#fff', marginLeft: 20 }}>501</span>
        <Input
          type="text"
          value={value3}
          style={{ width: 160, marginLeft: 20 }}
          readOnly
        />
        <CopyToClipboard text={data.platform_code}
          onCopy={() => message.success('复制平台编码成功', 10)}>
          <Button type='primary' style={{ marginLeft: 20 }}>复制</Button>
        </CopyToClipboard>
      </>
    },
    { name: 'account', label: '级联账号', readOnly: true },
    { name: "password", label: "级联密码", readOnly: true },
    { name: "ip", label: "IP地址", readOnly: true },
    { name: "port", label: "端口号", readOnly: true }
  ]

  return (
    <Card bordered={false}>
      <div style={{ width: '50%', minWidth: 930, margin: '0 auto' }}>
        <VForm columns={columns} form={form} data={data} span={24} />
      </div>
    </Card>
  );
};

export default PlatformConfig;
