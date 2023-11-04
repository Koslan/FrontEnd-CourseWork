import React, { useEffect, useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { auth } from '../store/firebase';
import { useDispatch, useSelector } from 'react-redux';
import './headerUser.css';
import { PersonFill } from 'react-bootstrap-icons';
import ProfileForm from './Header/ProfileForm';
import { saveUserToFirebase } from '../store/userSlice';
import { userActions } from '../store';
import { useLocation } from 'react-router-dom';

function HeaderUser() {
  const dispatch = useDispatch();
  const [showProfileForm, setShowProfileForm] = useState(false);
  const user = useSelector(state => state.user);
  const location = useLocation();

  useEffect(() => {
    console.log("User effect triggered.");
    if (user.userId) {
      console.log("User ID is present:", user.userId);
      saveUserToFirebase(user);
    }
  }, [user]);

  const handleMyProfileClick = () => {
    setShowProfileForm(true);
  };

  const handleCloseProfileForm = () => {
    setShowProfileForm(false);
  };

  function handleLogout() {
    auth
      .signOut()
      .then(() => {
        console.log('signout');
        dispatch(userActions.logout());
        window.location.href = '/';
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const isProfilePage = location.pathname === '/profile';

  return (
    <NavDropdown title={
      <>
        <PersonFill width={'2em'} height={'2em'} />
        {user.name && <span className="user-name">{user.name}</span>}
      </>
    } id="basic-nav-user" className='me-3'>
      <NavDropdown.Header>Welcome, {user.name}!</NavDropdown.Header>
      <NavDropdown.Item href="/profile" onClick={handleMyProfileClick}>
        My profile
      </NavDropdown.Item>
      <NavDropdown.Item href="#">Watched movies</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="#" onClick={handleLogout}>
        Logout
      </NavDropdown.Item>
      {isProfilePage && showProfileForm && (
        <ProfileForm user={user} onSave={handleCloseProfileForm} />
      )}
    </NavDropdown>
  );
}

export default HeaderUser;