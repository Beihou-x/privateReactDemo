import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { format } from "@/utils/utils";
const BarDevice = (props) => {
  const { data = [] } = props;
  const maxObj = (data || []).filter(item => Number(item.subscribe_num) && Number(item.subscribe_num) > 100).length ? {} : { max: 100 }
  const formatterTip = (params) => {
    var tip = params[0].name + '<br/>';
    for (var i = 0; i < params.length; i++) {//这里是自己定义样式， params[i].marker 表示是否显示左边的那个小圆圈
      tip = tip + params[i].marker + params[i].seriesName + '：' + params[i].value + (params[i].seriesName === '失败率' ? '%' : '') + '<br/>';
    }
    return tip;
  }
  const option = {
    legend: {
      data: ["订阅总量", "失败率"],
      itemWidth: 12, // 设置宽度
      itemHeight: 8, // 设置高度
      textStyle: {
        //图例文字的样式
        color: "rgba(255, 255, 255, 0.8)",
        fontSize: 12,
      },
      top: 20
    },
    grid: {
      left: "6%",
      top: "10%",
      right: "6%",
      bottom: "10%",
    },
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
      backgroundColor: "rgba(21, 55, 85, 0.9)",
      borderWidth: "0", //边框宽度设置1
      formatter: function (params) {//提示框自定义
        return formatterTip(params);
      },
    },
    xAxis: [
      {
        type: "category",
        //	boundaryGap: true,//坐标轴两边留白
        data: data.map((m) => m.data),
        axisLabel: {
          //坐标轴刻度标签的相关设置。
          interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
          //	margin:15,
          textStyle: {
            color: "rgba(255, 255, 255, 0.8)",
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
            color: "rgba(35, 137, 234, 0.3)",
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
        ...maxObj,
        name: '订阅量',
        nameTextStyle: {
          color: "rgba(255, 255, 255, 0.8)",
          padding: [0, 0, 0, -40]
        },
        type: "value",
        splitNumber: 5,
        axisLabel: {
          show: true,
          textStyle: {
            color: "rgba(255, 255, 255, 0.8)",
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
          show: true,
          lineStyle: {
            type: 'dashed',
            color: ["#fff"],
            opacity: 0.06,
          },
        },
      },
      {
        name: '失败率',
        nameTextStyle: {
          color: "rgba(255, 255, 255, 0.8)",
          padding: [0, 0, 0, 50]
        },
        type: "value",
        splitNumber: 5,
        min: 0,
        max: 100,
        axisLabel: {
          show: true,
          textStyle: {
            color: "rgba(255, 255, 255, 0.8)",
            fontStyle: "normal",
            fontSize: 12,
          },
          formatter: (a) => {
            return a + '%';
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
        name: '订阅总量',
        type: "bar",
        data: data.map((m) => m.subscribe_num),
        showBackground: false,
        itemStyle: {
          normal: {
            show: true,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(28, 151, 240, 1)",
              },
              {
                offset: 1,
                color: "rgba(28, 151, 240, 0)",
              },
            ]),
          },
        },
        barWidth: 25,
        backgroundStyle: {
          color: "rgba(84, 219, 255, 0.05)",
        },
      },
      {
        name: "失败率",
        type: "line",
        yAxisIndex: 1,
        // smooth: true, //是否平滑
        showAllSymbol: false,
        symbol: "circle",
        symbolSize: 0,
        lineStyle: {
          normal: {
            color: "#FFDB5C",
          },
        },
        itemStyle: {
          color: "#FFDB5C",
        },
        data: data.map((m) => format(m.failed_quality)),
        toolTip: {
          formatter: "{c}%"
        }
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

export default BarDevice;
