import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import LoseScreen from "@components/LoseScreen";
import WinScreen from "@components/WinScreen";

export default function GameOver() {
  const navigate = useNavigate();

  const { gameOverDetails } = useSelector(({ game }) => game);
  const { winner: winningTeam } = gameOverDetails || {};
  const [showAllCards, setShowAllCards] = useState(false);

  useEffect(() => {
    if (!gameOverDetails) {
      navigate("/game");
    }
  }, [navigate, gameOverDetails]);

  console.log({ gameOverDetails });

  const WinOrLoseScreen = gameOverDetails && winningTeam === "Good" ? WinScreen : LoseScreen;

  const handleShow = () => {
    setShowAllCards(true);
  };

  console.log({ gameOverDetails });

  const allUsersAndRoles = useMemo(
    () =>
      gameOverDetails.roles?.map((role) => (
        <Col md={2} xs={4} className="card-and-buttons" key={role.name}>
          <div className={`flip-card ${showAllCards ? "show-front" : ""}`}>
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
                    style={{
                      // eslint-disable-next-line import/no-dynamic-require, global-require
                      backgroundImage: `url(${require(`../../assets/${role?.role?.name}.jpg`)})`,
                    }}
                  />
                </>
              ) : null}
            </div>
          </div>
          <p className="align-left">
            {role.name}
          </p>
        </Col>
      )),
    [gameOverDetails, showAllCards]
  );

  if (!gameOverDetails) {
    return null;
  }

  return (
    <div className="gameOver">
      <WinOrLoseScreen>
        {
          // TODO: put in the final details
          <Container>
            {!showAllCards ? (
              <Row>
                <Col className="bottom-padding">
                  <Button variant="primary" onClick={handleShow}>
                    See who's who
                  </Button>
                </Col>
              </Row>
            ) : null}
            <Row className="align-items-flex-start">{allUsersAndRoles}</Row>
          </Container>
        }
      </WinOrLoseScreen>
    </div>
  );
}
