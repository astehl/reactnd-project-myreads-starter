import React from 'react'
import PropTypes from 'prop-types'

class BookShelfChanger extends React.Component {

    static propTypes = {
        currentBookshelf: PropTypes.string,
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
        const currentShelf = this.props.currentBookshelf || 'none';
        const options = [
            { value: "currentlyReading", text: "Currently Reading" }
            , { value: "wantToRead", text: "Want to Read" }
            , { value: "read", text: "Read" }
            , { value: "none", text: "None" }
        ];
        return (
            <div className="book-shelf-changer">
                <select value={currentShelf} onChange={(event) => this.onShelfChange(event)}>
                    <option value="move" disabled>Move to...</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>{option.text}</option>
                    ))}
                </select>
            </div>
        )
    }
}

export default BookShelfChanger