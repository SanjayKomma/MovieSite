import { useState } from "react";
import { NavLink, useNavigate } from "react-router"
export const Navbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch=(e)=>{
    if(e.key === "Enter" && searchQuery.trim() !== ""){
      navigate(`/search?query=${searchQuery}`)
    };
  }
  return (
    <div className="flex items-center justify-between px-8 pt-4 pb-4 bg-gray-800 text-white">
        <div className="w-1/4">
            <h1 className="text-2xl font-bold tracking-wide cursor-pointer" onClick={()=>navigate("/")}>Movie DB</h1>
        </div>
        <div className="flex items-center justify-center flex-1 gap-4">
            <input  type="text" placeholder="search"
            className="w-full max-w-xs px-4 py-1 rounded bg-gray-700 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            ></input>
            <NavLink to={"/movies"} className={({isActive})=>
              `cursor-pointer font-bold ${isActive? "text-gray-500 font-medium" : "text-white hover:text-gray-500"
            }`}>Movies</NavLink>
            <NavLink to={"/tvshows"} className={({isActive})=>
            `cursor-pointer font-bold ${isActive? "text-gray-500 font-medium" : "text-white hover:text-gray-500"
            }`}>TV Shows</NavLink>
        </div>
        <div className="w-1/4"></div>
    </div>
  )
}
