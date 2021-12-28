import React, {} from 'react';
import ReactEcharts from 'echarts-for-react';

type EchartsProps = {
    styles?: object;
    options: object;
};

const Echarts: React.FC<EchartsProps> = ({
    options =  {},
    styles = {
        width: '100%',
        height: '100%'
    }
                                   }) => {
    return (
        <ReactEcharts
            style={styles}
            option={options}
        />
    );
};

export default Echarts;