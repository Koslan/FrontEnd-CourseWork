import './footer.css';
import Logo from '../assets/Logo.svg';

function Footer() {

    return (
      <>
        <footer>
          <div className='logo'>
            <img src={Logo} className='logo' width="160" height="33" />
          </div>
          <div className='footer_nav'>
            <nav>
                <ul>
                    <li>Films</li>
                    <li>Tv-shows</li>
                    <li>Books</li>
                    <li>About</li>
                    <li>Contacts</li>
                </ul>
            </nav>
          </div>
          <div className='footer_names'>
            <h4>Designer:Anna Buriak</h4>
            <h4>Programmers:Konstantin Buriak</h4>
            <h4>Elmira</h4>
            <h4>Olena Stovolosova</h4>
          </div>
        </footer>
      </>
    )
  }
  
  export default Footer;