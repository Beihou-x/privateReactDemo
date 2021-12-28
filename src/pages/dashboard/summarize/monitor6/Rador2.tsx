import React from "react";
import ReactEcharts from "echarts-for-react";

const Rador2 = ({ styles = {} }) => {
  const Option = () => {
    const dataname = [
      "人像档案聚档库",
      "数据准确率",
      "数据时效性",
      "数据一致性",
      ".",
      ".",
    ];
    const datamax = [150, 150, 150, 150, 150, 150];
    const datavaule = [86, 73, 98, 55, 44, 65];

    const indicator: any = [];
    for (var i = 0; i < dataname.length; i++) {
      indicator.push({
        name: dataname[i],
        max: datamax[i],
      });
    }
    function contains(arrays, obj) {
      var i = arrays.length;
      while (i--) {
        if (arrays[i] === obj) {
          return i;
        }
      }
      return false;
    }
    let option = {
      tooltip: {
        show: false,
        trigger: "item",
      },
      radar: {
        center: ["50%", "50%"],
        radius: "70%",
        startAngle: 240,
        splitNumber: 5,
        splitArea: {
          areaStyle: {
            color: [
              "rgba(0,96,208, 0.1)",
              "rgba(0,96,208, 0.2)",
              "rgba(0,96,208, 0.4)",
              "rgba(0,96,208, 0.6)",
              "rgba(0,96,208, 0.8)",
              "rgba(0,96,208, 1)",
            ].reverse(),
          },
        },
        axisLabel: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "transparent",
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "transparent",
          },
        },
        name: {
          formatter: function (value) {
            var i = contains(dataname, value);
            var percent = datavaule[i];
            var ret = ""; //拼接加\n返回的类目项
            var maxLength = 8; //每项显示文字个数
            var valLength = value.length; //X轴类目项的文字个数
            var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
            if (rowN > 1) {
              //如果类目项的文字大于6,
              var temp = ""; //每次截取的字符串
              var start = 0; //开始截取的位置
              var end = maxLength; //结束截取的位置
              temp =
                value.substring(start, end) +
                "\n" +
                value.substring(end, valLength);
              ret += temp; //凭借最终的字符串
              return "{a|" + percent + "}\n" + "{b|" + ret + "}";
            } else {
              return "{a|" + percent + "}\n" + "{b|" + value + "}";
            }
          },
          textStyle: {
            rich: {
              a: {
                color: "#CAEEFF",
                fontSize: 14,
                padding: [0, 0],
                lineHeight: 20,
              },
              b: {
                color: "#CAEEFF",
                fontSize: 14,
                padding: [0, 0],
                lineHeight: 20,
              },
            },
          },
        },
        indicator: indicator,
      },

      series: [
        {
          type: "radar",
          symbol: "circle",
          symbolSize: 7,
          areaStyle: {
            normal: {
              // 单项区域填充样式
              color: {
                type: "linear",
                x: 0, //右
                y: 0, //下
                x2: 1, //左
                y2: 1, //上
                colorStops: [
                  {
                    offset: 0,
                    color: "#00c2ff",
                  },
                  {
                    offset: 0.5,
                    color: "rgba(0,0,0,0)",
                  },
                  {
                    offset: 1,
                    color: "#00c2ff",
                  },
                ],
                globalCoord: false,
              },
              opacity: 1, // 区域透明度
            },
          },
          itemStyle: {
            color: "#00A7FE",
            borderColor: "#00A7FE",
            borderWidth: 0.1,
          },
          lineStyle: {
            normal: {
              color: "#00A7FE",
              width: 1,
            },
          },
          data: [datavaule],
        },
      ],
    };
    return option;
  };

  return (
    <div>
      <ReactEcharts
        option={Option()}
        style={{ width: "22vw", height: "22vh" }}
      ></ReactEcharts>
    </div>
  );
};

export default Rador2;
