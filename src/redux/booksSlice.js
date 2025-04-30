import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


const initialBooks = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Fiction",
    description:
      "The story of young Scout Finch, her brother Jem, and their father Atticus, as they navigate through issues of race and class in the Depression-era South.",
    rating: 4.8,
    publishedYear: 1960,
    coverImage:
      "https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg",
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    category: "Fiction",
    description:
      "A dystopian novel set in a totalitarian society where critical thought is suppressed under a regime of surveillance and propaganda.",
    rating: 4.7,
    publishedYear: 1949,
    coverImage: "https://upload.wikimedia.org/wikipedia/commons/c/c3/1984first.jpg",
  },
  {
    id: 3,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    category: "Fantasy",
    description:
      "The adventure of Bilbo Baggins, a hobbit who embarks on an unexpected journey to reclaim the Lonely Mountain from the dragon Smaug.",
    rating: 4.6,
    publishedYear: 1937,
    coverImage: "https://upload.wikimedia.org/wikipedia/en/4/4a/TheHobbit_FirstEdition.jpg",
  },
  {
    id: 4,
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Non-Fiction",
    description:
      "A landmark volume in science writing that explores the nature of time, the universe, and our place within it.",
    rating: 4.5,
    publishedYear: 1988,
    coverImage: "https://upload.wikimedia.org/wikipedia/en/8/8e/A_Brief_History_of_Time.jpg",
  },
  {
    id: 5,
    title: "Dune",
    author: "Frank Herbert",
    category: "Sci-Fi",
    description:
      "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world.",
    rating: 4.9,
    publishedYear: 1965,
    coverImage: "https://upload.wikimedia.org/wikipedia/en/d/de/Dune-Frank_Herbert_%281965%29_First_edition.jpg",
  },
  {
    id: 6,
    title: "The Da Vinci Code",
    author: "Dan Brown",
    category: "Mystery",
    description:
      "A mystery thriller novel that follows symbologist Robert Langdon as he investigates a murder in Paris's Louvre Museum.",
    rating: 4.1,
    publishedYear: 2003,
    coverImage: "https://upload.wikimedia.org/wikipedia/en/6/6b/DaVinciCode.jpg",
  },
  {
    id: 7,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Romance",
    description:
      "The story follows the main character, Elizabeth Bennet, as she deals with issues of manners, upbringing, morality, education, and marriage.",
    rating: 4.7,
    publishedYear: 1813,
    coverImage: "https://upload.wikimedia.org/wikipedia/commons/1/17/PrideAndPrejudiceTitlePage.jpg",
  },
  {
    id: 8,
    title: "Steve Jobs",
    author: "Walter Isaacson",
    category: "Biography",
    description:
      "The exclusive biography of Steve Jobs, based on more than forty interviews with Jobs conducted over two years.",
    rating: 4.6,
    publishedYear: 2011,
    coverImage: "https://upload.wikimedia.org/wikipedia/en/e/e4/Steve_Jobs_by_Walter_Isaacson.jpg",
  },
  {
    id: 9,
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    category: "History",
    description:
      "A book that explores the history of the human species from the evolution of archaic human species to the 21st century.",
    rating: 4.8,
    publishedYear: 2011,
    coverImage: "https://upload.wikimedia.org/wikipedia/en/5/5e/Sapiens_A_Brief_History_of_Humankind.jpg",
  },
  {
    id: 10,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    description:
      "Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby.",
    rating: 4.3,
    publishedYear: 1925,
    coverImage: "https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg",
  },
]


const loadBooksFromStorage = () => {
  try {
    const storedBooks = localStorage.getItem("libraryBooks")
    return storedBooks ? JSON.parse(storedBooks) : null
  } catch (error) {
    console.error("Error loading books from localStorage:", error)
    return null
  }
}

const saveBooksToStorage = (books) => {
  try {
    localStorage.setItem("libraryBooks", JSON.stringify(books))
  } catch (error) {
    console.error("Error saving books to localStorage:", error)
  }
}


const getInitialBooks = () => {
  const storedBooks = loadBooksFromStorage()
  if (storedBooks) {
    return storedBooks
  }
  
  saveBooksToStorage(initialBooks)
  return initialBooks
}


export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {

  const storedBooks = loadBooksFromStorage()

  if (storedBooks) {
    return storedBooks
  }

 
  return new Promise((resolve) => {
    setTimeout(() => {
      saveBooksToStorage(initialBooks) 
      resolve(initialBooks)
    }, 500)
  })
})

const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    loading: false,
    error: null,
  },
  reducers: {
    addBook: (state, action) => {
    
      if (action.payload && action.payload.title) {
      
        state.books.unshift(action.payload)

   
        saveBooksToStorage(state.books)
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false
        state.books = action.payload
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { addBook } = booksSlice.actions
export default booksSlice.reducer
