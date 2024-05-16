import React, { useEffect, useState, useContext } from 'react'
import ReservationsAPI from '@/services/api/reservations'
import AuthContext from '@/contexts/authContext'
import Modal from '@/components/layout/modal'

import useModal from '@/hooks/useModal'
import ReservationEditForm from '@/components/forms/reservationEditForm'
import ReservationAPI from '@/services/api/reservations'
import { Button } from '@/components/ui/button'

const Reservations = () => {

    const controls = useModal()
    const [reservations, setReservations] = useState([])
    const { currentUser } = useContext(AuthContext)
    const [reservation, setReservation] = useState({})

    useEffect(() => {
        fetchReservations()
    }, [])

    const fetchReservations = () => {
        ReservationsAPI.getByUser(currentUser.id).then((response) => {
            setReservations(response.reservations)
        })
    }

    const editReservation = (reservation) => {
        setReservation(reservation)
        controls.open()
    }

    const deleteReservation = (reservation) => {
        ReservationAPI.delete(reservation.id).then((response) => {
            if (response.message === 'Reservation deleted') {
                fetchReservations()
            }
        })
    }

    return (
        <div>
            <h1 className='text-3xl font-bold'>Mes réservations</h1>
            <div className='flex flex-col'>
                {reservations.length === 0 && (
                    <p>Vous n'avez pas de réservations</p>
                )}
                {reservations.map((reservation) => (
                    <div key={reservation.id} className='flex flex-col'>
                        <h2 className='text-2xl font-bold'>Restaurant: {reservation?.Restaurant.name}</h2>
                        <p className='text-gray-500'>Date: {reservation?.date} à {reservation?.time}</p>
                        <p className='text-gray-500'>Nombre de personnes: {reservation?.people}</p>
                        <div className='flex space-x-2'>
                            <Button onClick={() => editReservation(reservation)}>Modifier</Button>
                            <Button onClick={() => deleteReservation(reservation)}>Supprimer</Button>
                        </div>
                    </div>
                ))}
            </div>
            <Modal
                controls={controls}
            >
                <ReservationEditForm
                    controls={controls}
                    reservation={reservation}
                    update={fetchReservations}
                    restaurantId={reservation.RestaurantId}
                />
            </Modal>
        </div>
    )
}

export default Reservations