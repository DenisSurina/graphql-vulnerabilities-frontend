import { useState, useMemo } from 'react'
import { useQuery, useMutation } from '@apollo/client/react'
import { GET_BOOKS, GET_MY_BOOKS, BUY_BOOK } from '../graphql/queries.js'
import BookCard from '../components/BookCard.jsx'

function BooksPage({ user }) {
  const [search, setSearch] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState(null)

  const { data, loading, error } = useQuery(GET_BOOKS, {
    variables: searchTerm ? { search: searchTerm } : {},
  })

  const { data: myBooksData } = useQuery(GET_MY_BOOKS, {
    skip: !user,
  })

  const [buyBook] = useMutation(BUY_BOOK, {
    refetchQueries: [{ query: GET_MY_BOOKS }],
  })

  const ownedIds = new Set((myBooksData?.myBooks || []).map((b) => b.id))
  const allBooks = data?.books || []

  // Build genre counts from the full list
  const genres = useMemo(() => {
    const counts = {}
    allBooks.forEach((b) => {
      counts[b.genre] = (counts[b.genre] || 0) + 1
    })
    return Object.entries(counts).sort((a, b) => a[0].localeCompare(b[0]))
  }, [allBooks])

  // Filter by selected genre
  const filteredBooks = selectedGenre
    ? allBooks.filter((b) => b.genre === selectedGenre)
    : allBooks

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchTerm(search)
    setSelectedGenre(null)
  }

  const handleBuy = async (bookId) => {
    try {
      await buyBook({ variables: { bookId } })
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="books-layout">
      <aside className="sidebar">
        <div className="sidebar-section">
          <div className="sidebar-title">Genres</div>
          <ul className="sidebar-list">
            <li>
              <button
                className={`sidebar-item ${selectedGenre === null ? 'active' : ''}`}
                onClick={() => setSelectedGenre(null)}
              >
                All Books
                <span className="sidebar-count">{allBooks.length}</span>
              </button>
            </li>
            {genres.map(([genre, count]) => (
              <li key={genre}>
                <button
                  className={`sidebar-item ${selectedGenre === genre ? 'active' : ''}`}
                  onClick={() => setSelectedGenre(genre)}
                >
                  {genre}
                  <span className="sidebar-count">{count}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="books-content">
        <div className="page-header">
          <h1>{selectedGenre || 'All Books'}</h1>
          <form onSubmit={handleSearch}>
            <input
              className="search-input"
              type="text"
              placeholder="Search by title, author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>

        {loading && <div className="loading">Loading books...</div>}
        {error && <div className="error-message">{error.message}</div>}

        {!loading && filteredBooks.length === 0 && (
          <div className="empty-state">No books found.</div>
        )}

        <div className="books-grid">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              user={user}
              owned={ownedIds.has(book.id)}
              onBuy={handleBuy}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BooksPage
