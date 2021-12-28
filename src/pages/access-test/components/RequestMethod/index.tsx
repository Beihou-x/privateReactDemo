import React, {} from 'react';
import {
    Row,
    Col,
    Select,
    Button
} from 'antd';

const { Option } = Select;

const RequestMethod = () => {
    return (
        <Row justify="center" gutter={16}>
            <Col span={2}>
                <Select style={{width: '100%'}}>
                    <Option value="POST">POST</Option>
                    <Option value="GET">GET</Option>
                    <Option value="DELETE">DELETE</Option>
                    <Option value="PUT">PUT</Option>
                </Select>
            </Col>
            <Col span={12}>
                <Select style={{width: '100%'}}>
                    <Option value="1">1400标准</Option>
                </Select>
            </Col>
            <Col span={2}>
                <Button type="primary">请求</Button>
            </Col>
        </Row>
    )
};