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

  if (!gameOverDetails) {
    return null;
  }

  console.log({ gameOverDetails });

  const WinOrLoseScreen = gameOverDetails && winningTeam === "Good" ? WinScreen : LoseScreen;

  const handleShow = () => {
    setShowAllCards(true);
  };

  const allUsersAndRoles = useMemo(() => {
    return gameOverDetails.roles?.map((role) => {
        return (
          <Col lg={4} md={6} className="card-and-buttons" key={role.name}>
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
                      // eslint-disable-next-line import/no-dynamic-require, global-require
                      style={{
                        backgroundImage: `url(${require(`../../assets/${role?.role?.name}.jpg`)})`,
                      }}
                    />
                  </>
                ) : null}
              </div>
            </div>
            <p>{role.role.name} - {role.name}</p>
          </Col>
        );
      });
  }, [gameOverDetails, showAllCards]);

  return (
    <div className="gameOver">
      <WinOrLoseScreen>
        {
          // TODO: put in the final details
          <Container>
            <Row>
              <Col className="bottom-padding">
                <Button variant="primary" onClick={handleShow}>
                  See who's who
                </Button>
              </Col>
            </Row>
            <Row className="align-items-flex-start">
              { allUsersAndRoles }
            </Row>
          </Container>
        }
      </WinOrLoseScreen>
    </div>
  );
}
