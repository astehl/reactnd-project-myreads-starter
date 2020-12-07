import React from 'react'
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './services/BooksAPI'
import './App.css'
import BookShelfList from './components/BookShelfList'
import BookSearch from './components/BookSearch'

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
        <Route path="/search" component={BookSearch}/>
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
