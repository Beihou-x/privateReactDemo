import React from "react";
import ReactEcharts from "echarts-for-react";

const Line = ({ styles = {} }) => {
  const getOptions = () => {
    return {
      title: {},
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["转发量", "请求量"],
        textStyle: {
          color: "#fff",
        },
        y: "bottom",
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "6%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        axisLabel: { interval: 0, rotate: 30 },
        type: "category",
        boundaryGap: false,
        data: [
          "2021/2/18",
          "2021/2/19",
          "2021/2/20",
          "2021/2/21",
          "2021/2/22",
          "2021/2/23",
          "2021/2/24",
        ],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "转发量",
          type: "line",
          // smooth: true,
          data: [20928, 35873, 26987, 14895, 19984, 25982, 14315],
        },
        {
          name: "请求量",
          type: "line",
          // smooth: true,
          data: [7047, 8954, 7485, 7137, 2983, 3698, 2487],
        },
      ],
    };
  };

  return (
    <div>
      <ReactEcharts option={getOptions()} style={styles} />
    </div>
  );
};

export default Line;
