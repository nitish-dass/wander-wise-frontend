import useApi from '@/hooks/useApi';
import { Loader2 } from 'lucide-react';
import React from 'react'
import { useParams } from 'react-router-dom'



const TripDetails = () => {

    const {tripId} = useParams();
    console.log(tripId);

    const {error, loading, data} = useApi(`/trips/${tripId}`);

    if(loading) {
        return <Loader2 className='animate-spin' />
    }

    if(error) {
        return <div>Error: {error.message}</div>
    }

  return (
    <section className='px-20 py-20 grid grid-cols-4 gap-4'>
        <div className='col-span-3 border border-gray-300 rounded-lg p-4'>

        </div>
    </section>
  )
}

export default TripDetails