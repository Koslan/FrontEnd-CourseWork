import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { auth } from '../../store/firebase';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { userActions } from '../../store';
import { ref, set } from 'firebase/database';
import { database } from '../../store/firebase';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleSignUp(e) {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                // ...
                console.log(user);

                set(ref(database, 'users/' + user.uid), {
                    name: name,
                    email: email,
                    userId: user.uid,
                    
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage);
                });

                dispatch(userActions.setActiveUser({
                    name: name,
                    email: email,
                    userId: user.uid,
                }));
                updateProfile(auth.currentUser, {
                    displayName: name
                })
                .then(() => {
                    console.log('Profileupdate');
                })
                navigate('/');


            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log(errorMessage);
            });
    }

    return (
        <Form onSubmit={handleSignUp}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <Button type="submit">Sign Up</Button>
        </Form>
    )
}

export default SignUp;