import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message,  setMessage]  = useState('')

  const handleLogin = async () => {
    if (!username || !password) {
      setMessage('Please fill in all fields.')
      return
    }
    try {
      const res = await axios.post('/api/auth/login', { username, password })
      setMessage(res.data.message)
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed.')
    }
  }

  return (
    <div className="page">
      <div className="card">
        <h1>Sign In</h1>
        <p className="subtitle">Please enter your username and password</p>

        <div className="form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Sign In</button>
        </div>

        {message && <p className="message">{message}</p>}

        <p className="switch">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
