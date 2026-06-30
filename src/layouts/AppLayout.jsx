import Footer from '@/components/landingComponents/Footer'
import Navbar from '@/components/landingComponents/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div>
        <Navbar />
        <Outlet />
        <Footer />
    </div>
  )
}

export default AppLayout