import React, {
  useEffect,
  useState,
} from "react";
import { Card, Row, Col, DatePicker, Spin } from "antd";
import moment from "moment";
import Line from "@components/Charts/Line";
import styles from "./index.less";

const { RangePicker } = DatePicker;

type TotalGraphProps = {
  title: string;
  services: (start: string, end: string) => Promise<any>;
  deviceId?: string;
  timestamp?:number;
  dataType:number
};

type ActionComponentProps = {
  onChange: (type: string, date: string[]) => void;
};

const ActionComponent: React.FC<ActionComponentProps> = ({ onChange }) => {
  const [type, setType]: any = useState("day");
  const [date, setDate]: any = useState([]);

  const handleChose = (type, date) => {
    setType(type);

    switch (type) {
      case "day":
        setDate(date);
        onChange(
          type,
          date && date.length !== 0
            ? [
              date[0].startOf("day").format("YYYYMMDDHHmmss"),
              date[1].endOf("day").format("YYYYMMDDHHmmss"),
            ]
            : []
        );
        return;
      default:
        return;
    }
  };

  return (
    <Row align="middle">
      <Col span={18}>
        <RangePicker
          // value={date}
          defaultValue={[moment(new Date().getTime() - 7*24*60*60*1000),moment(new Date(), "YYYY-MM-DD")]}
          onChange={(values) => handleChose("day", values)}
        />
      </Col>
    </Row>
  );
};

const TotalGraph: React.FC<TotalGraphProps> = ({ title, services, deviceId = '',timestamp,dataType }) => {
  const [graph, setGraph]: any = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleSearch("day", [
      moment().subtract(6,'days').startOf("day").format("YYYYMMDDHHmmss"),
      moment().endOf("day").format("YYYYMMDDHHmmss"),
    ]);
  }, [timestamp]);

  const handleChange = (type, date) => {
    handleSearch(type, date);
  };

  const handleSearch = async (type, date: any[]) => {
    try {
      setLoading(true)
      const response = await services(date[0], date[1]);

      const faceBar:any[] = [];
      response.sort((a, b) => a.create_at - b.create_at).forEach(item => {
        const time = moment(item.create_at*1000).format('YYYY-MM-DD')
        const countsList = item.counts && item.counts.length>0 ? item.counts : [];
        const countsFace = countsList.find(n => n.type === dataType) ? countsList.find(n => n.type === dataType).upload : 0;
        faceBar.push(
          {
            y: countsFace,
            x: time
          }
        );
      });
      setGraph(faceBar);
      setLoading(false)
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Spin tip="Loading..." spinning={loading}>
      <Card title={title} extra={<ActionComponent onChange={handleChange} />}>
        <Line
          styles={{
            height: "30vh",
          }}
          options={{
            xAxis: {
              type: "category",
              data: graph.map((item) => item.x),
              splitLine: {
                show: false
              }
            },
            yAxis: {
              type: "value",
              splitLine: {
                show: false
              }
            },
            grid: {
              left: "10%",
              top: "10%",
            },
            series: [
              {
                data: graph.map(item => item.y),
                type: "line",
                smooth: true,
                label: {
                  show: true,
                  position: "top",
                  formatter: "{c}",
                  color: "#fff"
                }
              },
            ],
          }}
        />
      </Card>
    </Spin>
  );
};

export default TotalGraph;
