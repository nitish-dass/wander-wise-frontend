import React from 'react'

const Footer = () => {
  return (
    <footer className='px-20 py-24 bg-yellow-200 text-olive-800'>
        {/* Top div */}
        <div className='grid grid-cols-2'>
            {/* First Part */}
            <div>
                <h2 className='text-5xl font-bold'>WanderWise</h2>
                <p className='mt-4 text-lg font-medium'>Contact</p>
                <p>+977 9877654321</p>
                <p>+977 9813456784</p>

                <p className='mt-4 text-lg font-medium'>Address</p>
                <p>Biratnagar</p>
            </div>
            {/* Second part */}
            <div className='flex gap-24'>
                {/* for standar practise we use nav tag for link sections/areaas */}
                <nav className='flex flex-col [&>a]:text-2xl [&>a]:hover:underline text-violet-700'> 
                    <a href="/trips">Trips</a>
                    <a href="/baggage">Baggage</a>
                    <a href="/itineraries">Itineraries</a>
                    <a href="/login">Login</a>
                </nav>

                <nav className='flex flex-col [&>a]:text-2xl [&>a]:hover:underline text-rose-500'>
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/contact">Contact</a>
                    <a href="/help">Help</a>
                </nav>
            </div>
        </div>
    </footer>
  )
}

export default Footer;