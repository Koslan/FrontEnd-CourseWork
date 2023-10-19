import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { auth } from '../store/firebase';
import { useDispatch } from 'react-redux';
import { userActions } from '../store';

function HeaderUser({user}) {
    const dispatch = useDispatch();

    function handleLogout() {
        auth.signOut()
            .then(() => {
                console.log('signout');
                dispatch(userActions.logout());
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <NavDropdown title="User" id="basic-nav-user" className='me-3'>
            <NavDropdown.Header>Welcome, {user.name}!</NavDropdown.Header>
            <NavDropdown.Item href="#action/3.2">
            Watched movies
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#" onClick={handleLogout}>
                Logout
            </NavDropdown.Item>
        </NavDropdown>
    )
}

export default HeaderUser;