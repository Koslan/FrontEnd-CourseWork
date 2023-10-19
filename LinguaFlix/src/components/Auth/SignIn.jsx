import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../store/firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store';
 

function SignIn() {
        const [email, setEmail] = useState();
        const [password, setPassword] = useState();

        const dispatch = useDispatch();
    const navigate = useNavigate();

          
    function handleLogin(e) {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                console.log(user);
                dispatch(userActions.setActiveUser({
                    name: user.displayName,
                    email: email,
                    userId: user.uid,
                    orders: [],
                    cart: ''
                }));
                toast.success(`Welcome, ${user.displayName}!`);
                // navigate to Home page
                navigate('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                toast.error(errorMessage);
            });

    }

    return (
        <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <Button type="submit">Sign In</Button>
        </Form>
    )
}

export default SignIn