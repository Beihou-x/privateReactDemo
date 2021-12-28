import React from "react";
import ReactECharts from "echarts-for-react";

const topLine = (props) => {
  const { title = "", data = [] } = props;
  const option = {
    grid: {
      top: "15%",
      left: "10%",
      right: "10%",
      bottom: "20%",
    },
    tooltip: {
      trigger: "axis",
    },

    calculable: true,
    xAxis: [
      {
        type: "category",
        axisLine: {
          lineStyle: {
            color: "rgba(255, 255, 255, .1)",
          },
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
          textStyle: {
            color: "#fff",
            fontSize: 12,
            fontWeight: "100",
          },
        },

        data: data.map((m) => m.name),
      },
    ],

    yAxis: [
      {
        type: "value",
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(255, 255, 255, .1)",
          },
        },
        axisLine: {
          lineStyle: {
            color: "rgba(255, 255, 255, .1)",
          },
        },
        axisLabel: {
          margin: 15,
          textStyle: {
            color: "#fff",
            fontSize: 12,
            fontWeight: "100",
          },
        },
      },
    ],

    series: [
      {
        name: "质量",
        type: "line",
        symbolSize: 10,
        symbol: "circle",
        itemStyle: {
          color: "#EB551D",
        },
        markLine: {
          data: [
            {
              type: "average",
              name: "平均值",
              silent: false, //鼠标悬停事件  true没有，false有
              lineStyle: {
                //警戒线的样式  ，虚实  颜色
                type: "solid",
                color: "rgba(24, 205, 255, 1)",
              },
              label: {
                color: "rgba(26, 201, 255, 1)",
                // position: "end",
                // formatter: "平均值",
              },
            },
          ],
          symbol: "none",
        },
        markPoint: {
          label: {
            normal: {
              textStyle: {
                color: "#fff",
              },
            },
          },
          data: [
            {
              type: "max",
              name: "最大值",
            },
            {
              type: "min",
              name: "最小值",
            },
          ],
        },
        data: data.map((m) => m.value),
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

export default topLine;
