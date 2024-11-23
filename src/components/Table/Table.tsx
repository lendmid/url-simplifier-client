import { Table as AntTable, TablePaginationConfig } from "antd";
import classes from "./Table.module.css";
import { useQuery } from "@tanstack/react-query";
import { IUrl } from "../common/types";
import usePagination from "../common/usePagination";
import { useMemo } from "react";
import { getAllUrls } from "../../supabase/requests";
import { columns } from "./columns";

const tablePaginationConfig: TablePaginationConfig = {
  showSizeChanger: true,
  defaultPageSize: 5,
  pageSizeOptions: ["5", "10", "25"],
  position: ["bottomCenter"],
};

const Table = () => {
  const {
    pagination,
    dataSize,
    setDataSize,
    setPagination,
    firstRowNumber,
    lastRowNumber,
  } = usePagination();

  const { data: urls, isLoading } = useQuery({
    queryKey: ["urls", pagination],
    queryFn: async () => {
      const res = await getAllUrls(pagination);
      setDataSize({ total: res?.count || 0, portion: res.data?.length || 0 });
      return res.data;
    },
    refetchOnWindowFocus: true
  });

  const dataWithKeys = useMemo(() => {
    return Array.isArray(urls)
      ? urls.map((url: IUrl) => ({ ...url, key: url.id }))
      : [];
  }, [urls]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    const { current, pageSize } = pagination;
    if (!current || !pageSize) return;
    setPagination({ pageNumber: current - 1, pageSize });
  };

  return (
    <>
      <div className={classes.wrapper}>
        <span>
          List of
          <b>{` ${firstRowNumber} - ${lastRowNumber} `}</b>
          shorted URLs. Total: <b>{dataSize.total}</b>:
        </span>
        <AntTable
          dataSource={dataWithKeys}
          columns={columns}
          pagination={{
            total: dataSize.total,
            pageSize: pagination.pageSize,
            current: pagination.pageNumber + 1,
            ...tablePaginationConfig,
          }}
          scroll={{ x: 690 }}
          loading={isLoading}
          onChange={handleTableChange}
          sticky
        />
      </div>
    </>
  );
}

export default Table;
