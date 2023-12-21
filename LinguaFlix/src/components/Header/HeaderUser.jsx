import React, { useEffect, useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { auth } from '../../store/firebase';
import { useDispatch, useSelector } from 'react-redux';
import './headerUser.css';
import { PersonFill } from 'react-bootstrap-icons';
import ProfileForm from './ProfileForm';
import { saveUserToFirebase, userSlice } from '../../store/userSlice';
import { userActions } from '../../store';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveUserToLocalStorage } from '../../store/userUtils';

import '../../store/i18n';
import { useTranslation } from 'react-i18next';

function HeaderUser() {
  const dispatch = useDispatch();
  const [showProfileForm, setShowProfileForm] = useState(false);
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  const { t } = useTranslation();

  console.log('Name:', user);

  if (!user.isLoggedIn) {
    // Redirect or handle as needed
    navigate('/login');
    return null;
  }

  useEffect(() => {
    console.log("User effect triggered.");
    if (user.userId) {
      console.log("User ID is present:", user.userId);
      saveUserToFirebase(user);
      saveUserToLocalStorage(user);
    }
    
  }, [user]);

  const handleMyProfileClick = () => {
    setShowProfileForm(!showProfileForm);
  };

  const handleCloseProfileForm = () => {
    setShowProfileForm(false);
  };

  const handleLogout = async () => {
    try {
        await auth.signOut();
        console.log('signout');
        dispatch(userActions.logout());
       // dispatch(userSlice.actions.logout());
        saveUserToLocalStorage(null);
        navigate('/');
    } catch (error) {
        console.log(error);
    }
};
  const isProfilePage = location.pathname === '/profile';

  return (
    <NavDropdown title={
      <>
        <PersonFill width={'2em'} height={'2em'} />
        {user.name && <span className="user-name">{user.name}</span>}
      </>
    } id="basic-nav-user" className='me-3'>
      <NavDropdown.Header>{t('Welcome')}, {user.name}!</NavDropdown.Header>
      <NavDropdown.Item href="/profile" onClick={handleMyProfileClick}>
       {t('My profile')}
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="#" onClick={handleLogout}>
        {t('Logout')}
      </NavDropdown.Item>
      {isProfilePage && showProfileForm && (
        <ProfileForm user={user} setUser={setUser} onSave={handleCloseProfileForm} />
      )}
    </NavDropdown>
  );
}

export default HeaderUser;