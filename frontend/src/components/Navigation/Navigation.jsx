import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { FaUser } from 'react-icons/fa';
import { UserContext } from '../../contexts/UserContext';
import { LoginModalContext } from '../../contexts/LoginModalContext';
import { RegisterModalContext } from '../../contexts/RegisterModalContext';
import Login from '../../pages/LoginRegister/Login';
import RegisterUser from '../../pages/LoginRegister/RegisterUser';
import './Navigation.css';

export default function Navigation() {
  const [activeMenu, setActiveMenu] = useState('');
  const [user] = useContext(UserContext);
  const [loginModalIsOpen, setLoginModalIsOpen] = useContext(LoginModalContext);
  const [registerModalIsOpen, setRegisterModalIsOpen] = useContext(RegisterModalContext);

  const menus = {
    men: ['Trousers', 'Jeans', 'Shirts'],
    women: ['Dresses', 'Jeans', 'Shirts'],
  };

  const loginButton = () => {
    setLoginModalIsOpen(true);
  };

  return (
    <div>
      <Navbar bg="light" expand="lg" onMouseLeave={() => setActiveMenu('')}>
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
              <Nav.Link href="#action1" onMouseEnter={() => setActiveMenu('men')}>
                MEN
              </Nav.Link>
              <Nav.Link href="#action2" onMouseEnter={() => setActiveMenu('women')}>
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
      <div className={`dropdown-menu ${activeMenu ? 'open' : ''}`}>
        <Container>
          <Row>
            {menus[activeMenu]?.map((item, index) => (
              <Col key={index} className="p-2">
                <a href="#">{item}</a>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}
