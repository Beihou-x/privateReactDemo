import React, {useEffect, useState} from 'react';
import {
    Modal,
    notification,
    Form
} from 'antd';
import FormItemRender from '@components/FormItem';

const { Item: FormItem } = Form;


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

type DiscriptionFormProps = {
    formLayout: {
        labelCol: {
            span: number;
        };
        wrapperCol: {
            span: number;
        }
    };
    initialValues: object;
    services: () => Array<data>;
};

const DiscriptionForm: React.FC<DiscriptionFormProps> = ({
                             formLayout = {labelCol: { span: 4},wrapperCol: { span: 16 }},
                             initialValues = {},
                             services,
                         }) => {
    const [formList, setFormList] = useState([]);

    useEffect(() => {
        discriptionSearch();
    }, []);

    //查询字典
    const discriptionSearch = async () => {
        try {
            if (services) {
                const response: Array<data> | any = await services();

                setFormList(response && response || []);
            }
        } catch (e) {
            notification.error(e);
        }
    };

    return (
        <Form
            {...formLayout}
            initialValues={initialValues}
        >
            {
                formList.map((item: data) => (
                    <FormItem
                        label={item.display}
                        name={item.name}
                        key={item.name}
                        rules={
                            item && item.rule && [
                                { required: item && item.required ||false, message: `请输入${item.display}`},
                                { pattern: item && item.rule && `${item.rule}`, message: `输入值不符合${item.rule}` }
                            ] || [
                                { required: item && item.required ||false, message: `请输入${item.display}`},
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
    )
};

export default DiscriptionForm;