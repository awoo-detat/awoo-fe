import "@scss/tally.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import { useCallback, useContext, useState } from "react";
import { WebSocketContext } from "../../utils/apiClient/WSContenxt";

export default function Tally({ allUserData }) {
  const [ws] = useContext(WebSocketContext);
  const [vote, setVote] = useState();
  const { role } = useSelector(({ user }) => user.localUser);

  const onVoteChange = useCallback(
    (id) => () => {
      setVote(id);
    },
    []
  );

  const onSubmitVote = useCallback(() => {
    ws.submitVote(vote);
  }, [vote, ws]);

  const updatedUserData = [...allUserData];

  const listOfAlivePlayers =
    updatedUserData !== undefined &&
    updatedUserData.length > 0 &&
    updatedUserData?.some((user) => user.votes?.length > 0)
      ? updatedUserData?.sort((a, b) => {
          if (a.votes !== undefined && b.votes !== undefined) {
            return b.votes?.length - a.votes?.length;
          }
          return 0;
        })
      : updatedUserData;

  const votingOptionsWithTallys = listOfAlivePlayers.map(({ id, name, votes }) => {
    let formattedName;
    const identifier = name.length > 0 ? name : id;
    if (votes !== undefined && votes.length > 0) {
      const combinedVoters = votes
        ?.reduce((arr, vote) => {
          arr.push(vote.voter?.name);
          return arr;
        }, [])
        .join(",");
      formattedName = `${identifier} - ${votes.length || 0} vote${votes?.length === 1 ? "" : "s"} from ${combinedVoters}`;
    } else {
      formattedName = `${identifier} - 0 votes`;
    }
    return (
      <Form.Check
        id={id}
        key={`voting-choice-${formattedName}`}
        type="radio"
        label={formattedName}
        name="voting-choice"
        onChange={onVoteChange(id)}
      />
    );
  });

  return (
    <div className="tally__wrapper">
      {role.alive ? <h3>Village Rumors</h3> : null}
      <p>
        <strong>Suspected to be a werewolf:</strong>
      </p>
      {votingOptionsWithTallys}
      <Button variant="primary" type="submit" onClick={onSubmitVote}>
        Vote
      </Button>
    </div>
  );
}
