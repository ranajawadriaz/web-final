import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changePassword } from '../slices/userSlice'
import { useNavigate } from 'react-router-dom'

function ChangePassword() {
    const loggedInUser = useSelector((state) => state.user.loggedInUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    if (!loggedInUser) {
        return (
            <div className="container" style={{marginTop:'30px', textAlign:'center'}}>
                <h2>Please login first</h2>
                <button className="btn btn-primary" onClick={() => navigate('/login')}>Go to Login</button>
            </div>
        )
    }

    function handleChangePassword() {
        if (currentPassword == '' || newPassword == '' || confirmPassword == '') {
            alert('Please fill all fields!')
            return
        }

        if (currentPassword != loggedInUser.password) {
            alert('Current password is incorrect!')
            return
        }

        if (newPassword != confirmPassword) {
            alert('New passwords do not match!')
            return
        }

        if (newPassword.length < 4) {
            alert('Password must be at least 4 characters!')
            return
        }

        dispatch(changePassword(newPassword))
        alert('Password changed successfully!')
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
    }

    return (
        <div>
            <div className="page-header">
                <h1>Change Password</h1>
                <p>Update your account password</p>
            </div>

            <div className="container" style={{marginTop:'30px', marginBottom:'40px'}}>
                <div className="row">
                    <div className="col-md-6" style={{margin:'0 auto', float:'none'}}>
                        <div className="card">
                            <div className="card-header bg-dark" style={{color:'white', textAlign:'center'}}>
                                <h3>Change Password</h3>
                            </div>
                            <div className="card-body">
                                <div className="mb-3">
                                    <label className="form-label">Current Password:</label>
                                    <input type="password" className="form-control" placeholder="Enter current password"
                                        value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">New Password:</label>
                                    <input type="password" className="form-control" placeholder="Enter new password"
                                        value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Confirm New Password:</label>
                                    <input type="password" className="form-control" placeholder="Confirm new password"
                                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>
                                <button className="btn btn-primary" style={{width:'100%'}} onClick={handleChangePassword}>
                                    Change Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword
