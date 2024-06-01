import React from 'react'

const RestaurantDashboard = ({ restaurant, avis }) => {
    return (
        <>
            <div className='flex flex-col'>
                <h1 className='text-2xl font-bold'>{restaurant?.name}</h1>
                <p><span className='font-bold'>Categorie: </span>{restaurant?.category}</p>
                <p><span className='font-bold'>Description: </span>{restaurant?.description}</p>
                <p><span className='font-bold'>Adresse: </span>{restaurant?.address}</p>
                <p><span className='font-bold'>Capacité: </span>{restaurant?.capacity} places</p>
                <p><span className='font-bold'>Note:</span> {restaurant?.averageRating}</p>
            </div>
            <div className='flex flex-col'>
                <h2 className='text-xl font-bold'>Avis</h2>
                {avis && avis.map((review) => (
                    <div key={review.id}>
                        <h3>{review.User.username}</h3>
                        <p>{review.rating}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default RestaurantDashboard