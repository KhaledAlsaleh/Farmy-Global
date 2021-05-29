import React from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import { authFacebook } from '../actions/userActions'

const FacebookAuth = ({ apiKey, registerEvent }) => {
  const dispatch = useDispatch()

  const responseFacebook = (response) => {
    dispatch(authFacebook(response.accessToken, response.userID))
    registerEvent()
  }

  return (
    <div>
      <FacebookLogin
        appId={apiKey}
        render={(renderProps) => (
          <Button
            onClick={renderProps.onClick}
            className='btn btn-block my-2 btn-facebook'
            style={{ backgroundColor: '#3C66C4', border: 'none' }}
          >
            <i style={{ float: 'left' }} className='fab fa-facebook-f py-1'></i>
            Continue with Facebook
          </Button>
        )}
        autoLoad={false}
        callback={responseFacebook}
      />
    </div>
  )
}

export default FacebookAuth
