import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import useCart from '../../hooks/useCart';
import { CartContext } from '../../contexts/CartContext';
import './Cart.css';

export default function Cart() {
  const [cart, setCart] = useContext(CartContext);
  const { increase, decrease, emptyCart } = useCart();

  return (
    <Container>
      <Row>
        <Col>
          <Container fluid="true">
            <h4>Termékek a kosárban</h4>
            <hr />
            {cart.items.map((product) => {
              return (
                <Row className="align-items-md-center margin-top">
                  <Col>
                    <img src="https://placehold.co/100" />
                  </Col>
                  <Col>{product.title}</Col>
                  <Col>{product.price} Ft</Col>
                  <Col>
                    <Button size="sm" variant="light" onClick={() => decrease(product.id)}>
                      -
                    </Button>{' '}
                    {product.quantity}{' '}
                    <Button size="sm" variant="light" onClick={() => increase(product.id)}>
                      +
                    </Button>
                  </Col>
                  <Col>{product.subtotal} Ft</Col>
                </Row>
              );
            })}
          </Container>
          <hr />
        </Col>
        <Col lg={5}>
          <h4>Rendelés összegzése</h4>
          <hr />
          <Container fluid="sm">
            <Row>
              <Col className="margin-top">Összesen:</Col>
              <Col className="margin-top">{cart.total} Ft</Col>
            </Row>
            <Row>
              <Button variant="dark" className="margin-top">
                Megrendelés
              </Button>
            </Row>
            <Row>
              <Button variant="outline-dark" className="empty-cart margin-top" onClick={emptyCart}>
                Kosár ürítése
              </Button>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
