import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

const Line = () => {
  const option = {
    legend: {
      data: [
        "人员信息照片关联",
        "人/车照片关联",
        "车辆信息照片关联",
        "人/车身份关联",
      ],
      textStyle: {
        fontSize: 8,
        color: "#fff",
        align: "right",
      },
      x: "right",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        lineStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(0, 255, 233,0)",
              },
              {
                offset: 0.5,
                color: "rgba(255, 255, 255,1)",
              },
              {
                offset: 1,
                color: "rgba(0, 255, 233,0)",
              },
            ],
            global: false,
          },
        },
      },
    },
    grid: {
      top: "20%",
      left: "10%",
      right: "10%",
      bottom: "5%",
      // containLabel: true
    },
    xAxis: [
      {
        show: false,
        type: "category",
        axisLine: {
          show: false,
        },
        splitArea: {
          // show: true,
          color: "#f00",
          lineStyle: {
            color: "#f00",
          },
        },
        axisLabel: {
          color: "#fff",
        },
        splitLine: {
          show: false,
        },
        boundaryGap: false,
        data: ["A", "B", "C", "D", "E", "F"],
      },
    ],

    yAxis: [
      {
        type: "value",
        min: 0,
        // max: 140,
        splitNumber: 4,
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(255,255,255,0.1)",
          },
        },
        axisLine: {
          show: true,
        },
        axisLabel: {
          show: true,
          margin: 20,
          textStyle: {
            color: "#d1e6eb",
          },
        },
        axisTick: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: "人员信息照片关联",
        type: "line",
        // smooth: true, //是否平滑
        showAllSymbol: true,
        // symbol: 'image://./static/images/guang-circle.png',
        symbol: "circle",
        symbolSize: 2,
        lineStyle: {
          normal: {
            color: "#6c50f3",
          },
        },
        label: {
          show: true,
          position: "top",
          textStyle: {
            color: "#6c50f3",
          },
        },
        itemStyle: {
          color: "#6c50f3",
          borderColor: "#fff",
          borderWidth: 1,
          // shadowColor: "rgba(0, 0, 0, .3)",
          // shadowBlur: 0,
          // shadowOffsetY: 2,
          // shadowOffsetX: 2,
        },
        tooltip: {
          show: false,
        },
        // areaStyle: {
        //   normal: {
        //     color: new echarts.graphic.LinearGradient(
        //       0,
        //       0,
        //       0,
        //       1,
        //       [
        //         {
        //           offset: 0,
        //           color: "rgba(108,80,243,0.3)",
        //         },
        //         {
        //           offset: 1,
        //           color: "rgba(108,80,243,0)",
        //         },
        //       ],
        //       false
        //     ),
        //     shadowColor: "rgba(108,80,243, 0.9)",
        //     shadowBlur: 20,
        //   },
        // },
        data: [502.84, 205.97, 332.79, 281.55, 398.35, 214.02],
      },
      {
        name: "人/车照片关联",
        type: "line",
        // smooth: true, //是否平滑
        showAllSymbol: true,
        // symbol: 'image://./static/images/guang-circle.png',
        symbol: "circle",
        symbolSize: 2,
        // lineStyle: {
        //   normal: {
        //     color: "#00ca95",
        //     shadowColor: "rgba(0, 0, 0, .3)",
        //     shadowBlur: 0,
        //     shadowOffsetY: 5,
        //     shadowOffsetX: 5,
        //   },
        // },
        label: {
          show: true,
          position: "top",
          textStyle: {
            color: "#00ca95",
          },
        },

        itemStyle: {
          color: "#00ca95",
          borderColor: "#fff",
          borderWidth: 1,
          // shadowColor: "rgba(0, 0, 0, .3)",
          // shadowBlur: 0,
          // shadowOffsetY: 2,
          // shadowOffsetX: 2,
        },
        tooltip: {
          show: false,
        },
        // areaStyle: {
        //   normal: {
        //     color: new echarts.graphic.LinearGradient(
        //       0,
        //       0,
        //       0,
        //       1,
        //       [
        //         {
        //           offset: 0,
        //           color: "rgba(0,202,149,0.3)",
        //         },
        //         {
        //           offset: 1,
        //           color: "rgba(0,202,149,0)",
        //         },
        //       ],
        //       false
        //     ),
        //     shadowColor: "rgba(0,202,149, 0.9)",
        //     shadowBlur: 20,
        //   },
        // },
        data: [281.55, 398.35, 214.02, 179.55, 289.57, 356.14],
      },
      {
        name: "车辆信息照片关联",
        type: "line",
        // smooth: true, //是否平滑
        showAllSymbol: true,
        // symbol: 'image://./static/images/guang-circle.png',
        symbol: "circle",
        symbolSize: 2,
        lineStyle: {
          normal: {
            color: "#54E8E2",
            // shadowColor: "rgba(0, 0, 0, .3)",
            // shadowBlur: 0,
          },
        },
        label: {
          show: true,
          position: "top",
          textStyle: {
            color: "#54E8E2",
          },
        },
        itemStyle: {
          color: "#54E8E2",
          borderColor: "#fff",
          borderWidth: 1,
          // shadowColor: "rgba(0, 0, 0, .3)",
          // shadowBlur: 0,
          // shadowOffsetY: 2,
          // shadowOffsetX: 2,
        },
        tooltip: {
          show: false,
        },
        // areaStyle: {
        //   normal: {
        //     color: new echarts.graphic.LinearGradient(
        //       0,
        //       0,
        //       0,
        //       1,
        //       [
        //         {
        //           offset: 0,
        //           color: "rgba(108,80,243,0.3)",
        //         },
        //         {
        //           offset: 1,
        //           color: "rgba(108,80,243,0)",
        //         },
        //       ],
        //       false
        //     ),
        //     shadowColor: "rgba(108,80,243, 0.9)",
        //     shadowBlur: 20,
        //   },
        // },
        data: [302.84, 205.97, 532.79, 281.55, 698.35, 214.02],
      },
      {
        name: "人/车身份关联",
        type: "line",
        // smooth: true, //是否平滑
        showAllSymbol: true,
        // symbol: 'image://./static/images/guang-circle.png',
        symbol: "circle",
        symbolSize: 2,
        // lineStyle: {
        //   normal: {
        //     color: "#00D2FF",
        //     shadowColor: "rgba(0, 0, 0, .3)",
        //     shadowBlur: 0,
        //     shadowOffsetY: 5,
        //     shadowOffsetX: 5,
        //   },
        // },
        label: {
          show: true,
          position: "top",
          textStyle: {
            color: "#00D2FF",
          },
        },

        itemStyle: {
          color: "#00D2FF",
          borderColor: "#fff",
          borderWidth: 1,
          // shadowColor: "rgba(0, 0, 0, .3)",
          // shadowBlur: 0,
          // shadowOffsetY: 2,
          // shadowOffsetX: 2,
        },
        tooltip: {
          show: false,
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(0,202,149,0.3)",
                },
                {
                  offset: 1,
                  color: "rgba(0,202,149,0)",
                },
              ],
              false
            ),
            shadowColor: "rgba(0,202,149, 0.9)",
            shadowBlur: 20,
          },
        },
        data: [181.55, 298.35, 214.02, 279.55, 389.57, 156.14],
      },
    ],
  };
  return (
    <ReactECharts
      option={option}
      style={{ height: "100%", width: "100%" }}
      opts={{ renderer: "svg" }}
    />
  );
};

export default Line;
