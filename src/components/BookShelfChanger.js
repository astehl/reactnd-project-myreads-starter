import React from 'react'
import PropTypes from 'prop-types'

class BookShelfChanger extends React.Component {

    static propTypes = {
        currentBookshelf: PropTypes.string.isRequired,
        onBookshelfChange: PropTypes.func
    }

    onShelfChange(evt) {
        const newShelf = evt.target.value;
        const changeHandler = this.props.onBookshelfChange;
        if (changeHandler && newShelf !== this.props.currentBookshelf) {
            changeHandler(newShelf)
        }
    }

    render() {
        return (
            <div className="book-shelf-changer">
                <select onChange={(event) => this.onShelfChange(event)}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        )
    }
}

export default BookShelfChanger