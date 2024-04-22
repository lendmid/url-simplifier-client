import { useState } from "react";
import classes from "./ShortUrl.module.css";
import axios from "axios";
import { Input, Button, notification } from "antd";
import { useSWRConfig } from "swr";

const { TextArea } = Input;

interface AxiosError {
  response: {
    data: {
      message: string;
    };
  };
}

function ShortUrl() {
  const { mutate } = useSWRConfig()

  const [api, contextHolder] = notification.useNotification();
  const [url, setUrl] = useState<string>("");

  const handleShortUrl = () => {
    console.log(url);
    axios({ method: "post", url: "/urls", data: { longUrl: url } })
      .then((res) => {
        api.success({
          message: "The request was resolved successfully!",
          description: <span>The short url is: <b>{res.data}</b> was copied to your clipboard</span>,
          duration: 15
        });
        navigator.clipboard.writeText(res.data)
        mutate("/urls")
      })
      .catch(({ response }: AxiosError) => {
        api.error({
          message: "Something goes wrong",
          description: `Error during request last urls: ${response?.data?.message}`,
        });
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    setUrl(value.trim());
  };

  return (
    <>
      {contextHolder}
      <div className={classes.wrapper}>
        <TextArea
          rows={4}
          placeholder="Enter url to short it"
          onChange={handleChange}
        />
        <Button type="primary" onClick={handleShortUrl}>
          Short url!
        </Button>
      </div>
    </>
  );
}

export default ShortUrl;
