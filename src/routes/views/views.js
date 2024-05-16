import "@scss/views.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import { useSelector } from "react-redux";
import { useCallback, useMemo } from "react";

export default function Views() {
  // const listOfAccordionIds = [];
  const { views } = useSelector(({ game }) => game);
  console.log({ views });

  const numOfViews = useMemo(() => {
    const initialCount = views && Object.keys(views)?.length;
    if (!views[0]) {
      // not all users get info the first day
      return initialCount + 1;
    }
    return initialCount;
  }, [views]);

  const getMessage = useCallback(({ Hit, Attribute, Role }) => {
    console.log({ Hit, Attribute, Role });
    let message = Role?.name || Attribute;
    if (message === "Max Evil") {
      message = "Werewolf";
    }
    if (!Hit) {
      message = `Not ${message}`;
    }
    return message;
  }, []);

  const accordionRows = useMemo(() => {
    const rows = new Array(numOfViews).fill(undefined);
    console.log({ rows });

    return rows.map((_, ind) => {
      const currView = views[ind];
      const curId = `event-${ind}`;
      // listOfAccordionIds.push(curId);
      // const isDay = viewStat.dateTime.indexOf("Day") >= 0;
      console.log({ currView });
      return (
        <Accordion.Item eventKey={curId}>
          <Accordion.Header className="day-header">{ind}</Accordion.Header>
          <Accordion.Body>
            <Container fluid>
              {currView?.length ? (
                currView.map((view) => (
                  <Row>
                    <Col>
                      <strong>{view?.Player?.name}</strong>
                    </Col>
                    <Col>{getMessage(view)}</Col>
                  </Row>
                ))
              ) : (
                <Row>
                  <Col>No information for this day</Col>
                </Row>
              )}
            </Container>
          </Accordion.Body>
        </Accordion.Item>
      );
    });
  }, [getMessage, numOfViews, views]);

  const listOfAccordionIds = useMemo(
    () => accordionRows.map(({ props }) => props.eventKey),
    [accordionRows]
  );

  console.log({ listOfAccordionIds });

  return (
    <div className="views__wrapper">
      {/* <Row>{headerCols}</Row> */}
      <Accordion defaultActiveKey={listOfAccordionIds} alwaysOpen>
        {accordionRows}
      </Accordion>
    </div>
  );
}
