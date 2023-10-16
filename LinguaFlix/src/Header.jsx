import Nav from './components/Nav.jsx';
import './App.css'; 
import Logo from './assets/logo.svg';
import { Link } from 'react-router-dom';


function Header({ onSearch }) {
    const handleInputChange = (e) => {
        onSearch(e.target.value);
    };

    return (
        <header className="header">
            <div className='logo'>
            <Link to="/">
                    <img src={Logo} className='logo' width="160" height="33" alt="Logo" />
                </Link>
            </div>
            <div className="header__center">
                <div className="search-container">
                    <img src="../src/assets/search.svg" alt="search"  />
                    <input 
                        type="text" 
                        placeholder="Search" 
                        onChange={handleInputChange} // Добавлено
                    />
                </div>
            </div>
            <div className="header__right">
                <Nav />
            </div>
        </header>
    );
}


export default Header;
