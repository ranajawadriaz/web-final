import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../slices/userSlice'
import { useNavigate, Link } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const users = useSelector((state) => state.user.users)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleLogin() {
        if (email == '' || password == '') {
            alert('Please fill all fields!')
            return
        }

        let foundUser = users.find(u => u.email == email && u.password == password)
        if (foundUser) {
            dispatch(login(foundUser))
            navigate('/')
        } else {
            alert('Invalid email or password!')
        }
    }

    return (
        <div>
            <div className="page-header">
                <h1>Login</h1>
                <p>Sign in to your account</p>
            </div>

            <div className="container" style={{marginTop:'30px', marginBottom:'40px'}}>
                <div className="row">
                    <div className="col-md-6" style={{margin:'0 auto', float:'none'}}>
                        <div className="card">
                            <div className="card-header bg-dark" style={{color:'white', textAlign:'center'}}>
                                <h3>Login</h3>
                            </div>
                            <div className="card-body">
                                <div className="mb-3">
                                    <label className="form-label">Email:</label>
                                    <input type="email" className="form-control" placeholder="Enter your email"
                                        value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password:</label>
                                    <input type="password" className="form-control" placeholder="Enter your password"
                                        value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <button className="btn btn-primary" style={{width:'100%'}} onClick={handleLogin}>
                                    Login
                                </button>
                                <p style={{textAlign:'center', marginTop:'15px'}}>
                                    Don't have an account? <Link to="/register">Register here</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
