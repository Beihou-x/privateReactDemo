import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { frontEndDevice } from "@/services/feel_view";

const Bar = (props) => {
  // const { title = "", data = [],legend=false } = props;
  const [area, setArea] = useState([]);
  const [humanData, setHumanData] = useState([]);
  const [superData, setSuperData] = useState([]);
  const [humanRate, setHumanRate] = useState([]);
  const [superRate, setSuperRate] = useState([]);
  const [deviceData, setDeviceData]: any = useState([])
  useEffect(() => {
    frontEndDevice().then(res => {
      if (res && res.unitWithMessage) {
        setDeviceData(res.unitWithMessage);
      }

    })
  }, [])

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
    grid: {
      left: "7%",
      top: "15%",
      right: "7%",
      bottom: "30%",
    },
    legend: {
      itemWidth: 12,
      itemHeight: 8,
      data: ["人卡", "超卡", "人卡活跃率", "超卡活跃率"],
      top: "4%",
      textStyle: {
        color: "rgba(199, 204, 208, 1)",
        fontSize: 14,
      },
    },
    xAxis: {
      data: deviceData.map(item => item.k1),
      axisLine: {
        show: true, //隐藏X轴轴线
        lineStyle: {
          color: "rgba(35, 137, 234, 0.3)",
        },
      },
      axisTick: {
        show: true, //隐藏X轴刻度
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
        name: "设备量",
        nameTextStyle: {
          color: "rgba(199, 204, 208, 1)",
          fontSize: 14,
        },
        splitLine: {
          show: true,
          lineStyle: {
            width: 1,
            color: "rgba(82, 91, 104, 0.8)",
            type:'dashed'
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
      {
        type: "value",
        name: "活跃率",
        min: 0,
        max: 100,
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
        name: "人卡",
        type: "bar",
        barWidth: 18,
        itemStyle: {
          normal: {
            color: '#37A2DA'
          },
        },
        data: deviceData.map(item => item.k3),
      },
      {
        name: "超卡",
        type: "bar",
        barWidth: 18,
        itemStyle: {
          normal: {
            color: '#45A686'
          },
        },
        data: deviceData.map(item => item.k4),
      },
      {
        name: "人卡活跃率",
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
        data: deviceData.map(item => { return Number((Number(item.k7) * 100).toFixed(2)) }),
      },
      {
        name: "超卡活跃率",
        type: "line",
        yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
        showAllSymbol: true, //显示所有图形。
        symbol: "circle", //标记的图形为实心圆
        symbolSize: 3, //标记的大小
        itemStyle: {
          //折线拐点标志的样式
          color: "#FF9F7F",
          borderColor: "#FF9F7F",
          width: 2,
          shadowColor: "#FF9F7F",
          shadowBlur: 2,
        },
        lineStyle: {
          color: "#FF9F7F",
          width: 2,
          shadowBlur: 2,
        },
        data: deviceData.map(item => { return Number((Number(item.k8) * 100).toFixed(2)) }),
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