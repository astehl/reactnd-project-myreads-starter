import React from 'react'
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './services/BooksAPI'
import './App.css'
import BookShelfList from './components/BookShelfList'
import BookSearch from './components/BookSearch'

class BooksApp extends React.Component {

  state = {
    allBooks: [],
    searchResultBooks: []
  }

  componentDidMount() {
    this.readAllBooks();
  }

  readAllBooks() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          allBooks: books
        }))
      })
  }

  searchBooks(query) {
    BooksAPI.search(query)
      .then((result) => {
        const foundBooks = (result.error ? [] : result);
        this.setState(() => ({
          searchResultBooks: foundBooks
        }))
      })
  }


  updateLocalState(book, newShelfName) {
    book.shelf = newShelfName;
    this.setState((prev) => ({
      allBooks: prev.allBooks,
      searchResultBooks: prev.searchResultBooks
    }))
  }

  updateBookShelves(book, newShelfName) {
    if (book.shelf === newShelfName) {
      return;
    }
    BooksAPI.update(book, newShelfName)
      .then(() => this.updateLocalState(book, newShelfName))
  }

  updateBookShelvesFromSearch(book, newShelfName) {
    this.updateBookShelves(book, newShelfName);
    this.readAllBooks();
  }

  render() {
    const {allBooks, searchResultBooks} = this.state;
    const shelves = [
      { title: "Currently Reading", name: "currentlyReading" }
      , { title: "Want to Read", name: "wantToRead" }
      , { title: "Read", name: "read" }
    ]
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <BookSearch
            books={searchResultBooks}
            onSearchBooks={(query) => this.searchBooks(query)}
            onBookshelfChange={(book, newShelf) => this.updateBookShelvesFromSearch(book, newShelf)}
            />
        )} />
        <Route exact path="/" render={() => (
          <div>
            <BookShelfList
              books={allBooks}
              shelves={shelves}
              title='MyReads'
              onBookshelfChange={(book, newShelf) => this.updateBookShelves(book, newShelf)}
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
