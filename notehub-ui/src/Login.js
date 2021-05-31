import './Login.css';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <Card className="card-login">
            <Card.Body className="p-sm-4">
                <h1 className="text-center">Login</h1>
                <Alert variant="danger">
                    Invalid e-mail or password.
                </Alert>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                
                <div className="text-center mt-3">
                    <Link to="/register">Register as a new user</Link>
                </div>
            </Card.Body>
        </Card>
    );
}

export default Login;
