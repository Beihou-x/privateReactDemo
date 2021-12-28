import React, { useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";
import geoJson from "@/assets/mapjson/320500.json";

const Map = ({ styles = {} }) => {
  echarts.registerMap("SUZHOU", geoJson as any);

  const getOptionMap = () => {
    return {
      title: {},
      legend: {
        data: ["正常", "故障"],
        textStyle: {
          color: "#88d8f1",
        },
        icon: "circle",
        left: 0,
        top: "20%",
        itemGap: 20,
        orient: "vertical",
      },
      geo: [
        {
          map: "SUZHOU",
          aspectScale: 1,
          zoom: 1.2,
          itemStyle: {
            // 定义样式
            normal: {
              // 普通状态下的样式
              areaColor: "#049fcf",
              borderColor: "#4ebbdd",
              shadowBlur: 10,
              shadowColor: "#012b3b",
              shadowOffsetX: 50,
              shadowOffsetY: 20,
            },
          },
          label: {
            show: true,
            color: "#fff",
            fontWeight: "bold",
            fontSize: 14,
          },
        },
        {
          map: "SUZHOU",
          aspectScale: 1,
          zoom: 1.2,
          // left: '15%',
          itemStyle: {
            // 定义样式
            normal: {
              // 普通状态下的样式
              areaColor: "#049fcf",
              borderColor: "#4ebbdd",
            },
          },
          label: {
            show: true,
            color: "#fff",
            fontWeight: "bold",
            fontSize: 14,
          },
        },
      ],
      grid: [{ x: "78%", y: "0%", width: "20%", height: "30%" }],
      // xAxis : [
      //   {
      //     type : 'value',
      //     axisTick: {
      //       show: false
      //     },
      //     axisLine: {
      //       show: false
      //     },
      //     axisLabel: {
      //       show: false
      //     },
      //     splitLine: {
      //       show: false
      //     }
      //   }
      // ],
      // yAxis : [
      //   {
      //     type : 'category',
      //     axisTick: {
      //       show: false
      //     },
      //     axisLine: {
      //       show: false
      //     },
      //     axisLabel: {
      //       show: true,
      //       textStyle: {
      //         color: 'rgba(255, 255, 255,.5)'
      //       }
      //     },
      //     splitLine: {
      //       show: false
      //     },
      //     data : ['西安市','宝鸡市','咸阳市','渭南市','铜川市','延安市', '榆林市'],
      //   }
      // ],
      // tooltip: {
      //   trigger: 'item',
      //   showDelay: 0,
      //   transitionDuration: 0.2,
      //   formatter: function (params) {
      //     var value = (params.value + '').split('.');
      //     value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
      //     return params.seriesName + '<br/>' + params.name + ': ' + value;
      //   }
      // },
      series: [
        {
          type: "effectScatter",
          coordinateSystem: "geo",
          name: "故障",
          data: [
            { name: "西安市", value: [120.82027, 31.373454, 731449] },
            { name: "榆林市", value: [120.846627, 31.52116, 6553255] },
            { name: "宝鸡市", value: [120.912935, 31.521662, 3590347] },
            { name: "汉中市", value: [121.130811, 31.341508, 917092] },
          ],
          symbol: "image://" + require("../../../../../assets/dot-yellow.png"),
          symbolSize: 40,
          itemStyle: {
            normal: {
              color: "#ffe605",
            },
          },
          rippleEffect: {
            color: "#68c5e2",
            period: 3,
          },
        },
        {
          type: "effectScatter",
          coordinateSystem: "geo",
          name: "正常",
          data: [
            { name: "延安市", value: [121.228676, 31.482135, 2949131] },
            { name: "渭南市", value: [121.161365, 31.425776, 38041430] },
            { name: "铜川市", value: [121.155281, 31.42575, 5187582] },
          ],
          symbol: "image://" + require("../../../../../assets/dot-green.png"),
          symbolSize: 30,
          itemStyle: {
            normal: {
              color: "#008000",
            },
          },
        },
        // {
        //   type:'bar',
        //   barWidth: 10,
        //   itemStyle: {
        //     normal: {
        //       barBorderRadius: 5,
        //       color: new echarts.graphic.LinearGradient(
        //         0, 0, 0, 1,
        //         [
        //           {offset: 0, color: '#23879a'},
        //           {offset: 1, color: '#2753a8'}
        //         ]
        //       )
        //     }
        //   },
        //   label: {
        //     normal: {
        //       show: true
        //     }
        //   },
        //   data:[232, 302, 341, 374, 390, 450,485]
        // }
      ],
    };
  };

  return (
    <div>
      <ReactEcharts option={getOptionMap()} style={styles} />
    </div>
  );
};

export default Map;
