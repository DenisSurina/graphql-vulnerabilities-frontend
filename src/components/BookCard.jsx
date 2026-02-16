function BookCard({ book, owned, user, onBuy }) {
  return (
    <div className="book-card">
      {book.imageUrl ? (
        <img src={book.imageUrl} alt={book.name} className="book-cover" />
      ) : (
        <div className="book-cover-placeholder">{book.name}</div>
      )}
      <div className="book-info">
        <h3>{book.name}</h3>
        <div className="book-author">
          {book.author} <span className="genre-badge">{book.genre}</span>
        </div>
        {book.description && (
          <p className="book-description">{book.description}</p>
        )}
        <div className="book-footer">
          <span className="book-price">${book.price.toFixed(2)}</span>
          {user ? (
            owned ? (
              <button className="btn-owned" disabled>Owned</button>
            ) : (
              <button className="btn-buy" onClick={() => onBuy(book.id)}>Buy</button>
            )
          ) : (
            <span className="login-hint">Sign in to buy</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookCard
