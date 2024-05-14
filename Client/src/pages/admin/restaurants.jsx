import React, { useContext, useEffect, useState } from 'react'
import Responsables from '@/services/api/responsables'
import AuthContext from '@/contexts/authContext'

const AdminRestaurants = () => {

    const { currentUser } = useContext(AuthContext)
    const [positions, setPositions] = useState([])

    if (currentUser.role !== 'admin') {
        window.location.href = '/'
    }

    useEffect(() => {
        Responsables.getOne(currentUser.id)
        .then(response => {
            setPositions(response.responsables)
        })
    }, [])

    return (
        <div className='flex-1 w-full p-3'>
            <h1>Mes Restaurants</h1>
            <div className='flex flex-col'>
                {positions.map((position) => (
                    <div key={position.id}
                        className='flex flex-col border border-gray-300 p-4 rounded-lg shadow-lg cursor-pointer'
                        onClick={() => window.location.href = `/admin/restaurant/${position.Restaurant.id}`}
                    >
                        <p>{position.role}</p>
                        <h2>{position.Restaurant.name}</h2>
                        <p>{position.Restaurant.description}</p>
                        {position.Restaurant.Avis && (
                            <p>{position.Restaurant.Avis.averageRating}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminRestaurants