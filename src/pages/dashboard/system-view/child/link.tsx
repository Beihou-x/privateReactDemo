import React, { useEffect, useState, useRef } from "react";
import ReactEcharts from "echarts-for-react";
import linkbg from "@/assets/dashboard/system-link-bg.png";
import { access_cloud_middle_link } from "@/services/access_cloud";

type nodeTypeProps = {
  hotel_data_total: number;
  person_eng_total: number;
  security_db_total: number;
  person_db_total: number;
  zr_db_total: number;
  zr_interface_total: number;
  access_cloud_total: number;
  rec_total: number;
  face_db_total: number;
  eng_total: number;
};

type LinkProps = {
  styles?: object;
  // data?: Array<nodeTypeProps>;
  data?: any;
};

const Link: React.FC<LinkProps> = ({ styles = {}, data }) => {
  const getOptionMap = () => {
    let info: Partial<nodeTypeProps> = data;
    const [linkData, setLinkData]: any = useState({});
    useEffect(() => {
      access_cloud_middle_link().then((res) => {
        setLinkData(res.middleTotal);
      });
    }, []);

    const getRank = (value) => {
      return value && value !== "-"
        ? `${Number((Number(value) * 100).toFixed(2))}`
        : "0";
    };

    var nodes: any = [
      {
        x: 10,
        y: 1000,
        name: "人卡图片合格率",
        value: getRank(linkData.face_picture_qualified),
        svgPath: linkbg,
        symbolSize: [130, 68],
      },
      {
        x: 990,
        y: 1000,
        name: "超卡图片合格率",
        value: getRank(linkData.super_picture_qualified),
        svgPath: linkbg,
        symbolSize: [130, 68],
      },
      {
        x: 350,
        y: 500,
        name: "人像卡口",
        svgPath: linkbg,
        symbolSize: [130, 68],
      },
      {
        x: 650,
        y: 500,
        name: "超级卡口",
        svgPath: linkbg,
        symbolSize: [130, 68],
      },
      {
        x: 990,
        y: 30,
        name: "超卡大图可用率",
        value: getRank(linkData.super_big_picture_available),
        svgPath: linkbg,
        symbolSize: [130, 68],
      },
      {
        x: 10,
        y: 30,
        name: "人卡大图可用率",
        value: getRank(linkData.face_big_picture_available),
        svgPath: linkbg,
        symbolSize: [130, 68],
      },
    ];
    var charts: any = {
      nodes: [],
      linesData: [
        {
          // 副驾
          coords: [
            [10, 870],
            [10, 550],
            [250, 550],
          ],
        },
        {
          coords: [
            [10, 160],
            [10, 450],
            [250, 450],
          ],
        },
        {
          coords: [
            [990, 870],
            [990, 550],
            [750, 550],
          ],
        },
        {
          coords: [
            [990, 160],
            [990, 450],
            [750, 450],
          ],
        },
      ],
    };

    nodes.map((item) => {
      const { x, y, name, svgPath, symbolSize, value } = item;
      var node: any = {
        name,
        // value: [x, y],
        value: [x, y, value],
        // fixed: true,
        symbolSize: symbolSize || 50,
        symbol: "image://" + svgPath,
        // symbol: "roundRect",
        // symbolOffset: [0,'50%'],
        itemStyle: {
          opacity: 0.2,
        },
      };
      charts.nodes.push(node);
    });

    return {
      xAxis: {
        show: false,
        type: "value",
      },
      yAxis: {
        show: false,
        type: "value",
      },
      series: [
        {
          type: "graph",
          coordinateSystem: "cartesian2d",
          label: {
            show: true,
            // position: "bottom",
            color: "#1990FF",
            fontSize: 16,
            textAlign: 'center',
            formatter: function (item) {
              // return `${item.data.nodeName}`;
              return `  ${item.data.name} \n \n ${
                typeof item.data.value[2] == "undefined"
                  ? "暂无数据"
                  : item.data.value[2] + "%"
              }`;
            },
          },
          data: charts.nodes,
        },
        {
          type: "lines",
          polyline: true,
          coordinateSystem: "cartesian2d",
          lineStyle: {
            type: "dashed",
            width: 2,
            color: "#379EFD",
            curveness: 0.3,
          },
          effect: {
            show: true,
            trailLength: 0.1,
            symbol: "arrow",
            color: "#379EFD",
            symbolSize: 8,
          },
          data: charts.linesData,
        },
      ],
    };
  };

  const handleClick = (e) => {
    // if (e.componentSubType === "graph") {
    //   onChange(e.data.nodeName);
    // }
  };

  return (
    <ReactEcharts
      option={getOptionMap()}
      style={{ width: "100%", height: "100%" }}
      onEvents={{
        click: handleClick,
      }}
    />
  );
};

export default Link;
