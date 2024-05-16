import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Views from "../views/views.js";
import Tally from "../voting/tally.js";
import Voting from "../voting/voting.js";
import "@scss/diurnal.scss";
import paper3 from "../../assets/paper3.png";

export default function Diurnal({ isDay }) {
  const { users: allUserData, phaseCount, phase } = useSelector(({ game }) => game);
  const { role, name } = useSelector(({ user }) => user.localUser);
  console.log('alive is', role.alive);
  const navigate = useNavigate();

  // eventually come from central state
  const [showFront, setShowFront] = useState(false);
  const [showViews, setShowViews] = useState(false);

  const handleClose = () => setShowViews(false);
  const handleShow = () => setShowViews(true);
  const toggleCardView = () => {
    setShowFront(!showFront);
  };

  const roleCtaText = useMemo(() => (showFront ? "Hide your role" : "View your role"), [showFront]);

  const votingComponent = useMemo(
    () => (isDay ? <Tally allUserData={allUserData} /> : <Voting allUserData={allUserData} />),
    [allUserData, isDay]
  );
  console.log({ phaseCount });

  useEffect(() => {
    if (!phase) {
      navigate("/");
    }
  }, [navigate, phase]);

  useEffect(() => {
    if (!role.alive) {
      navigate("/lose");
    }
  }, [navigate, role]);

  return (
    <div className={`diurnal ${!isDay ? "diurnal__night" : ""}`}>
      <Offcanvas show={showViews} onHide={handleClose}>
        <Offcanvas.Header closeButton closeVariant='white'>
          <Offcanvas.Title>Views</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Views />
        </Offcanvas.Body>
      </Offcanvas>
      <div className="diurnal__wrapper" style={{ backgroundImage: `url(${paper3})` }}>
        <Container>
          <Row className="align-items-flex-start">
            <Col lg={4} md={12} className="card-and-buttons">
              <div className={`flip-card ${showFront ? "show-front" : ""}`}>
                <div className="flip-card-inner">
                  {role ? (
                    <>
                      <div
                        className="flip-card-front"
                        // eslint-disable-next-line import/no-dynamic-require, global-require
                        style={{ backgroundImage: `url(${require("../../assets/BACK.jpg")})` }}
                      />
                      <div
                        className="flip-card-back"
                        // eslint-disable-next-line import/no-dynamic-require, global-require
                        style={{
                          backgroundImage: `url(${require(`../../assets/${role?.name}.jpg`)})`,
                        }}
                      />
                    </>
                  ) : null}
                </div>
              </div>
              <Container className="buttons-under-card">
                <Row className="align-items-center">
                  <Col className="even-spacing">
                    <Button variant="primary" onClick={toggleCardView}>
                      {roleCtaText}
                    </Button>
                  </Col>
                  <Col className="even-spacing">
                    <Button variant="primary" onClick={handleShow}>
                      Show&nbsp;Views
                    </Button>
                  </Col>
                </Row>
              </Container>
              <h2>You are: {name}</h2>
            </Col>
            <Col lg={8} md={12} className="main-game-contents">
              <h1>
                {isDay ? "Day" : "Night"} {Math.round(phaseCount / 2)}
              </h1>
              {votingComponent}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
