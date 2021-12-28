import React from "react";
import ReactECharts from "echarts-for-react";

const Line = (props) => {
  const { data = [] } = props;
  const option = {
    legend: {
      data: ['今日活跃率','七日活跃率','本月活跃率'],
      textStyle: {
        fontSize: 12,
        color: "#fff",
        align: "right",
      },
      x: "center",
      y: "bottom",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        lineStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(0, 255, 233,0)",
              },
              {
                offset: 0.5,
                color: "rgba(255, 255, 255,1)",
              },
              {
                offset: 1,
                color: "rgba(0, 255, 233,0)",
              },
            ],
            global: false,
          },
        },
      },
    },
    grid: {
      left: "4%",
      right: "10%",
      bottom: "16%",
      top: "10%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        axisLine: {
          show: false,
        },
        splitArea: {
          // show: true,
          color: "#f00",
          lineStyle: {
            color: "#f00",
          },
        },
        axisLabel: {
          show: true,
          color: "#fff",
          fontStyle: "normal",
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        boundaryGap: false,
        data: data.map((m) => m.name),
      },
    ],

    yAxis: [
      {
        type: "value",
        min: 0,
        // max: 140,
        splitNumber: 4,
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(255,255,255,0.1)",
          },
        },
        axisLine: {
          show: true,
        },
        axisLabel: {
          show: true,
          // margin: 20,
          textStyle: {
            fontSize: 12,
            fontStyle: "normal",
            color: "#fff",
          },
        },
        axisTick: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: '今日活跃率',
        type: "line",
        // smooth: true, //是否平滑
        showAllSymbol: true,
        symbol: "circle",
        symbolSize: 2,
        lineStyle: {
          normal: {
            color: "#6c50f3",
          },
        },
        label: {
          show: true,
          position: "top",
          textStyle: {
            color: "#6c50f3",
          },
        },
        itemStyle: {
          color: "#6c50f3",
          borderColor: "#fff",
          borderWidth: 1,
        },
        tooltip: {
          show: false,
        },

        data: data.map((m) => m.value_today),
      },
      {
        name: '七日活跃率',
        type: "line",
        // smooth: true, //是否平滑
        showAllSymbol: true,
        // symbol: 'image://./static/images/guang-circle.png',
        symbol: "circle",
        symbolSize: 2,

        label: {
          show: true,
          position: "top",
          textStyle: {
            color: "#00ca95",
          },
        },

        itemStyle: {
          color: "#00ca95",
          borderColor: "#fff",
          borderWidth: 1,
        },
        tooltip: {
          show: false,
        },
        data: data.map((m) => m.value_week),
      },
      {
        name: '本月活跃率',
        type: "line",
        // smooth: true, //是否平滑
        showAllSymbol: true,
        symbol: "circle",
        symbolSize: 2,
        lineStyle: {
          normal: {
            color: "#54E8E2",
          },
        },
        label: {
          show: true,
          position: "top",
          textStyle: {
            color: "#54E8E2",
          },
        },
        itemStyle: {
          color: "#54E8E2",
          borderColor: "#fff",
          borderWidth: 1,
        },
        tooltip: {
          show: false,
        },

        data: data.map((m) => m.value_month),
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

export default Line;
