import React, { useEffect, useState } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import SignIn from './Signin';
import SignUp from './SignUp';
import './login.css';
import { useDispatch } from 'react-redux';
import { getUserFromDB } from '../../store/userSlice';
import { auth } from '../../store/firebase';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../../store/i18n';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const [activeTab, setActiveTab] = useState("signIn");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const userRegistered = localStorage.getItem('userRegistered');

    if (!userRegistered) {
      setShowModal(true);
    }

    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        dispatch(getUserFromDB(authUser.uid));
         setShowModal(false);
      } else {
        console.log('no user');
        setShowModal(true);
      }
    });
  }, [dispatch]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {showModal && (
        <div className="modal-overlay">
          <div className="login-container">
            <div className="close-button" onClick={handleCloseModal}>
              X
            </div>
            <h1 className="login-title">{t('Personal_office')}</h1>
            <Tab.Container activeKey={activeTab}>
              <Nav variant="pills" className="login-tabs">
                <Nav.Item>
                  <Nav.Link
                    eventKey="signIn"
                    onClick={() => handleTabChange("signIn")}
                  >
                    {t('Sign In')}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="signUp"
                    onClick={() => handleTabChange("signUp")}
                  >
                    {t('Sign Up')}
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="signIn">
                  {activeTab === "signIn" && <SignIn />}
                </Tab.Pane>
                <Tab.Pane eventKey="signUp">
                  {activeTab === "signUp" && <SignUp />}
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;