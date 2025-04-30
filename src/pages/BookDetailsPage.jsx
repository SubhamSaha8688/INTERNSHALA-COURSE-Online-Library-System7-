
import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { fetchBooks } from "../redux/booksSlice"
import { ArrowLeft, Star } from "lucide-react"
import "../styles/book-details.css"

const BookDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { books, loading } = useSelector((state) => state.books)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  useEffect(() => {
    dispatch(fetchBooks())
  }, [dispatch])

  const book = books.find((book) => book.id === Number.parseInt(id))

  if (loading) {
    return <div className="loading-container">Loading book details...</div>
  }

  if (!book) {
    return (
      <div className="not-found-container">
        <h2 className="not-found-title">Book not found</h2>
        <p className="not-found-message">The book you're looking for doesn't exist or has been removed.</p>
        <Link to="/books" className="back-button">
          <ArrowLeft className="back-icon" />
          Back to Browse
        </Link>
      </div>
    )
  }

  
  const renderStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(<Star key={i} className={`star-icon ${i <= rating ? "filled" : "empty"}`} />)
    }
    return stars
  }

  return (
    <div className="book-details-page">
      <button onClick={() => navigate(-1)} className="back-link">
        <ArrowLeft className="back-icon" />
        Back to Browse
      </button>

      <div className="book-details-card">
        <div className="book-details-layout">
          <div className="book-cover-container">
            <img
              src={book.coverImage || "/placeholder.svg?height=400&width=300"}
              alt={book.title}
              className={`book-cover-image ${isImageLoaded ? "loaded" : ""}`}
              onLoad={() => setIsImageLoaded(true)}
            />
            {!isImageLoaded && <div className="image-placeholder"></div>}
          </div>
          <div className="book-details-content">
            <h1 className="book-title">{book.title}</h1>
            <p className="book-author">by {book.author}</p>

            <div className="book-rating-container">
              <div className="stars-container">{renderStars(book.rating)}</div>
              <span className="rating-text">({book.rating} out of 5)</span>
            </div>

            <div className="book-category-tag">
              <span>{book.category}</span>
            </div>

            <div className="book-description-container">
              <h2 className="description-title">Description</h2>
              <p className="book-description">{book.description}</p>
            </div>

            {book.publishedYear && <div className="book-published">Published: {book.publishedYear}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetailsPage
