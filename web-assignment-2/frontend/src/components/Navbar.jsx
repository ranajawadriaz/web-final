import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../slices/userSlice'

function Navbar() {
    const loggedInUser = useSelector((state) => state.user.loggedInUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleLogout() {
        dispatch(logout())
        navigate('/')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    CampusRide
                </Link>
                <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navmenu">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navmenu">
                    <ul className="navbar-nav">
                        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/rides">All Rides</Link></li>
                        {loggedInUser && (
                            <>
                                <li className="nav-item"><Link className="nav-link" to="/post-ride">Post Ride</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/request-ride">Request Ride</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/my-bookings">My Bookings</Link></li>
                            </>
                        )}
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        {loggedInUser ? (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link">Hi, {loggedInUser.name}</span>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/change-password">Change Password</Link>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-outline-light btn-sm" style={{marginTop:'8px'}} onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
