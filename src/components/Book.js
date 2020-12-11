import React from 'react'
import PropTypes from 'prop-types'
import BookShelfChanger from './BookShelfChanger';

/**
 * @description Book component
 * Renders a Book representation
 *
 * @param {object} book - the Book object to be rendered
 * @param {function} onBookshelfChange(book, bookshelfName) - eventhandler; called when a book's bookshelf assignment was changed. Parameters:
 *  - {obj} book - book entity to be changed
 *  - {string} bookshelfName - name of the new assigned bookshelf
 */
class Book extends React.Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        onBookshelfChange: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.handlerBookshelfChange = this.handlerBookshelfChange.bind(this);
    }

    handlerBookshelfChange(newBookshelf) {
        const {book, onBookshelfChange} = this.props;
        if (onBookshelfChange) {
            onBookshelfChange(book, newBookshelf);
        }
    }

    render() {
        const {book} = this.props;
        const authors = book.authors ? book.authors.join(', ') : '';
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{width: 128, height: 192, backgroundImage: `url("${book.imageLinks.thumbnail}")`}}>
                        <BookShelfChanger
                            currentBookshelf={book.shelf}
                            onBookshelfChange={this.handlerBookshelfChange}
                        />
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{authors}</div>
            </div>
        );
    }
}

export default Book 