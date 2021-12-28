import React, { useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';

type valueState = {
    hotel_active_rate: string;
};

type PressureTodayProps = {
    styles: object;
    // data?: Array<valueState>;
    data: object
};

const PressureToday: React.FC<PressureTodayProps> = ({
    styles = {},
    data
}) => {
    let values: valueState | any = data ? data : {hotel_active_rate: 3500};

    useEffect(() => {
    }, []);

    const getOptionMap = () => {
        var dataArr = 55;
        var colorSet = {
            color: '#468EFD'
        };

        return {
            // tooltip: {
            //     formatter: "{a} <br/>{b} : {c}%"
            // },
            grid: {
                top: '0%',
                left: '0%',
                right: '0%',
                bottom: '0%'
            },

            series: [
                //左侧
                {
                    name: "内部进度条",
                    type: "gauge",
                    center: ['15%', '50%'],
                    radius: '54%',
                    z: 4,
                    splitNumber: 10,
                    axisLine: {
                        lineStyle: {
                            color: [
                                [dataArr / 100, new echarts.graphic.LinearGradient(
                                    0, 1, 0, 0, [{
                                        offset: 0,
                                        color: 'rgba(0,191,194,.1)',
                                    }, {
                                        offset: 0.5,
                                        color: 'rgba(0,191,194,0.4)',
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(0,191,194,0.8)',
                                    }
                                ]
                                )],
                                [
                                    1, 'rgba(28,128,245,.0)'
                                ]
                            ],
                            width: 170
                        }
                    },
                    axisLabel: {
                        show: false,
                    },
                    axisTick: {
                        show: false,

                    },
                    splitLine: {
                        show: false,
                    },
                    itemStyle: {
                        show: false,
                        normal: {
                            color: 'rgba(46, 143, 255, 1)'
                        }
                    },
                    detail: {
                        formatter: function (value) {
                            if (value !== 0) {
                                var num: any = Math.round(value);
                                return `${parseInt(num).toFixed(0) + "%"} \n`
                            } else {
                                return `0% \n`
                            }
                        },
                        offsetCenter: [0, 60],
                        textStyle: {
                            padding: [0, 0, 0, 0],
                            fontSize: 30,
                            fontWeight: 500,
                            color: colorSet.color
                        }
                    },
                    title: { //标题
                        show: true,
                        offsetCenter: [0, 65], // x, y，单位px
                        textStyle: {
                            color: "rgba(46, 143, 255, 1)",
                            fontSize: 12, //表盘上的标题文字大小
                            fontWeight: 400,
                        }
                    },
                    data: [{
                        name: "旅馆活跃率",
                        value: values && values.hotel_active_rate && (values.hotel_active_rate / 100).toFixed(2) || 0,
                        detail: {
                            fontSize: 16
                        }
                    }],
                    pointer: {
                        show: true,
                        length: '90%',
                        radius: '20%',
                        width: 3, //指针粗细
                    },
                    animationDuration: 4000,
                },
                // 内圆
                {
                    "name": '内圆',
                    "type": 'pie',
                    "hoverAnimation": false,
                    "legendHoverLink": false,
                    "radius": '4%',
                    "z": 4,
                    center: ['15%', '50%'],
                    "labelLine": {
                        "normal": {
                            "show": false
                        }
                    },
                    "data": [{
                        "value": 0,
                    }, {
                        "value": 10,

                        itemStyle: {
                            normal: {
                                color: "#0E1327"
                            },
                            emphasis: {
                                color: "#0E1327"
                            }
                        }
                    }]
                },
                // 圆环
                {
                    "name": '小圆形',
                    "type": 'pie',
                    "hoverAnimation": false,
                    "legendHoverLink": false,
                    "radius": ['4%', '3%'],
                    center: ['15%', '50%'],
                    "z": 5,
                    "labelLine": {
                        "normal": {
                            "show": false
                        }
                    },
                    "data": [{
                        "value": 0,
                    }, {
                        "value": 10,

                        itemStyle: {
                            normal: {
                                color: "rgba(46, 143, 255, 1)",
                            },

                        }
                    }]
                },
                {
                    name: '外部刻度',
                    type: 'gauge',
                    center: ['15%', '50%'],
                    radius: '60%',
                    min: 0, //最小刻度
                    max: 100, //最大刻度
                    splitNumber: 10, //刻度数量
                    startAngle: 225,
                    endAngle: -45,
                    axisLine: {
                        show: false,
                        lineStyle: {
                            width: 1,
                            color: [
                                [1, 'rgba(0,0,0,0)']
                            ]
                        }
                    }, //仪表盘轴线
                    axisLabel: {
                        show: false,
                        color: 'rgba(255,255,255,.5)',
                        distance: 25,
                        formatter: (v: any) => {
                            switch (v + '') {
                                case '0':
                                    return '0';
                                case '10':
                                    return '10';
                                case '20':
                                    return '20';
                                case '30':
                                    return '30';
                                case '40':
                                    return '40';
                                case '50':
                                    return '50';
                                case '60':
                                    return '60';
                                case '70':
                                    return '70';
                                case '80':
                                    return '80';
                                case '90':
                                    return '90';
                                case '100':
                                    return '100';
                                default:
                                    return '100';
                            }
                        }
                    }, //刻度标签。
                    axisTick: {
                        show: true,
                        splitNumber: 7,
                        lineStyle: {
                            color: '#42E5FB', //用颜色渐变函数不起作用
                            width: 2,
                        },
                        length: 8
                    }, //刻度样式
                    splitLine: {
                        show: true,
                        length: 15,
                        lineStyle: {
                            color: '#42E5FB', //用颜色渐变函数不起作用
                        }
                    }, //分隔线样式
                    detail: {
                        show: false
                    },
                    pointer: {
                        show: true
                    }
                },
                //中间
                {
                    name: "内部进度条",
                    type: "gauge",
                    center: ['50%', '50%'],
                    radius: '54%',
                    z: 4,
                    splitNumber: 10,
                    axisLine: {
                        lineStyle: {
                            color: [
                                [dataArr / 100, new echarts.graphic.LinearGradient(
                                    0, 1, 0, 0, [{
                                        offset: 0,
                                        color: 'rgba(0,191,194,.1)',
                                    }, {
                                        offset: 0.5,
                                        color: 'rgba(0,191,194,0.4)',
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(0,191,194,0.8)',
                                    }
                                ]
                                )],
                                [
                                    1, 'rgba(28,128,245,.0)'
                                ]
                            ],
                            width: 170
                        }
                    },
                    axisLabel: {
                        show: false,
                    },
                    axisTick: {
                        show: false,

                    },
                    splitLine: {
                        show: false,
                    },
                    itemStyle: {
                        show: false,
                        normal: {
                            color: 'rgba(46, 143, 255, 1)'
                        }
                    },
                    detail: {
                        formatter: function (value) {
                            if (value !== 0) {
                                var num: any = Math.round(value);
                                return `${parseInt(num).toFixed(0) + "%"} \n`
                            } else {
                                return `0% \n`
                            }
                        },
                        offsetCenter: [0, 60],
                        textStyle: {
                            padding: [0, 0, 0, 0],
                            fontSize: 30,
                            fontWeight: 500,
                            color: colorSet.color
                        }
                    },
                    title: { //标题
                        show: true,
                        offsetCenter: [-10, 65], // x, y，单位px
                        textStyle: {
                            color: "rgba(46, 143, 255, 1)",
                            fontSize: 12, //表盘上的标题文字大小
                            fontWeight: 400,
                        }
                    },
                    data: [{
                        name: "入住率",
                        value: values && values.check_in_rate && (values.check_in_rate / 100).toFixed(2) || 0,
                        detail: {
                            fontSize: 16
                        }
                    }],
                    pointer: {
                        show: true,
                        length: '90%',
                        radius: '20%',
                        width: 3, //指针粗细
                    },
                    animationDuration: 4000,
                },
                // 内圆
                {
                    "name": '内圆',
                    "type": 'pie',
                    center: ['50%', '50%'],
                    "hoverAnimation": false,
                    "legendHoverLink": false,
                    "radius": '4%',
                    "z": 4,

                    "labelLine": {
                        "normal": {
                            "show": false
                        }
                    },
                    "data": [{
                        "value": 0,
                    }, {
                        "value": 10,

                        itemStyle: {
                            normal: {
                                color: "#0E1327"
                            },
                            emphasis: {
                                color: "#0E1327"
                            }
                        }
                    }]
                },
                // 圆环
                {
                    "name": '小圆形',
                    "type": 'pie',
                    center: ['50%', '50%'],
                    "hoverAnimation": false,
                    "legendHoverLink": false,
                    "radius": ['4%', '3%'],
                    "z": 5,
                    "labelLine": {
                        "normal": {
                            "show": false
                        }
                    },
                    "data": [{
                        "value": 0,
                    }, {
                        "value": 10,

                        itemStyle: {
                            normal: {
                                color: "rgba(46, 143, 255, 1)",
                            },

                        }
                    }]
                },
                {
                    name: '外部刻度',
                    type: 'gauge',
                    center: ['50%', '50%'],
                    radius: '60%',
                    min: 0, //最小刻度
                    max: 100, //最大刻度
                    splitNumber: 10, //刻度数量
                    startAngle: 225,
                    endAngle: -45,
                    axisLine: {
                        show: false,
                        lineStyle: {
                            width: 1,
                            color: [
                                [1, 'rgba(0,0,0,0)']
                            ]
                        }
                    }, //仪表盘轴线
                    axisLabel: {
                        show: false,
                        color: 'rgba(255,255,255,.5)',
                        distance: 25,
                        formatter: (v: any) => {
                            switch (v + '') {
                                case '0':
                                    return '0';
                                case '10':
                                    return '10';
                                case '20':
                                    return '20';
                                case '30':
                                    return '30';
                                case '40':
                                    return '40';
                                case '50':
                                    return '50';
                                case '60':
                                    return '60';
                                case '70':
                                    return '70';
                                case '80':
                                    return '80';
                                case '90':
                                    return '90';
                                case '100':
                                    return '100';
                                default:
                                    return '100';
                            }
                        }
                    }, //刻度标签。
                    axisTick: {
                        show: true,
                        splitNumber: 7,
                        lineStyle: {
                            color: '#42E5FB', //用颜色渐变函数不起作用
                            width: 2,
                        },
                        length: 8
                    }, //刻度样式
                    splitLine: {
                        show: true,
                        length: 15,
                        lineStyle: {
                            color: '#42E5FB', //用颜色渐变函数不起作用
                        }
                    }, //分隔线样式
                    detail: {
                        show: false
                    },
                    pointer: {
                        show: true
                    }
                },
                //右侧
                {
                    name: "内部进度条",
                    type: "gauge",
                    center: ['85%', '50%'],
                    radius: '54%',
                    z: 4,
                    splitNumber: 10,
                    axisLine: {
                        lineStyle: {
                            color: [
                                [dataArr / 100, new echarts.graphic.LinearGradient(
                                    0, 1, 0, 0, [{
                                        offset: 0,
                                        color: 'rgba(0,191,194,.1)',
                                    }, {
                                        offset: 0.5,
                                        color: 'rgba(0,191,194,0.4)',
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(0,191,194,0.8)',
                                    }
                                ]
                                )],
                                [
                                    1, 'rgba(28,128,245,.0)'
                                ]
                            ],
                            width: 170
                        }
                    },
                    axisLabel: {
                        show: false,
                    },
                    axisTick: {
                        show: false,

                    },
                    splitLine: {
                        show: false,
                    },
                    itemStyle: {
                        show: false,
                        normal: {
                            color: 'rgba(46, 143, 255, 1)'
                        }
                    },
                    detail: {
                        formatter: function (value) {
                            if (value !== 0) {
                                var num: any = Math.round(value);
                                return `${parseInt(num).toFixed(0) + "%"} \n`
                            } else {
                                return `0% \n`
                            }
                        },
                        offsetCenter: ['left', 60],
                        textStyle: {
                            padding: [0, 0, 0, 0],
                            fontSize: 30,
                            fontWeight: 500,
                            color: colorSet.color
                        }
                    },
                    title: { //标题
                        show: true,
                        offsetCenter: ['left', 65], // x, y，单位px
                        textStyle: {
                            color: "rgba(46, 143, 255, 1)",
                            fontSize: 12, //表盘上的标题文字大小
                            fontWeight: 400,
                        }
                    },
                    data: [{
                        name: "人证核验率",
                        value: values && values.validate_rate && (values.validate_rate / 100).toFixed(2) || 0,
                        detail: {
                            fontSize: 16
                        }
                    }],
                    pointer: {
                        show: true,
                        length: '90%',
                        radius: '20%',
                        width: 3, //指针粗细
                    },
                    animationDuration: 4000,
                },
                // 内圆
                {
                    "name": '内圆',
                    "type": 'pie',
                    center: ['85%', '50%'],
                    "hoverAnimation": false,
                    "legendHoverLink": false,
                    "radius": '4%',
                    "z": 4,

                    "labelLine": {
                        "normal": {
                            "show": false
                        }
                    },
                    "data": [{
                        "value": 0,
                    }, {
                        "value": 10,

                        itemStyle: {
                            normal: {
                                color: "#0E1327"
                            },
                            emphasis: {
                                color: "#0E1327"
                            }
                        }
                    }]
                },
                // 圆环
                {
                    "name": '小圆形',
                    "type": 'pie',
                    center: ['85%', '50%'],
                    "hoverAnimation": false,
                    "legendHoverLink": false,
                    "radius": ['4%', '3%'],
                    "z": 5,
                    "labelLine": {
                        "normal": {
                            "show": false
                        }
                    },
                    "data": [{
                        "value": 0,
                    }, {
                        "value": 10,

                        itemStyle: {
                            normal: {
                                color: "rgba(46, 143, 255, 1)",
                            },

                        }
                    }]
                },
                {
                    name: '外部刻度',
                    type: 'gauge',
                    center: ['85%', '50%'],
                    radius: '60%',
                    min: 0, //最小刻度
                    max: 100, //最大刻度
                    splitNumber: 10, //刻度数量
                    startAngle: 225,
                    endAngle: -45,
                    axisLine: {
                        show: false,
                        lineStyle: {
                            width: 1,
                            color: [
                                [1, 'rgba(0,0,0,0)']
                            ]
                        }
                    }, //仪表盘轴线
                    axisLabel: {
                        show: false,
                        color: 'rgba(255,255,255,.5)',
                        distance: 25,
                        formatter: (v: any) => {
                            switch (v + '') {
                                case '0':
                                    return '0';
                                case '10':
                                    return '10';
                                case '20':
                                    return '20';
                                case '30':
                                    return '30';
                                case '40':
                                    return '40';
                                case '50':
                                    return '50';
                                case '60':
                                    return '60';
                                case '70':
                                    return '70';
                                case '80':
                                    return '80';
                                case '90':
                                    return '90';
                                case '100':
                                    return '100';
                                default:
                                    return '100';
                            }
                        }
                    }, //刻度标签。
                    axisTick: {
                        show: true,
                        splitNumber: 7,
                        lineStyle: {
                            color: '#42E5FB', //用颜色渐变函数不起作用
                            width: 2,
                        },
                        length: 8
                    }, //刻度样式
                    splitLine: {
                        show: true,
                        length: 15,
                        lineStyle: {
                            color: '#42E5FB', //用颜色渐变函数不起作用
                        }
                    }, //分隔线样式
                    detail: {
                        show: false
                    },
                    pointer: {
                        show: true
                    }
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

export default PressureToday;