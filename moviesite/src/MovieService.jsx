import axios from "axios"
export const TMDB_BEARER_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOGNmYjRiZDZlMWNkMDg5MzYwNDEyOTgzYzE5Zjk1YSIsIm5iZiI6MTc4MzQ1MDIxMy42Mywic3ViIjoiNmE0ZDRhNjUyZjU1NmUxYzdiOTQ3NzU0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.w_bIdczJTsvSJ8GF0BAe4R8SnfGeg2poCS4V6F2jJ0A";
const BASE_URL = "https://api.themoviedb.org/3";
const axiosConfig = {
    headers:{
        accept: 'application/JSON',
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`
    }
}
export const getMovieDetails = async(movieId)=>{
    try{
        const response = await axios.get(`${BASE_URL}/movie/${movieId}`, axiosConfig);
        return response.data;
    }
    catch(error){
        console.log("error fetching API", error);
        return null;
    }
}
export const getTvShowDetails = async(tvShowId)=>{
    try{
        const response = await axios.get(`${BASE_URL}/tv/${tvShowId}`, axiosConfig);
        return response.data;
    }
    catch(error){
        console.log("Unable to fetch TV show details", error);
        return null;
    }
}
export const getTrendingMovies = async()=>{
    try{
        const response = await axios.get(`${BASE_URL}/trending/movie/day`, axiosConfig);
        return response.data.results;
    }
    catch(error){
        console.log("Error fetching API", error);
        return[];
    }
}
export const getTrendingTvShows = async()=>{
    try{
        const response = await axios.get(`${BASE_URL}/trending/tv/day`, axiosConfig);
        return response.data.results;
    }
    catch(error){
        console.log("Error fetching API", error);
        return[];
    }
}
export const getMovieTrailer = async(movieId)=>{
    try{
        const response = await axios.get(`${BASE_URL}/movie/${movieId}/videos`, axiosConfig);
        const video = response.data.results;
        const trailer = video.find(
            (vid)=>vid.site === "YouTube" && (vid.type === "Trailer" || vid.type === "Teaser"));
            return trailer ? trailer.key : null;
    }
    catch(error){
        console.log("Error fetching video", error);
    }
}
export const getTvShowTrailer = async(tvShowId)=>{
    try{
        const response = await axios.get(`${BASE_URL}/tv/${tvShowId}/videos`, axiosConfig);
        const video = response.data.results;
        const trailer = video.find(
            (vid)=>vid.site === "YouTube" && (vid.type === "Trailer" || vid.type === "Teaser"));
            return trailer ? trailer.key : null;
    }
    catch(error){
        console.log("Error fetching video", error);
    }
}
export const getMovieCredits = async(movieId)=>{
    try{
        const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, axiosConfig);
        return response.data;
    }
    catch(error){
        console.log("Unable to fetch cast details", error);
    }
}
export const getTrailerCredits = async(tvShowId)=>{
    try{
        const response = await axios.get(`${BASE_URL}/tv/${tvShowId}/credits`, axiosConfig);
        return response.data;
    }
    catch(error){
        console.log("Unable to fetch cast details", error);
    }
}