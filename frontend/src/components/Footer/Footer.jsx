import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col className="text-center py-3">
            <a href="#">FAQs</a>
          </Col>
          <Col className="text-center py-3">
            <a href="#">Contact Us</a>
          </Col>
          <Col className="text-center py-3">
            <a href="#">Terms & Conditions</a>
          </Col>
          <Col className="text-center py-3">
            <a href="#">Privacy Policy</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
