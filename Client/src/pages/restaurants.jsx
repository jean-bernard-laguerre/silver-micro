import React, { useEffect, useState } from 'react'
import Restaurants from '@/services/api/restaurants'
import { useParams } from 'react-router-dom'

const RestaurantsList = () => {

    const { category } = useParams()
    const [restaurants, setRestaurants] = useState(null)
    const [loading, setLoading] = useState(true)
    const [filterCategory, setFilterCategory] = useState(category || '')
    const [search, setSearch] = useState('')

    useEffect(() => {
        if (search !== "" || filterCategory !== "") {
            Restaurants.search(search, filterCategory).then((response) => {
                setRestaurants(response.restaurants)
                setLoading(false)
            })
        } else {
            Restaurants.get().then((response) => {
                setRestaurants(response.restaurants)
                setLoading(false)
            })
        }
    }, [search, filterCategory])

    return (
        <div className='flex-1 flex flex-col w-full'>
            <div className='flex flex-row space-x-4'>
                <input type='text' placeholder='Rechercher un restaurant' 
                    className='p-2 border border-gray-300 rounded'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}
                    className='p-2 border border-gray-300 rounded'
                >
                    <option value=''>Toutes les catégories</option>
                    <option value='fast-food'>Fast Food</option>
                    <option value='italian'>Italien</option>
                    <option value='japanese'>Japonais</option>
                    <option value='chinese'>Chinois</option>
                    <option value='french'>Français</option>
                    <option value='american'>Américain</option>
                </select>
            </div>
            {loading && (
                <div>Loading...</div>
            )} 
            {!!restaurants && (
                <div className='flex flex-row flex-wrap'>
                    {restaurants.map((restaurant) => (
                        <div key={restaurant.id} className='w-1/3 p-4'>
                            <div className='bg-white shadow-lg rounded-lg'>
                                <div className='p-4'>
                                    <h2 className='font-bold text-xl'>{restaurant.name}</h2>
                                    <p className='text-gray-500'>{restaurant.description}</p>
                                    <p className='text-gray-500'>{restaurant.averageRating} ({restaurant.nbAvis} Avis)</p>
                                    <div className='mt-4'>
                                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                                            onClick={() => window.location.href = `/restaurant/${restaurant.id}`}
                                        >
                                            Voir le restaurant
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default RestaurantsList