import { useState } from "react";
import { Input } from "../Login/login"
import axios from "axios";

const AddData = () => {
    const [year, setYear] = useState("");
    const [gdp, setGdp] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api`, {year ,gdp})
            alert(response.data.message);
        }catch(err){
            console.log(`Error while adding data: ${err}`)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <Input onChange={(e) => setYear(e.target.value)} type="number" placeholder="Enter Year" name="year" />
            <Input onChange={(e) => setGdp(e.target.value)} type="number" placeholder="Enter GDP" name="gdp" />
            <Input type="submit" />
        </form>
    )
}

export default AddData;