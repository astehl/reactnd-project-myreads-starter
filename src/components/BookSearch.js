import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import debounce from 'lodash.debounce'
import PropTypes from 'prop-types'

class BookSearch extends React.Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        onSearchBooks: PropTypes.func,
        onBookshelfChange: PropTypes.func,
        onComponentDidMount: PropTypes.func
    };

    state = {
        query: ''
    };

    componentDidMount() {
        const onMountHandler = this.props.onComponentDidMount;
        if (onMountHandler) {
            onMountHandler();
        }
    }

    queryIsEmpty() {
        return this.state.query === '';
    }

    searchBooks() {
        const { query } = this.state;
        if (this.queryIsEmpty()) {
            return;
        }
        this.props.onSearchBooks(query);
    }

    doTheSearch = debounce(() => this.searchBooks(), 500);

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
        const { books, onBookshelfChange } = this.props;
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
                        onBookshelfChange={(book, newShelf) => onBookshelfChange ? onBookshelfChange(book, newShelf) : null}
                    />
                )}
            </div>
        );
    }
}

export default BookSearch