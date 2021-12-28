import React, {} from 'react';
import {
    Card
} from 'antd';
import styles from './index.less';
import {bigNumberTransform} from "@/utils/utils"

type TotalCardProps = {
    title: string;
    total: number;
    icon: string;
    caution?: string;
};

const TotalCard: React.FC<TotalCardProps> = ({
                                                 title,
                                                 total,
                                                 icon,
                                                 caution
                                             }) => {
    return (
        <div className={styles.content}>
            <img src={icon} alt="" style={{width: 50, height:50}} />
            <span>{title}</span>
            <span style={{color: "#fff",fontSize: 30,fontWeight: 400}}>{bigNumberTransform(total)}</span>
        </div>
    )
};

export default TotalCard;