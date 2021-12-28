import React, { useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';

type BarIntegralityProps = {
    styles: object;
    data?: Array<{
        name: string;
        rec_rate: number;
    }>;
};

const BarIntegrality: React.FC<BarIntegralityProps> = ({
    data,
    styles = {}
}) => {

    useEffect(() => {
    }, []);

    const dataultData = [
        {
            name: '华为',
            rec_rate: 3000, 
        },
        {
            name: '思科',
            rec_rate: 3500, 
        },
        {
            name: '大华',
            rec_rate: 4300, 
        },
        {
            name: '科达',
            rec_rate: 6600, 
        },
        {
            name: '海康',
            rec_rate: 5400, 
        }
    ]

    const getOptionMap = () => {
        
        return {
            grid: {
                left: '5%',
                right: '5%',
                bottom: '5%',
                top: '10%',
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'none'
                },
                formatter: function (params) {
                    return params[0].name + '<br/>' +
                        "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
                        params[0].seriesName + ' : ' + Number((params[0].value.toFixed(4) / 10000).toFixed(2)).toLocaleString() + ' 万元<br/>'
                }
            },
            xAxis: {
                show: false,
                type: 'value'
            },
            yAxis: [{
                type: 'category',
                inverse: true,
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: 'rgba(255, 254, 254, 0.8)',
                        fontSize: 16
                    },
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                data: (data?.length ? data : dataultData).slice(0, 5).map(item => item.name),
                // data: dataultData.slice(0, 5).map(item => item.name),
            }, {
                type: 'category',
                inverse: true,
                axisTick: 'none',
                axisLine: 'none',
                show: true,
                axisLabel: {
                    textStyle: {
                        color: '#ffffff',
                        fontSize: '16'
                    },
                    formatter: function (value) {
                        if (value >= 10000) {
                            return (value / 10000).toLocaleString() + '万';
                        } else {
                            return value.toLocaleString();
                        }
                    },
                },
                data: (data?.length ? data : dataultData).slice(0, 5).map(item => ((item.rec_rate / 100).toFixed(2) + '%'))
            }],
            series: [{
                name: '数量',
                type: 'bar',
                zlevel: 1,
                itemStyle: {
                    normal: {
                        barBorderRadius: 30,
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                            offset: 0,
                            color: 'rgb(57,89,255,1)'
                        }, {
                            offset: 1,
                            color: 'rgb(46,200,207,1)'
                        }]),
                    },
                },
                barWidth: 20,
                data: [...(data?.length ? data : dataultData).slice(0, 5).map(item => item.rec_rate), 10000] 
            }
            ]
        };
    };

    return (
        <ReactEcharts
            option={getOptionMap()}
            style={styles}
        />
    )
};

export default BarIntegrality;