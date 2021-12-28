import React, {} from 'react';
import {
    Checkbox,
    Popover,
    Space
} from 'antd';
import { CloudServerOutlined } from '@ant-design/icons'
import styles from './index.less';

type CheckBoxProps = {
    values: {
        name: string;
        id: string;
        icon_url: string;
        version: string;
    } | any;
    disabled?: boolean;
};

const CheckBox: React.FC<CheckBoxProps> = ({
    values,
                                               disabled
                                           }) => {

    return (
        <Popover
            title="详情"
            content={() => (
                <Space direction="vertical">
                    <div>服务器IP信息: {values && values.id || ""}</div>
                    <div>服务访问Urls: {values && values.icon_url || ""}</div>
                    <div>配置文件信息: {values && values.id || ""}</div>
                    <div>统计信息: {values && values.id || ""}</div>
                    <div>服务版本号: {values && values.version || ""}</div>
                    <div>服务当前状态: {values && values.id || ""}</div>
                </Space>
            )}
            trigger="hover">
            <div className={disabled ? `${styles.checkbox} ${styles["checkbox-disable"]}` : styles.checkbox}>
                <Checkbox value={values.id}>
                    <div>
                        <CloudServerOutlined style={{ fontSize: '30px' }} />
                        <br/>
                        <span>{values.name}</span>
                    </div>
                </Checkbox>
            </div>
        </Popover>
    )
};

export default CheckBox;