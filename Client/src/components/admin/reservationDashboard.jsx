import React from 'react'

const ReservationDashboard = ({date, setDate}) => {
    return (
        <div>
            <input type="date" onChange={(e) => setDate(e.target.value)} />
        </div>
    )
}

export default ReservationDashboard