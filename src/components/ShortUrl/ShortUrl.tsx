import classes from "./ShortUrl.module.css";
import { Input, Form, Button, InputRef } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { memo, useEffect, useRef } from "react";
import { getShortUrl } from "../../supabase/requests";
const { TextArea } = Input;

interface IFieldType {
  longUrl: string;
}

const ShortUrl = memo(() => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    const handleVisibilityChange = () => {
      inputRef.current?.focus();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    handleVisibilityChange();
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const onFinish = ({ longUrl }: { longUrl: string }) => {
    getShortUrl(longUrl).then(() => {
      queryClient.invalidateQueries({ queryKey: ["urls"] });
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
        normalize={(value) => value.trim()}
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
          ref={inputRef}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block size="large">
          Get short URL!
        </Button>
      </Form.Item>
    </Form>
  );
})

export default ShortUrl;
