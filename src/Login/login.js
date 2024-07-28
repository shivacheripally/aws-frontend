import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export const Input = styled.input`
  type: ${(props) => props.type};
  placeholder: ${(props) => props.placeholder};
  height: 30px;
  width: 300px;
  border-radius: 10px;
  margin-right: 10px;
  text-align: center;
`;

const Login = ({ setAuthToken }) => {
  const inputFields = [
    {
      name: "email",
      value: "email",
      type: "email",
    },
    {
      name: "password",
      value: "password",
      type: "string",
    },
    {
      value: "submit",
      type: "submit",
    },
  ];
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/auth?email=${formValues?.email}&password=${formValues?.password}`
      );
      const token = response.data.token;
      setAuthToken(token);
      navigate("/api", { replace: true });
    } catch (err) {
      alert(err.response.data.message);
      console.log("Error while loging in ", err.response.data.message);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <>
      {inputFields.map((field, index) => (
        <Input
          key={index}
          type={field.type}
          name={field.name}
          placeholder={field.name}
          value={field.type === "submit" ? field.name : formValues[field.name]}
          onChange={field.type !== "submit" ? handleChange : undefined}
          onClick={field.type === "submit" ? handleSubmit : undefined}
        />
      ))}
    </>
  );
};

export default Login;
