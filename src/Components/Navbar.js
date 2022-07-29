//rfce
import React from 'react'
import Logo from '../logo.png'
import {Link} from 'react-router-dom';
function Navbar() {
    return <>
    {/* defining dimenstions of navbar components rectnagle */}
        <div className="flex px-8 space-x-8 border items-center py-4">
            <div className={`bg-[url(${Logo})] h-[10vh] w-[20vh] md:h-[15vh] md:w-[35vh] bg-center bg-cover `}></div>
            <Link to="/" className='text-blue-400 font-bold text-2xl md:text-6xl'>Movies</Link>
            <Link to="/Favourites" className='text-blue-400 font-bold text-2xl md:text-6xl'>Favourites</Link>
        </div>
            
    </>
}

export default Navbar
