import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import PropTypes from 'prop-types';
import { Card, ListGroup, Button, Spinner } from 'react-bootstrap';


class CommentsList extends React.Component {
    state = {
        loading: false,
        comments: [],
        status: false,
        delete: false,
        reload: false,
    }

    url = process.env.REACT_APP_URL_BACKEND
    componentDidMount = () => {
        const { id } = this.props;
        this.fetchComments(id);
    }
    componentDidUpdate(prevProps) {
        this.props.refreshList !== prevProps.refreshList && this.fetchComments(this.props.id)
    }
    fetchComments = async (id) => {
        this.setState({ loading: true })
        try {
            let response = await fetch(this.url + "/" + id + "/comments/")
            if (response.ok) {
                let comments = await response.json();
                this.setState({ comments: comments, loading: false, status: true })
            }
        } catch (e) {
            console.log("error happened, that's life", e)
            this.setState({ loading: false })
        }
    }
    deleteComment = async (id) => {
        this.setState({
            loading: true,
        })
        try {
            let response = await fetch(this.url + "/" + this.props.id + "/comments/" + id, {
                method: 'DELETE',
            })
            if (response.ok) {
                this.setState({
                    delete: true,
                    loading: false,
                })
                this.fetchComments(this.props.id)

            }
        } catch (e) {
            console.log("error happened, that's life", e)
            this.setState({ loading: false })
        }
    }


    renderComments = () => {
        if (this.state.status === true) {
            const { comments } = this.state;
            return (comments && <Card border="warning" className="m-0 p-0">
                <Card.Header>Comments</Card.Header>
                {comments.map((comment) => this.commentItem(comment))}
            </Card>)
        }
    }
    commentItem = (comment) => {
        return (
            <ListGroup.Item key={comment.commentID} className="d-flex flex-column justify-content-between p-1 pb-0">
                <div className="d-flex justify-content-between">
                    <small>{comment.userName}</small>
                    <div>
                        <small className="text-muted mr-1"><Moment format="D MMM YYYY - mm:hh" withdate={comment.createdAt} /></small>
                        <Button className="m-0 p-0 px-1 mr-1" variant="outline-danger" onClick={() => this.deleteComment(comment.commentID)}> X </Button>
                    </div>
                </div>
                <div className="d-flex justify-content-between pr-4"><p>{comment.text}</p> </div>


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
                <h6>Find in Comments</h6>
                {this.searchResults()}
            </div>
            {this.renderComments()}
            {
                this.state.loading && (
                    <div className="d-flex justify-content-center my-5">
                        <div className="ml-2">
                            <Spinner animation="border" variant="success" />
                        </div>
                    </div>
                )
            }
        </>

    }
}

CommentsList.propTypes = { id: PropTypes.string };
// #endregion

export default CommentsList;