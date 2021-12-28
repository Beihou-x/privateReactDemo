import React, {useEffect} from 'react';
import ReactEcharts from 'echarts-for-react';

const BarNegative = ({
                             styles = {}
                         }) => {

    useEffect(() => {
    }, []);

    const getOptionMap = () => {
        return  {
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['停车场', '酒吧', '网吧', '人证核验', '叮咚买菜', '移动闸机']
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value} %'
                },
            },
            grid: {
                top: '5%',
                right: '10%',
                bottom: '10%',
                left: '5%'
            },
            series: [
                {
                    name: '在线率',
                    type: 'line',
                    data: [40, 61, 73, 91, 73, 92, 90],
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    },
                    markLine: {
                        data: [
                            {
                                name: '优',
                                yAxis: 80,
                                lineStyle: {
                                    color: 'green'
                                }
                            },
                            {
                                name: '良',
                                yAxis: 60,
                                lineStyle: {
                                    color: 'yellow'
                                }
                            },
                            {
                                name: '差',
                                yAxis: 40,
                                lineStyle: {
                                    color: 'red'
                                }
                            }
                        ]
                    }
                }
            ]
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

export default BarNegative;