import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '@/contexts/authContext'
import { useParams } from 'react-router-dom'

import Responsables from '@/services/api/responsables'
import Restaurants from '@/services/api/restaurants'

import { Tabs, TabsContent, TabsTrigger, TabsList } from '@/components/ui/tabs'


const AdminRestaurant = () => {

    const { currentUser } = useContext(AuthContext)
    const { id } = useParams()

    if (currentUser.role !== 'admin') {
        window.location.href = '/'
    }

    const [restaurant, setRestaurant] = useState(null)
    const [loadingRestaurant, setLoadingRestaurant] = useState(true)
    const [team, setTeam] = useState()
    const [loadingTeam, setLoadingTeam] = useState(true)

    useEffect(() => {
        Restaurants.getOne(id).then((response) => {
            setRestaurant(response.restaurant)
            setLoadingRestaurant(false)
        })
    }, [id])

    useEffect(() => {
        Responsables.getByRestaurant(id).then((response) => {
            setTeam(response.responsables)
            setLoadingTeam(false)
        })
    }, [id])

    return (
        <div className='flex-1 w-full p-3'>
            <Tabs
                className="w-full"  
                defaultValue='Info'
            >
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value='Info'>Informations</TabsTrigger>
                    <TabsTrigger value='Team'>Equipe</TabsTrigger>
                    <TabsTrigger value='Book'>Reservations</TabsTrigger>
                </TabsList>
                <TabsContent value='Info'>
                    <h1>{restaurant?.name}</h1>
                </TabsContent>
                <TabsContent value='Team'>

                </TabsContent>
                <TabsContent value='Book'>

                </TabsContent>
            </Tabs>
        </div>
    )
}

export default AdminRestaurant