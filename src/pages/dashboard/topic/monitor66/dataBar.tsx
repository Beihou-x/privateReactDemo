import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

const DataBar = () => {
  const option = {
    // backgroundColor: "#091C3D",
    tooltip: {
      //提示框组件
      trigger: "axis",
      formatter: "{b}<br />{a0}: {c0}<br />{a1}: {c1}",
      axisPointer: {
        type: "shadow",
        label: {
          backgroundColor: "#6a7985",
        },
      },
      textStyle: {
        color: "#fff",
        fontStyle: "normal",
        fontSize: 12,
      },
    },
    grid: {
      left: "4%",
      right: "4%",
      bottom: "4%",
      top: "14%",
      //	padding:'0 0 10 0',
      containLabel: true,
    },
    legend: {
      //图例组件，颜色和名字
      right: "10%",
      // top: "10%",
      itemGap: 16,
      itemWidth: 18,
      itemHeight: 10,
      data: [
        {
          name: "日接受数据",
          //icon:'image://../wwwroot/js/url2.png', //路径
        },
        {
          name: "转发数据对比",
        },
      ],
      textStyle: {
        color: "#ffffff",
        fontStyle: "normal",
        fontSize: 12,
      },
    },
    xAxis: [
      {
        type: "category",
        //	boundaryGap: true,//坐标轴两边留白
        data: ["百度引擎", "依图引擎", "商汤引擎", "车辆引擎"],
        axisLabel: {
          //坐标轴刻度标签的相关设置。
          //		interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
          //	margin:15,
          textStyle: {
            color: "#FFFFFF",
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
            color: "#fff",
            opacity: 0.2,
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
        type: "value",
        splitNumber: 5,
        axisLabel: {
          textStyle: {
            color: "#FFFFFF",
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
            color: ["#fff"],
            opacity: 0.06,
          },
        },
      },
    ],
    series: [
      {
        name: "日接受数据",
        type: "bar",
        data: [1000, 1500, 3000, 4500],
        barWidth: 15,
        barGap: 0, //柱间距离
        // label: {//图形上的文本标签
        //     normal: {
        //       show: true,
        //       position: 'top',
        //       textStyle: {
        //           color: '#a8aab0',
        //           fontStyle: 'normal',
        //           fontFamily: '微软雅黑',
        //           fontSize: 12,
        //       },
        //     },
        // },
        itemStyle: {
          normal: {
            show: true,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#06C7F0",
              },
              {
                offset: 1,
                color: "#06C7F0",
              },
            ]),
            // barBorderRadius: 50,
            borderWidth: 0,
          },
        },
      },
      {
        name: "转发数据对比",
        type: "bar",
        data: [800, 500, 2500, 3000],
        barWidth: 15,
        barGap: 0, //柱间距离
        // label: {//图形上的文本标签
        //     normal: {
        //       show: true,
        //       position: 'top',
        //       textStyle: {
        //           color: '#a8aab0',
        //           fontStyle: 'normal',
        //           fontFamily: '微软雅黑',
        //           fontSize: 12,
        //       },
        //     },
        // },
        itemStyle: {
          normal: {
            show: true,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#54E8E2",
              },
              {
                offset: 1,
                color: "#54E8E2",
              },
            ]),
            // barBorderRadius: 50,
            borderWidth: 0,
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

export default DataBar;
