import { Image, Container, Dropdown, Nav, Navbar } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { FaUser } from 'react-icons/fa';
import AuthModal from '../AuthModal/AuthModal';
import useLogin from '../../hooks/useLogin';
import './Navigation.scss';

export default function Navigation() {
  const [activeMenu, setActiveMenu] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user] = useContext(UserContext);
  const { logout } = useLogin();

  const menus = {
    men: ['Trousers', 'Jeans', 'Shirts'],
    women: ['Dresses', 'Jeans', 'Shirts'],
  };

  return (
    <div onMouseLeave={() => setActiveMenu('')}>
      <Navbar
        sticky="top"
        bg="light"
        className={!activeMenu ? 'navbar' : 'navbar no-border'}
        expand="lg"
      >
        <Container fluid className="d-flex flex-wrap">
          <Navbar.Brand className="order-1 order-lg-2 m-md-3 m-lg-0" href="#home">
            <Image
              src="src/assets/solapparellogo2.svg"
              alt="Sol Apparel Logo"
              width={120}
              height={60}
            />
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
              <Nav.Link
                className="custom-link-hover ms-4"
                onMouseEnter={() => setActiveMenu('men')}
              >
                MEN
              </Nav.Link>
              <Nav.Link className="custom-link-hover" onMouseEnter={() => setActiveMenu('women')}>
                WOMEN
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="order-3 order-lg-4">
            <Container className="d-flex justify-content-lg-end justify-content-center no-padding align-items-center text-center">
              <button
                type="button"
                className="btn-loginModal me-2"
                onClick={() => setShowAuthModal(true)}
              >
                <FaUser />
              </button>
              {user ? (
                <>
                  <p style={{ color: 'black' }} className="no-margin">
                    Hi, {user.email}!
                  </p>{' '}
                  <button type="button" className="btn-logout ms-2" onClick={() => logout()}>
                    Logout
                  </button>
                </>
              ) : (
                ''
              )}

              <AuthModal show={showAuthModal} handleClose={() => setShowAuthModal(false)} />
            </Container>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className={`menu-wrapper bg-light ${activeMenu ? 'show' : ''}`}>
        <Dropdown.Menu className="border-top-0 border-bot-1 bg-light text-dark" show={!!activeMenu}>
          {menus[activeMenu]?.map((item) => (
            <Dropdown.Item key={item}>{item}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </div>
    </div>
  );
}
