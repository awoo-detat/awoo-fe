import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./home.css";
import { resetGame, setGameInProgress } from "@store/slices/gameSlice";
import { WebSocketContext } from "@utils/apiClient/WSContenxt";
import WebsocketStausIndicator from "@components/WebsocketStatusIndicator";
import { FormSelect, Form } from "react-bootstrap";
import fur from "../../assets/wild-animal-pattern-fur-texture.jpg";
import howling from "../../assets/wolf-howl.png";

export default function Home() {
  const [isFirstView, setIsFirstView] = useState(true);
  const { name, id: userId } = useSelector(({ user }) => user.localUser);
  const { inProgress, users, rolesetOptions, selectedRoleset, phase, leader } = useSelector(
    ({ game }) => game
  );
  const [userName, setUserNameFromInput] = useState(name);
  const [dropdownRolesetValue, setDropdownRolesetValue] = useState();
  const [userDisconnected, setUserDisconnected] = useState(false);
  const dispatch = useDispatch();
  const [isReady, _, ws, handlePressPlay] = useContext(WebSocketContext);

  useEffect(() => {
    if (!dropdownRolesetValue) {
      setDropdownRolesetValue(rolesetOptions[0]?.name);
    }
  }, [rolesetOptions, dropdownRolesetValue]);

  useEffect(() => {
    if (!inProgress && phase) {
      dispatch(setGameInProgress());
    }
  }, [dispatch, inProgress, phase]);

  const handleUpdateUser = useCallback(() => {
    ws.onSetUserName(userName);
  }, [userName, ws]);

  const handleSetGameInProgress = useCallback(() => {
    dispatch(setGameInProgress()); // TODO: do we need this? Can it just be based on the phase message?
    ws.setGameInProgress();
  }, [dispatch, ws]);

  const handleResetGame = useCallback(() => {
    dispatch(resetGame());
    // TODO: add a socket call
  }, [dispatch]);

  const handleDisconnect = useCallback(() => {
    setUserDisconnected(true);
    ws.leave();
  }, [ws]);

  const handleConnect = useCallback(() => {
    ws.connect();
  }, [ws]);

  const handleSetRoleset = useCallback(() => {
    console.log({ ws });
    ws.setRoleset(dropdownRolesetValue);
  }, [ws, dropdownRolesetValue]);

  const rolesetDescription = useMemo(
    () => rolesetOptions.find((roleset) => roleset.name === dropdownRolesetValue)?.description,
    [rolesetOptions, dropdownRolesetValue]
  );

  const startAGame = useCallback(() => {
    handlePressPlay();
    setIsFirstView(false);
  }, [setIsFirstView, handlePressPlay]);

  const alreadyJoined = useMemo(
    () => users.find((user) => user.id === userId) !== undefined,
    [userId, users]
  );

  const leaderId = useMemo(() => leader.id || "", [leader]);

  return (
    <div className="App" style={{ backgroundImage: `url(${fur})` }}>
      <Container className="login-wrapper">
        {!userDisconnected && isFirstView && !alreadyJoined ? (
          <Row>
            <Col>
              <img className="howling" src={howling} alt="Awooo" />
              <h1>Welcome to werewolf.live!</h1>
              <Button onClick={startAGame} size="lg" variant="secondary">
                Play
              </Button>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col>
              {userDisconnected ? (
                <h3>Bye!</h3>
              ) : (
                <WebsocketStausIndicator>
                  <div id="content-wrapper">
                    {!inProgress && (
                      <Form.Control
                        type="text"
                        id="usernameInput"
                        value={userName}
                        onChange={(e) => setUserNameFromInput(e.target.value)}
                      />
                    )}
                    {name && <h3>Hi {name}!</h3>}
                    {!name && (
                      <Button onClick={handleUpdateUser} variant="secondary">
                        Create user
                      </Button>
                    )}
                    {name && !inProgress && (
                      <Button onClick={handleUpdateUser} variant="secondary">
                        Update user
                      </Button>
                    )}
                    {!inProgress && name && rolesetOptions.length ? (
                      <Button onClick={handleSetGameInProgress} size="lg" variant="secondary">
                        Start!
                      </Button>
                    ) : null}
                    {inProgress && (
                      <Button onClick={handleResetGame} variant="secondary">
                        Reset game
                      </Button>
                    )}
                    {isReady && (
                      <Button onClick={handleDisconnect} variant="secondary">
                        Disconnect
                      </Button>
                    )}
                    {!isReady && (
                      <Button onClick={handleConnect} variant="secondary">
                        Connect
                      </Button>
                    )}
                    {users.length >= 1 && (
                      <>
                        <h3>Player list:</h3>
                        <ListGroup>
                          {users.map((user) => (
                            <ListGroup.Item key={user.id} variant="Secondary">
                              {user.name || user.id} {leaderId === user.id ? "👑" : ""}
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                      </>
                    )}
                    {selectedRoleset && <h3>Roleset selected: {selectedRoleset.name}</h3>}
                    {!inProgress && rolesetOptions.length ? (
                      <div className="leader-view">
                        <h3>You're the leader!</h3>
                        <p>Choose a roleset:</p>
                      </div>
                    ) : null}
                    {!inProgress && rolesetOptions.length ? (
                      <FormSelect onChange={(e) => setDropdownRolesetValue(e.target.value)}>
                        {rolesetOptions.map((roleset) => (
                          <option key={roleset.name} value={roleset.name}>
                            {roleset.name}
                          </option>
                        ))}
                      </FormSelect>
                    ) : null}
                    {!inProgress && rolesetDescription && <p>{rolesetDescription}</p>}
                    {!inProgress && dropdownRolesetValue && (
                      <Button onClick={handleSetRoleset} variant="secondary">
                        Choose Roleset
                      </Button>
                    )}
                  </div>
                </WebsocketStausIndicator>
              )}
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}
