import { useEffect, useMemo } from "react";
import { Table, TablePaginationConfig, Tooltip } from "antd";

import classes from "./UrlsTable.module.css";
import { useQuery } from "@tanstack/react-query";
import { getUrls } from "../common/requests";
import { IUrl } from "../common/types";
import usePagination from "../common/usePagination";
import { axiosInstance } from "../common/axiosConfig";

const { baseURL } = axiosInstance.defaults;

const columns = [
  {
    title: "Index",
    render: (_: unknown, _2: unknown, index: number) => index + 1,
    width: "10%",
  },
  {
    title: "Id",
    dataIndex: "id",
    width: "10%",
  },
  {
    title: "Short URL",
    dataIndex: "shortUrl",
    render: (shortUrl: string, record: IUrl) => (
      <Tooltip placement="topLeft" title={shortUrl}>
        <a
          rel="noopener noreferrer"
          href={baseURL + "/" + record.hash}
          target="_blank"
        >
          {shortUrl}
        </a>
      </Tooltip>
    ),
    ellipsis: true,
  },
  {
    title: "Long URL",
    dataIndex: "longUrl",
    render: (text: string) => (
      <Tooltip placement="topLeft" title={text}>
        <a rel="noopener noreferrer" target="_blank" href={text}>
          {text}
        </a>
      </Tooltip>
    ),
    ellipsis: true,
  },
  {
    title: "Visited",
    dataIndex: "visited",
    width: "10%",
  },
];

function Urls() {
  const { pagination, setPagination, firstRowNumber } = usePagination();
  const { data, isLoading } = useQuery({
    queryKey: ["urls", pagination],
    queryFn: () => getUrls(pagination),
  });

  useEffect(() => {
    if (!data?.pagination) return;
    setPagination((prevPagination) => ({
      ...prevPagination,
      total: data.pagination.total,
    }));
  }, [data, setPagination]);

  const dataWithKeys = useMemo(() => {
    return Array.isArray(data?.urls)
      ? data.urls.map((url: IUrl) => ({ ...url, key: url.id }))
      : [];
  }, [data?.urls]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    const { current, pageSize, total } = pagination;
    if (!current || !pageSize || !total) return;
    setPagination({ pageNumber: current - 1, pageSize, total });
  };

  const lastRowNumber = useMemo(() => {
    if (pagination.total === 0) return 0;
    return (
      firstRowNumber + Math.min(data?.urls.length || 0, pagination.total) - 1
    );
  }, [data?.urls.length, firstRowNumber, pagination.total]);

  return (
    <>
      <div className={classes.wrapper}>
        <span>
          List of
          <b>{` ${firstRowNumber} - ${lastRowNumber} `}</b>
          shorted URLs. Total: <b>{pagination.total}</b>:
        </span>
        <Table
          dataSource={dataWithKeys}
          columns={columns}
          pagination={{
            total: pagination.total,
            pageSize: pagination.pageSize,
            current: pagination.pageNumber + 1,
            showSizeChanger: true,
            defaultPageSize: 5,
            pageSizeOptions: ["5", "10", "25"],
            position: ["bottomCenter"],
          }}
          loading={isLoading}
          onChange={handleTableChange}
        />
      </div>
    </>
  );
}

export default Urls;
