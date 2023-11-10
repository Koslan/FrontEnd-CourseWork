import React, { useEffect, useState } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import SignIn from './Auth/Signin';
import SignUp from './Auth/SignUp';
import './login.css';
import { useDispatch } from 'react-redux';
import { getUserFromDB } from '../store/userSlice';
import { auth } from '../store/firebase';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [activeTab, setActiveTab] = useState("signIn");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    // Перевіряємо, чи користувач зареєстрований
    const userRegistered = localStorage.getItem('userRegistered');

    if (!userRegistered) {
      // Якщо користувач не зареєстрований, встановлюємо showModal: true
      setShowModal(true);
    }

    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        dispatch(getUserFromDB(authUser.uid));
        // localStorage.setItem('isUserLoggedIn', 'true'); // Вказуємо, що користувач увійшов
        // setShowModal(false);
      } else {
        console.log('no user');
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
            <h1 className="login-title">Personal office</h1>
            <Tab.Container activeKey={activeTab}>
              <Nav variant="pills" className="login-tabs">
                <Nav.Item>
                  <Nav.Link
                    eventKey="signIn"
                    onClick={() => handleTabChange("signIn")}
                  >
                    Sign In
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="signUp"
                    onClick={() => handleTabChange("signUp")}
                  >
                    Sign Up
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