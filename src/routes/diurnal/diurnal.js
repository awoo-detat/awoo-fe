import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "@scss/diurnal.scss";
import { useCallback, useState } from 'react';

export default function Diurnal() {
  // eventually come from central state
  const [isNight, setIsNight] = useState(false);
  console.log('isNight is', isNight);
  // const onClick = useCallback((myVal) => {
  //   setMyBoolean(false);
  // }, []);

  return (
    <div className={`diurnal ${isNight ? 'diurnal__night' : ''}`}>
      <div className="diurnal__wrapper">
        <Container>
          <Row>
            <Col>
              <p>
                what am i doing here halp
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
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
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
