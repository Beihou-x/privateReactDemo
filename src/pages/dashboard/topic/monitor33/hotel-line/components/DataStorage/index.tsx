import React from "react";
import Charts from "@components/Charts/Charts";
import moment from "moment";

type DataStorageProps = {
  data?: Array<{
    person_db_total: number;
    created_at: number;
  }>;
};

const DataStorage: React.FC<DataStorageProps> = ({ data = [] }) => {
    const defaultData = [
        {
            person_db_total: 600,
            created_at: 1621987200
        },
        {
            person_db_total: 310,
            created_at: 1622073600
        },
        {
            person_db_total: 621,
            created_at: 1622160000
        },
        {
            person_db_total: 510,
            created_at: 1622246400
        },
        {
            person_db_total: 750,
            created_at: 1622332800
        }
    ]
  const getOptionMap = () => {
    return {
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        top: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: (data?.length? data : defaultData).map(
          (item) =>
            item &&
            item.created_at &&
            moment(item.created_at * 1000).format("YYYY-MM-DD")
        ),
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: (data?.length? data : defaultData).map((item) => item.person_db_total),
          type: "bar",
        },
      ],
    };
  };

  return <Charts options={getOptionMap()} />;
};

export default DataStorage;
