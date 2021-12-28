import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import {bigNumberTransform} from "@/utils/utils";
const Bar = (props) => {
  
  const {  data = [],color="37A2DA", title="",title1="",title2=""} = props;

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
        label: {
          show: true,
        },
      },
      formatter: '{b} <br />{a0} : {c0}<br />{a1} : {c1}<br />{a2} : {c2}% '
    },
    grid: {
      left: "12%",
      top: "18%",
      right: "10%",
      bottom: "18%",
    },
    legend: {
      show:true,
      // data: ["人卡", "超卡", "人卡活跃率","超卡活跃率"],
      top: "4%",
      textStyle: {
        color: "#1FC3CE",
        fontSize: 14,
      },
    },
    xAxis: {
      data: (data || []).map(item=> item.k1),
      axisLine: {
        show: true, //隐藏X轴轴线
        lineStyle: {
          color: "rgba(82, 91, 104, 0.8)",
          width: 1,
        },
      },
      axisTick: {
        show: true, //隐藏X轴刻度
        alignWithLabel: true,
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#fff", //X轴文字颜色
          fontSize: 12,
        },
        interval: 0,
        rotate: 30,
      },
    },
    yAxis: [
      {
        type: "value",
        nameTextStyle: {
          color: "#fff",
          fontSize: 14,
          padding: [0,0,0,30]
        },
        splitNumber: 5 ,
        min: 0,
        splitLine: {
          show: false,
          lineStyle: {
            width: 1,
            color: "rgba(82, 91, 104, 0.8)",
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
            color: "#fff",
            fontSize: 12,
          },
          formatter: function (value) {
            return bigNumberTransform(value)
          }
        },
      },
      {
        type: "value",
        nameTextStyle: {
          color: "rgba(199, 204, 208, 1)",
          fontSize: 14,
        },
        position: "right",
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: "#396A87",
            width: 2,
          },
        },
        axisLabel: {
          show: true,
          formatter: "{value} %", //右侧Y轴文字显示
          textStyle: {
            color: "rgba(199, 204, 208, 1)",
            fontSize: 12,
          },
        },
      },
    ],
    series: [
      {
        name: title1,
        type: "bar",
        barWidth: 10,
        itemStyle: {
          normal: {
            color: "#45A686"
          },
        },
        data: (data || []).map(item => item.k2),
      },
      {
        name: title2,
        type: "bar",
        barWidth: 10,
        itemStyle: {
          normal: {
            color: '#37A2DA'
          },
        },
        data: (data || []).map(item => item.k3),
      },
      {
        name: title,
        type: "line",
        yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
        showAllSymbol: true, //显示所有图形。
        symbol: "circle", //标记的图形为实心圆
        symbolSize: 6, //标记的大小
        itemStyle: {
          //折线拐点标志的样式
          color: "#FFDB5C",
          borderColor: "#FFDB5C",
          width: 2,
          shadowColor: "#FFDB5C",
          shadowBlur: 2,
        },
        lineStyle: {
          color: "#FFDB5C",
          width: 2,
          shadowBlur: 2,
        },
        data: (data || []).map(item => { return Number((Number(item.k4) * 100).toFixed(2)) }),
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
 