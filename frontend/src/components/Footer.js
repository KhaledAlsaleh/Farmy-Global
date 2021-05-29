import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ReactGA from 'react-ga';
const { REACT_APP_GUA_ID } = process.env;

const Footer = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.initialize(REACT_APP_GUA_ID);
    const pagePath = location.search ? location.pathname + location.search : location.pathname;
    ReactGA.pageview(`${pagePath}`);
  }, [location]);

  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">Copyright &copy; Farmy</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
