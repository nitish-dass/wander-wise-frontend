import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import About from './pages/About'
import Register from './pages/Register'
import Login from './pages/Login'
import useAuth from './hooks/useAuth'
import { jwtDecode } from 'jwt-decode'
import AppLayout from './layouts/AppLayout'
import Dashboard from './pages/Dashboard'
import AddTrips from './pages/trips/AddTrips'
import Trip from './pages/trips/Trip'
import EditTrips from './pages/trips/EditTrips'
import TripDetails from './pages/trips/TripDetails'
import AcceptInvite from './pages/trips/AcceptInvite'
import Baggage from './pages/baggage/Baggage'
import BaggageDetails from './pages/baggage/BaggageDetails'
import Itinerary from './pages/itinerary/Itinerary'
import AddItinerary from './pages/itinerary/AddItinerary'
import ItineraryDetails from './pages/itinerary/ItineraryDetails'

const App = () => {

  const { token, logout } = useAuth();

  const ProtectedRoutes = () => {     //PascalCase xa vane component ho
    try {
      const decodedToken = token ? jwtDecode(token) : null;
      console.log(decodedToken)
      const userId = decodedToken?.userId;

      if(!token || !userId) {
        logout();
        return <Navigate to="/login" />
      }

       if (decodedToken && decodedToken.exp) {

        const currentTime = Date.now() /1000;

        if (currentTime > decodedToken?.exp) {
          logout();
          return <Navigate to="/login" />;
        }
      }

      return <AppLayout />

    } catch (error) {
      console.log(error);
      logout();
      return <Navigate to = "/login" />
    }
  }

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />

      
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route element = { <ProtectedRoutes /> }>    
      {/* routes to access after login are inserted here */}

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/trips' element={<Trip />} />
        <Route path='/trips/add' element={<AddTrips />} />
        {/* dynanic path bala id last ma rakhne, navae sab lie id assume garera kam garxa */}
        <Route path='/trips/edit/:tripId' element={<EditTrips />} />
        <Route path='/trips/:tripId/invite/accept' element={<AcceptInvite />} />
        <Route path='/trips/:tripId' element={<TripDetails />} />   

        <Route path="/baggage" element={<Baggage />} />
        <Route path="/baggage/:tripId" element={<BaggageDetails />} />

        <Route path='/itinerary' element={<Itinerary />} />
        <Route path='/itinerary/add/:tripId' element={<AddItinerary />} />
        <Route path='/itinerary/:tripId' element={<ItineraryDetails />} />


      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App