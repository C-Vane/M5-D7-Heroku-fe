import React, { Component } from "react";
import { Container } from "react-bootstrap";
import CategoryItem from "./CategoryItem";
import CommentArea from "./CommentArea";
import BookCard from "./BookCard"


class LatestReleses extends Component {
  state = {
    category: 0,
    books: { all: [], fantasy: [], history: [], horror: [], romance: [], scifi: [] },
    sort: false,
    search: [],
    search_value: "",
    category_names: ["all", "fantasy", "history", "horror", "romance", "scifi"],
    loading: false,
    current_book: {},
    show: false
  };
  url = process.env.REACT_APP_URL_BACKEND
  componentDidMount = () => {
    this.state.category_names.forEach((category) => this.getBooksByCategory(category))
  }
  //get books

  getBooksByCategory = async (category) => {
    const endp = category !== "all" ? ("/?category=" + category) : ""
    try {
      const result = await fetch(this.url + endp);
      if (result.ok) {
        const allBooks = await result.json();
        const books = { ...this.state.books }
        books[category] = allBooks
        this.setState({ books })
      } else {
        console.log("Error occured", result)
      }
    } catch (error) {
      console.log(error)
    }
  }
  handleChange = (event) => {
    this.setState({ category: event.target.value });
  };
  handleSort = (event) => {
    this.setState({ sort: true });
    //sortBooks();
  };
  handleClose = () => this.setState({ show: false });

  handleShow = (id) => {
    let current_book = this.state.books.all.find((book) => book.asin === id);
    this.setState({
      show: true,
      current_book
    })
  };

  searchBooks = (event) => {
    const search_key = event.target.value;
    const { books } = this.state;
    let result = [];
    books.forEach((cat) => {
      result.push(cat.filter((book) => book.title.toLowerCase().includes(search_key.toLowerCase())));
    })
    this.setState({
      search: search_key.length > 3 ? result.flat() : "",
      search_value: search_key,
    });
  }
  categorySelect = () => {
    const { category, category_names } = this.state;
    return (
      <CategoryItem category={category} categoryNames={category_names} onSearch={this.searchBooks} onChange={this.handleChange}></CategoryItem>
    );
  };
  /*  loadBooks = () => {
     const { category, books, search, search_value } = this.state;
     let book;
     if (search_value.length > 3) {
       book = (search.length > 0) ? <BookCard books={search} onClick={this.handleShow} /> :
         <p className="mt-4">No Books found named <strong>{search_value}</strong> ...</p>
     } else {
       book = <BookCard books={books[category]} onClick={this.handleShow} />
     }
     return (book);
   } */


  render() {

    const { current_book, show, category, books, category_names } = this.state;
    return (
      <Container>
        {this.categorySelect()}
        {this.state.books.all && <BookCard books={books[category_names[category]]} onClick={this.handleShow} />}
        <CommentArea book={current_book} addComment={this.addComment} onHide={this.handleClose} show={show} />
      </Container>
    )
  }
}
export default LatestReleses;
