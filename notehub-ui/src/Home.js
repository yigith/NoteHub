import AppContext from './AppContext';
import './Home.css';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row, Navbar, Nav, NavDropdown, ListGroup, Form, Button } from 'react-bootstrap';
import axios from 'axios';

function Home() {
    const ctx = useContext(AppContext);
    const apiroot = process.env.REACT_APP_API_ROOT;
    const token = ctx.token;
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState({ id: 0, title: "", content: "", createdTime: "", modifiedTime: "" });

    const loadNotes = function () {
        axios.get(apiroot + "/api/Notes", { headers: { Authorization: "Bearer " + token } })
            .then(function (response) {
                setNotes(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const handleTitleClick = function (e, note) {
        e.preventDefault();
        setNote(note);
    };

    useEffect(() => {
        loadNotes();
    }, []);

    return (
        <div className="home-wrapper">
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">NoteHub</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown alignRight title="My Account" id="basic-nav-dropdown">
                            <Link className="dropdown-item" to="/logout">Logout ({ctx.username})</Link>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Container fluid className="flex-fill">
                <Row className="h-100">
                    <Col sm={4} md={3}>
                        <h3 className="mt-4">My Notes</h3>
                        <ListGroup>
                            {notes.map((note, index) =>
                                <ListGroup.Item action href={"#notes-" + index} key={note.id}
                                    onClick={(e) => handleTitleClick(e, note)}>
                                    {note.title}
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Col>
                    <Col className="h-100" sm={8} md={9}>
                        <Form className="py-3 h-100 d-flex flex-column">
                            <Form.Group>
                                <Form.Control type="text" placeholder="Title" value={note.title} />
                            </Form.Group>
                            <Form.Group className="flex-fill">
                                <Form.Control className="h-100" as="textarea" rows={10} placeholder="Title" value={note.content} />
                            </Form.Group>
                            <div>
                                <Button variant="primary">Kaydet</Button>
                                <Button variant="danger" className="ml-2">Sil</Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home;
