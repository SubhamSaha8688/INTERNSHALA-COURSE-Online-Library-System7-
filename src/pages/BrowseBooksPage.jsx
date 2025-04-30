
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchBooks } from "../redux/booksSlice"
import { Search } from "lucide-react"
import "../styles/browse.css"

const categories = ["All", "Fiction", "Non-Fiction", "Sci-Fi", "Mystery", "Romance", "Biography", "History", "Fantasy"]

const BrowseBooksPage = () => {
  const { category } = useParams()
  const dispatch = useDispatch()
  const { books, loading } = useSelector((state) => state.books)
  const [searchTerm, setSearchTerm] = useState("")
  const [visibleCategories, setVisibleCategories] = useState([])

  useEffect(() => {
   
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCategories(categories.slice(0, 4))
      } else {
        setVisibleCategories(categories)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    dispatch(fetchBooks())

    
    const justAdded = sessionStorage.getItem("bookJustAdded")
    if (justAdded) {
     
      sessionStorage.removeItem("bookJustAdded")
    }
  }, [dispatch])


  const filteredByCategory = category
    ? books.filter((book) => book.category.toLowerCase() === category.toLowerCase())
    : books

  
  const filteredBooks = searchTerm
    ? filteredByCategory.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : filteredByCategory

  return (
    <div className="browse-page">
      <h1 className="page-title">
        {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Books` : "All Books"}
      </h1>

      {/* Search Bar */}
      <div className="search-container">
        <div className="search-icon">
          <Search />
        </div>
        <input
          type="text"
          placeholder="Search by title or author..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Category Filters */}
      <div className="category-filters">
        {categories.map((cat) => (
          <Link
            key={cat}
            to={cat === "All" ? "/books" : `/books/${cat.toLowerCase()}`}
            className={`category-filter ${
              (cat === "All" && !category) || (category && cat.toLowerCase() === category.toLowerCase()) ? "active" : ""
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      {/* Books Grid */}
      {loading ? (
        <p className="loading-text">Loading books...</p>
      ) : filteredBooks.length === 0 ? (
        <div className="no-books">
          <p>No books found. Try a different search or category.</p>
        </div>
      ) : (
        <div className="books-grid">
          {filteredBooks.map((book) => (
            <div key={book.id} className="book-card">
              <div className="book-cover">
                <img
                  src={book.coverImage || "/placeholder.svg?height=192&width=320"}
                  alt={book.title}
                  className="book-image"
                />
              </div>
              <div className="book-info">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">by {book.author}</p>
                <p className="book-category">{book.category}</p>
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
    </div>
  )
}

export default BrowseBooksPage
