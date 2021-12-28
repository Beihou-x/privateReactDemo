import React, { useRef, useState } from "react";
import {
  Modal,
  notification,
  message,
} from "antd";
import VForm from "@components/VForm";
import { dictionaryUpdate } from "@/services/v1";

type AddFormProps = {
  editCategoryShow;
  handelEditShow;
  getData;
  editData;
};

const categoryEdit: React.FC<AddFormProps> = (props) => {
  const { editCategoryShow, handelEditShow, getData,editData } = props;
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
        dictionaryUpdate(editData.id,
          {...valid,category: "字典类别"}
        ).then((res) => {
          if (res ===undefined) {
            message.success("字典编辑成功!");
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
    { name: "sequence", label: "排序",type: "inputNumber" },
  ];

  const handleCancel = () => {
    handelEditShow(false);
  };
  const layout = { labelCol: { span: 8 }, wrapperCol: { span: 10 } };
  const initialValues = {name: '',code: '',sequence: 0}

  return (
    <Modal
      title="字典类别编辑"
      width={700}
      visible={editCategoryShow}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
    >
      <VForm
        columns={columns}
        ref={formRef}
        span={24}
        layoutCol={layout}
        data={editData}
        initialValues={initialValues}
      />
    </Modal>
  );
};

export default categoryEdit;
