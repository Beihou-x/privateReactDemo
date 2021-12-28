import React, { useRef, useState } from "react";
import {
  Modal,
  notification,
  message,
} from "antd";
import VForm from "@components/VForm";
import { dictionaryUpdate } from "@/services/v1";

type AddFormProps = {
  editShow;
  handleEditShow;
  list;
  searchHandel;
  editData;
  category
};

const AddForm: React.FC<AddFormProps> = (props) => {
  const { editShow, handleEditShow, list, searchHandel, editData,category } = props;

  const categoryList = list.map((item) => {
    return {
      label: item.name,
      value: item.name,
    };
  });

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
        dictionaryUpdate(editData.id,valid).then((res) => {
          if (res ===undefined) {
            message.success("字典编辑成功");
            searchHandel && searchHandel(category);
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
    {
      name: "category",
      label: "字典",
      type: "select",
      list: categoryList,
      disabled: 'disabled',
      rules: [{ required: true }]
    },
    { name: "name", label: "名称", rules: [{ required: true }] },
    { name: "code", label: "编码", rules: [{ required: true }] },
    { name: "sequence", label: "排序", type: "inputNumber" },
  ];

  const handleCancel = () => {
    handleEditShow({},false);
  };
  const layout = { labelCol: { span: 8 }, wrapperCol: { span: 10 } };
  const initialValues = { category: "", name: "", code: "", sequence: 0 };

  return (
    <Modal
      title="编辑"
      width={700}
      visible={editShow}
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
        data={editData}
      />
    </Modal>
  );
};

export default AddForm;
