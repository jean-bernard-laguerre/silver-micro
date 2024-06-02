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
        <div className='flex-1 w-full p-3 container'>
            <h1 className='text-3xl font-bold my-2'>Mes Restaurants</h1>
            <div className='flex flex-col w-full'>
                {positions.map((position) => (
                    <div className='flex border border-gray-300 shadow-sm my-2' key={position.id}>
                        <img src={`https://source.unsplash.com/400x400/?${position.Restaurant.category}-nourriture`} alt='restaurant' className='w-36 h-36 object-cover' />
                        <div key={position.id}
                            className='flex flex-col w-full p-3 cursor-pointer'
                            onClick={() => window.location.href = `/admin/restaurant/${position.Restaurant.id}`}
                        >
                            <p>{position.role}</p>
                            <h2>{position.Restaurant.name}</h2>
                            <p>{position.Restaurant.description}</p>
                            <p>{position.Restaurant.Avis?.averageRating}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminRestaurants