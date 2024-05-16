import "@scss/tally.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useCallback, useContext, useState } from "react";
import { WebSocketContext } from "../../utils/apiClient/WSContenxt";

export default function Tally({ allUserData }) {
  const [, , ws] = useContext(WebSocketContext);
  const [vote, setVote] = useState();

  const onVoteChange = useCallback(
    (id) => () => {
      console.log("id is", id);
      setVote(id);
    },
    []
  );

  const onSubmitVote = useCallback(() => {
    ws.submitVote(vote);
  }, [vote, ws]);

  const listOfAlivePlayers =
    allUserData !== undefined && allUserData.length > 0 && allUserData[0].votes
      ? allUserData.sort((a, b) => {
          if (a.votes !== undefined && b.votes !== undefined) {
            return (b.votes?.length || 0) - (a.votes?.length || 0);
          }
          return 0;
        })
      : allUserData;

  const votingOptionsWithTallys = listOfAlivePlayers.map(({ id, name, votes }) => {
    let formattedName;
    const identifier = name.length > 0 ? name : id;
    if (votes?.length > 0) {
      const combinedVoters = votes
        ?.reduce((arr, vote) => {
          arr.push(vote.voter?.name);
          return arr;
        }, [])
        .join(",");
      formattedName = `${identifier} - ${votes?.length} vote${votes?.length === 1 ? "" : "s"} from ${combinedVoters}`;
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
        onChange={onVoteChange}
      />
    );
  });

  return (
    <div className="tally__wrapper">
      <h3>Village Rumors</h3>
      <p>
        <strong>Suspected to be a werewolf:</strong>
      </p>
      {votingOptionsWithTallys}
      <Button variant="primary" type="submit" onClick={onSubmitVote} disabled={!vote}>
        Vote
      </Button>
    </div>
  );
}
