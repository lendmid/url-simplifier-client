import UrlsTable from "./components/UrlsTable/UrlsTable";
import ShortUrl from "./components/ShortUrl/ShortUrl";
import { notification } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

if (import.meta.env.MODE === "development")
  console.log("import.meta.env: ", import.meta.env);

const queryClient = new QueryClient();

function App() {
  const [, contextHolder] = notification.useNotification();

  return (
    <QueryClientProvider client={queryClient}>
      {contextHolder}
      <main>
        <h1>Url Simplifier</h1>
        <ShortUrl />
        <UrlsTable />
      </main>
    </QueryClientProvider>
  );
}

export default App;
