import React, {useState, forwardRef, useImperativeHandle, useEffect, useContext} from 'react';
import {
  Modal,
  Form,
  message
} from 'antd';
import { DefaultPubSubContext } from '@components/PubSubscribe';

const {Item: FormItem} = Form;

type FormModalProps = {
  initialValues: object;
  formList: Array<{
      name: string;
      label: string;
      renderFormItem: (params: object) => any;
      formItemProps: object;
  }>;
  width: number;
  title: string;
  services: (params: object) => void;
  subscribeName: string;
};

const FormModal: React.ForwardRefRenderFunction<HTMLDivElement, FormModalProps> = ({
                                               width = 680,
                                               title = "",
                                               initialValues = {},
                                               formList = [],
                                               services,
                                               subscribeName = ""
                                             }, ref) => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const {subscribe, unsubscribe} = useContext(DefaultPubSubContext);

  useImperativeHandle<any, any>(ref, () => ({
    handleModalVisible: setModalVisible
  }));

  useEffect(() => {
      subscribe(subscribeName, setModalVisible);

      return () => unsubscribe(subscribeName, setModalVisible);
  }, []);

  //关闭弹窗
  const onCancel = () => {
    form.resetFields();
    setModalVisible(false);
  };

  //确认按钮
  const okHandle = () => {
    try {
      form.validateFields()
        .then(async fieldsValue => {
          await services({
            ...initialValues,
            ...fieldsValue
          });
          onCancel();
        })
    } catch (e) {
      message.error(`${e}`);
    }
  };

  const formLayout = {labelCol: {span: 4}, wrapperCol: {span: 16}};

  return (
    <Modal
      maskClosable={false}
      destroyOnClose
      width={width}
      title={title}
      onCancel={() => onCancel()}
      onOk={okHandle}
      visible={modalVisible}
    >
      <Form
        form={form}
        {...formLayout}
        initialValues={initialValues}
      >
        {
          (formList || []).map(({formItemProps = {}, ...item}) => (
            <FormItem label={item.label} name={item.name} {...formItemProps} key={item.name}>
              {item.renderFormItem(item)}
            </FormItem>
          ))
        }
      </Form>
    </Modal>
  )
};

FormModal.displayName = "FormModal";

export default forwardRef(FormModal);
