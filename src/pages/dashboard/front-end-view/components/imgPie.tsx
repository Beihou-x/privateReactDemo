import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { frontEndImgQuality } from "@/services/feel_view";
import { bigNumberTransform, format } from "@/utils/utils";
const Pie = (props) => {
  // const { data = [] } = props;
  const [imgData, setImgData]: any = useState([]);
  useEffect(() => {
    frontEndImgQuality().then((res) => {
      if (res && res.unitWithPictureMessage) {
        let arr: any = res.unitWithPictureMessage.map((item) => {
          return {
            name: item.k1,
            value: item.k3,
          };
        });
        setImgData(arr);
      }
    });
  }, []);

  const option = {
    color: [
      "#45A686",
      "#FF9F7F",
      "#37A2DA",
      "#9EE6B9",
      "#FFDB5C",
      "#FB7293",
      "#E7BCF3",
      "#8378EA",
      "#B797FF",
    ],
    tooltip: {
      show: false,
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ",
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
      text: bigNumberTransform(imgData.reduce((acc, currentVal) => {
        return acc + currentVal.value;
      }, 0)),
      textStyle: {
        color: "rgba(199, 204, 208, 1)",
        fontSize: 30
      },
      left: "35%",
      top: "40%",
      subtext: "图片数量",
      textAlign: "center",
      subtextStyle: {
        color: "#fff",
        fontSize: 14
      },
    },
    legend: {
      show: true,
      itemGap: 15,
      itemWidth: 10,
      itemHeight: 10,
      icon: "circle",
      type: "scroll",
      orient: "vertical",
      right: "10%",
      top: "10%",
      textStyle: {
        color: "rgba(255, 255, 255, .8)",
        rich: {
          a: {
            width: 50,
            fontSize: 12
          },
          b: {
            color: "rgba(199, 204, 208, 1)",
            width: 50,
            align: "left",
            fontSize: 12
          },
          c: {
            width: 50,
            align: "left",
            fontSize: 12
          },
        },
      },
      // formatter: '{name}: {b}'
      formatter: function (name) {
        let politicsFenBu_total = imgData.reduce((acc, currentVal) => {
          return acc + currentVal.value
        }, 0)
        let target;
        for (let i = 0; i < imgData.length; i++) {
          if (imgData[i].name == name) {
            target = imgData[i].value;
          }
        }
        // return `{a|${name}}{b|${((target / politicsFenBu_total) * 100).toFixed(2) + "%"}}`
        let arr = [
          '{a|' + name + '}',
          '{b|' + format(target / (politicsFenBu_total || 1)) + '%}',
          '{c|' + bigNumberTransform(target) + '}'
        ]
        // return `${name} | ${((target / (politicsFenBu_total || 1)) * 100).toFixed(2) + "%"}  ${target}`;
        return arr.join(' ')
      },
    },
    series: [
      {
        center: ["35%", "46%"],
        name: "图片质量",
        type: "pie",
        radius: ["62%", "70%"],
        // roseType: "radius",
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "outside",
          formatter: "{b} : {c} : {d}%",
          color: "#fff",
          fontStyle: "normal",
        },
        emphasis: {
          scaleSize: 10,
        },
        data: imgData,
      },
    ],
  };
  return (
    <ReactECharts
      option={option}
      style={{ height: "95% ", width: "100%" }}
      opts={{ renderer: "svg" }}
    />
  );
};

export default Pie;
