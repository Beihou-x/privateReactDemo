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
            geo: [{
                map: 'SUZHOU',
                zoom: 1,
                // left: '15%',
                layoutCenter: ["50%", "50%"], //地图位置
                // itemStyle: {                    // 定义样式
                //     normal: {                    // 普通状态下的样式
                //         areaColor: 'transparent',
                //         borderColor: '#A9C3EB',
                //         borderWidth: 2,
                //         shadowColor: '#b2cde2',
                //         shadowOffsetX: 0,
                //         shadowOffsetY: 15,
                //         shadowBlur: 10,
                //     }
                // },
                itemStyle: {
                    borderColor: '#243f50',
                    borderWidth: 1,
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: '#1b273d' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#243352'
                        }],
                        global: false
                    },
                    shadowColor: '#263650',
                    shadowOffsetX: -2,
                    shadowOffsetY: 2,
                    shadowBlur: 10,
                },
                label: {
                    show: true,
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 14,
                },
                emphasis: {
                    label: {
                        color: '#b2cde2'
                    },
                    itemStyle: {
                        areaColor: '#263650',
                    }
                },
                height: '100%',
                width: '80%'
            }],
            // geo3D: [{
            //     map: 'SUZHOU',
            //     zoom: 1,
            //     // left: '15%',
            //     label: {
            //         show: true,
            //         color: '#fff',
            //         fontWeight: 'bold',
            //         fontSize: 14,
            //     },
            //     itemStyle: {                    // 定义样式
            //         color: 'transparent',
            //         borderColor: '#A9C3EB',
            //         borderWidth: 2,
            //         opacity: 1,
            //     },
            //     emphasis: {
            //         label: {
            //             color: '#b2cde2'
            //         },
            //         itemStyle: {
            //             color: '#b2cde2',
            //         }
            //     },
            //     bottom: '10%',
            //     height: '100%',
            //     viewControl: {
            //         autoRotate: true,
            //         distance: 120
            //     }
            // }],
            grid: {
                top: 0,
                right: 0,
                bottom: 0
            },
            series: [
                {
                    name: '',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: [
                        {name: '相城区', value: [120.641792,31.417215, 2949131]},
                        {name: '吴中区', value: [120.280745,31.20965, 38041430]},
                        {name: '虎丘区', value: [120.449771,31.368882, 5187582]},
                        {name: '苏州工业园区', value: [120.723343,31.324036, 6553255]},
                        {name: '吴江区', value: [120.65559,31.11868, 3590347]},
                        {name: '姑苏区', value: [120.622249,31.311414, 917092]},
                        {name: '常熟市', value: [120.74852,31.658156, 731449]},
                        {name: '张家港市', value: [120.543441,31.865553, 6553255]},
                        {name: '昆山市', value: [120.958137,31.381925, 3590347]},
                        {name: '太仓市', value: [121.151577,31.569315, 3590347]},
                    ],
                    symbolSize: 10,
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgba(77, 246, 162, 1)'
                        }
                    },
                    zlevel: 1
                },
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