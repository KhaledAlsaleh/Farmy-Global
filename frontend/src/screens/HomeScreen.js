import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container, Button, Carousel } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import Filter from '../components/Filter';
import { listBundles, listLatestBundles } from '../actions/bundleActions';
import Bundle from '../components/Bundle';
import FeedBack from '../components/FeedBack';
import feedback from '../feedback.json';
import FarmsMap from '../components/FarmsMap';
import FarmStory from '../components/FarmStory';
import PersonalizedRecommendations from '../components/PersonalizedRecommendations';

const HomeScreen = ({ match }) => {
  const dispatch = useDispatch();

  const bundleList = useSelector((state) => state.bundleList);
  const { loading, error, bundles } = bundleList;

  const bundleLatest = useSelector((state) => state.bundleLatest);
  const { loading: loadingLatest, error: errorLatest, bundles: bundlesListLatest } = bundleLatest;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const keyword = match.params.keyword;

  useEffect(() => {
    dispatch(listLatestBundles());
    dispatch(listBundles(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <Meta />
      {loading && loadingLatest && <Loader />}
      {error && errorLatest && <Message variant="danger">{error}</Message>}
      {!keyword ? (
        <>
          {userInfo && (
            <Message style={{ color: '#b36458' }} variant="success">
              Welcome {userInfo.name}!
            </Message>
          )}

          <Carousel style={{ color: 'white', fontSize: 'large', height: '460px' }}>
            <Carousel.Item>
              <img className=" " src="https://i.ibb.co/6bFf3Ln/locals.jpg" alt="support locals" />
              <Carousel.Caption>
                <h3 style={{ color: 'white' }} className="header">
                  Support locals and pay less
                </h3>
                <p className="label" className="sub-header">
                  Our products are produced locally. Our mission is to provide you healthy fresh
                  ingredients while paying less
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://images.unsplash.com/photo-1518843875459-f738682238a6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3426&q=80"
                alt="healthy and fresh"
                className="veggies-pic"
              />
              <Carousel.Caption>
                <h3 style={{ color: 'white' }} className="header">
                  The freshest, straight to you
                </h3>
                <p className="label" className="sub-header">
                  Always fresh, ready in no time. 100% taste. 0% fuss.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                className="car-img"
                src="https://i.ibb.co/cFPjk9H/Farmy2.jpg"
                alt="Delivery"
              />
              <Carousel.Caption>
                <h3 style={{ color: 'white' }} className="header">
                  Next-day delivery
                </h3>
                <p className="label" className="sub-header">
                  Sustainable packaging keeps everything cool for up to 24 hours, order by 9pm.
                  Flash frozen and delivered in a flash.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>

          {userInfo && userInfo.preferences?.diet !== '' ? (
            <PersonalizedRecommendations
              preferences={userInfo.preferences && userInfo.preferences.diet}
            />
          ) : (
            userInfo && (
              <h2 style={{ color: '#808080	' }} className="border text-center prerefrence-box">
                Please fill in
                <Link to="/preferences" style={{ color: '#808080	' }}>
                  <span style={{ color: '#b36458' }}> preferences </span>
                </Link>{' '}
                to see recommendations
              </h2>
            )
          )}
          {!bundles.length && !bundlesListLatest.length && (
            <Message variant="primary">Nothing found</Message>
          )}

          {userInfo && (
            <>
              <Container className="mb-5 latest-bundles">
                <h1>Latest Bundles</h1>
                <Row>
                  {bundlesListLatest.map((bundle) => (
                    <Col key={bundle._id}>
                      <Bundle bundle={bundle} />
                    </Col>
                  ))}
                </Row>
              </Container>
            </>
          )}
          <Container className="mb-5" className={!userInfo && 'bundlesPadding'}>
            <h1>Our Bundles</h1>

            <Filter keyword={keyword} />
            {loading && <Loader />}
            {bundles.length === 0 && !loading ? (
              <h3>No Bundles Found!</h3>
            ) : (
              <Row>
                {bundles &&
                  bundles.length &&
                  bundles.map((bundle) => (
                    <Col sm={12} md={6} lg={6} xl={3} key={bundle._id}>
                      <Link to={`/bundles/${bundle._id}`}>
                        <Bundle bundle={bundle} />
                      </Link>
                      <LinkContainer to={`/bundles/${bundle._id}`}>
                        <Button className="large-btn" variant="outline-success" size="lg" block>
                          Subscribe
                        </Button>
                      </LinkContainer>
                    </Col>
                  ))}
              </Row>
            )}
          </Container>

          <Container className="mb-4">
            <h1>Our Farmers</h1>
            <FarmsMap />
            <FarmStory />
          </Container>
        </>
      ) : (
        <Container className="mb-5">
          <Link to="/" className="btn btn-light">
            Go Back
          </Link>
          {keyword && <h1>Search Results for "{keyword}"</h1>}

          {bundles.length ? (
            <Row>
              {bundles.map((bundle) => (
                <Col key={bundle._id} md={4}>
                  <Link to={`/bundles/${bundle._id}`}>
                    <Bundle bundle={bundle} />
                  </Link>
                  <LinkContainer to={`/subscription/${bundle._id}`}>
                    <Button variant="outline-success" size="lg" block>
                      Subscribe
                    </Button>
                  </LinkContainer>
                </Col>
              ))}
            </Row>
          ) : (
            <>
              <Message variant="danger">No results found.</Message>
              <h3>You may also like</h3>
              <Row>
                {bundlesListLatest.map((bundle) => (
                  <Col key={bundle._id}>
                    <Bundle bundle={bundle} />
                    <LinkContainer to={`/bundles/${bundle._id}`}>
                      <Button variant="outline-success" size="lg" block>
                        Subscribe
                      </Button>
                    </LinkContainer>
                  </Col>
                ))}
              </Row>
            </>
          )}
        </Container>
      )}
      <Container className="mb-5">
        <h1>Loved by thousands of customers</h1>
        <Row>
          {feedback &&
            feedback.map((feed, index) => {
              return (
                <Col key={index}>
                  <FeedBack text={feed.feedback} name={feed.name} />
                </Col>
              );
            })}
        </Row>
      </Container>
    </>
  );
};

export default HomeScreen;
