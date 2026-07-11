import { useParams } from 'react-router'
import { getTrailerCredits, getTvShowDetails, getTvShowTrailer } from './MovieService';
import { useEffect, useState } from 'react';
export const TvShowDetails = () => {
  const {id} = useParams();
  const [tvShow, setTvShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailerKey, setTrailerKey] = useState(null);
  const [credits, setCredits] = useState({
    cast: [],
    crew: []
  });
  const Image_Base_Url = "https://image.tmdb.org/t/p/w500";
  const CastImage_Base_Url = "https://image.tmdb.org/t/p/w185";
  useEffect(()=>{
    const LoadPageData = async()=>{
    setLoading(true);
    const [tvShowData, fetchedTrailerKey, fetchCastAndCrew] = await Promise.all([
      getTvShowDetails(id),
      getTvShowTrailer(id),
      getTrailerCredits(id)
      ]);
      console.log(tvShowData);
      setTvShow(tvShowData);
      setTrailerKey(fetchedTrailerKey);
      setCredits(fetchCastAndCrew);
      setLoading(false);
    };
    LoadPageData();
  },[id]);
  const directors = credits?.crew?.filter(person => person.job === "Director") || [];
  const producers = credits?.crew?.filter(person => person.job === "Producer") || [];
  const topCast = credits.cast.slice(0,20) || [];
  if(loading) return <h3 className='text-white'>Loading movie details</h3>
  if(!tvShow) return <h3 className='text-white'>unable to fetch movie details</h3>
  return (
    <div className="pt-10 max-w-auto mx-40">
        <div className="flex flex-row pb-4">
            <div className="flex flex-col justify-start">
                <h1 className="font-bold text-2xl text-white">{tvShow.name}</h1>
                <p className="font-semibold text-white">Seasons: {tvShow.number_of_seasons}</p>
                <p className="font-semibold text-white">Total Episodes: {tvShow.number_of_episodes}</p>
                <p className="font-semibold text-gray-600">{tvShow.genres.map(genre => genre.name).join(", `")}</p>
            </div>
            <div className="flex flex-row gap-5 justify-end flex-1 font-semibold text-center">
                <div>
                    <h1 className="text-white">IMDb Rating</h1>
                    <h1 className="text-white">{tvShow.vote_average.toFixed(1)}</h1>
                </div>
                <div>
                    <h1 className="text-white">Your Rating</h1>
                    <h1 className="text-white"></h1>
                </div>
                <div >
                    <h1 className="text-white">Popularity</h1>
                    <h1 className="text-white">{tvShow.popularity.toFixed(0)}</h1>
                </div>
            </div>
        </div>
        <div className="flex flex-row gap-2 pb-3">
            <img src={tvShow.poster_path ? `${Image_Base_Url}${tvShow.poster_path}`: "No Poster"} alt={tvShow.title}
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
            <p className="text-white">{tvShow.overview}</p>
        </div>
        <div className="mt-2">
            <div className="py-2 flex flex-cols-1 gap-4 border-t border-gray-700">
                <span className="text-white font-bold">Directors</span>
                <h1 className="text-white">
                    {directors.length > 0 ? directors.map((d)=>d.name).join(", ") : "Director data not available"}
                </h1>
            </div>
            <div className="py-2 flex flex-cols-1 gap-4 border-t border-gray-700">
                <span className="text-white font-bold">Producers</span>
                <h1 className="text-white">
                    {producers.length > 0 ? producers.map((p)=>p.name).join(", ") : "Producer data not available"}
                </h1>
            </div>
        </div>
        <div>
            <h1 className="text-white font-bold pb-3 pt-2 border-t border-gray-700">Cast & Crew</h1>
            <div className="flex flex-row">
                <div className="flex flex-row gap-4 w-full overflow-x-auto">
                    {topCast.map((actor)=>
                        <div key={actor.id} className="w-28 flex-shrink-0 overflow-hidden">
                            <img
                            className="w-28 h-28 object-cover rounded-full" 
                            src={actor.profile_path ? `${CastImage_Base_Url}${actor.profile_path}`:"no image"}/>
                            <div className="pb-2">
                                <h1 className="text-sm text-white">{actor.name}</h1>
                                <p className="text-sm text-gray-500">{actor.character}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}
