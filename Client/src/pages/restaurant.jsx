import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Restaurants from '@/services/api/restaurants'
import Avis from '@/services/api/avis'
import { Button } from '@/components/ui/button'

import useModal from '@/hooks/useModal'
import Modal from '@/components/layout/modal.jsx'
import Reservations from '@/services/api/reservations.js'
import ReservationForm from './formulaire_reservations.jsx'

const Restaurant = () => {

    const { id } = useParams()
    const [restaurant, setRestaurant] = useState(null)
    const [avis, setAvis] = useState([])
    const [loadingRestaurant, setLoadingRestaurant] = useState(true)
    const [loadingAvis, setLoadingAvis] = useState(true)
    const [availability, setAvailability] = useState()
    const modal = useModal()

    useEffect(() => {
        Restaurants.getOne(id).then((response) => {
            setRestaurant(response.restaurant)
            setLoadingRestaurant(false)
        })
    } , [id])

    useEffect(() => {
        Avis.getByRestaurant(id).then((response) => {
            setAvis(response.avis)
            setLoadingAvis(false)
        })
    }, [id])

    useEffect(() => {
        Reservations.getAvailability(id, new Date().toISOString().split('T')[0]).then((response) => {
            setAvailability(response.availability)
        })
    }, [id])
    

    return (
        <div className="flex flex-col w-full p-4">
            <div className='flex-1 w-full'>
                {loadingRestaurant && (
                    <div>Loading...</div>
                )}
                {!!restaurant && (
                    <div>
                        <h1 className='text-3xl font-bold'>Nom: {restaurant.name}</h1>
                        <p className='text-gray-500'>Description: {restaurant.description}</p>
                        <p className='text-gray-500'>Adresse: {restaurant.address}</p>
                        <p className='text-gray-500'>Email : {restaurant.email}</p>
                        <p className='text-gray-500'>Capacity: {restaurant.capacity}</p>
                        <p className='text-gray-500'>Rating: {restaurant.averageRating}</p>
                        <Button
                            onClick={modal.open}
                            variant='primary'
                        >
                            Réserver
                        </Button>
                    </div>
                )}
            </div>
            <div className='flex-1 w-full'>
                {loadingAvis && (
                    <div>Loading...</div>
                )}
                {!!avis && (
                    <div>
                        <h2 className='text-2xl font-bold'>Avis</h2>
                        {avis.map((avi) => (
                            <div key={avi.id}>
                                <p>{new Date(avi.createdAt).toLocaleDateString()}</p>
                                <p>{avi.review}</p>
                                <p>{avi.rating}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Modal
                controls={modal}
            >
                <ReservationForm restaurantId={id} />
            </Modal>
        </div>
    )
}

export default Restaurant