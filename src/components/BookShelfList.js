import React from 'react'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

class BookShelfList extends React.Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        shelves: PropTypes.array.isRequired,
        title: PropTypes.string,
        onBookshelfChange: PropTypes.func
    }

    render() {
        const { books, shelves, title, onBookshelfChange } = this.props;
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>{title ? title : '[bookshlflist]'}</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {shelves.map((shelf) => (
                            <BookShelf
                                key={shelf.name}
                                books={books.filter((book) => (book.shelf === shelf.name))}
                                title={shelf.title}
                                onBookshelfChange={(book, newShelf) => onBookshelfChange ? onBookshelfChange(book, newShelf) : null}
                                />
                        ))}
                    </div>
                </div>
            </div>

        )
    }

}

export default BookShelfList