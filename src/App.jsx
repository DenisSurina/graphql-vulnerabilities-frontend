import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import WelcomePage from './pages/WelcomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import BooksPage from './pages/BooksPage.jsx'
import MyBooksPage from './pages/MyBooksPage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import './App.css'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    if (token && savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleLogin = (token, userData) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <div className="app">
      <Navbar user={user} onLogout={handleLogout} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<WelcomePage user={user} />} />
          <Route path="/login" element={
            user ? <Navigate to="/books" /> : <LoginPage onLogin={handleLogin} />
          } />
          <Route path="/register" element={
            user ? <Navigate to="/books" /> : <RegisterPage onLogin={handleLogin} />
          } />
          <Route path="/books" element={<BooksPage user={user} />} />
          <Route path="/my-books" element={
            user ? <MyBooksPage user={user} /> : <Navigate to="/login" />
          } />
          <Route path="/admin" element={
            user?.role === 'admin' ? <AdminPage /> : <Navigate to="/books" />
          } />
        </Routes>
      </main>
    </div>
  )
}

export default App
