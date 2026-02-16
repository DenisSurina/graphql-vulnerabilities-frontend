import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { Link, useNavigate } from 'react-router-dom'
import { REGISTER } from '../graphql/queries.js'

function RegisterPage({ onLogin }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const [register, { loading }] = useMutation(REGISTER, {
    onCompleted: (data) => {
      onLogin(data.register.token, data.register.user)
      navigate('/books')
    },
    onError: (err) => {
      setError(err.message)
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    register({ variables: { username, email, password } })
  }

  return (
    <div className="auth-page">
      <h1>Register</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <p className="auth-switch">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  )
}

export default RegisterPage
