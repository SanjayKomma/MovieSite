import { useEffect, useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router"
import { getMovieGenres, getTvShowGenres } from "./MovieService";
const Years = Array.from({length:30},(_, i)=>(2026 - i).toString());
export const Navbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedGenre = searchParams.get("genre") || "";
  const selectedYear = searchParams.get("year") || "";
  const [genres, setGenres] = useState([]);

  useEffect(()=>{
    const LoadGenres = async()=>{
      try{
          const [movieRes, tvRes] = await Promise.all([
          getMovieGenres(),
          getTvShowGenres()
        ]);
        const movieGenres = movieRes?.genres || (Array.isArray(movieRes) ? movieRes : []);
        const tvGenres = tvRes?.genres || (Array.isArray(tvRes) ? tvRes : []);
        const combined = [...movieGenres, ...tvGenres];
        const uniqueGenres = Array.from(new Map(combined.map(genre => [genre.id, genre])).values());
        console.log(uniqueGenres);
        setGenres(uniqueGenres);
        }
      catch(error){
        console.log("Unable to fetch genre", error);
      }
    }
    LoadGenres();
  },[]);
  const HandleFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if(value){
      newParams.set(key, value);
    }
    else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  }
  const handleSearch=(e)=>{
    if(e.key === "Enter" && searchQuery.trim() !== ""){
      navigate(`/search?query=${searchQuery}`)
    };
  }
  return (
    <div className="flex items-center justify-right px-8 pt-4 pb-4 bg-gray-800 text-white">
        <div className="mx-15 ">
            <h1 className="text-2xl font-bold tracking-wide cursor-pointer" onClick={()=>navigate("/")}>Movie DB</h1>
        </div>
        <div className="mx-20 flex items-center flex-1 gap-4">
            <input  type="text" placeholder="search"
            className="w-full px-4 py-1 rounded bg-gray-700 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            ></input>
            <NavLink to={"/movies"} className={({isActive})=>
              `cursor-pointer font-bold ${isActive? "text-gray-500 font-medium" : "text-white hover:text-gray-500"
            }`}>Movies</NavLink>
            <NavLink to={"/tvshows"} className={({isActive})=>
            `cursor-pointer font-bold whitespace-nowrap ${isActive? "text-gray-500 font-medium" : "text-white hover:text-gray-500"
            }`}>TV Shows</NavLink>
            <select className="bg-gray-800 font-bold text-center text-white rounded-xl" value={selectedGenre} onChange={(e)=>HandleFilter("genre", e.target.value)}>
              <option value={""}>Genre</option>
              {genres.map(genre => (<option key={genre.id} value={genre.id.toString()}>{genre.name}</option>))}
            </select>
            <select className="bg-gray-800 font-bold text-white rounded-xl" value={selectedYear} onChange={(e) => HandleFilter("year", e.target.value)}>
              <option value={""}>Year</option>
              {Years.map(year => (<option key={year} value={year}>{year}</option>))}
            </select>
        </div>
        {/* <div className="w-1/4"></div> */}
    </div>
  )
}