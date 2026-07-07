

export const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-8 pt-4 pb-4 bg-gray-800 text-white">
        <div className="w-1/4">
            <h1 className="text-2xl font-bold tracking-wide">Movie DB</h1>
        </div>
        <div className="flex items-center justify-center flex-1 gap-4">
            <input  type="text" placeholder="search"
            className="w-full max-w-xs px-4 py-1 rounded bg-gray-700 outline-none"
            ></input>
            <p className="cursor-pointer hover:text-gray-300 font-medium">Menu</p>
            <p className="cursor-pointer hover:text-gray-300 font-medium">Filter</p>
        </div>
        <div className="w-1/4"></div>
    </div>
  )
}
