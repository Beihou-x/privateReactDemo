import React from "react";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";

const AnalyLine = ({ styles = {} }) => {
  const Option = () => {
    let dataList = [
      {
        name: "04-26",
        value: "15",
      },
      {
        name: "04-27",
        value: "18",
      },
      {
        name: "04-28",
        value: "14",
      },
      {
        name: "04-29",
        value: "18",
      },
      {
        name: "04-30",
        value: "17",
      },
    ];
    let dataList2 = [
      {
        name: "04-26",
        value: "12",
      },
      {
        name: "04-27",
        value: "13",
      },
      {
        name: "04-28",
        value: "13",
      },
      {
        name: "04-29",
        value: "12",
      },
      {
        name: "04-30",
        value: "10",
      },
    ];
    let dataList3 = [
      {
        name: "04-26",
        value: "2",
      },
      {
        name: "04-27",
        value: "3",
      },
      {
        name: "04-28",
        value: "18",
      },
      {
        name: "04-29",
        value: "2",
      },
      {
        name: "04-30",
        value: "18",
      },
    ];
    let option = {
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["百度", "依图", "商汤"],
        textStyle: {
          color: "#fff",
        },
      },
      title: {
        left: 26,
        top: 26,
        textStyle: {
          color: "#FFFFFF",
          fontSize: 15,
          fontWeight: 50000,
          fontFamily: "PingFang SC",
        },
      },
      grid: {
        left: "2%",
        right: "6%",
        bottom: "5%",
        top: "8%",
        containLabel: true,
      },
      dataZoom: [
        {
          type: "inside",
          start: 0,
          end: dataList.length > 15 ? 35 : 100,
        },
      ],
      xAxis: {
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: "#97ADEA",
          },
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        //轴线上的字
        axisLabel: {
          show: true,
          textStyle: {
            color: "#97ADEA",
            fontSize: "14",
          },
        },
        data: ["04-26", "04-27", "04-28", "04-29", "04-30"],
      },
      yAxis: [
        {
          type: "value",
          splitNumber: 4,
          axisTick: {
            show: false,
          },
          //轴线上的字
          axisLabel: {
            textStyle: {
              fontSize: "12",
              color: "#97ADEA",
            },
          },
          axisLine: {
            lineStyle: {
              color: "#97ADEA",
            },
          },
          //网格线
          splitLine: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: "百度",
          type: "line",
          smooth: true, //是否平滑曲线显示
          showSymbol: false,
          markPoint: {
            data: [
              {
                name: "周最高",
                value: 320,
                xAxis: 4,
                yAxis: 320,
              },
            ],
          },
          itemStyle: {
            color: "#A482E8",
            borderColor: "#A482E8",
            borderWidth: 1,
          },
          lineStyle: {
            normal: {
              width: 1,
              color: {
                type: "linear",

                colorStops: [
                  {
                    offset: 0,
                    color: "#A482E8", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#A482E8", // 100% 处的颜色
                  },
                ],
                globalCoord: false, // 缺省为 false
              },
              shadowColor: "rgba(164, 130, 232, 0.5)",
              shadowBlur: 30,
              shadowOffsetY: 5,
            },
          },
          areaStyle: {
            //区域填充样式
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(164, 130, 232, 0.6)",
                  },
                  {
                    offset: 0.6,
                    color: "rgba(164, 130, 232, 0.2)",
                  },
                  {
                    offset: 0.8,
                    color: "rgba(164, 130, 232, 0.01)",
                  },
                ],
                false
              ),
              shadowColor: "rgba(164, 130, 232, 0.1)",
              shadowBlur: 6,
            },
          },
          data: dataList,
        },
        {
          name: "依图",
          type: "line",
          smooth: true, //是否平滑曲线显示
          showSymbol: false,
          itemStyle: {
            color: "#0FD4C2",
            borderColor: "#0FD4C2",
            borderWidth: 1,
          },
          markPoint: {
            data: [
              {
                name: "周最高",
                value: 310,
                xAxis: 5,
                yAxis: 310,
              },
            ],
          },
          lineStyle: {
            normal: {
              width: 1,
              color: {
                type: "linear",

                colorStops: [
                  {
                    offset: 0,
                    color: "#0FD4C2", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#0FD4C2", // 100% 处的颜色
                  },
                ],
                globalCoord: false, // 缺省为 false
              },
              shadowColor: "rgba(15, 212, 194, 0.5)",
              shadowBlur: 12,
              shadowOffsetY: 5,
            },
          },
          areaStyle: {
            //区域填充样式
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(15, 212, 194,0.6)",
                  },
                  {
                    offset: 0.6,
                    color: "rgba(15, 212, 194,0.2)",
                  },
                  {
                    offset: 1,
                    color: "rgba(15, 212, 194,0.01)",
                  },
                ],
                false
              ),
              shadowColor: "rgba(15, 212, 194, 0.4)",
              shadowBlur: 6,
            },
          },
          data: dataList2,
        },
        {
          name: "商汤",
          type: "line",
          smooth: true, //是否平滑曲线显示
          showSymbol: false,
          itemStyle: {
            color: "#407AE7",
            borderColor: "#407AE7",
            borderWidth: 1,
          },
          markPoint: {
            data: [
              {
                name: "周最高",
                value: 310,
                xAxis: 5,
                yAxis: 310,
              },
            ],
          },
          lineStyle: {
            normal: {
              width: 1,
              color: {
                type: "linear",

                colorStops: [
                  {
                    offset: 0,
                    color: "#407AE7", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#407AE7", // 100% 处的颜色
                  },
                ],
                globalCoord: false, // 缺省为 false
              },
              shadowColor: "rgba(64, 122, 231, 0.5)",
              shadowBlur: 12,
              shadowOffsetY: 5,
            },
          },
          areaStyle: {
            //区域填充样式
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(64, 122, 231, 0.6)",
                  },
                  {
                    offset: 0.6,
                    color: "rgba(64, 122, 231, 0.2)",
                  },
                  {
                    offset: 1,
                    color: "rgba(64, 122, 231, 0.01)",
                  },
                ],
                false
              ),
              shadowColor: "rgba(64, 122, 231,  0.4)",
              shadowBlur: 6,
            },
          },
          data: dataList3,
        },
      ],
    };
    return option;
  };

  return (
    <div>
      <ReactEcharts
        option={Option()}
        style={{height: "18vh" }}
      ></ReactEcharts>
    </div>
  );
};

export default AnalyLine;
