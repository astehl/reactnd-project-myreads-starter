import React from 'react'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

/**
 * @description BookShelfList component
 * Container component for all relevant BookShelf components.
 *
 * @param {object[]} books - array of all Book objects which are assigned to a bookshelf
 * @param {object[]} shelves - array of objects describing the bookshelves to be rendered. A shelf object contains following attributes:
 *  {name: <internal bookshelf name>, title: <bookshelf name to be rendered as option in the bookshelf select comp>}
 * @param {string} title - the title of the bookshelf-list. If not provided the string '[bookshelflist]' will be rendered as title
 * @param {function} onBookshelfChange(book, bookshelfName) - eventhandler; called when a book's bookshelf assignment was changed. Parameters:
 *  - {obj} book - book entity to be changed
 *  - {string} bookshelfName - name of the new assigned bookshelf
 */
class BookShelfList extends React.Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        shelves: PropTypes.array.isRequired,
        title: PropTypes.string,
        onBookshelfChange: PropTypes.func
    }

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

    render() {
        const { books, shelves, title } = this.props;
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>{title ? title : '[bookshelflist]'}</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {shelves.map((shelf) => (
                            <BookShelf
                                key={shelf.name}
                                books={books.filter((book) => (book.shelf === shelf.name))}
                                title={shelf.title}
                                onBookshelfChange={this.onBookshelfChange}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default BookShelfList