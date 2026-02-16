import { useQuery } from '@apollo/client/react'
import { Link } from 'react-router-dom'
import { GET_BOOKS } from '../graphql/queries.js'
import BookCard from '../components/BookCard.jsx'

function WelcomePage({ user }) {
  const { data } = useQuery(GET_BOOKS)
  const featured = (data?.books || []).slice(0, 4)

  return (
    <div className="welcome">
      <div className="welcome-hero">
        <h1>Welcome to The Book Nook</h1>
        <p>
          Your cozy corner of the internet for discovering great reads.
          Browse our collection, find something that catches your eye,
          and build your personal library.
        </p>
        <div className="welcome-actions">
          <Link to="/books" className="btn-primary">Browse the collection</Link>
          {!user && (
            <Link to="/register" className="btn-outline">Create an account</Link>
          )}
        </div>
      </div>

      {featured.length > 0 && (
        <div className="welcome-featured">
          <h2>A few picks to get you started</h2>
          <div className="books-grid">
            {featured.map((book) => (
              <BookCard key={book.id} book={book} user={user} owned={false} onBuy={() => {}} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default WelcomePage
