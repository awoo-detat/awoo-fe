import "@scss/views.scss";
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import { useCallback, useState } from 'react';

export default function Views() {
  let listOfAccordionIds = [];

  const accordionRows = [
    {
      dateTime: 'Day 1',
      playerName: 'Dan Conley',
      playerStatus: 'Not Wolf',
      scryedStatus: true,
    },
    {
      dateTime: 'Night 1',
      playerName: 'Julia Kester',
      playerStatus: 'Villager',
      scryedStatus: false,
    },
    {
      dateTime: 'Day 2',
      playerName: 'Joe Forsyth',
      playerStatus: 'Definitely not a Wolf',
      scryedStatus: false,
    },
    {
      dateTime: 'Night 2',
      playerName: 'Camille Kaniecki',
      playerStatus: 'Sorceror',
      scryedStatus: true,
    },
  ].map((viewStat, idx) => {
    const curId = `event-${idx}`;
    listOfAccordionIds.push(curId);
    const isDay = viewStat.dateTime.indexOf('Day') >= 0;
    return (
      <Accordion.Item eventKey={curId}>
        <Accordion.Header
          className={`${isDay ? 'day-header' : 'night-header'}`}
        >
          {viewStat.dateTime}
        </Accordion.Header>
        <Accordion.Body>
          <Container fluid>
            <Row>
              <Col>
                <strong>{viewStat.playerName}</strong>
              </Col>
              <Col>
                {viewStat.playerStatus}
              </Col>
              <Col
                dangerouslySetInnerHTML={{ __html: viewStat.scryedStatus ? '&#x2605' : '' }}
              />
            </Row>
          </Container>
        </Accordion.Body>
      </Accordion.Item>
    );
  });

  return (
    <div
      className="views__wrapper"
    >
      {/* <Row>
        { headerCols }
      </Row> */}
      <Accordion defaultActiveKey={listOfAccordionIds} alwaysOpen>
        {accordionRows}
      </Accordion>
    </div>
  );
}
