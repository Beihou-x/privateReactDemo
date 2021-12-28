import React, { useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";
import moment from "moment";

type BarNegativeProps = {
  styles: object;
  data?: Array<{
    check_in_db_total: string;
    person_db_total: string;
    face_db_total: string;
    created_at: any;
  }>;
};

const BarNegative: React.FC<BarNegativeProps> = ({ styles = {}, data }) => {
  useEffect(() => {}, []);

  const defaultValue = [
    {
      check_in_db_total: "20",
      person_db_total: "0",
      face_db_total: "0",
      created_at: "1619827200",
    },
    {
      check_in_db_total: "30",
      person_db_total: "0",
      face_db_total: "0",
      created_at: "1619913600",
    },
    {
      check_in_db_total: "40",
      person_db_total: "0",
      face_db_total: "0",
      created_at: "1620000000",
    },
    {
      check_in_db_total: "10",
      person_db_total: "0",
      face_db_total: "0",
      created_at: "1620086400",
    },
    {
      check_in_db_total: "20",
      person_db_total: "0",
      face_db_total: "0",
      created_at: "1620172800",
    },
    {
      check_in_db_total: "30",
      person_db_total: "0",
      face_db_total: "0",
      created_at: "1620259200",
    },
    {
      check_in_db_total: "40",
      person_db_total: "0",
      face_db_total: "0",
      created_at: "1620345600",
    },
    {
      check_in_db_total: "20",
      person_db_total: "0",
      face_db_total: "0",
      created_at: "1620432000",
    },
    {
      check_in_db_total: "30",
      person_db_total: "0",
      face_db_total: "0",
      created_at: "1620518400",
    },
    {
      check_in_db_total: "40",
      person_db_total: "0",
      face_db_total: "0",
      created_at: "1620604800",
    },
    {
      check_in_db_total: "32",
      person_db_total: "0",
      face_db_total: "0",
      created_at: "1620691200",
    },
    {
      check_in_db_total: "40",
      person_db_total: "0",
      face_db_total: "0",
      created_at: "1620777600",
    },
    {
      check_in_db_total: "30",
      person_db_total: "0",
      face_db_total: "0",
      created_at: "1620864000",
    },
    {
      check_in_db_total: "54",
      person_db_total: "0",
      face_db_total: "0",
      created_at: "1620950400",
    },
    {
      check_in_db_total: "34",
      person_db_total: "0",
      face_db_total: "0",
      created_at: "1621036800",
    },
    {
      check_in_db_total: "25",
      person_db_total: "0",
      face_db_total: "0",
      created_at: "1621123200",
    },
    {
      check_in_db_total: "40",
      person_db_total: "0",
      face_db_total: "0",
      created_at: "1621209600",
    },
    {
      check_in_db_total: "34",
      person_db_total: "0",
      face_db_total: "0",
      created_at: "1621296000",
    },
    {
      check_in_db_total: "40",
      person_db_total: "0",
      face_db_total: "0",
      created_at: "1621382400",
    },
    {
      check_in_db_total: "30",
      person_db_total: "0",
      face_db_total: "0",
      created_at: "1621468800",
    },
    {
      check_in_db_total: "40",
      person_db_total: "0",
      face_db_total: "0",
      created_at: "1621555200",
    },
    {
      check_in_db_total: "20",
      person_db_total: "0",
      face_db_total: "0",
      created_at: "1621641600",
    },
    {
      check_in_db_total: "40",
      person_db_total: "0",
      face_db_total: "0",
      created_at: "1621728000",
    },
    {
      check_in_db_total: "30",
      person_db_total: "0",
      face_db_total: "0",
      created_at: "1621814400",
    },
    {
      check_in_db_total: "30",
      person_db_total: "0",
      face_db_total: "0",
      created_at: "1621900800",
    },
    {
      check_in_db_total: "40",
      person_db_total: "0",
      face_db_total: "0",
      created_at: "1621987200",
    },
    {
      check_in_db_total: "51",
      person_db_total: "0",
      face_db_total: "0",
      created_at: "1622073600",
    },
    {
      check_in_db_total: "41",
      person_db_total: "0",
      face_db_total: "0",
      created_at: "1622160000",
    },
    {
      check_in_db_total: "31",
      person_db_total: "0",
      face_db_total: "0",
      created_at: "1622246400",
    },
    {
      check_in_db_total: "52",
      person_db_total: "0",
      face_db_total: "0",
      created_at: "1622332800",
    },
  ];

  const getOptionMap = () => {
    return {
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
        top: "20%",
        bottom: "20%",
        left: "5%",
        right: "5%",
        // containLabel: true
      },
      legend: {
        textStyle: {
          color: "rgba(255, 254, 254, 0.8)",
        },
        data: ["旅馆入住记录数", "人像基础库数", "人脸库数"],
        right: "5%",
        top: "0",
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
            color: "rgba(255, 254, 254, 0.8)",
          },
          splitLine: {
            show: false,
          },
          boundaryGap: false,
          data: (data?.length ? data : defaultValue).map(
            (item) =>
              item &&
              item.created_at &&
              moment(item.created_at * 1000).format("YYYY-MM-DD")
          ),
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
            show: false,
          },
          axisLabel: {
            show: false,
            margin: 20,
            textStyle: {
              color: "#d1e6eb",
            },
          },
          axisTick: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: "旅馆入住记录数",
          type: "line",
          smooth: true, //是否平滑
          showAllSymbol: true,
          // symbol: 'image://./static/images/guang-circle.png',
          symbol: "circle",
          symbolSize: 15,
          lineStyle: {
            normal: {
              color: "#00b3f4",
              shadowColor: "rgba(0, 0, 0, .3)",
              shadowBlur: 0,
              shadowOffsetY: 5,
              shadowOffsetX: 5,
            },
          },
          label: {
            show: false,
            position: "top",
            textStyle: {
              color: "#00b3f4",
            },
          },
          itemStyle: {
            color: "#00b3f4",
            borderColor: "#fff",
            borderWidth: 3,
            shadowColor: "rgba(0, 0, 0, .3)",
            shadowBlur: 0,
            shadowOffsetY: 2,
            shadowOffsetX: 2,
          },
          tooltip: {
            show: true,
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(0,179,244,0.3)",
                  },
                  {
                    offset: 1,
                    color: "rgba(0,179,244,0)",
                  },
                ],
                false
              ),
              shadowColor: "rgba(0,179,244, 0.9)",
              shadowBlur: 20,
            },
          },
          data: (data?.length ? data : defaultValue).map((item) => item.check_in_db_total),
        },
        {
          name: "人像基础库数",
          type: "line",
          smooth: true, //是否平滑
          showAllSymbol: true,
          // symbol: 'image://./static/images/guang-circle.png',
          symbol: "circle",
          symbolSize: 15,
          lineStyle: {
            normal: {
              color: "#00ca95",
              shadowColor: "rgba(0, 0, 0, .3)",
              shadowBlur: 0,
              shadowOffsetY: 5,
              shadowOffsetX: 5,
            },
          },
          label: {
            show: false,
            position: "top",
            textStyle: {
              color: "#00ca95",
            },
          },

          itemStyle: {
            color: "#00ca95",
            borderColor: "#fff",
            borderWidth: 3,
            shadowColor: "rgba(0, 0, 0, .3)",
            shadowBlur: 0,
            shadowOffsetY: 2,
            shadowOffsetX: 2,
          },
          tooltip: {
            show: true,
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(0,202,149,0.3)",
                  },
                  {
                    offset: 1,
                    color: "rgba(0,202,149,0)",
                  },
                ],
                false
              ),
              shadowColor: "rgba(0,202,149, 0.9)",
              shadowBlur: 20,
            },
          },
          data: (data?.length ? data : defaultValue).map((item) => item.person_db_total),
        },
        {
          name: "人脸库数",
          type: "line",
          smooth: true, //是否平滑
          showAllSymbol: true,
          // symbol: 'image://./static/images/guang-circle.png',
          symbol: "circle",
          symbolSize: 15,
          lineStyle: {
            normal: {
              color: "#ae77ca",
              shadowColor: "rgba(0, 0, 0, .3)",
              shadowBlur: 0,
              shadowOffsetY: 5,
              shadowOffsetX: 5,
            },
          },
          label: {
            show: false,
            position: "top",
            textStyle: {
              color: "#ae77ca",
            },
          },

          itemStyle: {
            color: "#ae77ca",
            borderColor: "#fff",
            borderWidth: 3,
            shadowColor: "rgba(0, 0, 0, .3)",
            shadowBlur: 0,
            shadowOffsetY: 2,
            shadowOffsetX: 2,
          },
          tooltip: {
            show: true,
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(0,202,149,0.3)",
                  },
                  {
                    offset: 1,
                    color: "rgba(0,202,149,0)",
                  },
                ],
                false
              ),
              shadowColor: "rgba(0,202,149, 0.9)",
              shadowBlur: 20,
            },
          },
          data: (data?.length ? data : defaultValue).map((item) => item.face_db_total),
        },
      ],
    };
  };

  return <ReactEcharts option={getOptionMap()} style={styles} />;
};

export default BarNegative;
