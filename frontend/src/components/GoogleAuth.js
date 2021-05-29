import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { authGoogle } from '../actions/userActions';
import GoogleButton from 'react-google-button';

const GoogleAuth = ({ apiKey, registerEvent }) => {
  const dispatch = useDispatch();

  const responseSuccessGoogle = (response) => {
    dispatch(authGoogle(response.tokenId));
    registerEvent();
  };

  return (
    <div>
      <GoogleLogin
        clientId={apiKey}
        render={(renderProps) => (
          <GoogleButton
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            label="Continue with Google"
            style={{ width: '32.8rm', border: 'none' }}
          />
        )}
        onSuccess={responseSuccessGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default GoogleAuth;
