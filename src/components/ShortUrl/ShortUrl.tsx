import classes from "./ShortUrl.module.css";
import { Input, Form, Button } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { shortUrl } from "../common/requests";

const { TextArea } = Input;

interface IFieldType {
  longUrl: string;
}

function ShortUrl() {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const onFinish = ({ longUrl }: { longUrl: string }) => {
    shortUrl(longUrl).then(() => {
      queryClient.invalidateQueries({ queryKey: ["urls"] });
      form.resetFields();
    });
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    form.submit();
  };

  return (
    <Form
      className={classes.wrapper}
      layout="vertical"
      autoComplete="off"
      onFinish={onFinish}
      initialValues={{ longUrl: "" }}
      form={form}
    >
      <Form.Item<IFieldType>
        name="longUrl"
        validateDebounce={300}
        rules={[
          { required: true, message: "Please input your URL" },
          { type: "url", message: "Please enter a valid URL" },
        ]}
      >
        <TextArea
          rows={5}
          style={{ resize: "none" }}
          placeholder="Enter URL to short it"
          allowClear
          onPressEnter={handlePressEnter}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block size="large">
          Get short URL!
        </Button>
      </Form.Item>
    </Form>
  );
}

export default ShortUrl;
