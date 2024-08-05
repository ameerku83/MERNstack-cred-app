import React from 'react'
import { Link } from 'react-router-dom'

export const ErrorPage = () => {
  return (
    <div className='text-center'>
        <h1 >
          404   Page not found
        </h1>
        <button className='mt-5' > <Link to='/' ><h3>Go to home </h3> </Link>  </button>
    </div>
  )
}
