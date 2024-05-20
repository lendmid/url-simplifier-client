import { useMemo } from "react";
import { Table, Tooltip } from "antd";
import type { TablePaginationConfig } from "antd";

import classes from "./UrlsTable.module.css";
import { useQuery } from "@tanstack/react-query";
import { getUrls } from "../common/requests";
import { IUrl } from "../common/types";
import usePagination from "../common/usePagination";

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
    render: (text: string) => (
      <Tooltip placement="topLeft" title={text}>
        <a href={`//${text}`} target="_blank">
          {text}
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
        <a target="_blank" href={text}>
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
  const { pagination, setPagination } = usePagination();
  const { data, isLoading } = useQuery({
    queryKey: ["urls", pagination],
    queryFn: () => getUrls(pagination),
  });

  const dataWithKeys = useMemo(() => {
    return Array.isArray(data?.urls)
      ? data.urls.map((url: IUrl) => ({ ...url, key: url.id }))
      : [];
  }, [data?.urls]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
  };

  return (
    <>
      <div className={classes.wrapper}>
        <span>
          Last shorted <b>{data?.urls.length}</b> URLs of{" "}
          <b>{data?.pagination.total || 0}</b>:
        </span>
        <Table
          dataSource={dataWithKeys}
          columns={columns}
          pagination={{ ...pagination, ...data?.pagination }}
          loading={isLoading}
          onChange={handleTableChange}
        />
      </div>
    </>
  );
}

export default Urls;
