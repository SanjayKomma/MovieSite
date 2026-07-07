import { useEffect, useState } from "react"
import { getTrending } from "./MovieService"


export const Trending = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const Image_Base_Url = "https://image.tmdb.org/t/p/w500";
    useEffect(()=>{
        const trending = async()=>{
            setLoading(true);
            const data = await getTrending();
            setMovies(data);
            setLoading(false);
        }
        trending();
    },[])
    console.log(movies);
    if(loading){
        return <h2>Loading Page....</h2>
    }
    return (
        <div>
            <h2>Trending</h2>
            <div>
                {movies.map((movie)=>(
                    <div key={movie.id}>
                        <img src={movie.poster_path ? `${Image_Base_Url}${movie.poster_path}`: "No Poster"} alt={movie.title}/>
                        <div>
                            <h3>{movie.title}</h3>
                            <span>{movie.release_date}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
