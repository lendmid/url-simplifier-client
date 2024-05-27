import UrlsTable from "./components/UrlsTable/UrlsTable";
import ShortUrl from "./components/ShortUrl/ShortUrl";
import { notification } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, RouteComponentProps } from "react-router-dom";

const { VITE_API_URL, PROD } = import.meta.env;

if (!PROD) console.log("import.meta.env: ", import.meta.env);
const API_URL = PROD ? "/api" : VITE_API_URL;

const queryClient = new QueryClient();

function App() {
  const [, contextHolder] = notification.useNotification();

  return (
    <QueryClientProvider client={queryClient}>
      {contextHolder}

      <Route exact path="/">
        <main>
          <h1>URL Simplifier</h1>
          <ShortUrl />
          <UrlsTable />
        </main>
      </Route>

      <Route
        exact
        path="/:hash"
        component={(routeProps: RouteComponentProps) => {
          window.location.href = API_URL + routeProps.match.url;
          return null;
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
