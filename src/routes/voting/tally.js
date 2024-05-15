import "@scss/voting.scss";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import { useCallback, useState } from 'react';

export default function Tally({allUserData}) {
  // TBD pull from API

  const listOfAlivePlayers = [
    {
      id: '00000000-0000-0000-0000-000000000000',
      name: "Camille Kaniecki",
      numVotes: 0,
      voters: [],
      alive: true,
    },
    {
      id: '00000000-0000-0000-0000-000000000000',
      name: "Julia Kester",
      numVotes: 0,
      voters: [],
      alive: true,
    },
    {
      id: '00000000-0000-0000-0000-000000000000',
      name: "Dan Conley",
      numVotes: 2,
      voters: ["Julia Kester", "Camille Kaniecki"],
      alive: true,
    },
    {
      id: '00000000-0000-0000-0000-000000000000',
      name: "Jane Doe",
      numVotes: 1,
      voters: ["John Doe"],
      alive: true,
    },
    {
      id: '00000000-0000-0000-0000-000000000000',
      name: "John Doe",
      numVotes: 0,
      voters: [],
      alive: true,
    },
  ].sort((a, b) => b.numVotes - a.numVotes);

  const votingOptionsWithTallys = listOfAlivePlayers.map((item, idx) => {
    let formattedName;
    if (item.numVotes > 0 && item.voters.length > 0) {
      const combinedVoters = item.voters.length > 1
        ? item.voters.join(', ')
        : item.voters[0];
      formattedName = `${item.name} - ${item.numVotes} vote${item.numVotes === 1 ? '' : 's'} from ${combinedVoters}`;
    } else {
      formattedName = `${item.name} - 0 votes`;
    }
    return <Form.Check
      key={`voting-choice-${idx}`}
      type="radio"
      label={formattedName}
      name="voting-choice"
    />;;
  });

  return (
    <div className="voting__wrapper">
      <Container>
        <Row className="align-items-center">
          <Col>
            <h3>Village Rumors</h3>
            <p><strong>Suspected to be a werewolf:</strong></p>
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col>
            <Form>
              {votingOptionsWithTallys}
              <Button variant="primary" type="submit">
                Vote
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
