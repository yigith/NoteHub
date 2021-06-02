import './Login.css';
import AppContext from './AppContext'
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';

function Login() {
    const history = useHistory();
    const ctx = useContext(AppContext);
    const query = new URLSearchParams(useLocation().search);
    const qlogout = query.get("logout");
    // parametre olarak verilen metot Login bileşeni sayfada render/update olunca çalışır
    useEffect(() => {
        if (qlogout == "success") {
            toast("You have logged out succesfully!");
        }
    }, [qlogout]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(true);
    const [errors, setErrors] = useState([]);

    const handleSubmit = function(e) {
        setErrors([]);
        e.preventDefault();
        axios.post(process.env.REACT_APP_API_ROOT + "/api/Account/Login", {
            username: email,
            password: password
        })
        .then(function(response) {
            if (rememberMe) {
                localStorage["username"] = email;
                localStorage["token"] = response.data.token;
                sessionStorage.removeItem("username");
                sessionStorage.removeItem("token");
            }
            else {
                sessionStorage["username"] = email;
                sessionStorage["token"] = response.data.token;
                localStorage.removeItem("username");
                localStorage.removeItem("token");
            }
            ctx.setUsername(email);
            ctx.setToken(response.data.token);
            ctx.setIsLoggedIn(true);
            history.push("/");
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
        <Card className="card-login">
            <Card.Body className="p-sm-4">
                <ToastContainer />
                <h1 className="text-center">Login</h1>
                <Alert variant="danger" className={ errors.length == 0 ? "d-none" : "" }>
                    { errors.join(' ') }
                </Alert>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} 
                            onInput={(e) => setEmail(e.target.value)} required />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} 
                            onInput={(e) => setPassword(e.target.value)} required />
                    </Form.Group>

                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember me" checked={rememberMe} 
                            onChange={(e) => setRememberMe(e.target.checked)} />
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
