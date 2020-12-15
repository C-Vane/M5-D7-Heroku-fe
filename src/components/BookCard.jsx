import React from "react";

import { Card, Button, Row, Col } from "react-bootstrap";

const BookCard = (prop) => {
    let { books, onClick } = prop;
    return (
        books && (
            <Row className="row-cols-1 row-cols-md-3 row-cols-lg-4">
                {books.map((book) => (
                    <Col key={book.asin} id={book.asin} className="mb-3" onClick={() => onClick(book.asin)}>
                        <Card className="h-100">
                            <Card.Img variant='top' src={book.img} />
                            <Card.Body className="d-flex flex-column justify-content-between">
                                <Card.Title>{book.title}</Card.Title>
                                <div className="d-flex justify-content-around">
                                    <Card.Text>Price: ${book.price}</Card.Text>
                                    <Button variant='success'>Buy</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        )
    );
};

export default BookCard;
