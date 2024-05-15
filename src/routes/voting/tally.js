import "@scss/voting.scss";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Tally({allUserData}) {
  const listOfAlivePlayers = allUserData.sort((a, b) => b.votes.length - a.votes.length);

  const votingOptionsWithTallys = listOfAlivePlayers.map((item, idx) => {
    let formattedName;
    if (item.votes.length > 0) {
      const combinedVoters = item.votes.reduce((arr, vote) => {
        arr.push(vite.voter.name);
        return arr;
      }, []).join(',');
      formattedName = `${item.player.name} - ${item.votes.length} vote${item.votes.length === 1 ? '' : 's'} from ${combinedVoters}`;
    } else {
      formattedName = `${item.player.name} - 0 votes`;
    }
    return <Form.Check
      key={`voting-choice-${idx}`}
      type="radio"
      label={formattedName}
      name="voting-choice"
    />
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
