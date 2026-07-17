import { useEffect, useState } from "react"
import { getTrendingMovies, getTrendingTvShows } from "./MovieService"
import { Link, useSearchParams } from "react-router"
export const Trending = () => {
    const [movies, setMovies] = useState([]);
    const [tvShows, setTvShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const selectedGenre = searchParams.get("genre") || "";
    const selectedYear = searchParams.get("year") || "";
    const Image_Base_Url = "https://image.tmdb.org/t/p/w500";
    useEffect(()=>{
        const trending = async()=>{
            setLoading(true);
            const [movieData, tvData] = await Promise.all([
                getTrendingMovies(),
                getTrendingTvShows()
            ]);
            console.log(tvData);
            setMovies(movieData);
            setTvShows(tvData);
            setLoading(false);
        }
        trending();
    },[])
    if(loading){
        return <h2 className="text-white">Loading Page....</h2>
    }
    return (
        <div className="min-h-screen bg-gray-950 mx-20">
            <div className="pt-3 px-4">
                <h2 className="font-bold text-white text-xl">Top Movie Picks Today</h2>
                <div className="py-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
                        {movies && movies.filter(movie=>{
                            const matchesYear = selectedYear ? movie.release_date?.startsWith(selectedYear):true;
                            const matchesGenre = selectedGenre ? movie.genre_ids?.map(String).includes(selectedGenre):true;
                            return matchesGenre && matchesYear;
                        }).map((movie)=>(
                            <div key={movie.id} className="w-full flex flex-col bg-gray-900 rounded-xl overflow-hidden hover:scale-110">
                                <Link to={`/movie/${movie.id}`}>
                                <img className="w-full h-80 object-cover" src={movie.poster_path ? `${Image_Base_Url}${movie.poster_path}`: "No Poster"} alt={movie.title}/>
                                 <div className="p-2">
                                    <h3 className="font-bold text-white text-sm">{movie.title}</h3>
                                    <span className="font-bold text-gray-500 text-xs">{movie.release_date ? movie.release_date.substring(0,4):"N/A"}</span>
                                </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="pt-3 px-4">
                <h2 className="font-bold text-white text-xl">Top TV Shows today</h2>
                <div className="py-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
                        {tvShows && tvShows.filter(tvShow=>{
                            const matchesYear = selectedYear ? tvShow.first_air_date?.startsWith(selectedYear):true;
                            const matchesGenre = selectedGenre ? tvShow.genre_ids?.map(String).includes(selectedGenre):true;
                            return matchesGenre && matchesYear;
                        }).map((tvShow)=>(
                            <div key={tvShow.id} className="w-full flex flex-col bg-gray-900 rounded-xl overflow-hidden hover:scale-110">
                                <Link to={`/tv/${tvShow.id}`}>
                                <img className="w-full h-80 object-cover" src={tvShow.poster_path ? `${Image_Base_Url}${tvShow.poster_path}`: "No Poster"} alt={tvShow.title}/>
                                 <div className="p-2">
                                    <h3 className="font-bold text-white text-sm">{tvShow.name}</h3>
                                    <span className="font-bold text-gray-500 text-xs">{tvShow.first_air_date ? tvShow.first_air_date.substring(0,4):"N/A"}</span>
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
