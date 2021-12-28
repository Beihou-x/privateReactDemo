import React, { useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";
import graph from "@/assets/mapjson/relational-graph1.json";

const RelationalGraph = ({ styles = {} }) => {
  useEffect(() => {}, []);

  const getOptionMap = () => {
    // (graph as any).nodes.forEach(function (node) {
    //     node.label = {
    //         show: node.symbolSize > 30
    //     };
    // });

    return {
      title: {},
      tooltip: {
        trigger: "item",
        triggerOn: "mousemove",
      },
      grid: {
        left: "3%",
        right: "3%",
        bottom: "6%",
        // containLabel: true
      },
      animation: false,
      series: [
        {
          type: "sankey",
          emphasis: {
            focus: "adjacency",
          },
          nodeAlign: "right",
          data: graph.nodes,
          links: graph.links,
          lineStyle: {
            color: "source",
            curveness: 0.5,
          },
        },
      ],
    };
  };

  return (
    <div>
      <ReactEcharts option={getOptionMap()} style={styles} />
    </div>
  );
};

export default RelationalGraph;
