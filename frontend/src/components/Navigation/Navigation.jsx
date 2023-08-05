import { Container, Dropdown, Nav, Navbar } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { FaUser } from 'react-icons/fa';
import { UserContext } from '../../contexts/UserContext';
import { LoginModalContext } from '../../contexts/LoginModalContext';
import { RegisterModalContext } from '../../contexts/RegisterModalContext';
import Login from '../../pages/LoginRegister/Login';
import RegisterUser from '../../pages/LoginRegister/RegisterUser';
import './Navigation.scss';

export default function Navigation() {
  const [activeMenu, setActiveMenu] = useState('');
  const [user] = useContext(UserContext);
  const [loginModalIsOpen, setLoginModalIsOpen] = useContext(LoginModalContext);
  const [registerModalIsOpen] = useContext(RegisterModalContext);

  const menus = {
    men: ['Trousers', 'Jeans', 'Shirts'],
    women: ['Dresses', 'Jeans', 'Shirts'],
  };

  const loginButton = () => {
    setLoginModalIsOpen(true);
  };

  return (
    <div onMouseLeave={() => setActiveMenu('')}>
      <Navbar bg="light" expand="lg">
        <Container fluid className="d-flex flex-wrap">
          <Navbar.Brand className="order-1 order-lg-2 m-md-3 m-lg-0" href="#home">
            Brand
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbarScroll"
            className="order-1 order-lg-3 m-md-3 m-lg-0"
          />
          <Navbar.Collapse id="navbarScroll" className="order-2 order-lg-1 center-content">
            <Nav
              className="mr-auto my-2 my-lg-0 text-center"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link className="text-dark" onMouseEnter={() => setActiveMenu('men')}>
                MEN
              </Nav.Link>
              <Nav.Link className="text-dark" onMouseEnter={() => setActiveMenu('women')}>
                WOMEN
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="order-3 order-lg-4">
            <Container className="d-flex justify-content-lg-end justify-content-center no-padding align-items-center text-center">
              <button
                type="button"
                className="btn-loginModal"
                onClick={loginButton}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <FaUser />
              </button>
              {user ? <p className="no-margin">Hi, {user.email}!</p> : ''}

              {loginModalIsOpen && <Login />}
              {registerModalIsOpen && <RegisterUser />}
            </Container>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className={`menu-wrapper bg-light ${activeMenu ? 'show' : ''}`}>
        <Dropdown.Menu className="border-top-0 bg-light text-dark" show={!!activeMenu}>
          {menus[activeMenu]?.map((item) => (
            <Dropdown.Item key={item}>{item}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </div>
    </div>
  );
}
