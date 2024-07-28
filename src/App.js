import ShowData from "./ShowData/showData";
import Login from "./Login/login";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Auth/Auth";
import SignUp from "./SignUp/signUp";
const App = () => {
  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("authToken")
  );
  useEffect(() => {
    if (authToken) {
      localStorage.setItem("authToken", authToken);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [authToken]);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthProvider>
              <Login setAuthToken={setAuthToken} />
            </AuthProvider>
          }
        />
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route
          path="/auth/login"
          element={<Login setAuthToken={setAuthToken} />}
        />
        <Route path="/api" element={<ShowData authToken={authToken} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
