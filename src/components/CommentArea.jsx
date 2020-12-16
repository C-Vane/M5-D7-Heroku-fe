import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Row, Col, Image, Form, Button, Spinner } from 'react-bootstrap';
import CommentsList from './CommentsList';


class CommentArea extends React.Component {
    state = {
        errMessage: '',
        loading: false,
        refreshList: false,
        comment: {
            text: '',
            userName: '',
        },
    }
    url = process.env.REACT_APP_URL_BACKEND

    addComment = async (event) => {
        event.preventDefault()
        const { book } = this.props;
        const { comment } = this.state;
        this.setState({ loading: true })
        try {
            let response = await fetch(this.url + "/" + book.asin + "/comments/",
                {
                    method: 'POST',
                    body: JSON.stringify(comment),
                    headers: new Headers({
                        "Content-Type": "application/json",
                    })
                })
            if (response.ok) {
                this.setState({
                    comment: {
                        text: '',
                        userName: '',
                    },
                    errMessage: '',
                    loading: false,
                    refreshList: true
                })

                setTimeout(() => {
                    this.setState({ refreshList: false })
                }, 2000);
            } else {
                console.log('an error occurred')
                let error = await response.json()
                this.setState({
                    errMessage: error.message,
                    loading: false,
                })
            }
        } catch (e) {
            console.log(e) // Error
            this.setState({
                errMessage: e.message,
                loading: false,
            })
        }
    }

    commentSection = () => {
        const { userName, text } = this.state.comment;
        return (
            <Form onSubmit={this.addComment} className="col col-12 m-0">
                <h4>Your Comment</h4>
                <Col>
                    <Form.Group >
                        <Form.Label htmlFor="name">name:</Form.Label>
                        <Form.Control
                            className="col col-12 m-0"
                            type="text"
                            rows="3"
                            name="userName"
                            placeholder="User name"
                            value={userName}
                            onChange={this.updateReviewField}
                            required
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group >
                        <Form.Label>Comment:</Form.Label>
                        <Form.Control
                            className="col col-12 m-0"
                            as="textarea"
                            rows="3"
                            name="text"
                            placeholder="Write your comment..."
                            value={text}
                            onChange={this.updateReviewField}
                            required
                        />
                    </Form.Group>
                </Col>

                <Button type="submit" variant="outline-primary">Submit</Button>
            </Form>
        );
    }
    handelRate = (val) => {
        const review = { ...this.state.review };
        review.rate = val.length.toString();
        this.setState({ review });
    };
    updateReviewField = (event) => {
        const comment = { ...this.state.comment }
        const name = event.currentTarget.name;
        comment[name] = event.currentTarget.value
        this.setState({ comment });
    }
    render() {
        const { book, onHide, show } = this.props;


        return (
            <Modal
                size="lg"
                aria-labelledby="bookComments"
                show={show}
                centered
            >
                <Modal.Header key={book.asin} onClick={onHide}>
                    <Modal.Title id="bookComments">
                        {book.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md="5">
                            <Image src={book.img} rounded fluid />
                            <Row className="m-1">
                                {this.commentSection()}
                                {
                                    this.state.loading && (
                                        <div className="d-flex justify-content-center my-5">
                                            Saving comment, please wait
                                            <div className="ml-2">
                                                <Spinner animation="border" variant="success" />
                                            </div>
                                        </div>
                                    )
                                }
                            </Row>
                        </Col>
                        <Col md="7">
                            <Row>
                                <Col>
                                    <CommentsList id={book.asin} refreshList={this.state.refreshList} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide} variant="secondary">Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}


CommentArea.propTypes = { book: PropTypes.object.isRequired, onHide: PropTypes.func, show: PropTypes.bool };
CommentArea.defaultProps = { book: undefined };


export default CommentArea;