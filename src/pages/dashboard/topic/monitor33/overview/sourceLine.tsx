import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

const SourceLine = () => {
  const option = {
    grid: {
      top: "10%",
      left: "15%",
      right: "15%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["登记入住", "一机一档", "人脸库", "人像基础库", "人像引擎"],
      // x轴值
      axisLabel: {
        interval: 0, //X轴信息全部展示
        rotate: -60, //20 标签倾斜的角度
        color: "#fff",
        margin: 20,
      },
      splitLine: {
        //决定是否显示坐标中网格
        show: true,
        lineStyle: {
          type: "dashed", // y轴分割线类型
          color: "#012d65",
        },
      },
      axisLine: {
        lineStyle: {
          color: "#012d65",
          width: 1, //这里是为了突出显示加上的
        },
      },
    },
    yAxis: {
      type: "value",
      min: 90,
      // y轴值
      axisLabel: {
        color: "#fff",
        margin: 20,
        formatter: "{value}%",
      },
      // 网格线
      splitLine: {
        lineStyle: {
          type: "dashed", // y轴分割线类型
          color: "#012d65",
        },
      },
      // 轴线
      axisLine: {
        lineStyle: {
          color: "#012d65",
          width: 1, //这里是为了突出显示加上的
        },
      },
    },
    series: [
      {
        data: [94, 93.6, 95.2, 94, 98],
        type: "line",
        smooth: true,
        itemStyle: {
          normal: {
            color: "#1790a6",
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#ffffff",
              },
              distance: 10,
              formatter: "{c}%",
            },
            lineStyle: {
              color: "#1790a6",
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

export default SourceLine;
