import React from 'react';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Rating from './Rating';
import { Row, Col, Container, Card } from 'react-bootstrap';

const PersonalizedRecommendations = ({ preferences }) => {
  const bundleList = useSelector((state) => state.bundleList);
  const { bundles } = bundleList;
  const filteredBundle = bundles.filter((bundle) => bundle.category.includes(preferences));

  return (
    <>
      <Container className="mb-5">
        <Row>
          <Col
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <h3>
              Chosen for you based on your <Link to="/preferences">preferences</Link>
            </h3>
          </Col>

          {filteredBundle.map((bundle) => (
            <Col key={bundle._id} md={2}>
              <Link to={`/bundles/${bundle._id}`}>
                <Card className="m-2 p-2" style={{ minHeight: '20rem', minWidth: '10rem' }}>
                  <Row>
                    <Col>
                      <LinkContainer to={`/bundles/${bundle._id}`}>
                        <>
                          <Card.Img
                            src={bundle.image}
                            variant="top"
                            style={{ width: '8.9rem', height: '8rem' }}
                          />
                          <Card.Text as="div">
                            <Rating value={bundle.rating} />
                          </Card.Text>
                        </>
                      </LinkContainer>
                    </Col>
                    <Col>
                      {' '}
                      <Card.Body>
                        <LinkContainer to={`/bundles/${bundle._id}`}>
                          <Card.Title as="h6">
                            <strong>{bundle.name}</strong>
                          </Card.Title>
                        </LinkContainer>

                        <Card.Text as="h3">€{bundle.price}</Card.Text>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default PersonalizedRecommendations;
