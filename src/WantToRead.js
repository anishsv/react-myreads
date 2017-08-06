import React, { Component } from 'react';

class WantToRead extends Component {

	onShelfChange(shelf,book){
  	this.props.control(shelf,book);
  }

	render() {
		const {books} = this.props
		const wantToRead = books.filter((book) => book.shelf === 'wantToRead' )

		return(
			<div className="bookshelf">
	      <h2 className="bookshelf-title">Want To Read</h2>
	      <div className="bookshelf-books">
	        <ol className="books-grid">
	        	{wantToRead.map(	(book) => (
	        		<li key={book.id}>
	        			<div className="book">
		              <div className="book-top">
		                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
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
		)
	}
}

export default WantToRead