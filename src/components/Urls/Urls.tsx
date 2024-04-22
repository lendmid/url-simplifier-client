import { useMemo, useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import { Table, Tooltip, notification } from "antd";
import classes from "./Urls.module.css";

interface IUrl {
  id: string;
  longUrl: string;
  shortUrl: string;
  hash: string;
}
const columns = [
  {
    title: "Index",
    render: ( _: unknown, _2: unknown, index: any) => index + 1,
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
        <a href={text}>{text}</a>
      </Tooltip>
    ),
    ellipsis: true,
  },
  {
    title: "Long URL",
    dataIndex: "longUrl",
    render: (text: string) => (
      <Tooltip placement="topLeft" title={text}>
        <a href={text}>{text}</a>
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

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

function Urls() {
  const [api, contextHolder] = notification.useNotification();
  const { data, error, isLoading } = useSWR("/urls", fetcher);

  const dataWithKeys = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return data?.map((url: IUrl) => ({ ...url, key: url.id }));
  }, [data]);

  useEffect(() => {
    if (!error) return;
    api.error({
      message: "Something goes wrong",
      description: `Error during request last urls. ${error?.response?.data?.message}`,
    });
  }, [api, error]);

  return (
    <>
      {contextHolder}
      <div className={classes.wrapper}>
        <span>Last 5 shorted URLs:</span>
        <Table
          dataSource={dataWithKeys}
          columns={columns}
          pagination={false}
          loading={isLoading}
        />
      </div>
    </>
  );
}

export default Urls;
