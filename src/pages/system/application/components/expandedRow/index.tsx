import React, {useEffect, useState} from 'react';
import { serverDiscription } from '@/services/v1';
import {
    Row,
    Col,
} from 'antd';

const ExpandedRow = ({
    values = {}
                     }) => {
    const [discription, setDiscription] = useState([]);
    useEffect(() => {
        fetchDiscription();
    }, []);

    const fetchDiscription = async () => {
        const response = await serverDiscription({});

        setDiscription(response || []);
    };

    return (
        <Row gutter={32} justify="center">
            {
                (discription || []).map((item: any) => (
                    <Col span={6} style={{ marginBottom: 20 }}>
                        <span>{item.display}:</span>
                        <span>{values[item.name]}</span>
                    </Col>
                ))
            }
        </Row>
    )
};

export default ExpandedRow;