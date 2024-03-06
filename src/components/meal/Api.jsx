import axios from "axios";

export const fetchMeals = async (searchTerm)=>{
    try{
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
        if(response.status<= 200 && response.status <300){
        return response.data.fetchMeals;
        }else{

            throw new Error(`This is an HTTP error: The status is ${response.status}`);
        }

    }catch (error){

    }
}