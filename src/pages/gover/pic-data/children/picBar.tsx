import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { access_cloud_today_capture } from "@/services/access_cloud";

const Bar = props => {
  // const { title = "", data = [],legend=false } = props;
  // const {data =[]} = props;

  const area = ['工业园区','吴中区','姑苏区','虎丘区','吴江区','相城区','太仓市','张家港市','常熟市','昆山市','交警支队']
  const defaultData = [
    {
      k1: 1458,
      k2: 2587,
      k3: 3451,
      k4: 2874,
    },
    {
      k1: 1458,
      k2: 2587,
      k3: 3451,
      k4: 2874,
    },
    {
      k1: 1458,
      k2: 2587,
      k3: 3451,
      k4: 2874,
    },
    {
      k1: 1458,
      k2: 2587,
      k3: 3451,
      k4: 2874,
    },
    {
      k1: 1458,
      k2: 2587,
      k3: 3451,
      k4: 2874,
    },
    {
      k1: 1458,
      k2: 2587,
      k3: 3451,
      k4: 2874,
    },
    {
      k1: 1458,
      k2: 2587,
      k3: 3451,
      k4: 2874,
    },
    {
      k1: 1458,
      k2: 2587,
      k3: 3451,
      k4: 2874,
    },
    {
      k1: 1458,
      k2: 2587,
      k3: 3451,
      k4: 2874,
    },
    {
      k1: 1458,
      k2: 2587,
      k3: 3451,
      k4: 2874,
    },
    {
      k1: 1458,
      k2: 2587,
      k3: 3451,
      k4: 2874,
    },

  ];
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
      left: "4%",
      top: "18%",
      right: "5%",
      bottom: "22%",
    },
    legend: {
      data: ["人脸", "人体", "车辆", "无人脸"],
      top: "4%",
      textStyle: {
        color: "#1FC3CE",
        fontSize: 14,
      },
    },
    xAxis: {
      data: area,
      axisLine: {
        show: true, //隐藏X轴轴线
        lineStyle: {
          color: "#226183",
          width: 1,
          type: "solid",
        },
      },
      axisTick: {
        show: true, //隐藏X轴刻度
        alignWithLabel: true,
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#C7CCD0", //X轴文字颜色
          fontSize: 14,
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
          color: "#C7CCD0",
          fontSize: 14,
        },
        splitLine: {
          show: true,
          lineStyle: {
            width: 1,
            color: "#0b2a4a",
            type: "dashed",
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
            color: "#C7CCD0",
            fontSize: 14,
          },
        },
      },
    ],
    series: [
      {
        name: "人脸",
        type: "bar",
        barWidth: 18,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#4fd1f5",
              },
              {
                offset: 1,
                color: "#072243",
              },
            ]),
          },
        },
        data: defaultData.map(item => item.k1),
      },
      {
        name: "人体",
        type: "bar",
        barWidth: 18,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(0,191,183,1)",
              },
              {
                offset: 1,
                color: "#072243",
              },
            ]),
          },
        },
        data: defaultData.map(item => item.k2),
      },
      {
        name: "车辆",
        type: "bar",
        barWidth: 18,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#0971a3",
              },
              {
                offset: 1,
                color: "#072243",
              },
            ]),
          },
        },
        data: defaultData.map(item => item.k3),
      },
      {
        name: "无人脸",
        type: "bar",
        barWidth: 18,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#e86b22",
              },
              {
                offset: 1,
                color: "#072243",
              },
            ]),
          },
        },
        data: defaultData.map(item => item.k4),
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
