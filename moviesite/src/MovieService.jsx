import axios from "react"
const API_KEY = "ceb13aa8";
const BASE_URL = "https://www.omdbapi.com/";
const getMovieDetails = async(imdbID)=>{
    try{
        const response = await axios.get(BASE_URL, {
            params:{
                api_key:API_KEY,
                i:imdbID,
                plot: "full"
            }
        });
        return response.data;
    }
    catch(error){
        console.error("error in getMovieDetail service:", error);
        throw(error);
        }
};
export default getMovieDetails;