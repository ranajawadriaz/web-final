import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../slices/userSlice'
import { useNavigate, Link } from 'react-router-dom'

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const users = useSelector((state) => state.user.users)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleRegister() {
        if (name == '' || email == '' || password == '' || phone == '') {
            alert('Please fill all fields!')
            return
        }

        let existingUser = users.find(u => u.email == email)
        if (existingUser) {
            alert('This email is already registered!')
            return
        }

        let newUser = {
            id: users.length + 1,
            name: name,
            email: email,
            password: password,
            phone: phone
        }

        dispatch(register(newUser))
        alert('Registration successful! Please login.')
        navigate('/login')
    }

    return (
        <div>
            <div className="page-header">
                <h1>Register</h1>
                <p>Create a new account</p>
            </div>

            <div className="container" style={{marginTop:'30px', marginBottom:'40px'}}>
                <div className="row">
                    <div className="col-md-6" style={{margin:'0 auto', float:'none'}}>
                        <div className="card">
                            <div className="card-header bg-dark" style={{color:'white', textAlign:'center'}}>
                                <h3>Register</h3>
                            </div>
                            <div className="card-body">
                                <div className="mb-3">
                                    <label className="form-label">Full Name:</label>
                                    <input type="text" className="form-control" placeholder="Enter your name"
                                        value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
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
                                <div className="mb-3">
                                    <label className="form-label">Phone Number:</label>
                                    <input type="text" className="form-control" placeholder="Enter your phone number"
                                        value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <button className="btn btn-primary" style={{width:'100%'}} onClick={handleRegister}>
                                    Register
                                </button>
                                <p style={{textAlign:'center', marginTop:'15px'}}>
                                    Already have an account? <Link to="/login">Login here</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
