import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "@scss/diurnal.scss";

export default function Diurnal() {
  // TODO: replace this with what we actually want on our home page
  return (
    <div className="diurnal">
      <div className='diurnal__wrapper'>
        <p>
          what am i doing here halp
        </p>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
