import "@scss/voting.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useMemo } from 'react';
import { useSelector } from "react-redux";

export default function Voting({ allUserData }) {
  const { role } = useSelector(({ user }) => user.localUser);

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
  ] || allUserData;

  const votingOptionsWithTallys = listOfAlivePlayers.map((item, idx) => {
    return <Form.Check
      key={`action-choice-${idx}`}
      type="radio"
      label={item.name}
      name="voting-choice"
    />;
  });

  const actionText = useMemo(() => {
    switch (role) {
      case 'Werewolf': return 'Who will you choose as your next victim?';
      case 'Seer': return 'Who will you choose to view?';
      case 'Sorcerer': return 'Who will you choose to view?';
      case 'Hunter': return 'Who will you choose to target?';
      default: return 'Who do you feel is most suspicious?';
    }
  }, [role]);

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
