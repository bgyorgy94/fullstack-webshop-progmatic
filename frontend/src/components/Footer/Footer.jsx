import { Container, Row, Col } from 'react-bootstrap';
import './Footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <Col className="text-center py-3">
            <a className="footer-link" href="#">
              FAQs
            </a>
          </Col>
          <Col className="text-center py-3">
            <a className="footer-link" href="#">
              Contact Us
            </a>
          </Col>
          <Col className="text-center py-3">
            <a className="footer-link" href="#">
              Privacy Policy
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
