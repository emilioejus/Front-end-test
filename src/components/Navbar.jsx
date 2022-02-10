import React, {useContext} from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import carrito from '../assets/icons/icons-carrito-de-compras.png';
import '../assets/styles/navbar.css';

const Navbar = ()=> {

  //context
  const { count } = useContext(AppContext);

    return (
        <header className='container_header navbar-light bg-light'>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">Logo</Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link active" to="/">List View</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/details">Detail</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <img src={carrito} alt="carrito" />
          <p className='container_header_counter'>{count}</p>
        </header>
    )
}

export default Navbar;