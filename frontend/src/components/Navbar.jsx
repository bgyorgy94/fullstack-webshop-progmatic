import './Navbar.css';
import categorieService from '../services/categorie-service';
import { useState, useEffect } from 'react';
import { LoginModalContext } from '../contexts/LoginModalContext';
import { RegisterModalContext } from '../contexts/RegisterModalContext';
import { useContext } from 'react';
import Login from '../pages/Login';
import RegisterUser from '../pages/RegisterUser';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [categories, setCategories] = useState([]);
    const [loginModalIsOpen,setLoginModalIsOpen] = useContext(LoginModalContext);
    const [registerModalIsOpen,setRegisterModalIsOpen] = useContext(RegisterModalContext);

    useEffect(() => {
        categorieService.getAllCategories().then((resp) => setCategories(resp.data));
      }, []);

    return(
        <>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0" />
            <nav className="navbar navbar-expand-lg sticky-top">
                <div className="container-fluid d-flex mb-3">
                    <a className="navbar-brand me-auto p-2 link-item" href="#">COS</a>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li> 
                                <div className="nav-item dropdown ms-1 me-1 p-2">
                                    <button
                                    className="btn fw-light p-0 border-0 bg-white link-item"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-mdb-toggle="dropdown"
                                    aria-expanded="false"
                                    >
                                    Categories
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        {categories.map((category)=>(
                                            <li key={category.id}><a className="dropdown-item" href="#">{category.name}</a></li>
                                        ))}
                                    </ul>
                                </div>
                            </li> 
                            <li > 
                                <div className='nav-item ms-1 me-1 p-2'>
                                    <button data-bs-toggle="modal button"
                                            data-bs-target="#exampleModal"
                                            onClick={loginButton} 
                                            className="btn fw-light p-0 border-0 bg-white"
                                    >
                                    Bejelentkezés
                                    </button>
                                </div>
                            </li>
                            <li className=' nav-item container row align-items-center'>
                                <Link className="link-item" to="/cart">
                                    <span className="material-symbols-outlined">shopping_bag</span>
                                </Link>
                            </li>
                            <li className='nav-item container row align-items-center'> 
                                    <Link className="link-item" to="/admin">Admin</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
    {loginModalIsOpen && <Login/>}
    {registerModalIsOpen && <RegisterUser/>}
        </>
    );
    function loginButton() {
        setLoginModalIsOpen(true);
      }

}