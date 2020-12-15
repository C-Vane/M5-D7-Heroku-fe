import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import PropTypes from 'prop-types';
import { propTypes } from 'react-bootstrap/esm/Image';
import { Card, ListGroup, Button, Spinner } from 'react-bootstrap';


class CommentsList extends React.Component {
    state = {
        loading: false,
        reviews: [],
        status: false,
        delete: false,
        reload: false,
    }
    book_review = []
    url = process.env.URL_BACKEND
    componentDidMount = () => {
        const { id } = this.props;
        this.fetchComments(id);
        this.setState({ reload: this.props.refreshList })
    }
    fetchComments = async (id) => {
        this.setState({ loading: true })
        console.log(this.url)
        try {
            let response = await fetch(this.url + "/comments/", {
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmI2OTE2Mjk4MzViMDAwMTc1ODRmNTkiLCJpYXQiOjE2MDU4MDAyOTAsImV4cCI6MTYwNzAwOTg5MH0.EDD_ZH6yNBd1WStOkn3RPWNiO1Cm44mhsuhN43Auc2U",
                }
            })
            if (response.ok) {
                let reviews = await response.json();
                this.book_review = reviews;
                this.setState({ reviews: reviews, loading: false, status: true })
                console.log(this.state)
            }
        } catch (e) {
            console.log("error happened, that's life", e)
            this.setState({ loading: false })
        }
    }
    deleteCommentApi = async (id) => {
        this.setState({
            loading: true,
        })
        alert("Comment Deleted")
        try {
            let response = await fetch("https://striveschool-api.herokuapp.com/api/comments/" + id, {
                method: 'DELETE',
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmI2OTE2Mjk4MzViMDAwMTc1ODRmNTkiLCJpYXQiOjE2MDU4MDAyOTAsImV4cCI6MTYwNzAwOTg5MH0.EDD_ZH6yNBd1WStOkn3RPWNiO1Cm44mhsuhN43Auc2U",
                }
            })
            if (response.ok) {
                this.setState({
                    delete: true,
                    loading: false,
                })
                alert("Comment Deleted")
            }
        } catch (e) {
            console.log("error happened, that's life", e)
            this.setState({ loading: false })
        }
    }
    deleteComment = (e) => {
        const id = e.currentTarget.id;
        this.deleteCommentApi(id);
        if (this.state.delete) {
            const comment = e.currentTarget.parentElement.parentElement;
            comment.classList.add("delete");
        }
        this.setState({ delete: false })
    }

    renderComments = () => {
        if (this.state.status === true) {
            const { reviews, loading } = this.state;
            return (reviews && <Card border="warning" className="m-0 p-0">
                <Card.Header>Reviews</Card.Header>
                {reviews.map((review) => this.reviewItem(review))}

            </Card>)
        }
    }
    reviewItem = (review) => {
        return (
            <ListGroup.Item key={review._id} className="d-flex flex-column justify-content-between p-1 pb-0">
                <div className="d-flex justify-content-between">
                    <small>{review.author}</small>
                    <div>
                        <small className="text-muted mr-1"><Moment format="D MMM YYYY - mm:hh" withdate={review.createdAt} /></small>
                        <Button className="m-0 p-0 px-1 mr-1" variant="outline-danger" id={review._id} onClick={this.deleteComment}> X </Button>
                    </div>
                </div>
                <div className="d-flex justify-content-between pr-4"><p>{review.comment}</p> <p>{[...Array(parseInt(review.rate))].map((e, i) => (<i className="text-warning font-weight-bold" key={i}>☆</i>))}</p></div>


            </ListGroup.Item >)
    }

    searchResults = () => {
        return <input type="search" className="form-control w-50 h-25 p-1 mb-2" name="search" id="search" placeholder="Search..." onChange={this.searchComments} />
    }

    searchComments = (event) => {
        const search_key = event.target.value;
        let { reviews } = this.state;

        reviews = reviews.filter((review) => review.comment.toLowerCase().includes(search_key.toLowerCase()) || review.author.toLowerCase().includes(search_key.toLowerCase()));

        this.setState({ reviews: (search_key.length > 2) ? reviews : this.book_review, });

    }

    render() {


        return <>
            <div>
                <h6>Find in Reviews</h6>
                {this.searchResults()}
            </div>
            {this.renderComments()}
            {
                this.state.loading && (
                    <div className="d-flex justify-content-center my-5">
                        Deleting Card, please wait...
                        <div className="ml-2">
                            <Spinner animation="border" variant="success" />
                        </div>
                    </div>
                )
            }
        </>

    }
}

CommentsList.propTypes = { id: PropTypes.string.isRequired };
// #endregion

export default CommentsList;