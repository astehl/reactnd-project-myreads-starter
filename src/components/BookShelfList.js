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