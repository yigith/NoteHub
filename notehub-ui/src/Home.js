import AppContext from './AppContext';
import './Home.css';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row, Navbar, Nav, NavDropdown, ListGroup, Form, Button } from 'react-bootstrap';

function Home() {
    const ctx = useContext(AppContext);

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
                            <Link className="dropdown-item" to="/logout">Logout (admin@example.com)</Link>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Container fluid className="flex-fill">
                <Row className="h-100">
                    <Col sm={4} md={3}>
                        <h3 className="mt-4">My Notes - { ctx.token }</h3>
                        <ListGroup defaultActiveKey="#link1">
                            <ListGroup.Item action href="#link1">
                                Link 1
                            </ListGroup.Item>
                            <ListGroup.Item action href="#link2">
                                Link 2
                            </ListGroup.Item>
                            <ListGroup.Item action>
                                This one is a button
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col className="h-100" sm={8} md={9}>
                        <Form className="py-3 h-100 d-flex flex-column">
                            <Form.Group>
                                <Form.Control type="text" placeholder="Title" />
                            </Form.Group>
                            <Form.Group className="flex-fill">
                                <Form.Control className="h-100" as="textarea" rows={10} placeholder="Title" />
                            </Form.Group>
                            <div>
                                <Button variant="primary">Kaydet</Button>
                                <Button variant="danger" className="ml-2">Sil</Button>
                                <Button variant="danger" className="ml-2" onClick={() => ctx.setToken("3754")}>
                                    tokenı 3754 yap
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home;
