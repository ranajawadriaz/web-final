import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    rides: [
        {
            id: 1, driverId: 1, driverName: 'Ahmed Khan',
            pickup: 'Main Gate UMT', destination: 'Johar Town',
            departureTime: '2026-03-18T08:00', availableSeats: 3,
            vehicleType: 'Car', contact: '0300-1234567',
            notes: 'Leaving sharp at 8 AM. AC car available.'
        },
        {
            id: 2, driverId: 2, driverName: 'Sara Ali',
            pickup: 'Hostel Gate UMT', destination: 'Model Town',
            departureTime: '2026-03-18T09:30', availableSeats: 2,
            vehicleType: 'Car', contact: '0321-9876543',
            notes: 'Daily commute ride. Ladies preferred.'
        },
        {
            id: 3, driverId: 3, driverName: 'Usman Tariq',
            pickup: 'UMT Back Gate', destination: 'Gulberg',
            departureTime: '2026-03-19T07:30', availableSeats: 4,
            vehicleType: 'Van', contact: '0333-5556667',
            notes: 'Comfortable van. Daily ride available.'
        },
        {
            id: 4, driverId: 1, driverName: 'Ahmed Khan',
            pickup: 'Main Gate UMT', destination: 'DHA Phase 5',
            departureTime: '2026-03-18T17:00', availableSeats: 2,
            vehicleType: 'Car', contact: '0300-1234567',
            notes: 'Evening ride after classes.'
        },
        {
            id: 5, driverId: 2, driverName: 'Sara Ali',
            pickup: 'UMT Main Gate', destination: 'Wapda Town',
            departureTime: '2026-03-20T15:00', availableSeats: 1,
            vehicleType: 'Bike', contact: '0321-9876543',
            notes: 'Quick ride on bike. Helmet provided.'
        },
        {
            id: 6, driverId: 3, driverName: 'Usman Tariq',
            pickup: 'UMT', destination: 'Lahore Airport',
            departureTime: '2026-03-22T06:00', availableSeats: 3,
            vehicleType: 'Car', contact: '0333-5556667',
            notes: 'Airport drop. Please book in advance.'
        }
    ],
    rideRequests: [],
    bookings: []
}

const rideSlice = createSlice({
    name: 'ride',
    initialState,
    reducers: {
        addRide: (state, action) => {
            state.rides.push(action.payload)
        },
        bookRide: (state, action) => {
            let ride = state.rides.find(r => r.id == action.payload.rideId)
            if (ride && ride.availableSeats > 0) {
                ride.availableSeats = ride.availableSeats - 1
                state.bookings.push(action.payload)
            }
        },
        addRideRequest: (state, action) => {
            state.rideRequests.push(action.payload)
        }
    }
})

export const { addRide, bookRide, addRideRequest } = rideSlice.actions
export default rideSlice.reducer
