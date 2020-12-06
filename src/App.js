import React from 'react'
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './services/BooksAPI'
import './App.css'
import BookShelfList from './components/BookShelfList'

class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
    this.readAllBooks();
  }

  readAllBooks() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  updateBooksShelf(book, newShelfName) {
    if (book.shelf === newShelfName) {
      return;
    }
    BooksAPI.update(book, newShelfName)
      .then((resp) => {
        // console.log(`response from update: ${JSON.stringify(resp)}`);
        this.readAllBooks();
      })
  }

  render() {
    const allBooks = this.state.books;
    const shelves = [
      { title: "Currently Reading", name: "currentlyReading" }
      , { title: "Want to Read", name: "wantToRead" }
      , { title: "Read", name: "read" }
    ]
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search" />
              <div className="search-books-input-wrapper">
                {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
                <input type="text" placeholder="Search by title or author" />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )} />
        <Route exact path="/" render={() => (
          <div>
            <BookShelfList
              books={allBooks}
              shelves={shelves}
              title='MyReads'
              onBookshelfChange={(book, newShelf) => this.updateBooksShelf(book, newShelf)}
            />
            <div className="open-search">
              <Link to="/search" className="open-search-link">Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
