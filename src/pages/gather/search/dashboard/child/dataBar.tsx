import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

const DataBar = (props) => {
  const { data = [] } = props;
  const option = {
    // backgroundColor: "#091C3D",

    title: {
      text: "各地接入设备登记率",
      x: "center",
      y: "bottom",
      textStyle: {
        fontSize: 14,
        color: "#fff",
        fontWeight: 300,
      },
    },

    tooltip: {
      //提示框组件
      trigger: "axis",
    },
    grid: {
      left: "4%",
      right: "10%",
      bottom: "16%",
      top: "10%",
      //	padding:'0 0 10 0',
      containLabel: true,
    },

    xAxis: [
      {
        type: "category",
        //	boundaryGap: true,//坐标轴两边留白
        data: data.map((m) => m.name),
        axisLabel: {
          //坐标轴刻度标签的相关设置。
          //		interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
          //	margin:15,
          textStyle: {
            color: "#fff",
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
          textStyle: {
            color: "#fff",
            fontStyle: "normal",
            fontSize: 12,
          },
        },
        axisLine: {
          show: true,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ["#fff"],
            opacity: 0.06,
          },
        },
      },
    ],
    series: [
      {
        name: "登记率",
        type: "bar",
        data: data.map((m) => m.value),
        barWidth: 15,
        barGap: 0, //柱间距离
        label: {//图形上的文本标签
            normal: {
              show: true,
              position: 'top',
              textStyle: {
                  color: '#06C7F0',
                  fontStyle: 'normal',
                  fontFamily: '微软雅黑',
                  fontSize: 12,
              },
            },
        },
        itemStyle: {
          normal: {
            show: true,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#06C7F0",
              },
              {
                offset: 1,
                color: "#06C7F0",
              },
            ]),
            // barBorderRadius: 50,
            borderWidth: 0,
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

export default DataBar;
