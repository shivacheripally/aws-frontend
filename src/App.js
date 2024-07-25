import ShowData from "./ShowData/showData";
import Login from "./Login/login";
import { useEffect, useState } from "react";
const App = () => {
    const [authToken, setAuthToken] = useState(() => localStorage.getItem("authToken"));
  useEffect(() => {
    if (authToken) {
      localStorage.setItem("authToken", authToken);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [authToken]);
  return authToken ? <ShowData authToken={authToken} /> : <Login authToken={authToken} setAuthToken={setAuthToken} />;
};

export default App;
