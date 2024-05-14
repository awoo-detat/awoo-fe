import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Views from '../views/views.js';
import "@scss/diurnal.scss";
import { useCallback, useState } from 'react';

export default function Diurnal() {
  // eventually come from central state
  const [isNight, setIsNight] = useState(false);

  const [showViews, setShowViews] = useState(false);

  const handleClose = () => setShowViews(false);
  const handleShow = () => setShowViews(true);

  return (
    <div className={`diurnal ${isNight ? 'diurnal__night' : ''}`}>
      <Offcanvas show={showViews} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Views</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Views />
        </Offcanvas.Body>
      </Offcanvas>
      <div className="diurnal__wrapper">
        <Container>
          <Row>
            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                variant="primary"
                onClick={handleShow}
              >
                Show Views
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
