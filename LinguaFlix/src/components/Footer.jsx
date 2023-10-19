import './footer.css';
import Logo from '../assets/logo.svg';
import Nav from './Nav';

function Footer() {

  return (
    <>
      <footer>
        <div className='footer-content'>
          <div className='logo'>
            <img src={Logo} className='logo' width="160" height="33" />
          </div>
          <div className='footer_nav'>
            <Nav />
          </div>
          <h6>©2023 LinguaFlix.</h6>
        </div>
        <div className='footer-line'>
          <svg xmlns="http://www.w3.org/2000/svg" width="1130" height="2" viewBox="0 0 1130 2" fill="none">
            <path d="M1 1L1129 1.0001" stroke="#6612ED" strokeLinecap="round" />
          </svg>
        </div>
      </footer>
    </>
  )
}


export default Footer;