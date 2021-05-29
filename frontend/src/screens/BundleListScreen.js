import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import { listBundles, deleteBundle, createBundle } from '../actions/bundleActions';
import { BUNDLE_CREATE_RESET } from '../constants/bundleConstants';

const BundleListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const bundleList = useSelector((state) => state.bundleList);
  const { loading, error, bundles, page, pages } = bundleList;

  const bundleDelete = useSelector((state) => state.bundleDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = bundleDelete;

  const bundleCreate = useSelector((state) => state.bundleCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    bundle: createdBundle,
  } = bundleCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: BUNDLE_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    }

    if (successCreate) {
      history.push(`/admin/bundle/${createdBundle._id}/edit`);
    } else {
      dispatch(listBundles('', pageNumber));
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, createdBundle, pageNumber]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteBundle(id));
    }
  };

  const createBundleHandler = () => {
    dispatch(createBundle());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Bundles</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createBundleHandler}>
            <i className="fas fa-plus"></i> Create bundle
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {bundles.map((bundle) => (
                <tr key={bundle._id}>
                  <td>{bundle._id}</td>
                  <td>{bundle.name}</td>
                  <td>${bundle.price}</td>
                  <td>{bundle.category}</td>
                  <td>{bundle.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/bundle/${bundle._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(bundle._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default BundleListScreen;
