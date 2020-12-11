import React from 'react'
import PropTypes from 'prop-types'

/**
 * @description BookShelfChanger component
 * Implements the selection of a bookshelf option.
 *
 * @param {string} currentBookshelf - name of the currently assigned bookshelf
 * @param {function} onBookshelfChange(nameNewBookshelf) - eventhandler; called when a book's bookshelf assignment was changed. Parameters:
 *  - {string} nameNewBookshelf - name of the new assigned bookshelf
 */
class BookShelfChanger extends React.Component {

    static propTypes = {
        currentBookshelf: PropTypes.string,
        onBookshelfChange: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.onShelfChange = this.onShelfChange.bind(this);
    }

    onShelfChange(evt) {
        const changeHandler = this.props.onBookshelfChange;
        if (changeHandler) {
            changeHandler(evt.target.value);
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
                <select value={currentShelf} onChange={this.onShelfChange}>
                    <option value="move" disabled>Move to...</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>{option.text}</option>
                    ))}
                </select>
            </div>
        );
    }
}

export default BookShelfChanger