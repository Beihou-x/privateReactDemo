import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

const Bar = (props) => {
  // const { title = "", data = [],legend=false } = props;
  const { data = [] } = props;
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
        label: {
          show: true,
        },
      },
    },
    title: {
      text: "各区域不符合校验设备数",
      show: true,
      top: "top",
      left: "center",
      textStyle: {
        color: "#fff",
        fontWeight: "normal",
        fontSize: 14
      }
    },
    grid: {
      left: "6%",
      top: "10%",
      right: "6%",
      bottom: "10%",
    },
    legend: {
      data: [],
      show: false,
      itemWidth: 12,
      itemHeight: 8,
      top: "4%",
      textStyle: {
        color: "rgba(199, 204, 208, 1)",
        fontSize: 14,
      },
    },
    xAxis: {
      data: (data||[]).map(item => item.name),
      axisLine: {
        show: true, //隐藏X轴轴线
        lineStyle: {
          color: "rgba(82, 91, 104, 0.8)",
          width: 1,
        },
      },
      axisTick: {
        show: false, //隐藏X轴刻度
        alignWithLabel: true,
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "rgba(199, 204, 208, 1)", //X轴文字颜色
          fontSize: 12,
        },
        interval: 0,
        rotate: 30,
      },
    },
    yAxis: [
      {
        type: "value",
        name: "",
        nameTextStyle: {
          color: "rgba(199, 204, 208, 1)",
          fontSize: 14,
        },
        splitLine: {
          show: true,
          lineStyle: {
            width: 1,
            color: "rgba(82, 91, 104, 0.8)",
            type: 'dashed'
          },
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: "rgba(199, 204, 208, 1)",
            fontSize: 12,
          },
        },
      },
    ],
    series: [
      {
        name: "设备数",
        type: "bar",
        barWidth: 40,
        itemStyle: {
          normal: {
            color: '#45A686'
          },
        },
        label:{
          show: true,
          formatter: "{c}",
          position: 'top',
          color: "#fff"
        },
        data: (data||[]).map(item => item.num),

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
