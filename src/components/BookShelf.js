import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends React.Component {

    static propTypes = {
        title: PropTypes.string,
        books: PropTypes.array.isRequired,
        onBookshelfChange: PropTypes.func
    };

    booksToRender() {
        return this.props.books.filter((book) => (book.imageLinks && book.imageLinks.thumbnail));
    }

    render() {
        const { title, onBookshelfChange } = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title ? title : '[bookshelf name]'}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.booksToRender().map((book) => (
                            <li key={book.id}>
                                <Book
                                    book={book}
                                    onBookshelfChange={(book, newShelf) => onBookshelfChange ? onBookshelfChange(book, newShelf) : null}
                                />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }

}

export default BookShelf