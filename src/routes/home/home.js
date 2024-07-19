import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import sortBy from "sort-by";
import "./home.css";
import { resetGame, setGameInProgress } from "@store/slices/gameSlice";
import { WebSocketContext } from "@utils/apiClient/WSContenxt";
import WebsocketStausIndicator from "@components/WebsocketStatusIndicator";
import { FormSelect, Form } from "react-bootstrap";
import { setUserName } from "@store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import fur from "../../assets/wild-animal-pattern-fur-texture.jpg";
import howling from "../../assets/wolf-howl.png";

export default function Home() {
  const [isFirstView, setIsFirstView] = useState(true);
  const { name, id: userId } = useSelector(({ user }) => user.localUser);
  const { inProgress, users, rolesetOptions, selectedRoleset, phase, leader, gameOverDetails } =
    useSelector(({ game }) => game);
  const [userName, setUserNameFromInput] = useState(name);
  const [dropdownRolesetValue, setDropdownRolesetValue] = useState();
  const [userDisconnected, setUserDisconnected] = useState(false);
  const dispatch = useDispatch();
  const [isReady, _, ws, handlePressPlay] = useContext(WebSocketContext);
  const navigate = useNavigate();

  console.log({ phase });

  useEffect(() => {
    if (!dropdownRolesetValue) {
      setDropdownRolesetValue(rolesetOptions[0]?.name);
    }
  }, [rolesetOptions, dropdownRolesetValue]);

  useEffect(() => {
    if (!inProgress && phase) {
      dispatch(setGameInProgress());
    }
    if (gameOverDetails) {
      navigate("/gameover");
    }
    if (phase) {
      navigate("/game");
    }
  }, [dispatch, inProgress, navigate, phase, gameOverDetails]);

  const handleUpdateUser = useCallback(() => {
    ws.onSetUserName(userName);
    dispatch(setUserName({ name: userName }));
  }, [dispatch, userName, ws]);

  const handleSetGameInProgress = useCallback(() => {
    ws.setGameInProgress();
  }, [ws]);

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

  const handleSetRoleset = useCallback(
    (e) => {
      console.log("-------------setting roleset", e.target.value);
      setDropdownRolesetValue(e.target.value);
      ws.setRoleset(e.target.value);
    },
    [ws]
  );

  const rolesetRoles = useMemo(
    () => selectedRoleset?.roles.slice().sort(sortBy("team", "-night_action", "name")),
    [selectedRoleset]
  );

  useEffect(() => {
    if (!selectedRoleset && rolesetOptions.length) {
      handleSetRoleset({ target: { value: rolesetOptions[0].name } });
    }
  }, [handleSetRoleset, rolesetOptions, rolesetOptions.length, selectedRoleset]);

  const startAGame = useCallback(() => {
    handlePressPlay();
    setIsFirstView(false);
  }, [setIsFirstView, handlePressPlay]);

  console.log({ users, selectedRoleset });
  const correctNumberOfPlayers = useMemo(
    () => users?.length === selectedRoleset?.roles?.length,
    [selectedRoleset?.roles?.length, users?.length]
  );

  const alreadyJoined = useMemo(() => users?.find((user) => user?.id === userId), [userId, users]);

  useEffect(() => {
    console.log({ name, userName });
    if (name && !userName) {
      setUserNameFromInput(name);
    }
  }, [name, userName]);

  const leaderId = useMemo(() => {
    const leaderIsInGame = users?.find((user) => user?.id === leader?.id);
    return leaderIsInGame ? leader?.id || null : null;
  }, [leader?.id, users]);

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
                  {name && <h3>Hi {name}!</h3>}
                  <div id="content-wrapper">
                    {!inProgress && (
                      <Form.Control
                        type="text"
                        id="usernameInput"
                        value={userName}
                        onChange={(e) => setUserNameFromInput(e.target.value)}
                      />
                    )}
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
                      <Button
                        onClick={handleSetGameInProgress}
                        size="lg"
                        variant="success"
                        disabled={!correctNumberOfPlayers}
                      >
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
                    {!inProgress && rolesetOptions.length ? (
                      <div className="leader-view">
                        <h3>You’re the leader!</h3>
                        <p>Choose a roleset:</p>
                      </div>
                    ) : null}
                    {!inProgress && rolesetOptions.length ? (
                      <FormSelect onChange={handleSetRoleset} defaultValue={rolesetOptions[0]}>
                        {rolesetOptions.map((roleset) => (
                          <option key={roleset.name} value={roleset.name}>
                            {roleset.name}
                          </option>
                        ))}
                      </FormSelect>
                    ) : null}
                    {users.length >= 1 && (
                      <>
                        <h3>Player list:</h3>
                        <ListGroup>
                          {users.map((user) => (
                            <ListGroup.Item key={user.id} variant="secondary">
                              {user.name || user.id} {leaderId === user.id ? "👑" : ""}
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                      </>
                    )}
                    {!inProgress && rolesetOptions.length ? (
                      <div className="leader-view">
                        <h3>You’re the leader!</h3>
                        <p>Choose a roleset:</p>
                      </div>
                    ) : null}
                    {!inProgress && rolesetOptions.length ? (
                      <FormSelect onChange={handleSetRoleset} defaultValue={rolesetOptions[0]}>
                        {rolesetOptions.map((roleset) => (
                          <option key={roleset.name} value={roleset.name}>
                            {roleset.name}
                          </option>
                        ))}
                      </FormSelect>
                    ) : null}
                    {selectedRoleset && (
                      <div>
                        <h3>Roleset selected: {selectedRoleset.name}</h3>
                        <p className="fs-4">{selectedRoleset.description}</p>
                        <h4>Roles:</h4>
                        <ListGroup>
                          {rolesetRoles.map((r) => (
                            <ListGroup.Item variant="secondary">
                              {r.name} ({r.team})
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                      </div>
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
