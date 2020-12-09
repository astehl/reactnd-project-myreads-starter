import React from 'react'
import PropTypes from 'prop-types'
import BookShelfChanger from './BookShelfChanger';

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
                    <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                    <BookShelfChanger
                        currentBookshelf={book.shelf}
                        onBookshelfChange={this.handlerBookshelfChange}
                    />
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{authors}</div>
            </div>
        );
    }
}

export default Book 