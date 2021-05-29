import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import Loader from './Loader';
import Message from './Message';
import { listFarms } from '../actions/farmActions';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import '../index.css';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const FarmsMap = () => {
  const dispatch = useDispatch();
  const [viewport, setViewport] = React.useState({
    latitude: 52.0326,
    longitude: 5.2913,
    width: '100%',
    height: '50vh',
    zoom: 5.8,
  });

  const farmsData = useSelector((state) => state.farmList);

  const { loading, error, farm } = farmsData;

  useEffect(() => {
    dispatch(listFarms());
  }, [dispatch]);

  const [farmInfo, setFarmInfo] = useState(null);

  const redMarker = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="red"
      className="bi bi-geo-alt-fill"
      viewBox="0 0 16 16"
    >
      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
    </svg>
  );

  return (
    <div>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      <ReactMapGL
        {...viewport}
        onViewportChange={setViewport}
        mapboxApiAccessToken="pk.eyJ1IjoiZmFybXkiLCJhIjoiY2twNWFkNjZsMDBkdjJ2cGdvNXh4cm54bSJ9.xl6dtLVVGVKG0B7EGZ6mnA"
        mapStyle="mapbox://styles/farmy/ckpa7dfii4rpr18rxl6ygpqc2"
      >
        {farm?.map(({ coordinates, description, name, number }) => (
          <Marker
            latitude={coordinates.lat}
            longitude={coordinates.lon}
            offsetLeft={-20}
            offsetTop={-10}
            key={name}
          >
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => setFarmInfo({ name, description, coordinates, number })}
            >
              {redMarker}
            </div>
          </Marker>
        ))}
        {farmInfo && (
          <Popup
            anchor="top"
            longitude={farmInfo.coordinates.lon}
            latitude={farmInfo.coordinates.lat}
            closeOnClick={true}
            className="popup"
            onClose={() => setFarmInfo(null)}
          >
            <div>
              <h5>{farmInfo.name}</h5>
              <p>{farmInfo.description}</p>
              <small>Contact by: {farmInfo.number}</small>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
};

export default FarmsMap;
