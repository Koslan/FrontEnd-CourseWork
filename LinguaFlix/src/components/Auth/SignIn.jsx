import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../store/firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store';
import '../Auth/auth.css';
import { permissionsSlice } from '../../store/userSlice';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth();

    async function handleLogin(e) {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                console.log(user);

                const userRole = 'user';

                dispatch(permissionsSlice.actions.setRole(userRole));

                dispatch(
                    userActions.setActiveUser({
                        name: user.displayName,
                        email: email,
                        userId: user.uid,
                        movies: [],
                    })
                );
                toast.success(`Welcome, ${user.displayName}!`);
                navigate('/');
            })
            .catch((error) => {
                console.error(error);
                setErrorMessage('Incorrect password or login');
                toast.error(errorMessage);
            })
    }

    return (
        <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{ display: 'flex', flexDirection: 'column' }}>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2" style={{ display: 'flex', flexDirection: 'column' }}>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="*******" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <Button type="submit">Sign In</Button>
        </Form>
    );
}

export default SignIn;