import axios from "axios";
import { useEffect, useState } from "react";

const ShowData = ({ authToken }) => {
  const [data, setData] = useState([]);

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
        console.log(`Error while fetching the response: ${err}`);
      }
    }
    fetchData();
  }, [authToken]);

  return (
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
  );
};

export default ShowData;
