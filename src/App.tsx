import { createContext, useMemo } from "react";
import axios from "axios";
import Urls from "./components/Urls/Urls";
import ShortUrl from "./components/ShortUrl/ShortUrl";

axios.defaults.baseURL = "http://localhost:3001"
const Context = createContext({ name: "Default" });

function App() {
  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);

  return (
    <Context.Provider value={contextValue}>
      <main>
        <h1>Url Simplifier</h1>
        <ShortUrl />
        <Urls />
      </main>
    </Context.Provider>
  );
}

export default App;
