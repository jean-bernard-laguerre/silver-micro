import React from 'react'
import { categories } from '@/services/variables'
import { Star, StarOff } from 'lucide-react'

const RestaurantsSidemenu = ({
    search, setSearch, filterCategory, setFilterCategory
}) => {
    return (
        <div className='flex w-1/4 md:max-w-80 flex-col p-3 bg-black/90 sm:w-full '>
            <input type='text' placeholder='Rechercher un restaurant' 
                className='p-2 my-2 border border-gray-300 bg-white'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}
                className='p-2 border border-gray-300 mb-2'
            >
                <option value=''>Toutes les catégories</option>
                {categories?.map((category) => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>

            <div className='bg-white p-2'>
                <h2 className='text-lg font-bold mt-4'>Filtres additionnels</h2>
                <div className='flex flex-col space-y-2 mt-2 px-3 pb-3'>
                    <span>Note minimale</span>
                    {[1, 2, 3, 4, 5].map((rating) => (
                        <label key={rating} className='flex items-center px-3'>
                            <input type='radio' name='rating' value={rating} className='mr-2' />
                            <span className='flex'>{
                                Array.from({ length: 5 }, (_, i) => (
                                    <span key={i}>
                                        {i < rating ? 
                                            <Star size={20} className='text-yellow-500' fill='gold' />
                                            : 
                                            <StarOff size={20} className='text-gray-300' />}
                                    </span>
                                ))    
                            }</span>
                        </label>
                    ))}
                </div>
                <div className='flex flex-col space-y-2 mt-2 px-3 pb-3'>
                    <span>Capacité</span>
                    <label className='flex items-center px-3'>
                        <input type='radio' name='capacity' value='1' className='mr-2' />
                        <span>1-20 personnes</span>
                    </label>
                    <label className='flex items-center px-3'>
                        <input type='radio' name='capacity' value='2' className='mr-2' />
                        <span>21-50 personnes</span>
                    </label>
                    <label className='flex items-center px-3'>
                        <input type='radio' name='capacity' value='3' className='mr-2' />
                        <span>51-100+ personnes</span>
                    </label>
                </div>
                <div className='flex flex-col space-y-2 mt-2 px-3 pb-3'>
                    <span>Distance</span>
                    <label className='flex items-center px-3'>
                        <input type='radio' name='distance' value='1' className='mr-2' />
                        <span>1-5km</span>
                    </label>
                    <label className='flex items-center px-3'>
                        <input type='radio' name='distance' value='2' className='mr-2' />
                        <span>6-10km</span>
                    </label>
                    <label className='flex items-center px-3'>
                        <input type='radio' name='distance' value='3' className='mr-2' />
                        <span>11-20km</span>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default RestaurantsSidemenu