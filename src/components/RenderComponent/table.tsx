import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useContext,
} from "react";
import { Table, Card, notification } from "antd";
import { DefaultPubSubContext } from "@components/PubSubscribe";
import { action } from "@/utils/request";

type StandardTableProps = {
  rowKey?: string;
  columns: Array<any>;
  api: string;
  rowSelection?: object | any;
  subscribeName?: string;
  tableProps?: object;
};

const StandardTable: React.ForwardRefRenderFunction<
  HTMLDivElement,
  StandardTableProps
> = (
  {
    rowKey = "id",
    columns = [],
    api,
    rowSelection,
    subscribeName = "",
    tableProps = {},
  },
  ref
) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    pageSize: 10,
    pageNumber: 1,
    showSizeChanger: true,
    showQuickJumper: true,
    current: 1,
  });
  const [formVals, setFormVals] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { subscribe, unsubscribe } = useContext(DefaultPubSubContext);

  useEffect(() => {
    subscribe("table:search", setFormVals);
    subscribe("table:delete", handleSearch);
    return () => {
      unsubscribe("table:search", setFormVals);
      unsubscribe("table:delete", handleSearch);
    };
  }, []);

  useEffect(() => {
    handleSearch();
  }, [pagination.current, pagination.pageSize, formVals]);

  //表格渲染查询接口
  const handleSearch = async (params = {}) => {
    
    try {
      setLoading(true);
      const response = await action(api, {
        method: "POST",
        body: {
          offset:
            (pagination.current &&
              pagination.pageSize &&
              (pagination.current - 1) * pagination.pageSize) ||
            0,
          limit: pagination.pageSize || 10,
          ...formVals,
        },
      });

      setData((response && response.items) || []);
      setPagination({
        ...pagination,
        total: (response && response.total) || 0,
      });
      setLoading(false);
    } catch (e:any) {
      notification.error(e);
      setLoading(false);
    }
  };

  useImperativeHandle<any, any>(ref, () => ({
    handleSearch,
  }));

  //表格查询
  const handleTableChange = tablePagination => {
    setPagination({
      ...pagination,
      ...tablePagination,
    });
  };

  //表格checkbox选中
  const handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  return (
    <>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={pagination}
        onChange={handleTableChange}
        rowKey={rowKey}
        rowSelection={
          rowSelection !== undefined
            ? rowSelection
            : {
                selectedRowKeys: selectedRowKeys,
                onChange: handleRowSelectChange,
              }
        }
        {...tableProps}
      />
    </>
  );
};

export default forwardRef(StandardTable);
