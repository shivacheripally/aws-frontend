import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("dockstream-token");
  localStorage.removeItem("dokstream-forget-password");
  
  if (token) {
    const tokenPayload = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    if (tokenPayload?.exp && tokenPayload.exp > currentTime) {
      return <Navigate to="/api" replace />;
    }
  }

  return children;
};