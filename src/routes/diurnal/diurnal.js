import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Views from '../views/views.js';
import "@scss/diurnal.scss";
import paper from '../../assets/paper.png';
import { useCallback, useState } from 'react';

export default function Diurnal() {
  // eventually come from central state
  const [isNight, setIsNight] = useState(false);

  const [showViews, setShowViews] = useState(false);

  const handleClose = () => setShowViews(false);
  const handleShow = () => setShowViews(true);

  return (
    <div
      className={`diurnal ${isNight ? 'diurnal__night' : ''}`}
    >
      <Offcanvas show={showViews} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Views</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Views />
        </Offcanvas.Body>
      </Offcanvas>
      <div className="diurnal__wrapper" style={{ backgroundImage: "url(" + paper + ")" }}>
        <Container>
          <Row>
            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={require('../../assets/BACK.jpg')} />
                <Card.Body>
                  <Button variant="primary">View your role</Button>
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
