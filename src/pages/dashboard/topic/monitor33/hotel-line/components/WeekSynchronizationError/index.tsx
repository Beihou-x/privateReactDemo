import React from "react";
import Charts from "@components/Charts/Charts";
import moment from "moment";

type WeekSynchronizationErrorProps = {
  data?: any;
};

const WeekSynchronizationError: React.FC<WeekSynchronizationErrorProps> = ({
  data,
}) => {
  let info = data && data.length !== 0 ? data[0] : {};

  const getOptionMap = () => {
    return {
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "5%",
        left: "center",
        textStyle: {
          color: "#CCC",
        },
      },
      color: ["#4DF6A2", "#4FD9FC", "#8CF6DA", "#4C9FFC"],
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          labelLine: {
            show: false,
          },
          data: [
            {
              value: (info && info.format_inconsistent_rate) || 50,
              name: "数据格式不正确",
            },
            {
              value: (info && info.response_exceed60_rate) || 60,
              name: "响应时间超过60s",
            },
            { value: (info && info.network_delay_rate) || 71, name: "网络延迟" },
            { value: (info && info.other_rate) || 35, name: "其他" },
          ],
        },
      ],
    };
  };

  return <Charts options={getOptionMap()} />;
};

export default WeekSynchronizationError;
