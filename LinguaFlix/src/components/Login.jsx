import React, { useState } from 'react';
import { Tab, Nav, Modal } from 'react-bootstrap';
import SignIn from './Auth/Signin';
import SignUp from './Auth/SignUp';
import './login.css';

const Login = () => {
  const [activeTab, setActiveTab] = useState("signIn");
  const [showModal, setShowModal] = useState(true);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

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
                    Registration
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
