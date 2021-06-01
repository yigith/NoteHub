import './Login.css';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';

function Login() {
    var query = new URLSearchParams(useLocation().search);
    var qlogout = query.get("logout");
    // parametre olarak verilen metot Login bileşeni sayfada render/update olunca çalışır
    useEffect(() => {
        if (qlogout == "success") {
            toast("You have logged out succesfully!");
        }
    }, [qlogout]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(true);

    const handleSubmit = function(e) {
        e.preventDefault();
        console.log("gönderilecek veriler");
        console.log(email);
        console.log(password);
        console.log(rememberMe);

        // apiye istekte bulun
        // hata gelirse hata mesajı göster
        // token gelirse kaydet login et ve home a yönlendir
    };
    
    return (
        <Card className="card-login">
            <Card.Body className="p-sm-4">
                <ToastContainer />
                <h1 className="text-center">Login</h1>
                <Alert variant="danger">
                    Invalid e-mail or password.
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
