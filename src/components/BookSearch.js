import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import debounce from 'lodash.debounce'
import PropTypes from 'prop-types'

/**
 * @description BookSearch component
 * Provides input of query strings search for and uses BookShelf component for rendering given search result.
 * In order order to keep the component independent from data provider, new searches are triggered thru event handler
 * and search results are provided as a property.
 *
 * @param {Book[]} books - array of Book JSON representations to be rendered as the search result
 * @param {number} debounce - time in ms to wait before search event is fired after query input. values between 1 and 2000 are accepted.
 * @param {function} onSearchBooks(queryString) - eventhandler; called when a new search should be performed. Parameters:
 *  - {sting} queryString
 * @param {function} onBookshelfChange(book, bookshelfName) - eventhandler; called when a book's bookshelf assignment was changed. Parameters:
 *  - {obj} book - book entity to be changed
 *  - {string} bookshelfName - name of the new assigned bookshelf
 * @param {function} onInitSearchResult - marker eventhandler; called when the provided search result should be initialized.
 *  (Little hack needed, since search result is not managed by the component itself)
 */
class BookSearch extends React.Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        debounce: PropTypes.number,
        onSearchBooks: PropTypes.func,
        onBookshelfChange: PropTypes.func,
        onInitSearchResult: PropTypes.func
    };

    state = {
        query: ''
    };

    constructor(props) {
        super(props);
        this.onBookshelfChange = this.onBookshelfChange.bind(this);
    }

    onBookshelfChange(book, newShelf) {
        const onBookshelfChangeHandler = this.props.onBookshelfChange;
        if (onBookshelfChangeHandler) {
            onBookshelfChangeHandler(book, newShelf);
        }
    }

    componentDidMount() {
        this.handleInitSearchResults();
    }

    handleInitSearchResults() {
        const handler = this.props.onInitSearchResult;
        if (handler) {
            handler();
        }
    }

    isValidDebounceConfigured() {
        const debounceTime = this.props.debounce;
        return debounceTime && Number.isInteger(debounceTime) && debounceTime > 0 && debounceTime <= 2000;
    }

    queryIsEmpty() {
        return this.state.query === '';
    }

    searchBooks() {
        const { query } = this.state;
        if (this.queryIsEmpty()) {
            this.handleInitSearchResults();
        } else {
            this.props.onSearchBooks(query);
        }
    }

    doTheSearch = this.isValidDebounceConfigured() ? debounce(() => this.searchBooks(), this.props.debounce) : () => this.searchBooks();

    updateQuery(event) {
        this.setState({
            query: event.target.value
        }, () => {
            this.doTheSearch()
        });
    }

    shouldShowSearchResult() {
        return !this.queryIsEmpty() && this.props.books.length > 0;
    }

    render() {
        const { query } = this.state;
        const { books } = this.props;
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
                        <div className="books-grid">
                            {this.shouldShowSearchResult() && (
                                <BookShelf
                                    books={books}
                                    title="Search Result"
                                    onBookshelfChange={this.onBookshelfChange}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BookSearch