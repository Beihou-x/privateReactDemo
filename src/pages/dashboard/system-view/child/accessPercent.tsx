import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { access_cloud_access_percent } from "@/services/access_cloud";
import {format} from "@/utils/utils";
const AccessPercent = (props) => {
  // const { title = "", data = [],legend=false } = props;
  const [data, setData]: any = useState([]);
  const [max, setMax]: any = useState(0);
  const [percent, setPercent]:any = useState([]);

  useEffect(() => {
    access_cloud_access_percent().then((res) => {
      setData(res.access);
      const arr = res.access.map((item) => item.k2);
      const maxNum = Math.max(...arr);
      setMax(maxNum);

      let total = 0;
      res.access.forEach(item => {
        total += Number(item.k2)
      })

      let rateArr = res.access.map(item => format(Number(item.k2)/total));
      setPercent(rateArr);
    });
  }, []);
  const option = {
    textStyle: {
      color: "#c0c3cd",
      fontSize: 14,
    },
    toolbox: {
      show: false,
      feature: {
        saveAsImage: {
          backgroundColor: "#031245",
        },
        restore: {},
      },
      iconStyle: {
        borderColor: "#c0c3cd",
      },
    },
    legend: {
      top: 10,
      itemWidth: 8,
      itemHeight: 8,
      icon: "circle",
      left: "center",
      padding: 0,
      textStyle: {
        color: "#c0c3cd",
        fontSize: 14,
        padding: [2, 0, 0, 0],
      },
    },
    color: [
      "#63caff",
      "#49beff",
      "#03387a",
      "#03387a",
      "#03387a",
      "#6c93ee",
      "#a9abff",
      "#f7a23f",
      "#27bae7",
      "#ff6d9d",
      "#cb79ff",
      "#f95b5a",
      "#ccaf27",
      "#38b99c",
      "#93d0ff",
      "#bd74e0",
      "#fd77da",
      "#dea700",
    ],
    grid: {
      top: "15%",
      left: "5%",
      right: "5%",
      bottom: "15%",
    },
    xAxis: {
      nameTextStyle: {
        color: "#c0c3cd",
        padding: [0, 0, -10, 0],
        fontSize: 12,
      },
      axisLabel: {
        color: "rgba(26, 201, 255, 1)",
        fontSize: 14,
        interval: 0,
        rotate: 30,
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: "#384267",
          width: 1,
        },
      },
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: "#384267",
          width: 1,
          type: "dashed",
        },
      },
      data: data.map((item) => item.k1),
      type: "category",
    },
    yAxis: {
      nameTextStyle: {
        color: "#c0c3cd",
        padding: [0, 0, -10, 0],
        fontSize: 14,
      },
      axisLabel: {
        show: false,
        color: "#c0c3cd",
        fontSize: 14,
      },
      axisTick: {
        lineStyle: {
          color: "#384267",
          width: 1,
        },
        show: false,
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: "#384267",
          type: "dashed",
        },
      },
      axisLine: {
        lineStyle: {
          color: "#384267",
          width: 1,
          type: "dashed",
        },
        show: false,
      },
      name: "",
    },
    series: [
      {
        data: data.map((item) => item.k2),
        type: "bar",
        barMaxWidth: "auto",
        barWidth: 10,
        itemStyle: {
          color: {
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            type: "linear",
            global: false,
            colorStops: [
              {
                offset: 0,
                color: "#0b9eff",
              },
              {
                offset: 1,
                color: "#63caff",
              },
            ],
          },
        },
        label: {
          show: true,
          position: "top",
          distance: 10,
          color: "#fff",
        },
      },
      {
        data: data.map((item) => 1),
        type: "pictorialBar",
        barMaxWidth: "10",
        symbol: "diamond",
        symbolOffset: [0, "50%"],
        symbolSize: [10, 10],
      },
      {
        data: data.map((item) => item.k2),
        type: "pictorialBar",
        barMaxWidth: "10",
        symbolPosition: "end",
        symbol: "diamond",
        symbolOffset: [0, "-50%"],
        symbolSize: [10, 10],
        zlevel: 2,
      },
      {
        data: data.map((i) => max),
        type: "bar",
        barMaxWidth: "auto",
        barWidth: 10,
        barGap: "-100%",
        zlevel: -1,
      },
      {
        data: data.map((item) => 1),
        type: "pictorialBar",
        barMaxWidth: "10",
        symbol: "diamond",
        symbolOffset: [0, "50%"],
        symbolSize: [10, 10],
        zlevel: -2,
      },
      {
        data: data.map((i) => max),
        type: "pictorialBar",
        barMaxWidth: "10",
        symbolPosition: "end",
        symbol: "diamond",
        symbolOffset: [0, "-50%"],
        symbolSize: [10, 10],
        zlevel: -1,
      },
    ],
    tooltip: {
      trigger: "axis",
      show: false,
    },
  };
  const option1 = {
    // backgroundColor: "#091C3D",

    tooltip: {
      //提示框组件
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      },
      textStyle: {
        color: "#fff",
        fontSize: 14,
      },
      formatter: '{c}%',
      backgroundColor: "rgba(21, 55, 85, 0.9)",
      borderWidth: "0", //边框宽度设置1
    },
    grid: {
      left: "7%",
      right: "4%",
      bottom: "10%",
      top: "16%",
      //	padding:'0 0 10 0',
      // containLabel: true,
    },

    xAxis: [
      {
        type: "category",
        //	boundaryGap: true,//坐标轴两边留白
        data: data.map((m) => m.k1),
        axisLabel: {
          //坐标轴刻度标签的相关设置。
          interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
          //	margin:15,
          textStyle: {
            color: "#fff",
            fontStyle: "normal",
            fontSize: 12,
          },
          rotate: 30,
        },
        axisTick: {
          //坐标轴刻度相关设置。
          show: false,
        },
        axisLine: {
          //坐标轴轴线相关设置
          lineStyle: {
            color: "rgba(84, 219, 255, 0.4)",
          },
        },
        splitLine: {
          //坐标轴在 grid 区域中的分隔线。
          show: false,
        },
      },
    ],
    yAxis: [
      {
        name: '占比',
        nameTextStyle: {
          color: "rgba(255, 255, 255, 0.8)",
          padding: [0, 0, 0, -50]
        },
        type: "value",
        splitNumber: 5,
        // axisLabel: {
        //   textStyle: {
        //     color: "#fff",
        //     fontStyle: "normal",
        //     fontSize: 12,
        //   },
        //   formatter: function (value, index) {
        //     return format(value) + "%";
        //   },
        // },
        max: 100,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ["rgba(84, 219, 255, 0.15)"],
            type: "dashed",
          },
        },
      },
    ],
    series: [
      {
        name: "接入占比",
        type: "bar",
        data: percent,
        barWidth: 25,
        // barGap: 0, //柱间距离
        // label: {
        //   //图形上的文本标签
        //   normal: {
        //     show: true,
        //     position: "top",
        //     textStyle: {
        //       color: "#06C7F0",
        //       fontStyle: "normal",
        //       fontFamily: "微软雅黑",
        //       fontSize: 12,
        //     },
        //   },
        // },
        itemStyle: {
          normal: {
            show: true,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#45A686",
              },
              {
                offset: 1,
                color: "rgba(69, 166, 134, 0)",
              },
            ]),
            // barBorderRadius: 50,
            borderWidth: 0,
          },
        },
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(84, 219, 255, 0.05)'
        }
      },
      { //下半截柱子顶部圆片
        "name": "",
        "type": "pictorialBar",
        "symbolSize": [25, 15],
        "symbolOffset": [0, -10],
        "z": 12,
        itemStyle: {
            opacity: 1,
            color: function(params) {
                return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#45A686' // 0% 处的颜色
                }, {
                    offset: 1,
                    color: '#45A666' // 100% 处的颜色
                }], false)
            }
        },
        label: {
            show: false,
            position: 'top',
            fontSize: 16,
            color: '#fff',
            // formatter:(item)=>{
            //     console.log(item)
            //     return 'ssss'
            // }
        },
        "symbolPosition": "end",
        "data": percent
    },
    ],
  };
  return (
    <ReactECharts
      option={option1}
      style={{ height: "100%", width: "100%" }}
      opts={{ renderer: "svg" }}
    />
  );
};

export default AccessPercent;
