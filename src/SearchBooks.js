import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {

  onShelfChange(shelf,book){
    this.props.control(shelf,book);
  }

  searchBooks(term){
    this.props.onSearch(term);
  }

  render() {
    return(
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link to='/' className='close-search'>Close</Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={(event) => this.searchBooks(event.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <div className="search-books-results">
              <div className="bookshelf">
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {this.props.books.map( (book) => (
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.smallThumbnail : './icons/no_cover_thumb.gif'})` }}></div>
                            <div className="book-shelf-changer">
                              <select value={book.shelf} onChange={(event) => this.onShelfChange(event.target.value,book)}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors}</div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchBooks