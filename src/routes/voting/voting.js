import "@scss/voting.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useCallback, useContext, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { WebSocketContext } from "../../utils/apiClient/WSContenxt";

export default function Voting({ allUserData }) {
  const { name: role } = useSelector(({ user }) => user.localUser?.role || "");
  const [vote, setVote] = useState();
  const [, , ws] = useContext(WebSocketContext);
  const [submittedAction, setSubmittedAction] = useState(false);

  const onSelectionChange = useCallback(
    (id) => () => {
      setVote(id);
    },
    []
  );

  const onSubmitNightAction = useCallback(() => {
    ws.submitNightAction(vote);
    setSubmittedAction(true);
  }, [vote, ws]);

  const votingOptions = useMemo(
    () =>
      allUserData.map(({ name, id }) => (
        <Form.Check
          id={id}
          key={`action-choice-${id}`}
          type="radio"
          label={name}
          name="voting-choice"
          onChange={onSelectionChange(id)}
        />
      )),
    [allUserData, onSelectionChange]
  );

  const actionText = useMemo(() => {
    switch (role) {
      case "Werewolf":
        return "Who will you choose as your next victim?";
      case "Seer":
        return "Who will you choose to view?";
      case "Sorcerer":
        return "Who will you choose to view?";
      case "Hunter":
        return "Who will you choose to target?";
      default:
        return "Who do you feel is most suspicious?";
    }
  }, [role]);

  return (
    <div className="voting__wrapper">
      <h3>{actionText}</h3>
      {submittedAction ? (
        <p>
          Your action has been submitted, still waiting on others. You can still change your action
          if desired.
        </p>
      ) : null}
      <Form>
        {votingOptions}
        <Button variant="primary" onClick={onSubmitNightAction} disabled={!vote}>
          Choose
        </Button>
      </Form>
    </div>
  );
}
