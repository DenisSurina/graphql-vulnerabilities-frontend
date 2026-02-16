import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client/react'
import { GET_BOOKS, ADD_BOOK, DELETE_BOOK } from '../graphql/queries.js'

function AdminPage() {
  const [name, setName] = useState('')
  const [author, setAuthor] = useState('')
  const [genre, setGenre] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [error, setError] = useState('')

  const { data, loading } = useQuery(GET_BOOKS)

  const [addBook, { loading: adding }] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
    onCompleted: () => {
      setName('')
      setAuthor('')
      setGenre('')
      setPrice('')
      setDescription('')
      setImageUrl('')
      setError('')
    },
    onError: (err) => setError(err.message),
  })

  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
    onError: (err) => alert(err.message),
  })

  const handleAdd = (e) => {
    e.preventDefault()
    setError('')
    addBook({
      variables: {
        name,
        author,
        genre,
        price: parseFloat(price),
        description: description || null,
        imageUrl: imageUrl || null,
      },
    })
  }

  const handleDelete = (id, bookName) => {
    if (confirm(`Delete "${bookName}"?`)) {
      deleteBook({ variables: { id } })
    }
  }

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>Admin Panel</h1>

      <div className="admin-section">
        <h2>Add New Book</h2>
        {error && <div className="error-message">{error}</div>}
        <form className="admin-form" onSubmit={handleAdd}>
          <div className="form-group">
            <label>Title</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Author</label>
            <input value={author} onChange={(e) => setAuthor(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Genre</label>
            <input value={genre} onChange={(e) => setGenre(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Price ($)</label>
            <input type="number" step="0.01" min="0" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>
          <div className="form-group full-width">
            <label>Cover Image URL</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/cover.jpg"
            />
          </div>
          <div className="form-group full-width">
            <label>Description</label>
            <textarea rows="3" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <button type="submit" className="btn-primary" disabled={adding}>
            {adding ? 'Adding...' : 'Add Book'}
          </button>
        </form>
      </div>

      <div className="admin-section">
        <h2>Manage Books</h2>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <table className="books-table">
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.books.map((book) => (
                <tr key={book.id}>
                  <td>
                    {book.imageUrl ? (
                      <img src={book.imageUrl} alt="" className="books-table-thumb" />
                    ) : (
                      <div className="books-table-thumb" />
                    )}
                  </td>
                  <td>{book.name}</td>
                  <td>{book.author}</td>
                  <td><span className="genre-badge">{book.genre}</span></td>
                  <td>${book.price.toFixed(2)}</td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(book.id, book.name)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default AdminPage
