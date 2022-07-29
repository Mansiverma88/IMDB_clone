import React from 'react'
import {useState} from 'react'
function Pagination({pageProp, goahead, previoupage}) {

  return (<>
  
  <div className='m-4 flex justify-center'>
      {/* onclick prev button call previousPage() function */}
      <button className='border-2 border-indigo-500 p-2 rounded-l-xl text-indigo-500 border-r-0 '  onClick={previoupage}>Previous</button> 
      <button className='border-2 border-indigo-500 p-2  text-indigo-500'>{pageProp}</button>
      {/* onclick prev button call goHead() function */}
      <button className='border-2 border-indigo-500 p-2 rounded-r-xl text-indigo-500 border-l-0' onClick={goahead}>Next</button>
  </div>
  </>)
  
}

export default Pagination