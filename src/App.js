import React from 'react'
import { Route } from 'react-router-dom';
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import CurrentlyReading from './CurrentlyReading'
import WantToRead from './WantToRead'
import Read from './Read'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    books: [],
    search: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    });
  }

  changeShelf(shelf,book) {
    if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf;
        this.setState(state => ({
          books: state.books.filter((b) => b.id !== book.id).concat([book]),
        }));
      });
    }
  }

  searchBook(term) {
    if (term.length > 0) {
      BooksAPI.search(term, 20).then((results) => {
        if (results.error) {
          return this.setState({ search: [] });
        }
        this.setState((state) => {
          const mergedBooks = results.map((searchResult) => {
            const existingBook = state.books.find(book => book.id === searchResult.id);
            if (existingBook) {
              searchResult.shelf = existingBook.shelf;
            } else {
              searchResult.shelf = 'none';
            }
            return searchResult;
          });
          return { search: mergedBooks };
        });
      });
    }else{
      return this.setState({search: []});
    }
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchBooks
            books={this.state.search}
            control={this.changeShelf.bind(this)}
            onSearch={this.searchBook.bind(this)}
          />
        )} />
        <Route exact path='/' render={({ history }) => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <CurrentlyReading
                  books={this.state.books}
                  control={this.changeShelf.bind(this)}
                 />
                <WantToRead
                  books={this.state.books}
                  control={this.changeShelf.bind(this)}
                />
                <Read
                  books={this.state.books}
                  control={this.changeShelf.bind(this)}
                />
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
