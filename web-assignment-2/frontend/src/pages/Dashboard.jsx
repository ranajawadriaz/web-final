import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Dashboard() {
    const rides = useSelector((state) => state.ride.rides)
    const loggedInUser = useSelector((state) => state.user.loggedInUser)

    let recentRides = rides.slice(0, 6)

    return (
        <div>
            <div className="hero-banner">
                <div className="container">
                    <h1>Campus Ride Sharing Board</h1>
                    <p>Find and share rides within the campus community</p>
                    {loggedInUser ? (
                        <div>
                            <p style={{fontSize:'18px'}}>Welcome back, {loggedInUser.name}!</p>
                            <Link to="/post-ride" className="btn btn-light btn-lg">Post a Ride</Link>
                        </div>
                    ) : (
                        <Link to="/login" className="btn btn-light btn-lg">Login to Get Started</Link>
                    )}
                </div>
            </div>

            <div className="container" style={{marginTop:'30px', marginBottom:'40px'}}>
                <h2 style={{textAlign:'center'}}>Available Rides</h2>
                <div className="row" style={{marginTop:'20px'}}>
                    {recentRides.map((ride) => (
                        <div className="col-sm-12 col-md-6 col-lg-4" key={ride.id} style={{marginTop:'20px'}}>
                            <div className="card" style={{marginBottom:'10px'}}>
                                <div className="card-body" style={{textAlign:'center'}}>
                                    <h5>{ride.pickup} &rarr; {ride.destination}</h5>
                                    <p><strong>Driver:</strong> {ride.driverName}</p>
                                    <p><strong>Seats:</strong> {ride.availableSeats}</p>
                                    <p><strong>Vehicle:</strong> {ride.vehicleType}</p>
                                    <Link to={'/rides/' + ride.id} className="btn btn-primary btn-sm">View Details</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{textAlign:'center', marginTop:'20px'}}>
                    <Link to="/rides" className="btn btn-outline-primary">View All Rides</Link>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
