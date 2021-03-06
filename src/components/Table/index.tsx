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

    //????????????????????????
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
          // ??????????????????????????????????????????
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

    //????????????
    const handleTableChange = (tablePagination) => {
      setPagination({
        ...pagination,
        ...tablePagination,
      });
    };

    //??????checkbox??????
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
          pagination={{ ...pagination, showTotal: (total) => `??? ${total} ???` }}
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
