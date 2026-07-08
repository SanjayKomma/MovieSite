import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { getMovieDetails, getTrailer } from "./MovieService";
export const MovieDetailsPage = () => {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState(null);
    const [trailerKey, setTrailerKey] = useState(null);
    const Image_Base_Url = "https://image.tmdb.org/t/p/w500";
    useEffect(()=>{
        const loadPageDetails = async()=>{
            setLoading(true);
            const [fetchedMovieData, fetchedTrailerKey] = await Promise.all([
                getMovieDetails(id),
                getTrailer(id)
            ]);
            console.log(fetchedTrailerKey);
            setMovie(fetchedMovieData);
            setTrailerKey(fetchedTrailerKey);
            setLoading(false);
        };
        loadPageDetails();
    },[id]);
    if(loading) return <h3>Loading movie details</h3>
    if(!movie) return <h3>unable to fetch movie details</h3>
  return (
    <div className="pt-10 max-w-auto mx-40">
        <div className="flex flex-row pb-4">
            <div className="flex flex-col justify-start">
                <h1 className="font-bold text-2xl text-white">{movie.title}</h1>
                <p className="font-semibold text-white">{movie.release_date?.substring(0,4)} . RunTime : {movie.runtime} minutes</p>
            </div>
            <div className="flex flex-row gap-5 justify-end flex-1 font-semibold text-center">
                <div>
                    <h1 className="text-white">IMDb Rating</h1>
                    <h1 className="text-white">{movie.vote_average}</h1>
                </div>
                <div>
                    <h1 className="text-white">Your Rating</h1>
                    <h1 className="text-white"></h1>
                </div>
                <div >
                    <h1 className="text-white">Popularity</h1>
                    <h1 className="text-white">{movie.popularity.toFixed(0)}</h1>
                </div>
            </div>
        </div>
        <div className="flex flex-row gap-2 pb-3">
            <img src={movie.poster_path ? `${Image_Base_Url}${movie.poster_path}`: "No Poster"} alt={movie.title}
            className="flex rounded-xl max-h-[400px] object-cover"
            />
            {trailerKey ? (
                <iframe src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`} frameBorder={"0"}
                allow="autoplay ; encrypted-media"
                allowFullScreen
                className="w-full flex flex-1 h-[400px] rounded-xl mx-auto"
                />
            ) : (
                <div></div>
            )}
        </div>
        <div>
            <p className="text-white">{movie.overview}</p>
        </div>
    </div>
  )
}