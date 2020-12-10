import React from 'react'
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './services/BooksAPI'
import './App.css'
import BookShelfList from './components/BookShelfList'
import BookSearch from './components/BookSearch'

class BooksApp extends React.Component {

  state = {
    booksInBookshelves: [],
    booksInSearchResult: []
  }

  componentDidMount() {
    this.getBooksInBookshelves();
  }

  getBooksInBookshelves() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          booksInBookshelves: books
        }));
      })
  }

  searchBooks(query) {
    BooksAPI.search(query)
      .then((result) => {
        const foundBooks = (result.error ? [] : this.withShelfSet(result));
        this.setState(() => ({
          booksInSearchResult: foundBooks
        }));
      })
  }

  withShelfSet(foundBooks) {
    const booksInBookshelves = this.state.booksInBookshelves;
    return foundBooks.map((book) => {
      const found = booksInBookshelves.find(ab => ab.id === book.id);
      book.shelf = found ? found.shelf : 'none';
      return book;
    });
  }

  updateLocalState(book, newShelfName) {
    book.shelf = newShelfName;
    this.setState((prev) => ({
      booksInBookshelves: prev.booksInBookshelves,
      booksInSearchResult: prev.booksInSearchResult
    }));
  }

  updateBookShelves(book, newShelfName, withRead) {
    if (book.shelf === newShelfName) {
      return;
    }
    BooksAPI.update(book, newShelfName)
      .then(() => {
        this.updateLocalState(book, newShelfName);
        if (withRead) {
          this.getBooksInBookshelves();
        }
      })
  }

  updateBookShelvesFromSearch(book, newShelfName) {
    this.updateBookShelves(book, newShelfName, true);
  }

  render() {
    const { booksInBookshelves, booksInSearchResult } = this.state;
    const shelves = [
      { title: "Currently Reading", name: "currentlyReading" }
      , { title: "Want to Read", name: "wantToRead" }
      , { title: "Read", name: "read" }
    ];
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <div>
            <BookSearch
              books={booksInSearchResult}
              debounce={250}
              onSearchBooks={(query) => this.searchBooks(query)}
              onBookshelfChange={(book, newShelf) => this.updateBookShelvesFromSearch(book, newShelf)}
              onInitSearchResult={() => this.setState({ booksInSearchResult: [] })}
            />
          </div>
        )} />
        <Route exact path="/" render={() => (
          <div>
            <BookShelfList
              books={booksInBookshelves}
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
    );
  }
}

export default BooksApp
