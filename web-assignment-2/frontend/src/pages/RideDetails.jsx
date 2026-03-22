import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { bookRide } from '../slices/rideSlice'

function RideDetails() {
    const { id } = useParams()
    const rides = useSelector((state) => state.ride.rides)
    const loggedInUser = useSelector((state) => state.user.loggedInUser)
    const bookings = useSelector((state) => state.ride.bookings)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    let ride = rides.find(r => r.id == id)

    if (!ride) {
        return (
            <div className="container" style={{marginTop:'30px', textAlign:'center'}}>
                <h2>Ride not found!</h2>
                <Link to="/rides" className="btn btn-primary">Back to Rides</Link>
            </div>
        )
    }

    function handleBook() {
        if (!loggedInUser) {
            alert('Please login to book a ride!')
            navigate('/login')
            return
        }

        if (ride.availableSeats <= 0) {
            alert('No seats available!')
            return
        }

        if (ride.driverId == loggedInUser.id) {
            alert('You cannot book your own ride!')
            return
        }

        let alreadyBooked = bookings.find(b => b.rideId == ride.id && b.userId == loggedInUser.id)
        if (alreadyBooked) {
            alert('You have already booked this ride!')
            return
        }

        let booking = {
            id: bookings.length + 1,
            rideId: ride.id,
            userId: loggedInUser.id,
            userName: loggedInUser.name
        }

        dispatch(bookRide(booking))
        alert('Ride booked successfully!')
    }

    return (
        <div>
            <div className="page-header">
                <h1>Ride Details</h1>
                <p>{ride.pickup} to {ride.destination}</p>
            </div>

            <div className="container" style={{marginTop:'30px', marginBottom:'40px'}}>
                <div className="row">
                    <div className="col-md-8" style={{margin:'0 auto', float:'none'}}>
                        <div className="card">
                            <div className="card-header bg-dark" style={{color:'white'}}>
                                <h3>Ride Information</h3>
                            </div>
                            <div className="card-body">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td><strong>Driver</strong></td>
                                            <td>{ride.driverName}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Pickup Location</strong></td>
                                            <td>{ride.pickup}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Destination</strong></td>
                                            <td>{ride.destination}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Departure Time</strong></td>
                                            <td>{new Date(ride.departureTime).toLocaleString()}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Available Seats</strong></td>
                                            <td>{ride.availableSeats}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Vehicle Type</strong></td>
                                            <td>{ride.vehicleType}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Contact</strong></td>
                                            <td>{ride.contact}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Notes</strong></td>
                                            <td>{ride.notes}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div style={{display:'flex', gap:'10px'}}>
                                    {ride.availableSeats > 0 ? (
                                        <button className="btn btn-primary" onClick={handleBook}>Book This Ride</button>
                                    ) : (
                                        <button className="btn btn-secondary" disabled>Fully Booked</button>
                                    )}
                                    <Link to={'/profile/' + ride.driverId} className="btn btn-outline-primary">
                                        View Driver Profile
                                    </Link>
                                    <Link to="/rides" className="btn btn-outline-secondary">Back to Rides</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RideDetails
