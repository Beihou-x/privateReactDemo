import React from "react";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";

const ShareLine = ({ styles = {} }) => {
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
    ]
    let option = {
      tooltip: {
        trigger: "axis",
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
        left: "-5%",
        right: "2%",
        bottom: "-10%",
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
          // lineStyle: {
          //   color: "#97ADEA",
          // },
          show:false
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
          name: "次数",
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
          data: dataList,
        },
      ],
    };
    return option;
  };

  return (
    <div>
      <ReactEcharts
        option={Option()}
        style={{height: "20vh"}}
      ></ReactEcharts>
    </div>
  );
};

export default ShareLine;
