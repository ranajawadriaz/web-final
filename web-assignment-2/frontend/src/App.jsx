import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import AllRides from './pages/AllRides'
import RideDetails from './pages/RideDetails'
import PostRide from './pages/PostRide'
import RequestRide from './pages/RequestRide'
import MyBookings from './pages/MyBookings'
import ChangePassword from './pages/ChangePassword'
import UserProfile from './pages/UserProfile'
import './App.css'

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/rides" element={<AllRides />} />
                <Route path="/rides/:id" element={<RideDetails />} />
                <Route path="/post-ride" element={<PostRide />} />
                <Route path="/request-ride" element={<RequestRide />} />
                <Route path="/my-bookings" element={<MyBookings />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/profile/:userId" element={<UserProfile />} />
            </Routes>
            <footer className="bg-dark" style={{color:'white', padding:'20px', textAlign:'center', marginTop:'auto'}}>
                <p>&copy; 2026 Campus Ride Sharing - UMT</p>
            </footer>
        </BrowserRouter>
    )
}

export default App
