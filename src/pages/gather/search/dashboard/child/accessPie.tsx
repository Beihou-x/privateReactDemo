import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

const AccessPie = (props) => {
  const { data = [] } = props;
  const option = {
    // backgroundColor: "#091C3D",

    color: ['#7A8FFF', '#50E696', '#28D278', '#FFD341', '#FFD29D', '#B797FF'],
    
    tooltip: {
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
  legend: {
      itemGap: 10,
      icon: "circle",
      type: 'scroll',
      orient: 'vertical',
      right: '20%',
      top: "center",
      textStyle: {
          color: '#fff',
          rich: {
              a: {
                  color: '#fff',
                  width: 70
              },
              b: {
                  color: '#fff',
                  width: 40,
                  align: 'right'
              },
              c: {
                  color: '#fff',
                  width: 60,
                  align: 'right'
              }
          }
      },
      // formatter: '{name}: {value}'
      formatter: function(name) {
          let politicsFenBu_total = data.reduce((acc,currentVal) => {
            return acc + currentVal.value
          },0)
          let target;
          for (let i = 0; i < data.length; i++) {
              if (data[i].name == name) {
                  target = data[i].value;
              }
          }
          return `{a|${name}}{b|${((target / politicsFenBu_total) * 100).toFixed(2) + "%"}}`
      },
  },
    series: [
      {
        center: ['40%', '50%'],
        name: '接入方式',
        type: 'pie',
        radius: ['30%', '65%'],
        roseType: "radius",
        avoidLabelOverlap: false,
        label: {
            show: true,
            position: 'outside',
            formatter: '{b} : {c}',
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

export default AccessPie;
