import './Register.css';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = function(e) {
        setErrors([]);
        e.preventDefault();

        axios.post(process.env.REACT_APP_API_ROOT + "/api/Account/Register", { email, password, confirmPassword})
            .then(function(response) {
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                toast.success("Account creation is successful. Now you can login and start using the app!");
            })
            .catch(function(error) {
                if (!error.response) {
                    setErrors(["Cannot connect to server. Please try again later."]);
                    return;
                }
    
                if (error.response.data && error.response.data.errors) {
                    const messages = [];
                    for (const key in error.response.data.errors) {
                        messages.push(...error.response.data.errors[key]);
                    }
                    setErrors(messages);
                }
            });
    };

    return (
        <Card className="card-register">
            <Card.Body className="p-sm-4">
                <ToastContainer />
                <h1 className="text-center">Register</h1>
                <Alert variant="danger" className={ errors.length == 0 ? "d-none" : "" }>
                    { errors.join(' ') }
                </Alert>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit {email} {password} {confirmPassword}
                    </Button>
                </Form>
                
                <div className="text-center mt-3">
                    <Link to="/login">Login with your existing user account</Link>
                </div>

            </Card.Body>
        </Card>
    );
}

export default Register;
