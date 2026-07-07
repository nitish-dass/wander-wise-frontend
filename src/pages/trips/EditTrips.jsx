import TripForm from '@/components/shared/TripForm'
import useApi from '@/hooks/useApi';
import { Loader2 } from 'lucide-react';
import React from 'react'
import { useParams } from 'react-router-dom'

const EditTrips = ({text}) => {

    const {tripId} = useParams();
    console.log(tripId);

    const {error, loading, data} = useApi(`/trips/${tripId}`);

    if(loading) {
        return <Loader2 />
    }

    if(error) {
        return <div>Error: {error.message}</div>
    }

  return (
    <div>
        <TripForm text="Edit" tripData={data}/>
    </div>
  )
}

export default EditTrips