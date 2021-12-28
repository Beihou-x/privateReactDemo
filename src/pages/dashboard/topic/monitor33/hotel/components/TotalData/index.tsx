import React, {useEffect} from 'react';
import ReactEcharts from 'echarts-for-react';

const TotalData = ({
                 styles = {}
             }) => {

    useEffect(() => {
    }, []);

    const getOptionMap = () => {
        return {
            grid: {
                top: '5%',
                right: '10%',
                bottom: '10%',
            },
            xAxis: {
                type: 'category',
                data: ['基础业务', '轨迹', '档案']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar'
            }]
        };
    };

    return (
        <div>
            <ReactEcharts
                option={getOptionMap()}
                style={styles}
            />
        </div>
    )
};

export default TotalData;