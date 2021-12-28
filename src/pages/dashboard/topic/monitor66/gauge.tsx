import React from "react";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";

const Gauge = ({ name = "", data = 0 }) => {
  var colorSet = {
    color: "#1ACACC",
  };
  var color1 = {
    type: "linear",
    x: 0,
    y: 0,
    x2: 1,
    y2: 1,
    colorStops: [
      {
        offset: 0,
        color: "rgba(255,255,255,0.1)",
      },
      {
        offset: 1,
        color: "rgba(255,255,255,0.3)",
      },
    ],
    global: false,
  };
  var color2 = {
    type: "linear",
    x: 0,
    y: 0,
    x2: 1,
    y2: 1,
    colorStops: [
      {
        offset: 0,
        color: "#05AAB9",
      },
      {
        offset: 1,
        color: "#5BFCF4",
      },
    ],
    global: false,
  };
  const option = {
    tooltip: {
      formatter: "{a} <br/>{b} : {c}%",
    },

    series: [
      {
        name: "内部进度条",
        type: "gauge",
        // center: ['20%', '50%'],
        radius: "52%",

        splitNumber: 10,
        axisLine: {
          lineStyle: {
            color: [
              [data / 100, colorSet.color],
              [1, colorSet.color],
            ],
            width: 1,
          },
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
          color: "#ffffff",
        },
        detail: {
          show: false,
          formatter: function (value) {
            if (value !== 0) {
              var num: any = Math.round(value);
              return parseInt(num).toFixed(0) + "%";
            } else {
              return 0;
            }
          },
          offsetCenter: [0, 67],
          textStyle: {
            padding: [0, 0, 0, 0],
            fontSize: 18,
            fontWeight: "700",
            color: "#ffffff",
          },
        },
        title: {
          //标题
          show: false,
          offsetCenter: [0, 46], // x, y，单位px
          textStyle: {
            color: "rgba(0,0,0,0)",
            fontSize: 14, //表盘上的标题文字大小
            fontFamily: "PingFangSC",
          },
        },
        data: [
          {
            name: "",
            value: data,
          },
        ],
        pointer: {
          show: true,
          length: "70%",
          radius: "20%",
          width: 1, //指针粗细
        },
        animationDuration: 4000,
      },
      {
        name: "内部阴影",
        type: "gauge",
        radius: "44%",
        splitNumber: 10,
        axisLine: {
          lineStyle: {
            color: [
              [
                data / 100,
                new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: "rgba(5, 170, 185,0)",
                  },
                  {
                    offset: 0.5,
                    color: "rgba(5, 170, 185,0.2)",
                  },
                  {
                    offset: 1,
                    color: "rgba(5, 170, 185,1)",
                  },
                ]),
              ],
              [1, "rgba(28,128,245,0)"],
            ],
            width: 100,
          },
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
        },
      },
      {
        name: "内部小圆",
        type: "gauge",
        // center: ['20%', '50%'],
        radius: "46%",

        splitNumber: 10,
        axisLine: {
          lineStyle: {
            color: [
              [data / 100, color2],
              [1, "rgba(0,0,0,0)"],
            ],
            width: 15,
          },
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
        },
      },
      {
        name: "外部刻度",
        type: "gauge",
        //  center: ['20%', '50%'],
        radius: "48%",
        min: 0, //最小刻度
        max: 100, //最大刻度
        splitNumber: 5, //刻度数量
        startAngle: 225,
        endAngle: -45,
        axisLine: {
          show: true,
          lineStyle: {
            width: 1,
            color: [[1, "rgba(0,0,0,0)"]],
          },
        }, //仪表盘轴线
        axisLabel: {
          show: true,
          color: "#ffffff",
          fontSize: 8,
          fontFamily: "SourceHanSansSC-Regular",
          fontWeight: "bold",
          // position: "top",
          distance: -15,
          formatter: function (v) {
            switch (v + "") {
              case "0":
                return "0";
              case "10":
                return "10";
              case "20":
                return "20";
              case "30":
                return "30";
              case "40":
                return "40";
              case "50":
                return "50";
              case "60":
                return "60";
              case "70":
                return "70";
              case "80":
                return "80";
              case "90":
                return "90";
              case "100":
                return "100";
              default:
                return "";
            }
          },
        }, //刻度标签。
        axisTick: {
          show: true,
          splitNumber: 3,
          lineStyle: {
            color: color1, //用颜色渐变函数不起作用
            width: 1,
          },
          length: -6,
        }, //刻度样式
        splitLine: {
          show: true,
          length: -12,
          lineStyle: {
            color: color1, //用颜色渐变函数不起作用
          },
        }, //分隔线样式
        detail: {
          show: false,
        },
      },
      {
        name: "内部进度条",
        type: "gauge",
        // center: ['20%', '50%'],
        radius: "10%",

        splitNumber: 10,
        axisLine: {
          lineStyle: {
            color: [
              [data / 100, colorSet.color],
              [1, colorSet.color],
            ],
            width: 1,
          },
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
          color: "#ffffff",
        },
        detail: {
          formatter: function (value) {
            if (value !== 0) {
              var num: any = Math.round(value);
              return parseInt(num).toFixed(0) + "%";
            } else {
              return 0;
            }
          },
          offsetCenter: [0, 52],
          textStyle: {
            padding: [0, 0, 0, 0],
            fontSize: 8,
            color: "#ffffff",
          },
        },
        title: {
          //标题
          show: true,
          offsetCenter: [0, 40], // x, y，单位px
          textStyle: {
            color: "#fff",
            fontSize: 8, //表盘上的标题文字大小
          },
        },
        data: [
          {
            name: name,
            value: data,
            itemStyle: {
              color: "#ffffff",
              fontSize: 8,
            },
          },
        ],
        pointer: {
          show: true,
          length: "70%",
          radius: "40%",
          width: 0.1, //指针粗细
        },
        animationDuration: 4000,
      },
      {
        //指针上的圆
        type: "pie",
        tooltip: {
          show: false,
        },
        hoverAnimation: false,
        legendHoverLink: false,
        radius: ["0%", "4%"],
        center: ["50%", "50%"],
        label: {
          normal: {
            show: false,
          },
        },
        labelLine: {
          normal: {
            show: false,
          },
        },
        data: [
          {
            value: 120,
            itemStyle: {
              normal: {
                color: "#ffffff",
              },
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <ReactEcharts
        style={{ width: "100%", height: "100%" }}
        option={option}
      ></ReactEcharts>
    </>
  );
};

export default Gauge;
