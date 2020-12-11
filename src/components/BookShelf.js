import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

/**
 * @description BookShelf component
 * Renders given books as a bookshelf representation.
 *
 * @param {string} title - the title of a bookshelf. If not provided the string '[bookshelf name]' will be rendered as title
 * @param {object[]} books - array of Book objects to be rendered
 * @param {function} onBookshelfChange(book, bookshelfName) - eventhandler; called when a book's bookshelf assignment was changed. Parameters:
 *  - {obj} book - book entity to be changed
 *  - {string} bookshelfName - name of the new assigned bookshelf
 */
class BookShelf extends React.Component {

    static propTypes = {
        title: PropTypes.string,
        books: PropTypes.array.isRequired,
        onBookshelfChange: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.onBookshelfChange = this.onBookshelfChange.bind(this);
    }

    booksToRender() {
        return this.props.books.filter((book) => (book.imageLinks && book.imageLinks.thumbnail));
    }

    onBookshelfChange(book, newShelf) {
        const onBookshelfChange = this.props.onBookshelfChange;
        if (onBookshelfChange) {
            onBookshelfChange(book, newShelf);
        }
    }

    render() {
        const title = this.props.title;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title ? title : '[bookshelf name]'}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.booksToRender().map((book) => (
                            <li key={book.id}>
                                <Book
                                    book={book}
                                    onBookshelfChange={this.onBookshelfChange}
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