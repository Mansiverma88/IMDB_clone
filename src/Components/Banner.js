import React from 'react'
import Image from '../avengers.png'
import {useState, useEffect} from 'react'
import axios from 'axios'
function Banner() {

    const[movie, setMovie]=useState([])

    useEffect(function(){
        //AXIOS is a way of communication of react app to any api
        //axios return something as promise to a request that why .then done
        axios.get("https://api.themoviedb.org/3/trending/movie/week?api_key=5876e07086b6cc9595096f4aae33f992&page=1").then((res)=>
            {   //console.table(res.data.results)
                setMovie(res.data.results[0]);//response.data.results
            })
        }, [])

    return <>

    {/* //this is the div defining rectnagle for banner component */}
    <div>
        {/* //background image on banner */}
        <div className={`bg-[url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})] h-[50vh] md:h-[100vh] bg-center bg-cover flex items-end`}>
            {/* //image waale div ke andar ka div jispar us ovie ka naam aaraha hai */}
            <div className='md:text-3xl text-white p-4 bg-opacity-50 flex justify-center bg-gray-900 w-full'>{movie.title}</div>
            </div>
        </div>
    </>
}

export default Banner
