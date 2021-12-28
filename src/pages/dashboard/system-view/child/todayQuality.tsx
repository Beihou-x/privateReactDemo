import React,{useEffect,useState} from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { format } from "@/utils/utils";
import { access_cloud_today_qualiy } from "@/services/access_cloud";
const BarDevice = (props) => {
  // const { data = [], legend = false } = props;
  const [data, setData]:any = useState([]);

  useEffect(() => {
    access_cloud_today_qualiy().then(res => {
      setData(res.today_quality ? res.today_quality : [])
    })
  },[])
  const option = {
    legend: {
      data: ["抓拍图片数", "图片有效率"],
      itemWidth: 12, // 设置宽度
      itemHeight: 8, // 设置高度
      textStyle: {
        //图例文字的样式
        color: "rgba(255, 255, 255, 0.8)",
        fontSize: 12,
      },
      top: 20
    },
    grid: {
      top: "20%",
      left: "7%",
      right: "7%",
      bottom: "10%",
    },
    tooltip: {
      //提示框组件
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      },
      textStyle: {
        color: "#fff",
        fontSize: 14,
      },
      backgroundColor: "rgba(21, 55, 85, 0.9)",
      borderWidth: "0", //边框宽度设置1
    },
    xAxis: [
      {
        type: "category",
        //	boundaryGap: true,//坐标轴两边留白
        data: data.map((m) => m.name),
        axisLabel: {
          //坐标轴刻度标签的相关设置。
          interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
          //	margin:15,
          textStyle: {
            color: "rgba(255, 255, 255, 0.8)",
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
            color: "rgba(35, 137, 234, 0.3)",
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
        name: '抓拍量',
        nameTextStyle: {
          color: "rgba(255, 255, 255, 0.8)",
          padding: [0, 0, 0, -40]
        },
        type: "value",
        splitNumber: 5,
        axisLabel: {
          show: true,
          textStyle: {
            color: "rgba(255, 255, 255, 0.8)",
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
            type: 'dashed',
            color: ["#fff"],
            opacity: 0.06,
          },
        },
      },
      {
        name: '有效率',
        nameTextStyle: {
          color: "rgba(255, 255, 255, 0.8)",
          padding: [0, 0, 0, 50]
        },
        type: "value",
        splitNumber: 5,
        min: 0,
        max: 100,
        axisLabel: {
          show: true,
          textStyle: {
            color: "rgba(255, 255, 255, 0.8)",
            fontStyle: "normal",
            fontSize: 12,
          },
          formatter: (a) => {
            return a + '%';
          },
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: ["#fff"],
            opacity: 0.06,
          },
        },
      },
    ],
    series: [
      {
        name: '抓拍图片数',
        type: "bar",
        data: data.map((m) => m.all_num),
        showBackground: false,
        itemStyle: {
          normal: {
            show: true,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(28, 151, 240, 1)",
              },
              {
                offset: 1,
                color: "rgba(28, 151, 240, 0)",
              },
            ]),
          },
        },
        barWidth: 32,
        backgroundStyle: {
          color: "rgba(84, 219, 255, 0.05)",
        },
      },
      {
        name: "图片有效率",
        type: "line",
        yAxisIndex: 1,
        // smooth: true, //是否平滑
        showAllSymbol: false,
        symbol: "circle",
        symbolSize: 0,
        lineStyle: {
          normal: {
            color: "#FFDB5C",
          },
        },
        itemStyle: {
          color: "#FFDB5C",
        },
        data: data.map((m) => format(m.image_valid)),
        toolTip: {
          formatter: "{c}%"
        }
      },
    ],
  };
  return (
    <ReactECharts
      option={option}
      style={{ height: "252px", width: "100%" }}
      opts={{ renderer: "svg" }}
    />
  );
};

export default BarDevice;
