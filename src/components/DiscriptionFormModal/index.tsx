import React, {useState, useEffect, useContext} from 'react';
import {
    Modal,
    notification,
    Form
} from 'antd';
import FormItemRender from '@components/FormItem';
import {DefaultPubSubContext} from '@components/PubSubscribe';

const {Item: FormItem} = Form;

type data = {
    display?: string;
    name?: string;
    rule?: any;
    required?: boolean;
    dictionary_use?: string;
    type?: string;
    tips?: string;
    dictionary?: any[];
}

type FormModalProps = {
    width?: number;
    title: string;
    services: (params: any) => any;
    formLayout?: {
        labelCol: {
            span: number;
        };
        wrapperCol: {
            span: number;
        }
    };
    initialValues?: object;
    onEmit?: (params: object) => void;
    addServices: (params: any) => any;
};

const FormModal: React.FC<FormModalProps> = ({
                                                 width = 680,
                                                 title = "",
                                                 services,
                                                 formLayout = {labelCol: {span: 6}, wrapperCol: {span: 14}},
                                                 initialValues = {},
                                                 onEmit = () => {
                                                 },
                                                 addServices
                                             }) => {
    const [formList, setFormList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();
    const {subscribe, unsubscribe, pushlist} = useContext(DefaultPubSubContext);

    useEffect(() => {
        discriptionSearch();
        subscribe('modal:visible', setModalVisible);

        return () => unsubscribe('modal:visible', setModalVisible);
    }, []);

    //查询字典
    const discriptionSearch = async () => {
        try {
            if (services) {
                const response: Array<data> | any = await services({});

                setFormList(response && response || []);
            }
        } catch (e) {
            notification.error(e);
        }
    };

    //点击确认关闭弹窗
    const okHandle = () => {
        form.validateFields()
            .then(async values => {
                // onEmit(values);
                console.log(values);
                await addServices({
                    ...values
                });
                pushlist('modal:ok', {});
                onCancel();
            })
            .catch(error => {
                notification.error({
                    message: `${error}`
                })
            })
    };

    //关闭弹窗
    const onCancel = () => {
        setModalVisible(false);
        form.resetFields();
    };

    return (
        <Modal
            maskClosable={false}
            destroyOnClose
            width={width}
            title={title}
            visible={modalVisible}
            onCancel={() => onCancel()}
            onOk={() => okHandle()}
        >
            <Form
                {...formLayout}
                initialValues={initialValues}
                form={form}
            >
                {
                    formList.map((item: data) => (
                        <FormItem
                            label={item.display}
                            name={item.name}
                            key={item.name}
                            rules={
                                item && item.rule && [
                                    {required: item && item.required || false, message: `请输入${item.display}`},
                                    {pattern: item && item.rule && `${item.rule}`, message: `输入值不符合${item.rule}`}
                                ] || [
                                    {required: item && item.required || false, message: `请输入${item.display}`},
                                ]
                            }
                        >
                            <FormItemRender
                                dictionary={item && item.dictionary}
                                type={item.type}
                                dictionaryuse={item.dictionary_use}
                                tips={item.tips}
                            />
                        </FormItem>
                    ))
                }
            </Form>

        </Modal>
    );
};

export default FormModal;