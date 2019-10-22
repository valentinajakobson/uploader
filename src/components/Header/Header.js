import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import BackupIcon from '@material-ui/icons/Backup';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none' 
  },
  btns: {
    position: 'absolute',
    right: '0px',
    marginRight: '40px'
  },
  icon: {
    marginRight: '10px'
  },
  bar: {
    backgroundColor:'#FF950A'
  }
}));


export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <nav>
      <AppBar position="static"className={classes.bar}>
        <Toolbar>
        <Typography gutterBottom variant="h5" component="h2">
        <BackupIcon className={classes.icon}/>
            Simple file uploads   
        </Typography>         
        </Toolbar>
      </AppBar>
      </nav>
    </div>
  );
}

