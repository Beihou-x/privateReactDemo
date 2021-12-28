import React, {useEffect} from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';
import geoJson from '@/assets/mapjson/320500.json';

const Map = ({
                 styles = {}
             }) => {

    echarts.registerMap('SUZHOU', geoJson as any);

    const getOptionMap = () => {
        return {
            title: {
            },
            legend: {
                data: ['优', '良', '差'],
                textStyle: {
                    color: '#88d8f1'
                },
                icon: 'circle',
                left: 0,
                top: '20%',
                itemGap: 20,
                orient: 'vertical'
            },
            geo: [{
                map: 'SUZHOU',
                aspectScale: 1,
                zoom: 1.2,
                itemStyle: {                    // 定义样式
                    normal: {                    // 普通状态下的样式
                        areaColor: '#003095',
                        borderColor: '#0050b0',
                        shadowBlur: 10,
                        shadowColor: '#012b3b',
                        shadowOffsetX: 50,
                        shadowOffsetY: 20
                    }
                },
                label: {
                    show: true,
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 14,
                }
            },{
                map: 'SUZHOU',
                aspectScale: 1,
                zoom: 1.2,
                // left: '15%',
                itemStyle: {                    // 定义样式
                    normal: {                    // 普通状态下的样式
                        areaColor: '#003095',
                        borderColor: '#0050b0'
                    }
                },
                label: {
                    show: true,
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 14,
                }
            }],
            grid: {
                top: 0,
                right: 0,
                bottom: 0
            },
            series: [
                {
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    name: '差',
                    data: [
                        {name: '常熟市', value: [120.74852,31.658156, 731449]},
                        {name: '张家港市', value: [120.543441,31.865553, 6553255]},
                        {name: '昆山市', value: [120.958137,31.381925, 3590347]},
                        {name: '太仓市', value: [121.151577,31.569315, 3590347]},
                    ],
                    symbol: 'image://' + require('../../../../../assets/dot.png'),
                    symbolSize: 40,
                    itemStyle: {
                        normal: {
                            color: '#b00300'
                        }
                    },
                    rippleEffect: {
                        color: '#0050b0',
                        period: 3
                    }
                },
                {
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    name: '良',
                    data: [
                      {name: '苏州工业园区', value: [120.723343,31.324036, 6553255]},
                      {name: '吴江区', value: [120.65559,31.11868, 3590347]},
                      {name: '姑苏区', value: [120.622249,31.311414, 917092]},
                    ],
                    symbol: 'image://' + require('../../../../../assets/dot-yellow.png'),
                    symbolSize: 40,
                    itemStyle: {
                        normal: {
                            color: '#ffe42e'
                        }
                    },
                    rippleEffect: {
                        color: '#0050b0',
                        period: 3
                    }
                },
                {
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    name: '优',
                    data: [
                      {name: '相城区', value: [120.641792,31.417215, 2949131]},
                      {name: '吴中区', value: [120.280745,31.20965, 38041430]},
                      {name: '虎丘区', value: [120.449771,31.368882, 5187582]},
                    ],
                    symbol: 'image://' + require('../../../../../assets/dot-green.png'),
                    symbolSize: 30,
                    itemStyle: {
                        normal: {
                            color: '#008000'
                        }
                    }
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

export default Map;