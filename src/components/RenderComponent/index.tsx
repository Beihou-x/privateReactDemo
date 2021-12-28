import React, {useEffect} from 'react';
import FormRender from '@components/Form';
import {
    Input,
    Form,
    InputNumber,
    Select,
    DatePicker
} from 'antd';
import StandandTable from './table';

const { Option } = Select;

type RenderComponentProps = {

};

const RenderComponent = ({
                             configuration
                         }) => {
    let component: React.ReactElement | null = null;
    const { type, ...other } = configuration;

    //初始化form
    const initForm = () => {
        component = (
            <FormRender
                {...other}
            />
        );
    };

    //初始化input
    const initInput = () => {
        if (other.label) {
            component = (
                <Form.Item
                    name={other.name}
                    label={other.label}
                    rules={other.rules}
                >
                    <Input placeholder={other.tips || "请输入"} />
                </Form.Item>
            )
        } else {

        }
    };

    //初始化inputNumber
    const initInputNumber = () => {
        if (other.label) {
            component = (
                <Form.Item
                    name={other.name}
                    label={other.label}
                    rules={other.rules}
                >
                    <InputNumber style={{width: 150}} min={0} placeholder={other.tips && other.tips || "请输入"}/>
                </Form.Item>
            )
        }
    };

    //初始化select
    const initSelect = () => {
        if (other.label) {
            component = (
                <Select mode={other.mode} placeholder={other.tips && other.tips || "请选择"} allowClear style={{width: '100%'}}>
                    {
                        (other.dictionary || []).map((q, index) => (
                            <Option key={index} value={other.dictionaryuse && q[other.dictionaryuse] || q.code}>{q.name}</Option>
                        ))
                    }
                </Select>
            )
        }
    };

    //初始化DatePicker
    const initDatePicker = () => {
        if (other.label) {
            component = (
                <Form.Item
                    name={other.name}
                    label={other.label}
                    rules={other.rules}
                >
                    <DatePicker placeholder={other.tips && other.tips || "请选择"}></DatePicker>
                </Form.Item>
            )
        }
    };

    //初始化表格
    const initTable = () => {
        component = (
            <StandandTable
                {...other}
            />
        )
    };


    switch (type) {
        case 'form':
            initForm();
            break;
        case 'input':
            initInput();
            break;
        case 'select':
            initSelect();
            break;
        case 'datepicker':
            initDatePicker();
            break;
        case 'inputnumber':
            initInputNumber();
            break;
        case 'table':
            initTable();
            break;
    };

    return component;
};

export default RenderComponent;