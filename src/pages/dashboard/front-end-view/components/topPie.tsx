import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { bigNumberTransform } from "@/utils/utils";
import { toNumber } from "lodash";

const Pie = (props) => {
  const defaultData = [
    {
      name: '人卡',
      value: 0
    }, {
      name: '超卡',
      value: 0
    }
  ]
  const { title="", data = defaultData } = props;


  const getColor = (title) => {
    let color: any = []
    switch (title) {
      case '设备总量':
        color = ['#9EE6B9', '#37A2DA'];
        break;
      case '数据总量':
        color = ['#FF9F7F', '#31C5E9'];
        break;
      case '异常数据':
        color = ['#FF9F7F', '#FFD93A'];
        break;
      default:
        color = ['#9EE6B9', '#37A2DA',"#FFD93A"];
    }
    return color
  }

  const getAll = (data) => {
    let num = 0;
    data.forEach(item => {
      num += toNumber(item.value);
    })
    if (title === "设备总量") {
      return num
    }
    return bigNumberTransform(num)
  }
  const option = {
    color: getColor(title),
    tooltip: {
      show: false,
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ',
      backgroundColor: "rgba(0,0,0,0.6)",
      borderColor: "rgba(0,0,0,0.6)",
      padding: 15,
      textStyle: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "300",
      },
    },
    title: {
      text: getAll(data),
      textStyle: {
        color: "#fff",
        fontSize: 30
      },
      left: '19%',
      top: '33%',
      subtext: title==="设备总量" ? "" : title,
      subtextStyle: {
        color: 'rgba(199, 204, 208, 1)',
        fontSize: 14
      },
      textAlign: "center",
    },
    legend: {
      show: true,
      itemGap: 30,
      itemWidth: 10,
      itemHeight: 10,
      icon: "circle",
      orient: title === '完整总数' ? 'vertical' : 'horizontal',
      right: '5%',
      top: "center",
      textStyle: {
        color: '#fff',
        rich: {
          a: {
            color: 'rgba(199, 204, 208, 1)',
            width: 40,
            padding: [32, 5, 5, 5],
            fontSize: 14

          },
          b: {
            color: '#fff',
            width: 40,
            padding: 5,
            fontSize: 18
          },
          c: {
            color: '#fff',
            width: 60,
          }
        }
      },
      // formatter: '{name}: {b}'
      formatter: function (name) {
        // let politicsFenBu_total = data.reduce((acc,currentVal) => {
        //   return acc + currentVal.value
        // },0)
        let target;
        for (let i = 0; i < data.length; i++) {
          if (data[i].name == name) {
            target = data[i].value;
          }
        }
        // return `{a|${name}}{b|${((target / politicsFenBu_total) * 100).toFixed(2) + "%"}}`
        // return `${name}\n${target}`
        if (title === "设备总量") {
          return `{a|${name}}\n{b|${target}}`
        }
        return `{a|${name}}\n{b|${bigNumberTransform(target)}}`
      },
    },
    series: [
      {
        center: ['20%', '50%'],
        type: 'pie',
        radius: ['78%', '90%'],
        // roseType: "radius",
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'inside',
          formatter: '{b} : {c} : {d}%',
          color: '#fff',
          fontStyle: 'normal'
        },
        emphasis: {
          scaleSize: 10
        },
        data: data
      }
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

export default Pie;
