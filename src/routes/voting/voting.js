import "@scss/voting.scss";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import { useCallback, useState } from 'react';

export default function Voting() {
  // TBD pull from API

  const listOfAlivePlayers = [
    {
      name: 'Camille Kaniecki',
      numVotes: 0,
      voters: [],
    },
    {
      name: 'Julia Kester',
      numVotes: 0,
      voters: [],
    },
    {
      name: 'Dan Conley',
      numVotes: 2,
      voters: [
        'Julia Kester',
        'Camille Kaniecki',
      ],
    },
    {
      name: 'Jane Doe',
      numVotes: 1,
      voters: [
        'John Doe',
      ],
    },
    {
      name: 'John Doe',
      numVotes: 0,
      voters: [],
    }
  ].sort((a, b) => b.numVotes - a.numVotes);

  console.log('listOfAlivePlayers is', listOfAlivePlayers);

  const votingOptionsWithTallys = listOfAlivePlayers.map((item, idx) => {
    let formattedName;
    if (item.numVotes > 0 && item.voters.length > 0) {
      const combinedVoters = item.voters.length > 1
        ? item.voters.join(', ')
        : item.voters[0];
      formattedName = `${item.name} - ${item.numVotes} from ${combinedVoters}`;
    } else {
      formattedName = `${item.name} - 0 votes`; 
    }
    return (
      <Form.Check
        type='radio'
        label={`${formattedName}`}
        name='voting-choice'
      />
    );
  });

  return (
    <div className="voting__wrapper">
      <h1>Choose a sacrifice</h1>
      <Form>
        {votingOptionsWithTallys}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
