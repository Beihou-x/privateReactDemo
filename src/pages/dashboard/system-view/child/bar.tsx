import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { access_cloud_today_capture } from "@/services/access_cloud";

const Bar = (props) => {
  // const { title = "", data = [],legend=false } = props;
  const [barData, setBarData]: any = useState([]);
  useEffect(() => {
    access_cloud_today_capture().then((res) => {
      if (res && res.todayCaptureTotals) {
        const list = res.todayCaptureTotals.map((item) => {
          return {
            name: item.name,
            value: item.capture_total,
          };
        });
        setBarData(list);
      }
    });
  }, []);
  const option = {
    // legend: legend,
    title: {
      // text: title,
      left: "center",
      y: "bottom",
      textStyle: {
        //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
        fontFamily: "Source Han Sans CN",
        fontSize: 14,
        fontWeight: 400,
        color: "#fff",
      },
    },
    grid: {
      top: "10%",
      left: "2%",
      right: "5%",
      bottom: "15%",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    xAxis: [
      {
        type: "category",
        //	boundaryGap: true,//坐标轴两边留白
        data: barData.map((m) => m.name),
        axisLabel: {
          //坐标轴刻度标签的相关设置。
          interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
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
          show: true,
          //坐标轴轴线相关设置
          lineStyle: {
            color: "#525B68",
            // opacity: 0.2,
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
          show: false,
          textStyle: {
            color: "#FFFFFF",
            fontStyle: "normal",
            fontSize: 12,
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: "#666A9C",
            // opacity: 0.2,
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ["rgba(102, 106, 156, .1)"],
            // opacity: 0.1,
            type: "dashed",
          },
        },
      },
    ],
    series: [
      {
        // name: title,
        type: "bar",
        data: barData.map((m) => m.value),
        barWidth: 24,
        barGap: 0, //柱间距离
        showBackground: true,
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
        backgroundStyle: {
          color: "rgba(138, 180, 223, 0.1)",
        },
        itemStyle: {
          normal: {
            show: true,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                  offset: 0, color: 'rgba(55, 162, 218, 1)' // 0% 处的颜色
              }, {
                  offset: 1, color: 'rgba(55, 162, 218, 0)' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            },
            // barBorderRadius: 50,
            borderWidth: 0,
            // label: {
            //   show: true,
            //   position: "top",
            //   formatter: "{c}%",
            //   textStyle: {
            //     color: "#56E8F2",
            //   },
            //   distance: 5,
            // },
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

export default Bar;
