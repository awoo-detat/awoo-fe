import "@scss/voting.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useMemo } from 'react';
import { useSelector } from "react-redux";

export default function Voting({ allUserData }) {
  const { name: role } = useSelector(({ user }) => user.localUser.role);

  const votingOptions = allUserData.map((item, idx) => {
    return <Form.Check
      key={`action-choice-${idx}`}
      type="radio"
      label={item.player.name}
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
      <h3>{actionText}</h3>
      <Form>
        {votingOptions}
        <Button variant="primary" type="submit">
          Choose
        </Button>
      </Form>
    </div>
  );
}
