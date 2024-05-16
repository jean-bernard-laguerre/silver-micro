import React, { useState } from 'react'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button.jsx'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

import Avis from '@/services/api/avis'

const formSchema = z.object({
    rating: z.coerce.number().min(1, 'Please select a rating').max(5, 'Please select a rating between 1 and 5'),
    review: z.string().min(1, 'Please enter a comment').optional()
})

const ReviewForm = ({ restaurantId, update, reviewed, commentId }) => {

    const reviewForm = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            rating: 1,
        }
    })

    const onSubmit = (data) => {
        data.restaurantId = restaurantId
        if (reviewed) {
            data.id = commentId
            Avis.update(data).then((response) => {
                if (response.avis) {
                    update()
                    reviewForm.reset()
                }
            })
        } else {
            Avis.create(data).then((response) => {
                if (response.avis) {
                    update()
                    reviewForm.reset()
                }
            })
        }
    }

    return (
        <Form {...reviewForm}>
            <form onSubmit={reviewForm.handleSubmit(onSubmit)}>
                <FormField 
                    name='rating'
                    label='Note'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Note</FormLabel>
                            <FormControl>
                                <select {...field} className='p-2 border border-gray-300 rounded'>
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                    <option value='4'>4</option>
                                    <option value='5'>5</option>
                                </select>
                            </FormControl>
                            <FormMessage>{reviewForm.formState.errors.rating?.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    name='review'
                    label='Commentaire'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Commentaire</FormLabel>
                            <FormControl>
                                <textarea {...field} className='p-2 border border-gray-300 rounded' />
                            </FormControl>
                            <FormMessage>{reviewForm.formState.errors.review?.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <Button type='submit'>
                    {reviewed ? 'Modifier' : 'Ajouter'}
                </Button>
            </form>
        </Form>
    )
}

export default ReviewForm