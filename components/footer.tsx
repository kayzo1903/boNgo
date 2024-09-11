import React from 'react'

const Footer = () => {
  return (
    <div className='max-w-screen-lg mx-auto py-2 bg-gray-100'>
        <h1 className='text-gray-400 text-sm text-center'>kayzommary@gmail.com</h1>
        <h1 className='text-sm text-gray-400 text-center'>copyright ©{new Date().getFullYear()} kayzommary</h1>
    </div>
  )
}

export default Footer