import React, { useEffect, useState, useContext } from 'react'
import ReservationsAPI from '@/services/api/reservations'
import AuthContext from '@/contexts/authContext'

const Reservations = () => {

    const [reservations, setReservations] = useState([])
    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        ReservationsAPI.getByUser(currentUser.id).then((response) => {
            setReservations(response.reservations)
        })
    }, [])

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
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Reservations