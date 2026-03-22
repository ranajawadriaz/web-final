import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addRide } from '../slices/rideSlice'
import { useNavigate } from 'react-router-dom'

function PostRide() {
    const loggedInUser = useSelector((state) => state.user.loggedInUser)
    const rides = useSelector((state) => state.ride.rides)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [pickup, setPickup] = useState('')
    const [destination, setDestination] = useState('')
    const [departureTime, setDepartureTime] = useState('')
    const [availableSeats, setAvailableSeats] = useState('')
    const [vehicleType, setVehicleType] = useState('')
    const [contact, setContact] = useState('')
    const [notes, setNotes] = useState('')

    if (!loggedInUser) {
        return (
            <div className="container" style={{marginTop:'30px', textAlign:'center'}}>
                <h2>Please login to post a ride</h2>
                <button className="btn btn-primary" onClick={() => navigate('/login')}>Go to Login</button>
            </div>
        )
    }

    function handleSubmit() {
        if (pickup == '' || destination == '' || departureTime == '' || availableSeats == '' || vehicleType == '' || contact == '') {
            alert('Please fill all required fields!')
            return
        }

        if (availableSeats < 1) {
            alert('Available seats must be at least 1!')
            return
        }

        let newRide = {
            id: rides.length + 1,
            driverId: loggedInUser.id,
            driverName: loggedInUser.name,
            pickup: pickup,
            destination: destination,
            departureTime: departureTime,
            availableSeats: parseInt(availableSeats),
            vehicleType: vehicleType,
            contact: contact,
            notes: notes
        }

        dispatch(addRide(newRide))
        alert('Ride posted successfully!')
        navigate('/rides')
    }

    return (
        <div>
            <div className="page-header">
                <h1>Post a Ride</h1>
                <p>Offer a ride to fellow students</p>
            </div>

            <div className="container" style={{marginTop:'30px', marginBottom:'40px'}}>
                <div className="row">
                    <div className="col-md-6" style={{margin:'0 auto', float:'none'}}>
                        <div className="card">
                            <div className="card-header bg-dark" style={{color:'white', textAlign:'center'}}>
                                <h3>Ride Details</h3>
                            </div>
                            <div className="card-body">
                                <div className="mb-3">
                                    <label className="form-label">Pickup Location:</label>
                                    <input type="text" className="form-control" placeholder="Enter pickup location"
                                        value={pickup} onChange={(e) => setPickup(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Destination:</label>
                                    <input type="text" className="form-control" placeholder="Enter destination"
                                        value={destination} onChange={(e) => setDestination(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Departure Time:</label>
                                    <input type="datetime-local" className="form-control"
                                        value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Available Seats:</label>
                                    <input type="number" className="form-control" placeholder="Enter number of seats"
                                        value={availableSeats} onChange={(e) => setAvailableSeats(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Vehicle Type:</label>
                                    <select className="form-control" value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
                                        <option value="">-- Select Vehicle --</option>
                                        <option value="Car">Car</option>
                                        <option value="Bike">Bike</option>
                                        <option value="Van">Van</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Contact Number:</label>
                                    <input type="text" className="form-control" placeholder="Enter contact number"
                                        value={contact} onChange={(e) => setContact(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Notes (optional):</label>
                                    <textarea className="form-control" rows="3" placeholder="Any additional notes"
                                        value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                                </div>
                                <button className="btn btn-primary" style={{width:'100%'}} onClick={handleSubmit}>
                                    Post Ride
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostRide
