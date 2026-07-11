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
    <div>
        <div>
            <h1 className="text-white">Results for : <span>{query}</span></h1>
            {results.length === 0 ? (
                <p className="text-white">No Results found</p>
            ):(
                <div >
                {results.map((item)=>{
                    const isMovie = item.media_type === "movie";
                    const detailPath = isMovie ? `/movie/${item.id}` :`/tv/${item.id}`;
                    const title = isMovie ? item.title : item.name;
                    const date = isMovie ? item.release_date : item.first_air_date;
                    return(
                        <div key={item.id}>
                            <Link to={detailPath}>
                                <img src={`${Image_Base_Url}${item.poster_path}`}
                                alt="title"
                                />
                                <div>
                                    <h2 className="text-white">{title}</h2>
                                    <span className="text-white">{date ? date.substring(0,4) : "N/A"} . {isMovie ? "Movie" : "TV Show"}</span>
                                </div>
                            </Link>
                        </div>
                    );
                })}
                </div>
            )
            }
        </div>
    </div>
  );
};