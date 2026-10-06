import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Register() {
  const [form,    setForm]    = useState({ username: '', email: '', password: '', phone: '', course: '' })
  const [message, setMessage] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleRegister = async () => {
    if (!form.username || !form.email || !form.password) {
      setMessage('Username, email and password are required.')
      return
    }
    try {
      const res = await axios.post('/api/auth/register', form)
      setMessage(res.data.message)
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed.')
    }
  }

  return (
    <div className="page">
      <div className="card">
        <h1>Student Registration</h1>
        <p className="subtitle">Create your account</p>

        <div className="form">
          <label>Username</label>
          <input type="text"     name="username" placeholder="Enter your username"     value={form.username} onChange={handleChange} />

          <label>Email</label>
          <input type="email"    name="email"    placeholder="Enter your email"        value={form.email}    onChange={handleChange} />

          <label>Password</label>
          <input type="password" name="password" placeholder="Enter your password"    value={form.password} onChange={handleChange} />

          <label>Phone Number</label>
          <input type="tel"      name="phone"    placeholder="Enter your phone number" value={form.phone}    onChange={handleChange} />

          <label>Course</label>
          <select name="course" value={form.course} onChange={handleChange}>
            <option value="">Select a course</option>
            <option value="cse">Computer Science</option>
            <option value="ise">Information Science</option>
            <option value="ece">Electronics &amp; Communication</option>
            <option value="me">Mechanical Engineering</option>
          </select>

          <button onClick={handleRegister}>Register</button>
        </div>

        {message && <p className="message">{message}</p>}

        <p className="switch">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
