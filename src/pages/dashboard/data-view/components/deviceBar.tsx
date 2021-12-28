import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { access_cloud_today_capture } from "@/services/access_cloud";

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
    grid: {
      left: "6%",
      top: "18%",
      right: "6%",
      bottom: "22%",
    },
    legend: {
      data: ["人卡", "超卡"],
      itemWidth: 12,
      itemHeight: 8,
      top: "4%",
      textStyle: {
        color: "rgba(199, 204, 208, 1)",
        fontSize: 14,
      },
    },
    xAxis: {
      data: (data || []).map(item => item.k11),
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
        name: "人卡",
        type: "bar",
        barWidth: 18,
        itemStyle: {
          normal: {
            color: '#37A2DA'
          },
        },
        data: (data || []).map(item => item.k13),
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
        data: (data || []).map(item => item.k14),

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
