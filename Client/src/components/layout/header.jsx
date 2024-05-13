import React, { useContext } from 'react'
import { Button } from '../ui/button.jsx'
import { Menubar, MenubarTrigger, MenubarMenu } from '../ui/menubar.jsx'
import AuthContext from '@/contexts/authContext.jsx'

const Header = () => {

    const { currentUser, logout } = useContext(AuthContext)

    const handleLogout = () => {
        logout()
        window.location.href = '/'
    }

    return (
        <div className='flex justify-between w-full items-center pl-2'>
            <div className="flex items-center h-full py-1.5">
                    { currentUser && <>
                        <span className="text-sm">Bonjour, {currentUser.username}</span>
                    </>}
            </div>
            <Menubar className="justify-between">
                <MenubarMenu >
                    <MenubarTrigger>
                        <Button variant="link" onClick={() => window.location.href = '/'}>Accueil</Button>
                    </MenubarTrigger>
                    { currentUser ? (
                        <>
                            <MenubarTrigger>
                                <Button variant="link" onClick={() => window.location.href = '/reservations'}>Reservations</Button>
                            </MenubarTrigger>
                            <MenubarTrigger>
                                <Button variant="link" onClick={() => window.location.href = '/profile'}>Profil</Button>
                            </MenubarTrigger>
                            { currentUser.role === 'admin' && (
                                <MenubarTrigger>
                                    <Button variant="link" onClick={() => window.location.href = '/admin'}>Admin</Button>
                                </MenubarTrigger>
                            )}
                            <MenubarTrigger>
                                <Button variant="link" onClick={() => window.location.href = '/new-restaurant'}>Enregistrer un restaurant</Button>
                            </MenubarTrigger>
                            <MenubarTrigger>
                                <Button variant="link" onClick={handleLogout}>Deconnexion</Button>
                            </MenubarTrigger>
                        </>
                    ) : (
                        <>
                            <MenubarTrigger>
                                <Button variant="link" onClick={() => window.location.href = '/login'  }>Connexion</Button>
                            </MenubarTrigger>
                            <MenubarTrigger>
                                <Button variant="link" onClick={() => window.location.href = '/register'  }>Inscription</Button>
                            </MenubarTrigger>
                        </>
                    )}
                </MenubarMenu>
            </Menubar>
        </div>
    )
}

export default Header