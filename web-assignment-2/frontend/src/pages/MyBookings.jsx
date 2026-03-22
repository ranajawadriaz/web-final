import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

function MyBookings() {
    const loggedInUser = useSelector((state) => state.user.loggedInUser)
    const bookings = useSelector((state) => state.ride.bookings)
    const rides = useSelector((state) => state.ride.rides)
    const navigate = useNavigate()

    if (!loggedInUser) {
        return (
            <div className="container" style={{marginTop:'30px', textAlign:'center'}}>
                <h2>Please login to view your bookings</h2>
                <button className="btn btn-primary" onClick={() => navigate('/login')}>Go to Login</button>
            </div>
        )
    }

    let myBookings = bookings.filter(b => b.userId == loggedInUser.id)

    return (
        <div>
            <div className="page-header">
                <h1>My Bookings</h1>
                <p>Rides you have booked</p>
            </div>

            <div className="container" style={{marginTop:'30px', marginBottom:'40px'}}>
                {myBookings.length == 0 ? (
                    <div className="alert alert-info" style={{textAlign:'center'}}>
                        You haven't booked any rides yet. <Link to="/rides">Browse Rides</Link>
                    </div>
                ) : (
                    <div className="row">
                        {myBookings.map((booking) => {
                            let ride = rides.find(r => r.id == booking.rideId)
                            if (!ride) return null

                            return (
                                <div className="col-sm-12 col-md-6 col-lg-4" key={booking.id} style={{marginTop:'20px'}}>
                                    <div className="card">
                                        <div className="card-body">
                                            <h5>{ride.pickup} &rarr; {ride.destination}</h5>
                                            <p><strong>Driver:</strong> {ride.driverName}</p>
                                            <p><strong>Time:</strong> {new Date(ride.departureTime).toLocaleString()}</p>
                                            <p><strong>Vehicle:</strong> {ride.vehicleType}</p>
                                            <p><strong>Contact:</strong> {ride.contact}</p>
                                            <Link to={'/rides/' + ride.id} className="btn btn-primary btn-sm">View Ride</Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyBookings
