import React from "react";
import { Table } from "antd";

const List = (props) => {
  const { data = [], columns = [], rowKey, loading = false } = props;

  return (
    <Table
      rowKey={rowKey || "qy"}
      dataSource={data}
      columns={columns}
      scroll={{ y: 240 }}
      bordered
      size="small"
      pagination={false}
      loading={loading}
    />
  );
};

export default List;
