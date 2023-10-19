import React, { useState } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import SignIn from './Auth/Signin';
import SignUp from './Auth/SignUp';


const Login = () => {
  const [activeTab, setActiveTab] = useState("signIn"); // Додали стейт для активного табу

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Personal office</h1>
      <Tab.Container activeKey={activeTab}>
        <Nav variant="pills" className="login-tabs">
          <Nav.Item>
            <Nav.Link
              eventKey="signIn"
              onClick={() => handleTabChange("signIn")} // Додаємо обробник події для зміни активного табу на "signIn"
            >
              Sign In
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="signUp"
              onClick={() => handleTabChange("signUp")} // Додаємо обробник події для зміни активного табу на "signUp"
            >
              Registration
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="signIn">
            {activeTab === "signIn" && <SignIn />} {/* Відображаємо компонент SignIn тільки коли активний таб "signIn" */}
          </Tab.Pane>
          <Tab.Pane eventKey="signUp">
            {activeTab === "signUp" && <SignUp />} {/* Відображаємо компонент SignUp тільки коли активний таб "signUp" */}
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default Login;