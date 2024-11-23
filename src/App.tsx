import UrlsTable from "./components/Table/Table";
import ShortUrl from "./components/ShortUrl/ShortUrl";
import { notification } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route } from "react-router-dom";
import Redirect from "./components/Redirect/Redirect";

const queryClient = new QueryClient();

const App = () => {
  const contextHolder = notification.useNotification()[1];
  
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

      <Route exact path="/:longUrl"><Redirect /></Route>
      <Route path="/health"><h3>The App is Healthy</h3></Route>
    </QueryClientProvider>
  );
}

export default App;
