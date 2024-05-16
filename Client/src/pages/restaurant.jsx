import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'

import useModal from '@/hooks/useModal'
import Modal from '@/components/layout/modal.jsx'
import Reservations from '@/services/api/reservations.js'
import ReservationForm from '../components/forms/reservationForm.jsx'
import Restaurants from '@/services/api/restaurants'
import Avis from '@/services/api/avis'
import ReviewForm from '@/components/forms/reviewForm.jsx'
import AuthContext from '@/contexts/authContext.jsx'


const Restaurant = () => {

    const { id } = useParams()
    const profile = useContext(AuthContext)
    const [restaurant, setRestaurant] = useState(null)
    const [avis, setAvis] = useState([])
    const [loadingRestaurant, setLoadingRestaurant] = useState(true)
    const [loadingAvis, setLoadingAvis] = useState(true)
    const [availability, setAvailability] = useState()
    const [reviewed, setReviewed] = useState(false)
    const [userCommentId, setUserCommentId] = useState(null)
    const modal = useModal()

    const fetchAvis = () => {
        setLoadingAvis(true)
        Avis.getByRestaurant(id).then((response) => {
            setAvis(response.avis)
            setLoadingAvis(false)
        })
    }

    const isReviewed = () => {
        if (profile.currentUser) {
            const userComment = avis.find((avi) => avi.UserId === profile.currentUser.id)
            if (userComment) {
                setReviewed(true)
                setUserCommentId(userComment.id)
            }
        }
    }

    const fetchRestaurant = () => {
        setLoadingRestaurant(true)
        Restaurants.getOne(id).then((response) => {
            setRestaurant(response.restaurant)
            setLoadingRestaurant(false)
        })
    }

    const fetchAvailability = () => {
        Reservations.getAvailability(id, new Date().toISOString().split('T')[0]).then((response) => {
            setAvailability(response.availability)
        })
    }

    useEffect(() => {
        fetchAvis()
        fetchRestaurant()
        fetchAvailability()
    }, [id])

    useEffect(() => {
        isReviewed()
    }, [avis])
    

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
                {/* 
                    Form to add a review
                */}
                <ReviewForm restaurantId={id} update={fetchAvis} reviewed={reviewed} commentId={userCommentId} />
                {!!avis && (
                    <div>
                        <h2 className='text-2xl font-bold'>Avis</h2>
                        {avis.map((avi) => (
                            <div key={avi.id}>
                                <p><span className='
                                    font-bold
                                    text-blue-500
                                '>{avi.User.username}</span>: {new Date(avi.createdAt).toLocaleDateString()}</p>
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
                <ReservationForm restaurantId={id} controls={modal} />
            </Modal>
        </div>
    )
}

export default Restaurant