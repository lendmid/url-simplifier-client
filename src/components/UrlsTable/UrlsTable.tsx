import { useMemo } from "react";
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
    title: "Row №",
    render: (_: unknown, _2: unknown, index: number) => index + 1,
    width: "100px",
  },
  {
    title: "URL id",
    dataIndex: "id",
    width: "80px",
  },
  {
    title: "Short URL",
    dataIndex: "shortUrl",
    width: "200px",
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
    ellipsis: true,
    render: (text: string) => (
      <Tooltip
        placement="topLeft"
        title={text}
        overlayStyle={{ maxWidth: "600px" }}
      >
        <a rel="noopener noreferrer" target="_blank" href={text}>
          {text}
        </a>
      </Tooltip>
    ),
  },
  {
    title: "URL Visited",
    dataIndex: "visited",
    width: "120px",
  },
];

function Urls() {
  const {
    pagination,
    dataSize,
    setDataSize,
    setPagination,
    firstRowNumber,
    lastRowNumber,
  } = usePagination();

  const { data, isLoading } = useQuery({
    queryKey: ["urls", pagination],
    queryFn: async () => {
      const data = await getUrls(pagination);
      if (!data) return;
      const { pagination: resPagination, urls } = data;
      setDataSize({ total: resPagination?.total, portion: urls?.length || 0 });
      return data;
    },
  });

  const dataWithKeys = useMemo(() => {
    return Array.isArray(data?.urls)
      ? data.urls.map((url: IUrl) => ({ ...url, key: url.id }))
      : [];
  }, [data?.urls]);

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
        <Table
          dataSource={dataWithKeys}
          columns={columns}
          pagination={{
            total: dataSize.total,
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
