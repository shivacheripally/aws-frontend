import { useState } from "react";
import { Input } from "../Login/login";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth`,
        {
          email,
          password,
        }
      );
      alert(response.data);
    } catch (err) {
      if (err.response.status === 400) {
        alert(err.response.data.message);
        navigate("/auth/login", { replace: true });
      }
      console.log(`Error while sign-up: ${err.response.status} `);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Input
        onChange={(e) => setEmail(e.target.value)}
        type={"text"}
        name="email"
        placeholder="Enter email: "
      />
      <Input
        onChange={(e) => setPassword(e.target.value)}
        type={"password"}
        name="password"
        placeholder="Enter password: "
      />
      <Input type={"submit"} placeholder="Sign-up"/>
    </form>
  );
};

export default SignUp;
