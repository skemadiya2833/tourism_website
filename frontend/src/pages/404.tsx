import Image from 'next/image'
import React from 'react'
import bg from "../assets/ErrorPage.jpeg"
const Error = () => {
  return (
    <div className='flex justify-center items-center bg-gray-50'>
      <Image src={bg} alt='error page' className=' h-full object-cover'/>
    </div>
  )
}

export default Error
