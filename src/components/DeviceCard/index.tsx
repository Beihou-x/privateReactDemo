import React, {} from 'react';
import {

} from 'antd';
import styles from './index.less';

const DeviceCard = ({
    title,
    total
                    }) => {
    return (
        <div className={styles["device-card"]}>
            <span>图标</span>
            <p>
                <span style={{ marginRight: 10 }}>{title}</span>
                <span>{total}</span>
            </p>
        </div>
    )
};

export default DeviceCard;