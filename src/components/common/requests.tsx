import { notification } from "antd";
import qs from "qs";
import { IPagination, IUrl } from "./types";
import { AxiosError, axiosInstance } from "./axiosConfig";

// Layer to communicate with backend
interface IGetUrlsResponse {
  urls: IUrl[];
  pagination: { total: number } & IPagination;
}

export const getUrls = async (pagination: IPagination) => {
  const paginationQS = qs.stringify(pagination);
  const response = await axiosInstance
    .get<IGetUrlsResponse>(`/urls?${paginationQS}`)
    .catch((err: AxiosError) => {
      err.globalHandler("Error while request urls");
    });
  if (response) return response.data;
};

export const shortUrl = async (longUrl: string) => {
  const response = await axiosInstance
    .post("/urls", { longUrl })
    .catch((err: AxiosError) => {
      err.globalHandler("Error while create a new URL");
    });

  if (!response?.data.shortUrl) return;
  notification.success({
    message: "The URL was shorted successfully!",
    description: (
      <span>
        The short URL: <br />
        <b>{response.data.shortUrl}</b> <br />
        was copied to your clipboard and saved below
      </span>
    ),
    duration: 15,
  });
  navigator.clipboard.writeText(response.data.shortUrl);
};
