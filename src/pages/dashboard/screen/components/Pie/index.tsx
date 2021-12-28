import React, {useEffect} from 'react';
import ReactEcharts from 'echarts-for-react';

const Pie = ({
                             styles = {}
                         }) => {

    useEffect(() => {
    }, []);

    const getOptionMap = () => {
        return {
            series: [
                {
                    type: 'pie',
                    radius: ['60%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '40',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        {
                            value: 1048,
                            name: '进度',
                            itemStyle: {
                                color: '#c94ed0'
                            }
                        },
                        {
                            value: 735,
                            name: '其他',
                            itemStyle: {
                                color: '#28189d'
                            }
                        }
                    ]
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

export default Pie;