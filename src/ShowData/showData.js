import axios from "axios";
import { useEffect, useState } from "react";
import AddData from "../AddData/addData";
import { useNavigate } from "react-router-dom";
const ShowData = ({ authToken }) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        };
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api`,
          {
            headers,
          }
        );
        console.log("response ", response);
        setData(response.data.data);
      } catch (err) {
        if (err.response.status === 500) {
          navigate("/auth/login", { replace: true });
        }
        console.log(`Error while fetching the response: ${err}`);
      }
    }
    fetchData();
  }, [authToken, navigate]);

  return (
    <>
      <table border={3} align="center" width={"200px"}>
        <th>Year</th>
        <th>GDP</th>
        {data.map((val, index) => (
          <tr align="center" key={`${index}-${val.year}`}>
            <td>{val.year}</td>
            <td>{val.gdp}</td>
          </tr>
        ))}
      </table>
      <br />
      <br />
      <AddData />
    </>
  );
};

export default ShowData;
