import axios from "axios";

export const fetchMeals = async (searchTerm)=>{
    try{
        const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
        if(res.status>= 200 && res.status <300){
            console.log(res.data.meals)
        return res.data.meals;
        }else{

            console.error(res.status)
            throw new Error(`This is an HTTP error: The status is ${res.status}`);
        }

    }catch (error){
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("Server Error:", error.response.data);
            console.log("Status Code:", error.response.status);
            console.log("Headers:", error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.log("No response received:", error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error:", error.message);
        }
        throw error;

    }
}