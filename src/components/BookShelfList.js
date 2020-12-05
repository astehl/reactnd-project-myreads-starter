import React from 'react'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

class BookShelfList extends React.Component {
    static PropTypes = {
        books: PropTypes.array.isRequired,
        shelves: PropTypes.array.isRequired,
        title: PropTypes.string
    }

    render() {
        const { books, shelves, title } = this.props;
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>{title ? title : '[bookshlflist]'}</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {shelves.map((shelf) => (
                            <BookShelf
                                books={books.filter((book) => (book.shelf === shelf.name))}
                                title={shelf.title}
                            />
                        ))}
                    </div>
                </div>
            </div>

        )
    }

}

export default BookShelfList