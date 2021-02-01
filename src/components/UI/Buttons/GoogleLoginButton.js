import React from 'react';
import { Button, Icon} from '@material-ui/core';

import googleIcon from '../../../assets/google_small.jpg';

const GoogleLoginButton = (props) => {
    const svgIcon = (
        <Icon>
          <img alt="google" src={googleIcon} />
        </Icon>
      );

    return (
        <Button
            variant="contained"
            startIcon={svgIcon}
            {...props}
      >
        Login with Google
      </Button>
    );
}

export default GoogleLoginButton;