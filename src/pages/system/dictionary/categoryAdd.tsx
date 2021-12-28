import React, { useRef, useState } from "react";
import {
  Modal,
  notification,
  message,
} from "antd";
import VForm from "@components/VForm";
import { dictionaryAdd } from "@/services/v1";

type AddFormProps = {
  addShow;
  handelAddShow;
  getData;
};

const categoryAdd: React.FC<AddFormProps> = (props) => {
  const { addShow, handelAddShow, getData } = props;
  const formRef: any = useRef(null);
  const [loading, setLoading] = useState(false);

  //新增
  const handleOk = () => {
    const vform = formRef.current.getForm();
    //可以在验证后再获取值
    vform
      .validateFields()
      .then((valid) => {
        // 新增字典
        dictionaryAdd(
          {...valid,category: "字典类别"}
        ).then((res) => {
          if (res ===undefined) {
            message.success("字典添加成功!");
            getData && getData();
            handleCancel();
          }
        });
      })
      .catch((error) => {
        notification.error({
          message: "有必填项没填",
        });
        handleCancel();
      });
  };

  const columns = [
    { name: "name", label: "名称", rules: [{ required: true }] },
    { name: "code", label: "编码", rules: [{ required: true }] },
    { name: "sequence", label: "排序",type: "inputNumber" }
  ];

  const handleCancel = () => {
    handelAddShow(false);
  };
  const layout = { labelCol: { span: 8 }, wrapperCol: { span: 10 } };
  const initialValues = {name: '',code: '',sequence: 0}

  return (
    <Modal
      title="新增字典类别"
      width={700}
      visible={addShow}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
    >
      <VForm
        columns={columns}
        ref={formRef}
        span={24}
        layoutCol={layout}
        initialValues={initialValues}
      />
    </Modal>
  );
};

export default categoryAdd;
