import React, { useContext, useEffect, useState } from 'react';
import {
    Form,
    Button,
    message
} from 'antd';
import { FormProps } from "antd/lib/form/Form";
import {
    action
} from '@/utils/request';
import RenderComponent from '@components/RenderComponent';
import { DefaultPubSubContext } from '@components/PubSubscribe';
import { useHistory } from 'react-router-dom';

interface StandandFormProps extends FormProps {
    initApi?: string; //method type get
    controls?: Array<object>; //formItem
    api?: {
        url: string;

    } | string;
};

const StandandForm: React.FC<StandandFormProps> = ({
    children,
    initialValues,
    labelAlign,
    labelCol,
    layout,
    wrapperCol,
    initApi,
    controls,
    api
}) => {
    const [form] = Form.useForm();
    const [initial, setInitial] = useState({});
    const history = useHistory();

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        if (initApi) {
            action(`${initApi}`, {
                method: 'GET'
            }).then(res => {
                setInitial(res && res.data || {});
            });
        } else if (initialValues && Object.keys(initialValues).length !== 0) {
            setInitial(initialValues);
        }
    };

    //提交表单
    const onFinish = () => {
        try {
            form.validateFields()
                .then(async (fieldsValue: any) => {
                    if (typeof api === 'object') {
                        const { url, ...params } = api;
                        action(url, {
                            ...params,
                            body: {
                                ...fieldsValue
                            }
                        })
                            .then(res => {
                                history.goBack();
                            })
                    }
                })
        } catch (e) {
            message.error(`${e}`);
        }
    };

    //取消
    const handleReset = () => {
        form.resetFields();
        history.goBack();
    };

    const submitButton = (
        <>
            <Button style={{ marginRight: 20 }} onClick={() => handleReset()}>取消</Button>
            <Button type="primary" onClick={() => onFinish()}>确认</Button>
        </>
    );

    return (
        <>
            {
                Object.keys(initial).length !== 0 ? (
                    <Form
                        form={form}
                        initialValues={initial}
                        labelAlign={labelAlign}
                        labelCol={labelCol}
                        layout={layout}
                        wrapperCol={wrapperCol}
                        onFinish={onFinish}
                    >
                        {
                            (controls || []).map((item, index) => (
                                <RenderComponent
                                    key={index}
                                    configuration={item}
                                />
                            ))
                        }
                        {submitButton}
                    </Form>
                ) : null
            }
            {
                Object.keys(initial).length === 0 ? (
                    <Form
                        form={form}
                        labelAlign={labelAlign}
                        labelCol={labelCol}
                        layout={layout}
                        wrapperCol={wrapperCol}
                    >
                        {
                            (controls || []).map((item, index) => (
                                <RenderComponent
                                    key={index}
                                    configuration={item}
                                />
                            ))
                        }
                        {submitButton}
                    </Form>
                ) : null
            }
        </>
    )
};

export default StandandForm;