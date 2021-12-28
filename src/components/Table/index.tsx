import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useContext,
} from "react";
import { Table, Card, notification } from "antd";
import { DefaultPubSubContext } from "@components/PubSubscribe";
import styles from "./index.less";

type StandardTableProps = {
  rowKey?: string;
  columns: Array<any>;
  services?: (params: {
    offset?: number;
    limit?: number;
    total?: number;
  }) => any;
  rowSelection?: object | any;
  subscribeName?: string;
  tableProps?: object;
  size?: any;
  tempData?: any;
  getTotal?: (val?: any) => any;
  getTableData?: (val?: any) => any;
  summary?: (val?: any) => any;
};

const StandardTable: React.ForwardRefRenderFunction<
  HTMLDivElement,
  StandardTableProps
> = (
  {
    rowKey = "id",
    columns = [],
    services,
    rowSelection,
    subscribeName = "",
    tableProps = {},
    size,
    tempData,
    getTotal,
    getTableData,
    summary
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
    const { subscribe, unsubscribe }: any = useContext(DefaultPubSubContext);

    useEffect(() => {
      subscribe(subscribeName ? subscribeName : "table:search", setFormVals);
      subscribe("table:delete", handleSearch);
      return () => {
        unsubscribe(subscribeName ? subscribeName : "table:search", setFormVals);
        unsubscribe("table:delete", handleSearch);
      };
    }, []);

    useEffect(() => {
      handleSearch();
    }, [pagination.current, pagination.pageSize]);
    useEffect(() => {
      // console.log(formVals, 'formVals')
      if (!formVals || (formVals && Object.keys(formVals).length)) {
        handleSearch({
          limit: 10,
          offset: 0,
        });
      }
    }, [formVals]);

    //表格渲染查询接口
    const handleSearch = async (params: any = {}) => {
      try {
        setLoading(true);
        if (services) {
          const response = await services({
            offset: params.limit
              ? params.offset
              : (pagination.current &&
                pagination.pageSize &&
                (pagination.current - 1) * pagination.pageSize) ||
              0,
            limit: params.limit ? params.limit : pagination.pageSize || 10,
            ...formVals,
            ...params,
          });
          setData((response && response.items) || []);
          // 父组件传函数过来保存表格数据
          getTableData && getTableData((response && response.items) || [])
          setPagination({
            ...pagination,
            total: (response && response.total) || 0,
            current: params.limit ? 1 : pagination.current,
          });
          if (getTotal) {
            getTotal((response && response.total) || 0)
          }
          setLoading(false);
        } else {
          if (tempData) {
            setData(tempData);
          }
        }
      } catch (e: any) {
        notification.error(e);
        setLoading(false);
      }
    };

    useImperativeHandle<any, any>(ref, () => ({
      handleSearch,
    }));

    //表格查询
    const handleTableChange = (tablePagination) => {
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
      <div className={styles.tablebox}>
        <Table
          size={size}
          loading={loading}
          columns={columns}
          dataSource={data}
          bordered
          summary={summary}
          pagination={{ ...pagination, showTotal: (total) => `共 ${total} 条` }}
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
      </div>
    );
  };

export default forwardRef(StandardTable);
