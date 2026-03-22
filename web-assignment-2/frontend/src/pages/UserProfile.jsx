import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function UserProfile() {
    const { userId } = useParams()
    const users = useSelector((state) => state.user.users)
    const rides = useSelector((state) => state.ride.rides)

    let user = users.find(u => u.id == userId)

    if (!user) {
        return (
            <div className="container" style={{marginTop:'30px', textAlign:'center'}}>
                <h2>User not found!</h2>
                <Link to="/rides" className="btn btn-primary">Back to Rides</Link>
            </div>
        )
    }

    let userRides = rides.filter(r => r.driverId == user.id)

    return (
        <div>
            <div className="page-header">
                <h1>User Profile</h1>
                <p>{user.name}</p>
            </div>

            <div className="container" style={{marginTop:'30px', marginBottom:'40px'}}>
                <div className="row">
                    <div className="col-md-6" style={{margin:'0 auto', float:'none'}}>
                        <div className="card" style={{marginBottom:'30px'}}>
                            <div className="card-header bg-dark" style={{color:'white', textAlign:'center'}}>
                                <h3>Profile Information</h3>
                            </div>
                            <div className="card-body">
                                <p><strong>Name:</strong> {user.name}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Phone:</strong> {user.phone}</p>
                            </div>
                        </div>

                        <h4>Rides Offered by {user.name}</h4>
                        {userRides.length == 0 ? (
                            <p>No rides offered yet.</p>
                        ) : (
                            userRides.map((ride) => (
                                <div className="card" key={ride.id} style={{marginTop:'15px'}}>
                                    <div className="card-body">
                                        <h5>{ride.pickup} &rarr; {ride.destination}</h5>
                                        <p><strong>Time:</strong> {new Date(ride.departureTime).toLocaleString()}</p>
                                        <p><strong>Seats:</strong> {ride.availableSeats}</p>
                                        <Link to={'/rides/' + ride.id} className="btn btn-primary btn-sm">View Details</Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
