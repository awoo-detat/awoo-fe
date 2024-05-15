import "@scss/tally.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Tally({allUserData}) {
  console.log('alluserdata is', allUserData);
  console.log(allUserData[0].name);
  const listOfAlivePlayers = (allUserData !== undefined && allUserData.length > 0 && allUserData[0].votes)
    ? allUserData.sort((a, b) => {
      if (a.votes !== undefined && b.votes !== undefined) {
        return b.votes?.length - a.votes?.length;
      }
      return 0;
    })
    : allUserData;

  const votingOptionsWithTallys = listOfAlivePlayers.map((item, idx) => {
    let formattedName;
    if (item.votes?.length > 0) {
      const combinedVoters = item.votes?.reduce((arr, vote) => {
        arr.push(vote.voter?.name);
        return arr;
      }, []).join(',');
      formattedName = `${item.name} - ${item.votes?.length} vote${item.votes?.length === 1 ? '' : 's'} from ${combinedVoters}`;
    } else {
      formattedName = `${item.name} - 0 votes`;
    }
    return <Form.Check
      key={`voting-choice-${idx}`}
      type="radio"
      label={formattedName}
      name="voting-choice"
    />
  });

  return (
    <div className="tally__wrapper">
      <h3>Village Rumors</h3>
      <p><strong>Suspected to be a werewolf:</strong></p>
      {votingOptionsWithTallys}
      <Button variant="primary" type="submit">
        Vote
      </Button>
    </div>
  );
}
