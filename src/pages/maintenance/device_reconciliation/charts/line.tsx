import React from "react";
import ReactECharts from "echarts-for-react";

const Line = (props) => {
  const { data = [], onSelectDate } = props;
  const option = {
    title: {
      text: "近一周图片质量",
      textStyle: {
        color: "#fff",
        fontSize: 14,
        fontWeight: 300,
      },
    },
    // legend: {
    //   data: [
    //     "近一周质量较好设备量",
    //   ],
    //   textStyle: {
    //     fontSize: 8,
    //     color: "#fff",
    //     align: "right",
    //   },
    //   x: "right",
    // },
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
      top: 35,
      bottom: 20,
      left: 55,
      right: 45,
      // containLabel: true
    },
    xAxis: [
      {
        show: true,
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
          color: "#fff",
          clickable: true,
        },
        silent: false,
        triggerEvent: true,
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        boundaryGap: false,
        data: data && data.map((m) => m.k1),
      },
    ],

    yAxis: [
      {
        type: "value",
        min: 0,
        // max: 140,
        splitNumber: 3,
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
          margin: 10,
          textStyle: {
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
        name: "近一周图片质量",
        type: "line",
        // smooth: true, //是否平滑
        showAllSymbol: true,
        symbol: "circle",
        symbolSize: 2,
        lineStyle: {
          normal: {
            color: "#1890ff",
          },
        },
        label: {
          show: true,
          position: "top",
          textStyle: {
            color: "#fff",
          },
          formatter: "{c}%",
        },
        itemStyle: {
          color: "#1890ff",
          borderColor: "#fff",
          borderWidth: 1,
        },
        // tooltip: {
        //   show: false,
        // },
        data: data && data.map((m) => Number((Number(m.k4) * 100).toFixed(2))),
      },
    ],
  };
  // 定义onEvents  click事件
  const onEvents = {
    click: (params) => {
      onSelectDate && onSelectDate(params.value);
    },
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: "100%", width: "100%" }}
      opts={{ renderer: "svg" }}
      onEvents={onEvents}
    />
  );
};

export default Line;
