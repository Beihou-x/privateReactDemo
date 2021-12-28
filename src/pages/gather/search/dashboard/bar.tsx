import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

const Bar = (props) => {
  const { title = "", data = [],legend=false } = props;
  const option = {
    legend: legend,
    title: {
      text: title,
      left: "center",
      y: "bottom",
      textStyle: {
        //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
        fontFamily: "Source Han Sans CN",
        fontSize: 14,
        fontWeight: 400,
        color: "#fff",
      },
    },
    grid: {
      top: "10%",
      left: "5%",
      right: "5%",
      bottom: "30%",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    xAxis: [
      {
        type: "category",
        //	boundaryGap: true,//坐标轴两边留白
        data: data.map((m) => m.name),
        axisLabel: {
          //坐标轴刻度标签的相关设置。
          interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
          //	margin:15,
          textStyle: {
            color: "#FFFFFF",
            fontStyle: "normal",
            fontSize: 12,
          },
          // rotate: 50,
        },
        axisTick: {
          //坐标轴刻度相关设置。
          show: false,
        },
        axisLine: {
          //坐标轴轴线相关设置
          lineStyle: {
            color: "#fff",
            opacity: 0.2,
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
        type: "value",
        splitNumber: 5,
        axisLabel: {
          show: false,
          textStyle: {
            color: "#FFFFFF",
            fontStyle: "normal",
            fontSize: 12,
          },
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: ["#fff"],
            opacity: 0.06,
          },
        },
      },
    ],
    series: [
      {
        name: title,
        type: "bar",
        data: data.map((m) => m.value),
        barWidth: 15,
        barGap: 0, //柱间距离
        showBackground: true,
        backgroundStyle: {
          color: "rgba(138, 180, 223, 0.1)",
        },
        itemStyle: {
          normal: {
            show: true,
            color: "#0065F6",
            // barBorderRadius: 50,
            borderWidth: 0,
            label: {
              show: true,
              position: "top",
              // formatter: "{c}%",
              textStyle: {
                color: "#56E8F2",
              },
              distance: 5,
            },
          },
        },
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

export default Bar;
