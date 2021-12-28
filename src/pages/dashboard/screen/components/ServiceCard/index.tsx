import React, {} from 'react';
import styles from './index.less';

type ServiceCardProps = {
    title: string;
};

const ServiceCard: React.FC<ServiceCardProps> = ({
    title,
    children
                         }) => {
    return (
        <div className={styles["total-statistics"]}>
            {children}
            <div className={styles.title}>
                {title}
            </div>
        </div>
    );
};

export default ServiceCard;