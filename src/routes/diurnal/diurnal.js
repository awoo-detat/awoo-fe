import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Views from '../views/views.js';
import Voting from '../voting/voting.js';
import "@scss/diurnal.scss";
import paper from '../../assets/paper.png';
import { useCallback, useState } from 'react';

export default function Diurnal() {
  // eventually come from central state
  const [isNight, setIsNight] = useState(false);
  const [showFront, setShowFront] = useState(false);
  const [showViews, setShowViews] = useState(false);
  const [cardImgUrl, setCardImgUrl] = useState(require('../../assets/BACK.jpg'));

  const handleClose = () => setShowViews(false);
  const handleShow = () => setShowViews(true);
  const toggleCardView = () => {
    setShowFront(!showFront);
    // eventually pull from state
    if (showFront) {
      setCardImgUrl(require('../../assets/BACK.jpg'));
    } else {
      setCardImgUrl(require('../../assets/Werewolf.jpg'));
    }
  }

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
      <div
        className="diurnal__wrapper"
        style={{ backgroundImage: "url(" + paper + ")" }}
      >
        <Container>
          <Row className="align-items-flex-start">
            <Col xs={3}>
              <Card
                className={`role-card ${showFront ? 'front-view' : ''}`}
                style={{ width: '18rem' }}
              >
                <Card.Img
                  variant="top"
                  src={cardImgUrl}
                />
              </Card>
              <Container>
                <Row className="align-items-center">
                  <Col>
                    <Button
                      variant="primary"
                      onClick={toggleCardView}
                    >
                      View your role
                    </Button>
                  </Col>
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
            </Col>
            <Col>
              <Voting />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
