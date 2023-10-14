import Nav from './components/Nav.jsx';
import './App.css'; 
import Logo from './assets/logo.svg';


function Header() {
    return (
    <header className="header">
            <div className='logo'>
            <img src={Logo} className='logo' width="160" height="33" />
          </div>
            <div className="header__center">
                <div class="search-container">
                    <img src="../src/assets/search.svg" alt="search"  />
                    <input type="text" placeholder="Search"  />
                </div>
            </div>
            <div className="header__right">
            <Nav />
            </div>
    </header>
    );
}

export default Header;
