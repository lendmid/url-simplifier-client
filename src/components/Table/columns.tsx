import { Tooltip } from "antd";
import { IUrl } from "../common/types";
import { IVisit } from "./Table.types";

export const columns = [
  {
    title: "Row №",
    render: (_: unknown, _2: unknown, index: number) => index + 1,
    width: "7%",
  },
  {
    title: "URL id",
    dataIndex: "id",
    width: "7%",
  },
  {
    title: "Short URL",
    dataIndex: "shortUrl",
    width: "15%",
    render: (shortUrl: string, record: IUrl) => (
      <Tooltip placement="topLeft" title={shortUrl}>
        <a
          rel="noopener noreferrer"
          href={"/" + record.hash}
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
    width: "40%",
    dataIndex: "longUrl",
    ellipsis: true,
    render: (text: string) => (
      <Tooltip
        title={text}
        destroyTooltipOnHide
        placement={window.innerWidth >= 1000 ? "topLeft" : undefined}
        overlayStyle={{
          maxWidth:
            window.innerWidth >= 550 ? "600px" : `${window.innerWidth - 150}px`,
        }}
      >
        <a rel="noopener noreferrer" target="_blank" href={text}>
          {text}
        </a>
      </Tooltip>
    ),
  },
  {
    title: "URL Visited",
    dataIndex: "visits",
    width: "10%",
    render: (visits: IVisit[]) => visits.length,
  },
];
