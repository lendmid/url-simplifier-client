import { TablePaginationConfig, notification } from "antd";
import qs from "qs";
import { IPagination, IUrl } from "./types";
import { AxiosError, axiosInstance } from "./axiosConfig";

// keep business logic separately from UI
// Later could be migration to common store solutions like RTK/MobX
interface IGetUrlsResponse {
  urls: IUrl[];
  pagination: IPagination;
}

export const getUrls = async (pagination: TablePaginationConfig) => {
  const { current, pageSize } = pagination;
  const paginationQS = qs.stringify({ current, pageSize });
  const response = await axiosInstance
    .get<IGetUrlsResponse>(`/urls?${paginationQS}`)
    .catch((err: AxiosError) => {
      err.globalHandler("Error while request urls");
      throw new Error();
    });
  return response.data;
};

export const shortUrl = async (longUrl: string) => {
  const { data } = await axiosInstance
    .post("/urls", { longUrl })
    .catch((err: AxiosError) => {
      err.globalHandler("Error while create new URL");
      throw new Error();
    });

  if (!data.shortUrl) return;
  notification.success({
    message: "The URL was shorted successfully!",
    description: (
      <span>
        The short URL: <br />
        <b>{data.shortUrl}</b> <br />
        was copied to your clipboard and saved below
      </span>
    ),
    duration: 15,
  });
  navigator.clipboard.writeText(data.shortUrl);
};
