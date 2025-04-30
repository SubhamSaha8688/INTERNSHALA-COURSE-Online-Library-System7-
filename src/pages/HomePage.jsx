

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { fetchBooks } from "../redux/booksSlice"
import "../styles/home.css"

const categories = ["Fiction", "Non-Fiction", "Sci-Fi", "Mystery", "Romance", "Biography", "History", "Fantasy"]

const HomePage = () => {
  const dispatch = useDispatch()
  const { books, loading } = useSelector((state) => state.books)

  useEffect(() => {
    dispatch(fetchBooks())
  }, [dispatch])

  
  const popularBooks = books.filter((book) => book.rating >= 4).slice(0, 4)

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Our Online Library</h1>
          <p className="hero-description">
            Discover thousands of books across various categories. Start your reading journey today!
          </p>
        </div>
      </section>

      <section className="categories-section">
        <h2 className="section-title">Book Categories</h2>
        <div className="categories-grid">
          {categories.map((category) => (
            <Link key={category} to={`/books/${category.toLowerCase()}`} className="category-card">
              <h3 className="category-title">{category}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="popular-books-section">
        <div className="section-header">
          <h2 className="section-title">Popular Books</h2>
          <Link to="/books" className="view-all-link">
            View all books
          </Link>
        </div>

        {loading ? (
          <p className="loading-text">Loading popular books...</p>
        ) : (
          <div className="books-grid">
            {popularBooks.map((book) => (
              <div key={book.id} className="book-card">
                <div className="book-cover">
                  <img
                    src={book.coverImage || "/placeholder.svg?height=160&width=320"}
                    alt={book.title}
                    className="book-image"
                  />
                </div>
                <div className="book-info">
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">by {book.author}</p>
                  <div className="book-meta">
                    <span className="book-rating">★ {book.rating}</span>
                    <Link to={`/book/${book.id}`} className="book-link">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default HomePage
