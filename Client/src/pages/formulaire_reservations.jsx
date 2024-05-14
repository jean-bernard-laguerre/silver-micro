import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

import ReservationAPI from '@/services/api/reservations'; // Assuming this is the API module

const formSchema = z.object({
    date: z.string().min(1, "Please select a date."),
    time: z.string().min(1, "Please select a time slot."),
    people: z.number().min(1, "Select at least one person.").max(10, "Maximum of 10 people allowed.")
});

const Reservations = () => {
    const [responseMessage, setResponseMessage] = useState('');

    const reservationForm = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date: '',
            time: '',
            people: 1
        }
    });

    const onSubmit = (data) => {
        ReservationAPI.create(data)
            .then(response => {
                if (!response.success) {
                    setResponseMessage(response.message);
                } else {
                    console.log('Reservation successful:', response);
                    makeReservation(response.reservation); // Assuming this function will update context
                    alert('Reservation successful!');
                }
            })
            .catch(error => {
                console.error('Reservation failed:', error);
                setResponseMessage('Failed to make a reservation. Please try again.');
            });
    };

    return (
        <div className='flex-1 w-full flex items-center justify-center'>
            <Form {...reservationForm}>
                <form onSubmit={reservationForm.handleSubmit(onSubmit)}
                    className='m-auto max-w-md w-full space-y-8 p-4 bg-white shadow-md rounded-md'
                >
                    <FormField
                        name="date"
                        label="Date"
                        type="date"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel htmlFor={field.name}>Date</FormLabel>
                                <FormControl>
                                    <input {...field}
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </FormControl>
                                <FormMessage fieldState={fieldState} />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="time"
                        label="Time Slot"
                        type="time"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel htmlFor={field.name}>Time Slot</FormLabel>
                                <FormControl>
                                    <input {...field}
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </FormControl>
                                <FormMessage fieldState={fieldState} />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="people"
                        label="Number of People"
                        type="number"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel htmlFor={field.name}>Number of People</FormLabel>
                                <FormControl>
                                    <input {...field}
                                        min="1"
                                        max="10"
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </FormControl>
                                <FormMessage fieldState={fieldState} />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        disabled={reservationForm.formState.isSubmitting}
                    >Make Reservation</Button>
                    {responseMessage && <p className="text-red-500">{responseMessage}</p>}
                </form>
            </Form>
        </div>
    );
};

export default Reservations;

// import React, { useState, useEffect } from 'react';

// // Fonction de récupération simulée pour simuler la récupération des emplacements disponibles à partir du backend
// const fetchAvailableSlots = async (date, people) => {
//     try {
//         // le TimeOut
//         await new Promise(resolve => setTimeout(resolve, 500));

//         // Crenaux
//         const timeSlots = ['09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM', '07:00 PM'];
//         const filteredSlots = timeSlots.filter((_, index) => index % 2 === 0 || people % 2 === 0);
//         return filteredSlots.length ? filteredSlots : ['No available slots'];

//     } catch (error) {
//         console.error('Error fetching available slots:', error);
//         return [];
//     }
// };

// const Reservations = () => {
//     const [date, setDate] = useState('');
//     const [people, setPeople] = useState(1);
//     const [slots, setSlots] = useState([]);
//     const [selectedSlot, setSelectedSlot] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [errorMessage, setErrorMessage] = useState('');

//     useEffect(() => {
//         if (date && people > 0) {
//             setIsLoading(true);
//             fetchAvailableSlots(date, people)
//                 .then(fetchedSlots => {
//                     setSlots(fetchedSlots);
//                     setIsLoading(false);
//                     if (fetchedSlots.length === 1 && fetchedSlots[0] === 'No available slots') {
//                         setSelectedSlot('');
//                     } else {
//                         setSelectedSlot(fetchedSlots[0]);
//                     }
//                 })
//                 .catch(error => {
//                     setErrorMessage('Failed to fetch available slots. Please try again.');
//                     setIsLoading(false);
//                 });
//         }
//     }, [date, people]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         alert(`Reservation confirmed for ${date} at ${selectedSlot} for ${people} people`);
//         // Implement the actual API call to make a reservation
//     };

//     return (
//         <div className='flex flex-col items-center w-full max-w-md mx-auto mt-10'>
//             <h1 className='text-2xl font-semibold'>Make a Reservation</h1>
//             {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//             <form onSubmit={handleSubmit} className="w-full mt-5 space-y-4">
//                 <div>
//                     <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date:</label>
//                     <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
//                 </div>
//                 <div>
//                     <label htmlFor="people" className="block text-sm font-medium text-gray-700">Number of People:</label>
//                     <select id="people" value={people} onChange={e => setPeople(parseInt(e.target.value, 10))} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
//                         {[...Array(10).keys()].map(n => (
//                             <option key={n+1} value={n+1}>{n+1}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <div>
//                     <label htmlFor="slot" className="block text-sm font-medium text-gray-700">Available Time Slots:</label>
//                     <select id="slot" value={selectedSlot} onChange={e => setSelectedSlot(e.target.value)} disabled={!slots.length || isLoading} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
//                         {slots.map(slot => (
//                             <option key={slot} value={slot}>{slot}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <button type="submit" disabled={!selectedSlot || isLoading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//                     {isLoading ? 'Booking...' : 'Book Reservation'}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default Reservations;
