import React, {} from 'react';
import styles from './index.less';

type TotalProportionProps = {
    title: string;
    total: React.ReactNode;
    comparison?: React.ReactNode;
    icon: string;
};

const TotalProportion: React.FC<TotalProportionProps> = ({
    title,
    total,
    comparison,
    icon
                         }) => {
    return (
        <div className={styles["total-statistics"]}>
            <div className={`${styles["total-statistics-icon"]} ${styles[`${icon}-icon`]}`}>

            </div>
            <div className={styles.title}>
                {title}
            </div>
            <div className={`${styles.total} ${styles[icon]}`}>
                {total}
            </div>
            <div className={`${styles["total-statistics-comparison"]}`}>
                {comparison}
            </div>
        </div>
    );
};

export default TotalProportion;