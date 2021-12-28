import React, {useEffect, useState} from 'react';
import { serverDiscription } from '@/services/v1';
import {
    Row,
    Col,
} from 'antd';
import { formatDate } from '@/utils/utils';

const ExpandedRow = ({values}) => {
    const [discription, setDiscription] = useState([]);
    const obj = {
        ...values,
        created_at: formatDate(values && values.created_at, "YYYY-MM-DD"),
      }; 
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
                        <span>{item.display}: </span>
                        <span>{obj[item.name]}</span>
                    </Col>
                ))
            }
        </Row>
    )
};

export default ExpandedRow;