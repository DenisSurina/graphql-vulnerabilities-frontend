import { useQuery } from '@apollo/client/react'
import { GET_MY_BOOKS } from '../graphql/queries.js'
import BookCard from '../components/BookCard.jsx'

function MyBooksPage({ user }) {
  const { data, loading, error } = useQuery(GET_MY_BOOKS)

  if (loading) return <div className="loading">Loading your books...</div>
  if (error) return <div className="error-message">{error.message}</div>

  const books = data?.myBooks || []

  return (
    <div>
      <div className="page-header">
        <h1>My Library</h1>
        <span style={{ color: 'var(--color-ink-muted)', fontSize: '0.9rem' }}>
          {books.length} book{books.length !== 1 ? 's' : ''}
        </span>
      </div>

      {books.length === 0 ? (
        <div className="empty-state">
          <p>Your library is empty. Browse the collection to find your next read.</p>
        </div>
      ) : (
        <div className="books-grid">
          {books.map((book) => (
            <BookCard key={book.id} book={book} user={user} owned={true} onBuy={() => {}} />
          ))}
        </div>
      )}
    </div>
  )
}

export default MyBooksPage
