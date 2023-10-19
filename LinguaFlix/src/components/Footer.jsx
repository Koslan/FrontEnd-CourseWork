import './footer.css';
import Logo from '../assets/logo.svg';
import Nav from './Nav';

function Footer() {

    return (
      <>
        <footer>
          <div className='logo'>
            <img src={Logo} className='logo' width="160" height="33" />
          </div>
          <div className='footer_nav'>
            <Nav />
          </div>
          <h6>©2023 LinguaFlix.</h6>
        </footer>
      </>
    )
  }
  
  export default Footer;