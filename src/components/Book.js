import React from 'react'
import PropTypes from 'prop-types'
import BookShelfChanger from './BookShelfChanger';

class Book extends React.Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        onBookshelfChange: PropTypes.func
    }

    handlerBookshelfChange(book, newBookshelf, onBookshelfChange) {
        // console.log(`book-handler: ${newBookshelf}`)
        if (onBookshelfChange) {
            onBookshelfChange(book, newBookshelf);
        }
    }

    render() {
        const {book, onBookshelfChange} = this.props;
        console.log(`render book "${book.title}" on shelf ${book.shelf}`);
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                    <BookShelfChanger
                        currentBookshelf={book.shelf}
                        onBookshelfChange={(name) => this.handlerBookshelfChange(book, name, onBookshelfChange)}
                    />
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
            </div>
        )
    }
}

export default Book 