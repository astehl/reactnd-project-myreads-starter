import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import debounce from 'lodash.debounce'
import PropTypes from 'prop-types'

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
                        <ol className="books-grid"></ol>
                    </div>
                </div>
                {this.shouldShowSearchResult() && (
                    <BookShelf
                        books={books}
                        title="Search Result"
                        onBookshelfChange={this.onBookshelfChange}
                    />
                )}
            </div>
        );
    }
}

export default BookSearch