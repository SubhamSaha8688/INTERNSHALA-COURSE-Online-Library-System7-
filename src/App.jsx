import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import { useEffect } from "react"
import { fetchBooks } from "./redux/booksSlice"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import BrowseBooksPage from "./pages/BrowseBooksPage"
import BookDetailsPage from "./pages/BookDetailsPage"
import AddBookPage from "./pages/AddBookPage"
import NotFoundPage from "./pages/NotFoundPage"
import "./styles/global.css"


const AppInitializer = ({ children }) => {
  useEffect(() => {
    
    store.dispatch(fetchBooks())
  }, [])

  return children
}

function App() {
  return (
    <Provider store={store}>
      <AppInitializer>
        <Router>
          <div className="app-container">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/books" element={<BrowseBooksPage />} />
                <Route path="/books/:category" element={<BrowseBooksPage />} />
                <Route path="/book/:id" element={<BookDetailsPage />} />
                <Route path="/add-book" element={<AddBookPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <footer className="footer">
              <div className="container">
                <p>© {new Date().getFullYear()} Online Library System. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </Router>
      </AppInitializer>
    </Provider>
  )
}

export default App
