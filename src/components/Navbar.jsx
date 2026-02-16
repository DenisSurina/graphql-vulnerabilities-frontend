import { Link, NavLink } from 'react-router-dom'

function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">The Book Nook</Link>
      <div className="navbar-links">
        <NavLink to="/books">Browse</NavLink>
        {user && <NavLink to="/my-books">My Books</NavLink>}
        {user?.role === 'admin' && <NavLink to="/admin">Admin</NavLink>}
      </div>
      <div className="navbar-right">
        {user ? (
          <>
            <span className="navbar-username">{user.username}</span>
            <button className="btn-logout" onClick={onLogout}>Log out</button>
          </>
        ) : (
          <>
            <Link to="/login">Sign in</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
