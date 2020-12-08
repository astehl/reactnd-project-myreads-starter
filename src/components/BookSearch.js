import React from 'react'
import * as BooksAPI from '../services/BooksAPI'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import debounce from 'lodash.debounce'

class BookSearch extends React.Component {

    state = {
        query: '',
        books: []
    }

    queryIsEmpty() {
        return this.state.query === '';
    }

    searchBooks() {
        const { query } = this.state;
        if (this.queryIsEmpty()) {
            return
        }
        BooksAPI.search(query)
            .then((result) => {
                const foundBooks = (result.error ? [] : result);
                this.setState(() => ({
                    books: foundBooks
                }))
            })
    }

    doTheSearch = debounce(() => this.searchBooks(), 500);
    
    updateQuery(event) {
        this.setState({
            query: event.target.value
        }, () => {
            this.doTheSearch()
        })
    }

    shouldShowSearchResult() {
        return !this.queryIsEmpty() && this.state.books.length > 0
    }

    render() {
        const { query, books } = this.state;
        return (
            <div>
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link to="/" className="close-search" />
                        <div className="search-books-input-wrapper">
                            <input
                                onChange={(event) => { this.updateQuery(event) }}
                                value={query}
                                type="text"
                                placeholder="Search by title or author"
                            />
                        </div>
                    </div>
                    <div className="search-books-results">
                        <ol className="books-grid"></ol>
                    </div>
                </div>
                {this.shouldShowSearchResult() && (
                    <BookShelf
                        books={books}
                        title="Search Result"
                    />
                )}
            </div>
        )
    }
}

export default BookSearch