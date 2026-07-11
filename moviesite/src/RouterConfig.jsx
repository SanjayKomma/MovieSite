import { createBrowserRouter, Outlet } from "react-router"
import { Navbar } from "./Navbar"
import { HomePage } from "./HomePage"
import { MovieDetailsPage } from "./MovieDetailsPage"
import { TvShowDetails } from "./TvShowDetails"
import { MoviesPage } from "./MoviesPage"
import { TvShowsPage } from "./TvShowsPage"
const PageLayout=()=>{
    return(
        <div className="min-h-screen bg-gray-950">
            <Navbar/>
            <Outlet/>
        </div>
    );
}
export const router = createBrowserRouter([
    {
        path:"/",
        element:<PageLayout />,
        children:[
            {
                index:true,
                path:"/",
                element:<HomePage />
            },
            {
                path:"movie/:id",
                element:<MovieDetailsPage />
            },
            {
                path:"tv/:id",
                element:<TvShowDetails />
            },
            {
                path:"movies",
                element:<MoviesPage />
            },
            {
                path:"tvshows",
                element:<TvShowsPage />
            }
        ]
    }
])