import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book';

class BookShelf extends React.Component {

    static propTypes = {
        title: PropTypes.string,
        books: PropTypes.array.isRequired
    }

    render() {
        const { title, books } = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title ? title : '[bookshelf name]'}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => (
                            <li key={book.id}>
                                <Book
                                    book={book}
                                />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }

}

export default BookShelf