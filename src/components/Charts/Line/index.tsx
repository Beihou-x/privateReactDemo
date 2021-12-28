import React, {} from 'react';
import ReactEcharts from 'echarts-for-react';

type LineProps = {
    styles: object;
    options: object;
};

const Line: React.FC<LineProps> = ({
    styles,
    options = {}
              }) => {

    return (
        <ReactEcharts
            option={options}
            style={styles}
        />
    )
};

export default Line;