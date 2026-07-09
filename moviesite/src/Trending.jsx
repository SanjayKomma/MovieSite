import { useEffect, useState } from "react"
import { getTrendingMovies, getTrendingTvShows } from "./MovieService"
import { Link } from "react-router"
export const Trending = () => {
    const [movies, setMovies] = useState([]);
    const [tvShows, setTvShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const Image_Base_Url = "https://image.tmdb.org/t/p/w500";
    useEffect(()=>{
        const trending = async()=>{
            setLoading(true);
            const [movieData, tvData] = await Promise.all([
                getTrendingMovies(),
                getTrendingTvShows()
            ]);
            setMovies(movieData);
            setTvShows(tvData);
            setLoading(false);
        }
        trending();
    },[])
    if(loading){
        return <h2>Loading Page....</h2>
    }
    return (
        <div className="min-h-screen bg-gray-950 mx-20">
            <div className="pt-3 px-4">
                <h2 className="font-bold text-white text-xl">Top Movie Picks Today</h2>
                <div className="w-full overflow-x-auto whitespace-nowrap py-4">
                    <div className="flex flex-row gap-4">
                        {movies.map((movie)=>(
                            <div key={movie.id} className="w-50 flex-shrink-0 flex flex-col bg-gray-900 rounded-xl overflow-hidden">
                                <Link to={`/movie/${movie.id}`}>
                                <img className="w-full h-72 object-cover" src={movie.poster_path ? `${Image_Base_Url}${movie.poster_path}`: "No Poster"} alt={movie.title}/>
                                 <div className="p-2">
                                    <h3 className="font-bold text-white text-sm">{movie.title}</h3>
                                    <span className="font-bold text-white text-xs">{movie.release_date ? movie.release_date.substring(0,4):"N/A"}</span>
                                </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="pt-3 px-4">
                <h2 className="font-bold text-white text-xl">Top TV Shows today</h2>
                <div className="w-full overflow-x-auto whitespace-nowrap py-4">
                    <div className="flex flex-row gap-4">
                        {tvShows.map((tvShow)=>(
                            <div key={tvShow.id} className="w-50 flex-shrink-0 flex flex-col bg-gray-900 rounded-xl overflow-hidden">
                                <Link to={`/tv/${tvShow.id}`}>
                                <img className="w-full h-72 object-cover" src={tvShow.poster_path ? `${Image_Base_Url}${tvShow.poster_path}`: "No Poster"} alt={tvShow.title}/>
                                 <div className="p-2">
                                    <h3 className="font-bold text-white text-sm">{tvShow.title}</h3>
                                    <span className="font-bold text-white text-xs">{tvShow.first_air_date ? tvShow.first_air_date.substring(0,4):"N/A"}</span>
                                </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
