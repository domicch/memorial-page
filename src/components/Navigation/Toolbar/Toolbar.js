import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {Tab, Tabs} from '@material-ui/core';
import {Toolbar as MUIToolbar} from '@material-ui/core';
import { Link} from 'react-router-dom';

import Typography from '@material-ui/core/Typography';

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: 'black',
    },
  }
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    // color: '#fff',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
    padding: {
      padding: theme.spacing(1),
    },
  //   demo1: {
  //     backgroundColor: theme.palette.background.paper,
  //   },
  //   demo2: {
  //     backgroundColor: '#2e1534',
  //   },
}));

export function Toolbar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    // <div className={classes.demo2}>
    //   <StyledTabs value={value} onChange={handleChange}>
    //     <StyledTab label="Life" component={Link} to="/"/>
    //     <StyledTab label="Messages" component={Link} to="/messages"/>
    //     <StyledTab label="New Message" component={Link} to="/newmessage"/>
    //   </StyledTabs>
    //   <Typography className={classes.padding} />
    // </div>

    <MUIToolbar component="nav" variant="dense">
      <Link to="/">Life</Link>
      <Link to="/messages">Messages</Link>
      <Link to="/newmessage">New Message</Link>
    </MUIToolbar>
  );
}
