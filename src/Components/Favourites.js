import React from 'react'
import Pagination from './Pagination'
import { useState, useEffect } from 'react'
import Up from '../icons8-up-32.png'
import Down from '../icons8-down-32.png'
function Favourites() {

    //array for genre ids
    let genreids={
        28:'Action', 12:'Adventure', 16:'Animation', 35:'Comedy', 80:'Crime'
        , 99:'Documentary', 18:'Drama', 10751:'Family', 14:'Fantasy', 36:'History', 27:'Horror', 10402:'Music',
        9648:'Mystery', 10752:'War', 37:'Western', 10749: 'Romance', 878:'Sci-Fi', 10770:'TV', 53:'Thriller'
    }
  const [curGenre, setCurGenre]=useState('All Genres');
  const [favourites, setFavourites]=useState([]);//to keep track of movies deleted

  //To track sstate of genre of the movies
  const[genres, setGenres]=useState([]);
  const [rating, setRating] = useState(0) 
  const [popularity, setPopularity] = useState(0)
  const [search, setSearch] = useState("")
  const [rows, setRows] = useState(5)
  const [curPage, setCurPage] = useState(1)
  //for local storage
  useEffect(()=>{
    let oldFav=localStorage.getItem("imdb");
    console.log(oldFav);
    if(oldFav!=null){
    oldFav=JSON.parse(oldFav);
    setFavourites([...oldFav]);}
  }, []);

  //for genres after ur movie renders in
  useEffect(()=>{
    let temp=favourites.map((movie)=> genreids[movie.genre_ids[0]])
    //to prevent repition of genres
    temp=new Set(temp);
    setGenres(['All Genres',...temp]);//set genresaccording to found genres
    //console.log(genres);
  },[favourites])//after favoruties run


  //deleting favourites
  let del=(movie)=>{
    let newArray=favourites.filter((m)=>m.id!==movie.id)
    setFavourites([...newArray])
    localStorage.setItem("imdb", JSON.stringify(newArray))
    //permanent delte from local storage too
} 


//filtered movies
  let filteredMovies = []
  //agar currgenre all gnres hai toh filtered=favourites all, else favourites se filter karo
  filteredMovies = curGenre == "All Genres" ? favourites : favourites.filter((movie) => genreids[movie.genre_ids[0]] == curGenre)


//sorting
if (rating == 1) {
  filteredMovies = filteredMovies.sort(function (objA, objB) {
    return objA.vote_average - objB.vote_average
  })
} else if (rating == -1) {
  filteredMovies = filteredMovies.sort(function (objA, objB) {
    return objB.vote_average - objA.vote_average
  })
}


if (popularity == 1) {
  filteredMovies = filteredMovies.sort(function (objA, objB) {
    return objA.popularity - objB.popularity
  })
} else if (popularity == -1) {
  filteredMovies = filteredMovies.sort(function (objA, objB) {
    return objB.popularity - objA.popularity
  })
}

//searching for movies
filteredMovies = filteredMovies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  )


  // pagination
  let maxPage = Math.ceil(filteredMovies.length / rows);
  let si = (curPage - 1) * rows
  let ei = Number(si) + Number(rows)

  filteredMovies = filteredMovies.slice(si, ei);

  let goBack = () => {
    if (curPage > 1) {
      setCurPage(curPage - 1)
    }
  }

  let goAhead = () => {
    if (curPage < maxPage) {
      setCurPage(curPage + 1)
    }
  }

  return <>

  {/* all geres and action tab  */}

  <div className='mt-4 px-2 flex justify-center flex-wrap space-x-2'>
    {
        genres.map((genre)=>(
        <button className={(curGenre==genre) ?'text-lg bg-blue-400 m-2 p-2 rounded-xl font-bold text-white' :
    'text-lg bg-gray-400 hover:bg-blue-400 m-2 p-2 rounded-xl font-bold text-white'} 
    onClick={()=>{setCurPage(1)
      setCurGenre(genre)
    }
    }>
        {genre}
    </button>
    ))
    }
  </div>

    {/* //input fields */}
    <div>
        <div className='text-center'>
            <input type="text" value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search' className='border border-2 text-center p-1 m-2'/>
            <input type="number" value={rows}
            onChange={(e) => setRows(e.target.value)}
            placeholder='Rows' className='border border-2 text-center p-1 m-2'/>
        </div>
    </div>

  {/* table formation */}
  <div>
    <div className="flex flex-col m-4">
      <div className  ="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 min-w-full">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className='flex'><img className={`bg-[url(${Up})] h-[4vh] w-[2vh] bg-center bg-cover mr-2 cursor-pointer`}
                    onClick={()=>{
                      setPopularity(0)
                      setRating(-1)
                    }}></img>
                      Rating<img className={`bg-[url(${Down})] h-[4vh] w-[2vh] bg-center bg-cover mr-2 cursor-pointer`}
                      onClick={()=>{
                        setPopularity(0)
                        setRating(-1)
                      }}></img>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className='flex'><img className={`bg-[url(${Up})] h-[4vh] w-[2vh] bg-center bg-cover mr-2 cursor-pointer`}
                    onClick={()=>{
                      setPopularity(0)
                      setRating(-1)
                    }}></img>
                      Popularity<img className={`bg-[url(${Down})] h-[4vh] w-[2vh] bg-center bg-cover mr-2 cursor-pointer`}
                      onClick={()=>{
                        setPopularity(0)
                        setRating(-1)
                      }}></img>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Genre
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Remove
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMovies.length==0?<h1 className='text-lm font-medium text-gray-900 font-bold m-4'>No movies in Favourites to filter.</h1>:filteredMovies.map((movie) => (
                  <tr key={movie.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 md:h-[100px] md:w-[180px]">
                          <img className="hidden md:block md:h-[100px] md:w-[180px]" src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 font-bold">{movie.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{movie.vote_average}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{movie.popularity}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {[movie.genre_ids[0]]}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                      <button href="#" className="text-red-600 hover:text-red-900"
                        onClick={() => del(movie)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div classname='mt-4'>
  <Pagination pageProp={curPage} goBack={goBack} goAhead={goAhead} />
  </div>
  </>
}

export default Favourites