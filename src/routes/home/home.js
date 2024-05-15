import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./home.css";
import { clearSession, setUserName } from "@slices/userSlice";
import { resetGame, setGameInProgress } from "@store/slices/gameSlice";
import { WebSocketContext } from "@utils/apiClient/WSContenxt";
import WebsocketStausIndicator from "@components/WebsocketStatusIndicator";
import { FormSelect } from "react-bootstrap";
import fur from "../../assets/wild-animal-pattern-fur-texture.jpg";
import howling from "../../assets/wolf-howl.png";

export default function Home() {
  const [isFirstView, setIsFirstView] = useState(true);
  const { name } = useSelector(({ user }) => user.localUser);
  const { inProgress, users, rolesetOptions, selectedRoleset, phase } = useSelector(
    ({ game }) => game
  );
  const [userName, setUserNameFromInput] = useState(name);
  const [dropdownRolesetValue, setDropdownRolesetValue] = useState();
  const [userDisconnected, setUserDisconnected] = useState(false);
  const dispatch = useDispatch();
  const [isReady, _, ws] = useContext(WebSocketContext);
  console.log({ inProgress });

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
    dispatch(setUserName({ name: userName }));
    ws.onSetUserName(userName);
  }, [dispatch, userName, ws]);

  const handleClearUser = useCallback(() => {
    dispatch(clearSession());
    setUserNameFromInput("");
    ws.leave();
  }, [dispatch, ws]);

  const handlesetGameInProgress = useCallback(() => {
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

  console.log({ ws });

  const handleSetRoleset = useCallback(() => {
    console.log({ ws });
    ws.setRoleset(dropdownRolesetValue);
  }, [ws, dropdownRolesetValue]);

  const rolesetDescription = useMemo(
    () => rolesetOptions.find((roleset) => roleset.name === dropdownRolesetValue)?.description,
    [rolesetOptions, dropdownRolesetValue]
  );

  const startAGame = useCallback(() => {
    setIsFirstView(false);
  }, [setIsFirstView]);

  return (
    <div className="App" style={{ backgroundImage: `url(${fur})` }}>
      <Container className="login-wrapper">
        {isFirstView ? (
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
                      <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserNameFromInput(e.target.value)}
                      />
                    )}
                    {name && <h3>Hi {name}!</h3>}
                    {!name && (
                      <button type="button" onClick={handleUpdateUser}>
                        connect a user
                      </button>
                    )}
                    {name && !inProgress && (
                      <button type="button" onClick={handleUpdateUser}>
                        update user name
                      </button>
                    )}
                    {name && !inProgress && (
                      <button type="button" onClick={handleClearUser}>
                        reset the user
                      </button>
                    )}
                    {!inProgress && name && rolesetOptions.length && (
                      <button type="button" onClick={handlesetGameInProgress}>
                        start the game
                      </button>
                    )}
                    {inProgress && (
                      <button type="button" onClick={handleResetGame}>
                        reset the game
                      </button>
                    )}
                    {isReady && (
                      <button type="button" onClick={handleDisconnect}>
                        disconnect from the WS
                      </button>
                    )}
                    {!isReady && (
                      <button type="button" onClick={handleConnect}>
                        connect to the WS
                      </button>
                    )}
                    {users.length && (
                      <>
                        <h4>Player list:</h4>
                        <ListGroup>
                          {users.map((user) => (
                            <ListGroup.Item key={user.id} variant="Secondary">
                              {user.name ?? user.id}
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                      </>
                    )}
                    {selectedRoleset && <h3>Roleset selected: {selectedRoleset.name}</h3>}
                    {!inProgress && rolesetOptions.length && (
                      <h3>You're the leader! Please choose a roleset:</h3>
                    )}
                    {!inProgress && rolesetOptions.length && (
                      <FormSelect onChange={(e) => setDropdownRolesetValue(e.target.value)}>
                        {rolesetOptions.map((roleset) => (
                          <option key={roleset.name} value={roleset.name}>
                            {roleset.name}
                          </option>
                        ))}
                      </FormSelect>
                    )}
                    {!inProgress && rolesetDescription && <p>{rolesetDescription}</p>}
                    {!inProgress && dropdownRolesetValue && (
                      <button type="button" onClick={handleSetRoleset}>
                        set the roleset
                      </button>
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
