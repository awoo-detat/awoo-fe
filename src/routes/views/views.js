import "@scss/views.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import { useSelector } from "react-redux";
import { useMemo } from "react";

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

  const accordionRows = useMemo(() => {
    const rows = new Array(numOfViews).fill(undefined);
    console.log({ rows });

    // TODO: is there any way to distinguish between night and day?

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
                    <Col>
                      {view?.Hit
                        ? view?.Attribute === "Max Evil"
                          ? "Werewolf"
                          : view?.Attribute === "Max Evil"
                        : view?.Attribute === "Max Evil"
                          ? "Not Werewolf"
                          : `Not ${view?.Attribute}`}
                    </Col>
                    <Col dangerouslySetInnerHTML={{ __html: view?.Hit ? "&#x2605" : "" }} />
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
  }, [numOfViews, views]);

  console.log({ accordionRows });

  return (
    <div className="views__wrapper">
      {/* <Row>{headerCols}</Row> */}
      <Accordion defaultActiveKey="event-0" alwaysOpen>
        {accordionRows}
      </Accordion>
    </div>
  );
}
