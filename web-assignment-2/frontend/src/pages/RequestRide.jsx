import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addRideRequest } from '../slices/rideSlice'
import { useNavigate } from 'react-router-dom'

function RequestRide() {
    const loggedInUser = useSelector((state) => state.user.loggedInUser)
    const rideRequests = useSelector((state) => state.ride.rideRequests)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [pickup, setPickup] = useState('')
    const [destination, setDestination] = useState('')
    const [requestedTime, setRequestedTime] = useState('')
    const [notes, setNotes] = useState('')

    if (!loggedInUser) {
        return (
            <div className="container" style={{marginTop:'30px', textAlign:'center'}}>
                <h2>Please login to request a ride</h2>
                <button className="btn btn-primary" onClick={() => navigate('/login')}>Go to Login</button>
            </div>
        )
    }

    function handleSubmit() {
        if (pickup == '' || destination == '' || requestedTime == '') {
            alert('Please fill all required fields!')
            return
        }

        let newRequest = {
            id: rideRequests.length + 1,
            userId: loggedInUser.id,
            userName: loggedInUser.name,
            pickup: pickup,
            destination: destination,
            requestedTime: requestedTime,
            notes: notes
        }

        dispatch(addRideRequest(newRequest))
        alert('Ride request posted successfully!')
        navigate('/rides')
    }

    return (
        <div>
            <div className="page-header">
                <h1>Request a Ride</h1>
                <p>Looking for a ride? Post your request here</p>
            </div>

            <div className="container" style={{marginTop:'30px', marginBottom:'40px'}}>
                <div className="row">
                    <div className="col-md-6" style={{margin:'0 auto', float:'none'}}>
                        <div className="card">
                            <div className="card-header bg-dark" style={{color:'white', textAlign:'center'}}>
                                <h3>Request Details</h3>
                            </div>
                            <div className="card-body">
                                <div className="mb-3">
                                    <label className="form-label">Pickup Location:</label>
                                    <input type="text" className="form-control" placeholder="Where do you need pickup?"
                                        value={pickup} onChange={(e) => setPickup(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Destination:</label>
                                    <input type="text" className="form-control" placeholder="Where do you want to go?"
                                        value={destination} onChange={(e) => setDestination(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Preferred Time:</label>
                                    <input type="datetime-local" className="form-control"
                                        value={requestedTime} onChange={(e) => setRequestedTime(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Notes (optional):</label>
                                    <textarea className="form-control" rows="3" placeholder="Any additional details"
                                        value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                                </div>
                                <button className="btn btn-primary" style={{width:'100%'}} onClick={handleSubmit}>
                                    Submit Request
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RequestRide
