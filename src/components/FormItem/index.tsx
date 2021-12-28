import {Input, DatePicker, Select, InputNumber} from 'antd';
import React from 'react';
import moment, {Moment} from 'moment';
import NodeSelection from '@/pages/service/components/NodeSelection';

const {Option} = Select;

type FormItemRenderProps = {
    type?: string;
    dictionary?: Array<{
        code: string;
        name: string;
    }>;
    onChange?: (params: string | string[]) => void | any;
    value?: any;
    tips?: string;
    dictionaryuse?: string;
};

const FormItemRender: React.FC<FormItemRenderProps> = ({
                                                           type,
                                                           dictionary,
                                                           onChange,
                                                           value,
                                                           tips,
                                                           dictionaryuse,
                                                       }) => {
    let component: any = null;

    const onInputChange = (e) => {
        if (type) {
            if (/^(float)/.test(type)) {
                onChange && onChange(e);
            } else {
                onChange && onChange(e.target.value);
            }
        } else {
            onChange && onChange(e.target.value);
        }
    };

    const onSelectChange = (e) => {
        onChange && onChange(e);
    };

    const onDatePickerChange = (e) => {
        onChange && onChange(e && e.format('YYYY-MM-DD') || "");
    };

    if (dictionary && dictionary instanceof Array) {
        if (type === 'stringslice') {
            component = (
                <Select mode="multiple" placeholder={tips && tips || "请选择"} allowClear value={value}
                        style={{width: '100%'}}
                        onChange={onSelectChange}>
                    {
                        (dictionary || []).map((q, index) => (
                            <Option key={index} value={dictionaryuse && q[dictionaryuse] || q.code}>{q.name}</Option>
                        ))
                    }
                </Select>
            )
        } else {
            component = (
                <Select value={value} placeholder={tips && tips || "请选择"} allowClear style={{width: '100%'}}
                        onChange={onSelectChange}>
                    {
                        (dictionary || []).map((q, index) => (
                            <Option key={index} value={dictionaryuse && q[dictionaryuse] || q.code}>{q.name}</Option>
                        ))
                    }
                </Select>
            )
        }
    } else {
        switch (true) {
            case /^(string|int)/.test(type!):
                component = (
                    <Input value={value} placeholder={tips && tips || "请输入"} onChange={onInputChange}/>
                );
                break;
            case /^(float)/.test(type!):
                component = (
                    <InputNumber style={{width: 150}} value={value} min={0} placeholder={tips && tips || "请输入"}
                                 onChange={onInputChange}/>
                );
                break;
            case /^date/.test(type!):
                component = (
                    <DatePicker value={value && moment(value) || ""} placeholder={tips && tips || "请选择"}
                                onChange={onDatePickerChange}></DatePicker>
                );
                break;
            case /^server_select/.test(type!):
                component = (
                    <NodeSelection
                        value={value}
                        onChange={onSelectChange}
                    />
                );
                break;
            default:
                component = (
                    <Input value={value} placeholder={tips && tips || "请输入"} onChange={onInputChange}/>
                );
                break;
        }
    }

    return component;
};

export default FormItemRender;
