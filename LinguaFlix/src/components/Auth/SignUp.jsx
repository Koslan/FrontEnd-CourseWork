
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { auth } from '../../store/firebase';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { userActions } from '../../store';
import { ref, set } from 'firebase/database';
import { database } from '../../store/firebase';
import { useNavigate } from 'react-router-dom';
import '../Auth/auth.css';
import { saveUserToLocalStorage } from '../../store/userUtils';

import '../../store/i18n';
import { useTranslation } from 'react-i18next';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { t } = useTranslation();

    function handleSignUp(e) {
        e.preventDefault();

        console.log('Email before signUp:', email);
        console.log('Name before signUp:', name);
        console.log('Password before signUp:', password);


        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                console.log(user);

                const userRef = ref(database, 'users/' + user.uid);
                set(userRef, {
                    name: name,
                    email: email,
                    userId: user.uid,
                    movies: []
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage);
                });
                const userData = {
                    name: name,
                    email: email,
                    userId: user.uid,
                    movies: []
                };

                console.log('Name:', name);
                console.log('Email:', email);

                saveUserToLocalStorage(userData);

                console.log('User data saved to localStorage:', userData);

                dispatch(userActions.setActiveUser(userData));
                updateProfile(auth, user, {
                    displayName: name
                }).then(() => {
                    console.log('Profile updated');
                });

                navigate('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }

    return (
        <Form onSubmit={handleSignUp}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3" style={{ display: 'flex', flexDirection: 'column' }}>
                <Form.Label>{t('Name')}</Form.Label>
                <Form.Control type="text" placeholder={t('Name')} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4" style={{ display: 'flex', flexDirection: 'column' }}>
                <Form.Label>{t('Email address')}</Form.Label>
                <Form.Control
                    type="email"
                    placeholder={t('Placeholder_email')}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5" style={{ display: 'flex', flexDirection: 'column' }}>
                <Form.Label>{t('Password')}</Form.Label>
                <Form.Control
                    type="password"
                    placeholder='*******'
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <Button type="submit">{t('Sign Up')}</Button>
        </Form>
    );
}

export default SignUp;