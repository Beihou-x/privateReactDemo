import React, {useState} from 'react';
import {
    Input,
    Form,
    Button,
    Row
} from 'antd';
import { MinusCircleOutlined , PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Item: FormItem } = Form;

type InputListProps = {

};

type InputPlusProps = {
    value?: string;
    onChange?: () => void;
    add: (defaultValue?: any, insertIndex?: number | undefined) => void;
};

type InputMinusProps = {
    value?: string;
    onChange?: () => void;
    remove: (defaultValue?: any, insertIndex?: number | undefined) => void;
};

const InputPlus: React.FC<InputPlusProps> = ({
    value,
    onChange,
    add
                   }) => {

    return (
        <div>
            <Input value={value} onChange={onChange} style={{ width: '70%', marginRight: 10 }}/>
            <a onClick={() => add()}>
                <PlusCircleOutlined />
            </a>
        </div>
    )
};

const InputMinus: React.FC<InputMinusProps> = ({
                        value,
                        onChange,
                        remove
                    }) => {
    return (
        <div>
            <Input value={value} onChange={onChange} style={{ width: '70%', marginRight: 10 }} />
            <a onClick={() => remove()}><MinusCircleOutlined /></a>
        </div>
    )
};

const InputList: React.FC<InputListProps> = ({

                                             }) => {

    const handleAddFields = () => {

    };

    return (
        <Form.List name="list">
            {
                (fields, { add, remove }) => (
                    <>
                        {
                            (fields || []).map(item => (
                                <Row key={item.key} align="middle">
                                    <FormItem
                                        {...item}
                                        name={[item.name]}
                                        fieldKey={item.fieldKey}
                                        style={{
                                            width: '80%'
                                        }}
                                    >
                                        {/*{*/}
                                            {/*fields.length > 1 ? (*/}
                                                {/*<InputMinus {...item} key={item.key} remove={remove}  />*/}
                                            {/*) : null*/}
                                        {/*}*/}
                                        <InputMinus {...item} key={item.key} remove={() => remove(item.name)}  />
                                    </FormItem>
                                </Row>
                            ))
                        }
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            新增
                        </Button>
                    </>
                )
            }
        </Form.List>
    );
};

export default InputList;