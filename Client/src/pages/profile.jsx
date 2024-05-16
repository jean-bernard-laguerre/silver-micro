import React, { useContext } from 'react'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.jsx'
import { Button } from '@/components/ui/button.jsx'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

import Users from '@/services/api/users'
import AuthContext from '@/contexts/authContext'

const formSchema = z.object({
    username: z.string().min(1, 'Please enter a username').optional(),
    email: z.string().email('Please enter a valid email address').optional(),
    password: z.string().min(8, 'Password must be at least 8 characters').optional()
})

const Profile = () => { 

    const profile = useContext(AuthContext)
    const profileForm = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: profile.currentUser?.username,
            email: profile.currentUser?.email,
        }
    })

    const onSubmit = (data) => {
        data.id = profile.currentUser.id
        Users.update(data).then((response) => {
            profile.login(response.user)
        })
    }

    return (
        <div className='flex-1 w-full p-3'>
            <h1>Profile</h1>

            <div className='w-full' id='profile'>
                <p>Username: {profile.currentUser?.username}</p>
                <p>Email: {profile.currentUser?.email}</p>
            </div>

            <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onSubmit)}>
                    <FormField
                        name='username'
                        label='Username'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <input {...field} className='p-2 border border-gray-300 rounded' />
                                </FormControl>
                                <FormMessage>{profileForm.formState.errors.username?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name='email'
                        label='Email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <input {...field} className='p-2 border border-gray-300 rounded' />
                                </FormControl>
                                <FormMessage>{profileForm.formState.errors.email?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name='password'
                        label='Password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <input {...field} type='password' className='p-2 border border-gray-300 rounded' />
                                </FormControl>
                                <FormMessage>{profileForm.formState.errors.password?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <Button type='submit'>
                        Mettre à jour
                    </Button>
                </form>
            </Form>

        </div>
    )
}

export default Profile