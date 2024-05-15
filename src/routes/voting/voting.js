import "@scss/voting.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useMemo } from 'react';

export default function Voting() {
  // TBD pull from API
  const userRole = 'werewolf';

  const listOfAlivePlayers = [
    {
      name: "Camille Kaniecki",
      numVotes: 0,
      voters: [],
    },
    {
      name: "Julia Kester",
      numVotes: 0,
      voters: [],
    },
    {
      name: "Dan Conley",
      numVotes: 2,
      voters: ["Julia Kester", "Camille Kaniecki"],
    },
    {
      name: "Jane Doe",
      numVotes: 1,
      voters: ["John Doe"],
    },
    {
      name: "John Doe",
      numVotes: 0,
      voters: [],
    },
  ];

  const votingOptionsWithTallys = listOfAlivePlayers.map((item, idx) => {
    return <Form.Check
      key={`action-choice-${idx}`}
      type="radio"
      label={item.name}
      name="voting-choice"
    />;
  });

  const actionText = useMemo(() => {
    switch (userRole) {
      case 'werewolf': return 'Who will you choose as your next victim?';
      case 'seer': return 'Who will you choose to view?';
      case 'sorcerer': return 'Who will you choose to view?';
      case 'hunter': return 'Who will you choose to target?';
      default: return 'Who do you feel is most suspicious?';
    }
  }, [userRole]);

  return (
    <div className="voting__wrapper">
      <h2>{actionText}</h2>
      <Form>
        {votingOptionsWithTallys}
        <Button variant="primary" type="submit">
          Choose
        </Button>
      </Form>
    </div>
  );
}
