import React from 'react'
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './services/BooksAPI'
import './App.css'
import BookShelfList from './components/BookShelfList'
import BookSearch from './components/BookSearch'

/**
 * @description BookApp component
 * Main app component.
 *
 * Implements a bookshelf app that allows you to select and categorize books you have read, are currently reading, or want to read.
 * It also provides a search page, which lets you find books for specific search terms and categorize these, too.
 *
 * In order to keep the BookSearch component independent from a specific data provider,
 * I decided to manage the booksearch results inside the parent main app component
 * and provide it via property to the component.
 * TODO: maybe try alternatively approaches ...
 * - manage search results inside search component but delegate data provision to listener comp via events.
 * - provide booksearch backendservices as a property to search component
 */
class BooksApp extends React.Component {

  state = {
    booksInBookshelves: [],
    booksInSearchResult: []
  }

  componentDidMount() {
    this.getBooksInBookshelves();
  }

  /**
   * reads all books in bookshelves from backend
   */
  getBooksInBookshelves() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          booksInBookshelves: books
        }));
      })
  }

  /**
   * performs a backend search
   * @param {string} query - the search term
   */
  searchBooks(query) {
    BooksAPI.search(query)
      .then((result) => {
        const foundBooks = (result.error ? [] : this.withShelfSet(result));
        this.setState(() => ({
          booksInSearchResult: foundBooks
        }));
      })
  }

  /**
   * Adds bookshelf assignment to given books based on existing books in bookshelves
   *
   * @param {Book[]} foundBooks - a list of books. From search result.
   * @returns {*} same list, but with updated bookshelf assignments
   */
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

  /**
   * updates a book's shelf assignment persistently via backebd service.
   *
   * @param book - the book to update
   * @param {string} newShelfName
   * @param {boolean} withRead - indicates whether a new book read should be triggered after successful update or not
   */
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
