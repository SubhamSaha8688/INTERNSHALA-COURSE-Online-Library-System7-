import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addBook } from "../redux/booksSlice"
import "../styles/add-book.css"

const categories = ["Fiction", "Non-Fiction", "Sci-Fi", "Mystery", "Romance", "Biography", "History", "Fantasy"]

const AddBookPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    description: "",
    rating: "",
    publishedYear: "",
    coverImage: "",
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.author.trim()) {
      newErrors.author = "Author is required"
    }

    if (!formData.category) {
      newErrors.category = "Category is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    if (!formData.rating) {
      newErrors.rating = "Rating is required"
    } else if (isNaN(formData.rating) || formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = "Rating must be a number between 1 and 5"
    }

    if (
      formData.publishedYear &&
      (isNaN(formData.publishedYear) ||
        formData.publishedYear < 1000 ||
        formData.publishedYear > new Date().getFullYear())
    ) {
      newErrors.publishedYear = "Please enter a valid year"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      try {
        // Create new book with form data
        const newBook = {
          ...formData,
          id: Date.now(), // Generate a unique ID
          rating: Number.parseFloat(formData.rating),
          publishedYear: formData.publishedYear ? Number.parseInt(formData.publishedYear) : null,
        }

        
        dispatch(addBook(newBook))

        
        setSubmitSuccess(true)

        
        setFormData({
          title: "",
          author: "",
          category: "",
          description: "",
          rating: "",
          publishedYear: "",
          coverImage: "",
        })

       
        setTimeout(() => {
          navigate("/books")
        }, 1000)
      } catch (error) {
        console.error("Error adding book:", error)
        setErrors({ submit: "Failed to add book. Please try again." })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <div className="add-book-page">
      <h1 className="page-title">Add a New Book</h1>

      {submitSuccess && (
        <div className="success-message">Book added successfully! Redirecting to the books page...</div>
      )}

      <form onSubmit={handleSubmit} className="add-book-form">
        {errors.submit && <div className="error-banner">{errors.submit}</div>}

        <div className="form-grid">
          <div className="form-group">
            <label className="form-label" htmlFor="title">
              Title*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`form-input ${errors.title ? "error" : ""}`}
              disabled={isSubmitting}
            />
            {errors.title && <p className="error-message">{errors.title}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="author">
              Author*
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className={`form-input ${errors.author ? "error" : ""}`}
              disabled={isSubmitting}
            />
            {errors.author && <p className="error-message">{errors.author}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="category">
              Category*
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`form-select ${errors.category ? "error" : ""}`}
              disabled={isSubmitting}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && <p className="error-message">{errors.category}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="rating">
              Rating* (1-5)
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              min="1"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={handleChange}
              className={`form-input ${errors.rating ? "error" : ""}`}
              disabled={isSubmitting}
            />
            {errors.rating && <p className="error-message">{errors.rating}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="publishedYear">
              Published Year
            </label>
            <input
              type="number"
              id="publishedYear"
              name="publishedYear"
              value={formData.publishedYear}
              onChange={handleChange}
              className={`form-input ${errors.publishedYear ? "error" : ""}`}
              disabled={isSubmitting}
            />
            {errors.publishedYear && <p className="error-message">{errors.publishedYear}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="coverImage">
              Cover Image URL
            </label>
            <input
              type="text"
              id="coverImage"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              placeholder="https://example.com/book-cover.jpg"
              className="form-input"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="form-group full-width">
          <label className="form-label" htmlFor="description">
            Description*
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className={`form-textarea ${errors.description ? "error" : ""}`}
            disabled={isSubmitting}
          ></textarea>
          {errors.description && <p className="error-message">{errors.description}</p>}
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate("/books")}
            className="button button-secondary"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button type="submit" className="button button-primary" disabled={isSubmitting}>
            {isSubmitting ? "Adding Book..." : "Add Book"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddBookPage
