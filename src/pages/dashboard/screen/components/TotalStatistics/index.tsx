import React, {} from 'react';
import styles from './index.less';

type TotalStatisticsProps = {
    title: string;
    total: React.ReactNode;
    comparison?: React.ReactNode;
    icon: string;
};

const TotalStatistics: React.FC<TotalStatisticsProps> = ({
    title,
    total,
    comparison,
    icon
                         }) => {
    return (
        <div className={styles["total-statistics"]}>
            <div className={`${styles["total-statistics-icon"]} ${styles[icon]}`}>

            </div>
            <div className={styles.title}>
                {title}
            </div>
            <div className={styles.total}>
                {total}
            </div>
            <div className={`${styles["total-statistics-comparison"]}`}>
                {comparison}
            </div>
        </div>
    );
};

export default TotalStatistics;