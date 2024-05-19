import classes from "./ShortUrl.module.css";
import { Input, Form, Button } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { shortUrl } from "../common/requests";

const { TextArea } = Input;

type FieldType = {
  longUrl: string;
};

function ShortUrl() {
  const queryClient = useQueryClient();

  const onFinish = ({ longUrl }: { longUrl: string }) => {
    shortUrl(longUrl).then(() => {
      queryClient.invalidateQueries({ queryKey: ["urls"] });
    });
  };

  return (
    <Form
      className={classes.wrapper}
      layout="vertical"
      autoComplete="off"
      onFinish={onFinish}
      initialValues={{ longUrl: "" }}
    >
      <Form.Item<FieldType>
        name="longUrl"
        validateDebounce={300}
        rules={[
          { required: true, message: "Please input your URL" },
          { type: "url", message: "Please enter a valid URL" },
        ]}
      >
        <TextArea rows={5} placeholder="Enter url to short it" allowClear />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block size="large">
          Get short url!
        </Button>
      </Form.Item>
    </Form>
  );
}

export default ShortUrl;
