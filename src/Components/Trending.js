import React from 'react'
import Image from '../avengers.png'
import axios from 'axios'
import {Audio} from 'react-loader-spinner'//loader for initial display till data is being retirved
import {useState, useEffect} from 'react'
import Pagination from './Pagination'

function Trending() {

    const[movies, setMovies]=useState([])
    const [page,setPage]= useState(1);//initial state of pageno. kept =1
    const[hover, setHover]=useState('');
    const[favourites, setFavourites]=useState([]);//to store state of favourites
    function goahead()
    {// funtion to set pagenumber+1
        setPage(page+1)
    }
    function previoupage()
    {//function to set page number -1;
        if(page>1)
            setPage(page-1);
    }

    //useeffect gets data of the desired curr page useEffect is setting page
    useEffect(function(){
        
        //evertime page reloads
        let oldFav=localStorage.getItem("imdb");
        if(oldFav!=null){
        oldFav=JSON.parse(oldFav)
        setFavourites([...oldFav])}

        
        axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=5876e07086b6cc9595096f4aae33f992&page=${page}`).then((res)=>
            {   //console.table(res.data.results)
                setMovies(res.data.results);
                
                //after page loads first reciever all local values and place them 
            })  
        }, [page])//page passes wheberver page changes useeffect fired

    let add=(movie)=>{
        let newArray= [...favourites, movie];
        setFavourites([...newArray]);//adding new array in prev array
        console.log(newArray);
        //for a site we can save info on browser , even when site is offf, local storage mein rehta hai value
        localStorage.setItem("imdb", JSON.stringify(newArray))//to save browse info in local strorage covert it into string
    }

    //deleting favourites
    let del=(movie)=>{
        let newArray=favourites.filter((m)=>m.id!=movie.id)
        setFavourites([...newArray])
        localStorage.setItem("imdb", JSON.stringify(newArray))
        //permanent delte from local storage too
    }
    
  return <>

  {/* //component rectangle for trending movies */}
  <div className='mb-8 text-center'>
      <div className='p-4 font-bold text-2xl text-center'>
          Trending Movies
      </div>
      {/* //dynamic flexible part of trending movie  */}
      {
        // agar abhi tak koi bhi movie[] retriever nahi hui hai toh yeh loader laga do, else display cards of movies retrieved as api response
          movies.length==0 ? <div className='flex justify-center'>
               <Audio 
                height="100" width="100" color='indigo'
                ariaLabel='loading'
                />
          </div>//then waala part
            ://else waala part pehle movie pic is set as background of the card, then bottom mein movie pic ke component ke andar ek title component bhi daala hai just like banner mein
            //looping thorugh movie[] set, for each movie made card
            <div className='flex  flex-wrap justify-center w-full'>
                   {
                   movies.map((movie)=>(//use simple braces instead of curly
                    <div className={`bg-[url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})] h-[25vh] w-[160px] md:h-[30vh] md:w-[180px] bg-center bg-cover flex items-end rounded-xl 
                    hover:scale-110 
                    ease out duration-300 m-4 relative`} 
                    onMouseEnter={()=>setHover(movie.id)}//function to see mouse kahan enter aa raha hai
                    onMouseLeave={()=>setHover('')}>
                        {
                            hover==movie.id ? <>
                            { //if curr movie is in favorites then show cross or show like
                                !favourites.includes(movie)? (<div className='absolute p-2 bg-gray-900 rounded-xl top-2 right-2 cursor-pointer' onClick={()=>add(movie)}>😍</div> )://onclick moveied added
                                (<div className='absolute p-2 bg-gray-900 rounded-xl top-2 right-2 cursor-pointer text-white' onClick={()=>del(movie)}>X</div> )
                            }</> :<></>
                            
                            
                        }
                         
                        <div className='text-1.5xl text-white p-2 bg-opacity-50 flex justify-center bg-gray-900 w-full rounded-b-xl'>{movie.title}
                        </div>
                    </div>
                   ))
            }
            </div>
        }
        
  </div>
  {/* //now pagination became child of trending, we are passing values of currpage and the funciton of go ahead and prev */}
  <Pagination pageProp={page} goahead={goahead} previoupage={previoupage}/>
  </>
}

export default Trending