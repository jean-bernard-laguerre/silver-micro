import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '@/contexts/authContext'
import { useParams } from 'react-router-dom'

import Responsables from '@/services/api/responsables'
import Restaurants from '@/services/api/restaurants'
import Reservations from '@/services/api/reservations'
import Avis from '@/services/api/avis'

import { Tabs, TabsContent, TabsTrigger, TabsList } from '@/components/ui/tabs'
import TeamTable from '@/components/admin/teamTable'
import RestaurantDashboard from '@/components/admin/restaurantDashboard'
import ReservationDashboard from '@/components/admin/reservationDashboard'
import Modal from '@/components/layout/modal'
import useModal from '@/hooks/useModal'
import RestaurantEdit from '@/components/forms/restaurantEdit'
import { Button } from '@/components/ui/button'


const AdminRestaurant = () => {

    const modal = useModal()
    const { currentUser } = useContext(AuthContext)
    const { id } = useParams()

    if (currentUser.role !== 'admin') {
        window.location.href = '/'
    }

    const [restaurant, setRestaurant] = useState(null)
    const [loadingRestaurant, setLoadingRestaurant] = useState(true)
    const [team, setTeam] = useState()
    const [date, setDate] = useState(null)
    const [loadingTeam, setLoadingTeam] = useState(true)
    const [reservations, setReservations] = useState()
    const [availability, setAvailability] = useState()
    const [loadingReservations, setLoadingReservations] = useState(true)
    const [avis, setAvis] = useState()
    const [loadingAvis, setLoadingAvis] = useState(true)

    const getRestaurant = () => {
        Restaurants.getOne(id).then((response) => {
            setRestaurant(response.restaurant)
            setLoadingRestaurant(false)
        })
    }

    useEffect(() => {
        getRestaurant()
    }, [id])

    useEffect(() => {
        Responsables.getByRestaurant(id).then((response) => {
            setTeam(response.responsables)
            setLoadingTeam(false)
        })
    }, [id])

    useEffect(() => {
        date && Reservations.getAvailability(id, date).then((response) => {
            setAvailability(response.availability)
        })
    }, [date, id])

    useEffect(() => {
        Avis.getByRestaurant(id).then((response) => {
            setAvis(response.avis)
            setLoadingAvis(false)
        })
    }, [id])

    const deleteTeamMember = (id) => {
        Responsables.delete(id).then(() => {
            setTeam(team.filter((member) => member.id !== id))
        })
    }

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
                <TabsContent className='container' value='Info'>
                    <RestaurantDashboard 
                        restaurant={restaurant}
                        modal={modal}
                        avis={avis}
                    />
                </TabsContent>
                <TabsContent className='container' value='Team'>
                    <TeamTable team={team} />
                </TabsContent>
                <TabsContent className='container' value='Book'>
                    <ReservationDashboard setDate={setDate} />
                </TabsContent>
            </Tabs>
            <Modal
                controls={modal}
            >
                <RestaurantEdit
                    restaurant={restaurant}
                    update={getRestaurant}
                />
            </Modal>
        </div>
    )
}

export default AdminRestaurant