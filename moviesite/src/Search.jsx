import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router"
import { searchMulti } from "./MovieService";

export const Search = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query") || "";
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const Image_Base_Url = "https://image.tmdb.org/t/p/w500";

    useEffect(()=>{
        if(!query) return;
        const resultData = async()=>{
            const searchData = await searchMulti(query);
            console.log(searchData);
            const filteredData = searchData.filter(item => item.poster_path && (item.title || item.name));
            setResults(filteredData);
            setLoading(false);
        }
        resultData();
    },[query]);
    if(loading){
        return(
            <div>
                <h2 className="text-white">Searching for {"query"}</h2>
            </div>
        );
    }
  return (
    <div className="min-h-screen mx-30">
            <h1 className="flex justify-center font-bold text-white py-2 font-bold text-xl">Results for "{query}"</h1>
            {results.length === 0 ? (
                <p className="text-white">No Results found</p>
            ):(
                <div>
                {results.map((item)=>{
                    const isMovie = item.media_type === "movie";
                    const detailPath = isMovie ? `/movie/${item.id}` :`/tv/${item.id}`;
                    const title = isMovie ? item.title : item.name;
                    const date = isMovie ? item.release_date : item.first_air_date;
                    return(
                        <div key={item.id} className="flex flex-cols-1 gap-2 h-50 border-t border-b border-gray-700">
                            <div className="flex items-center">
                            <Link to={detailPath}>
                                <img src={`${Image_Base_Url}${item.poster_path}`}
                                alt="title"
                                className="w-30 h-40"
                                />
                            </Link>
                            </div>
                            <div className="pt-3">
                                <Link to={detailPath}>
                                    <h1 className="text-white">{title}</h1>
                                    <span className="text-white">{date ? date.substring(0,4) : "N/A"} . {isMovie ? "Movie" : "TV Show"}</span>
                                    <h1 className="text-white">IMDB Rating : {item.vote_average.toFixed(1)}</h1>
                                </Link>
                            </div>
                        </div>
                    );
                })}
                </div>
            )
            }
    </div>
  );
};