import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Views from '../views/views.js';
import Voting from '../voting/voting.js';
import "@scss/diurnal.scss";
import paper from '../../assets/paper.png';
import { useState, useMemo } from 'react';

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

  const roleCtaText = useMemo(() => {
    return showFront ? 'Hide your role' : 'View your role';
  }, [showFront]);

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
            <Col lg={4} md={12}>
              <div
                className={`flip-card ${showFront ? 'show-front' : ''}`}
              >
                <div className="flip-card-inner">
                  <div
                    className="flip-card-front"
                    style={{ backgroundImage: "url(" + require('../../assets/BACK.jpg') + ")" }}
                  />
                  <div
                    className="flip-card-back"
                    style={{ backgroundImage: "url(" + require('../../assets/Werewolf.jpg') + ")" }}
                  />
                </div>
              </div>
              <Container>
                <Row className="align-items-center">
                  <Col className="no-left-margin">
                    <Button
                      variant="primary"
                      onClick={toggleCardView}
                    >
                      {roleCtaText}
                    </Button>
                  </Col>
                  <Col className="no-left-margin">
                    <Button
                      variant="primary"
                      onClick={handleShow}
                    >
                      Show&nbsp;Views
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Col>
            <Col lg={8} md={12}>
              <Voting />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
