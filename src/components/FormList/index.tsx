import React, {useEffect, useState} from 'react';
import {
    Form
} from 'antd';
import FormItem from '@components/FormItem';

const {Item} = Form;

type descriptionProps = {
    name: string;
    rule: any;
    required: boolean;
    display: string;
    dictionary: Array<{
        code: string;
        name: string;
    }>;
    type: string;
    dictionary_use: string;
    belongTag: string;
    belong_codes: string[];
};

type FormListProps = {
    services: () => any;
};

const FormList = ({
    services,
                  }) => {
    const [formList, setForm] = useState([]);

    useEffect(() => {
        fetchDescription();
    }, []);

    //查询字典
    const fetchDescription = async () => {
        const response = await services();

        setForm(response || []);
    };

    return (
        <>
            {
                formList.map((item: descriptionProps) => {
                    if (item && item.belongTag) {
                        return (
                           <Item
                               key={item.name}
                               noStyle
                               shouldUpdate={(prevValues, currentValues) => prevValues[item.belongTag] !== currentValues[item.belongTag]}
                           >
                               {
                                   ({ getFieldValue, setFieldsValue }) => {
                                       const index = (item && item.belong_codes || []).findIndex(q => q === getFieldValue(item.belongTag));

                                       if (index > -1) {
                                           return (
                                               <Item
                                                   key={item.name}
                                                   name={item.name}
                                                   label={item.display}
                                                   rules={item && item.rule && [
                                                       { required: item && item.required ||false, message: `请输入${item.display}`},
                                                       { pattern: item && item.rule && `${item.rule}`, message: `输入值不符合${item.rule}` }
                                                   ] || [
                                                       { required: item && item.required ||false, message: `请输入${item.display}`},
                                                   ]}>
                                                   <FormItem
                                                       dictionary={item && item.dictionary}
                                                       type={item.type}
                                                       dictionaryuse={item.dictionary_use}
                                                   />
                                               </Item>
                                           );
                                       }

                                       setFieldsValue({
                                           [item.name]: undefined
                                       });
                                       return null;
                                   }
                               }
                           </Item>
                        )
                    }
                    else {
                        return (
                            <Item
                                key={item.name}
                                name={item.name}
                                label={item.display}
                                rules={item && item.rule && [
                                    { required: item && item.required ||false, message: `请输入${item.display}`},
                                    { pattern: item && item.rule && `${item.rule}`, message: `输入值不符合${item.rule}` }
                                ] || [
                                    { required: item && item.required ||false, message: `请输入${item.display}`},
                                ]}>
                                <FormItem
                                    dictionary={item && item.dictionary}
                                    type={item.type}
                                    dictionaryuse={item.dictionary_use}
                                />
                            </Item>
                        )
                    }
                })
            }
        </>
    )

};

export default FormList;