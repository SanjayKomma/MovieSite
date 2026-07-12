import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { getPopularTvShow, getTopRatedTvShows, getTrendingTvShows } from "./MovieService";

export const TvShowsPage = () => {
    const [popularTvShows, setPopularTvShows] = useState([]);
    const [trendingTvShows, setTrendingTvShows] = useState([]);
    const [topRatedTvShows, setTopRatedTvShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const selectedGenre = searchParams.get("genre") || "";
    const selectedYear = searchParams.get("year") || "";
    const Image_Base_Url = "https://image.tmdb.org/t/p/w500";
    useEffect(()=>{
        const trending = async()=>{
            setLoading(true);
            const [fetchedTrendingTvShows, fetchedPopularTvShows, fetchedTopRatedTvShows] = await Promise.all([
                getTrendingTvShows(),
                getPopularTvShow(),
                getTopRatedTvShows()
            ]);
            console.log(fetchedPopularTvShows);
            setTrendingTvShows(fetchedTrendingTvShows);
            setPopularTvShows(fetchedPopularTvShows);
            setTopRatedTvShows(fetchedTopRatedTvShows);
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
                <h2 className="font-bold text-white text-xl">Top TV Shows today</h2>
                <div className="w-full overflow-x-auto whitespace-nowrap py-4">
                    <div className="flex flex-row gap-4">
                        {trendingTvShows && trendingTvShows.filter(tvShow=>{
                            const matchesYear = selectedYear ? tvShow.first_air_date?.startsWith(selectedYear):true;
                            const matchesGenre = selectedGenre ? tvShow.genre_ids?.map(String).includes(selectedGenre):true;
                            return matchesGenre && matchesYear;
                        }).map((tvShow)=>(
                            <div key={tvShow.id} className="w-50 flex-shrink-0 flex flex-col bg-gray-900 rounded-xl overflow-hidden will-change-transform hover:scale-110">
                                <Link to={`/tv/${tvShow.id}`}>
                                <img className="w-full h-72 object-cover" src={tvShow.poster_path ? `${Image_Base_Url}${tvShow.poster_path}`: "No Poster"} alt={tvShow.title}/>
                                 <div className="p-2">
                                    <h3 className="font-bold text-white text-sm">{tvShow.name}</h3>
                                    <span className="font-bold text-white text-xs">{tvShow.first_air_date ? tvShow.first_air_date.substring(0,4):"N/A"}</span>
                                </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="pt-3 px-4">
                <h2 className="font-bold text-white text-xl">Popular TV Shows</h2>
                <div className="w-full overflow-x-auto whitespace-nowrap py-4">
                    <div className="flex flex-row gap-4">
                        {popularTvShows && popularTvShows.filter(tvShow=>{
                            const matchesYear = selectedYear ? tvShow.first_air_date?.startsWith(selectedYear):true;
                            const matchesGenre = selectedGenre ? tvShow.genre_ids?.map(String).includes(selectedGenre):true;
                            return matchesGenre && matchesYear;
                        }).map((tvShow)=>(
                            <div key={tvShow.id} className="w-50 flex-shrink-0 flex flex-col bg-gray-900 rounded-xl overflow-hidden will-change-transform hover:scale-110">
                                <Link to={`/tv/${tvShow.id}`}>
                                <img className="w-full h-72 object-cover" src={tvShow.poster_path ? `${Image_Base_Url}${tvShow.poster_path}`: "No Poster"} alt={tvShow.title}/>
                                 <div className="p-2">
                                    <h3 className="font-bold text-white text-sm">{tvShow.name}</h3>
                                    <span className="font-bold text-white text-xs">{tvShow.first_air_date ? tvShow.first_air_date.substring(0,4):"N/A"}</span>
                                </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="pt-3 px-4">
                <h2 className="font-bold text-white text-xl">Top Rated TV Shows</h2>
                <div className="w-full overflow-x-auto whitespace-nowrap py-4">
                    <div className="flex flex-row gap-4">
                        {topRatedTvShows && topRatedTvShows.filter(tvShow=>{
                            const matchesYear = selectedYear ? tvShow.first_air_date?.startsWith(selectedYear):true;
                            const matchesGenre = selectedGenre ? tvShow.genre_ids?.map(String).includes(selectedGenre):true;
                            return matchesGenre && matchesYear;
                        }).map((tvShow)=>(
                            <div key={tvShow.id} className="w-50 flex-shrink-0 flex flex-col bg-gray-900 rounded-xl overflow-hidden will-change-transform hover:scale-110">
                                <Link to={`/tv/${tvShow.id}`}>
                                <img className="w-full h-72 object-cover" src={tvShow.poster_path ? `${Image_Base_Url}${tvShow.poster_path}`: "No Poster"} alt={tvShow.title}/>
                                 <div className="p-2">
                                    <h3 className="font-bold text-white text-sm">{tvShow.name}</h3>
                                    <span className="font-bold text-white text-xs">{tvShow.first_air_date ? tvShow.first_air_date.substring(0,4):"N/A"}</span>
                                </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
