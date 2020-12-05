import React from 'react'
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './services/BooksAPI'
import './App.css'
import BookShelf from './components/BookShelf'

class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
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
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {shelves.map((shelf) => (
                  <BookShelf
                    books={allBooks.filter((book) => (book.shelf === shelf.name))}
                    title={shelf.title}
                  />
                ))}
              </div>
            </div>
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
