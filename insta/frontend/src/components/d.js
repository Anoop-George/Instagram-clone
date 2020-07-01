import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {  Link,NavLink } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import {apiService} from '../common/api.service';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loggedinuser,setloggedinUser] = useState({});

useEffect(()=>{
            let endpoint = `/users/me/`;
            apiService(endpoint).then(data=>{
              if(data.detail=='Authentication credentials were not provided.'){
                setloggedinUser({'status':'false'}) }
              else{setloggedinUser(data)}})},[])
                  
    

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div className={classes.root}>
      <AppBar position="static"  >
        
        <Toolbar>
          <IconButton onClick={handleClick} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">

            <MenuIcon  />

          </IconButton>
          
        
        
          {loggedinuser.id?(
            <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}><Link to="/"> <HomeIcon color='primary' /> home</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link to="/profile"> <AccountBoxIcon style={{ color: '#cc1f2a' }} /> profile</Link></MenuItem>
            <MenuItem onClick={handleClose}><a href="/logout"><ExitToAppIcon style={{ color: '#f50d05' }} />  Logout</a></MenuItem>

            </Menu>
          
          ):(
            <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}><Link to="/">home</Link></MenuItem>

            </Menu>
          )}
          
          
      
          <Typography variant="h6" className={classes.title}>
            <Box fontFamily='Sofia'>
            njusInsta
            </Box>
          </Typography>
            {loggedinuser.id ? (
               <Button color="inherit"><NavLink to="/addpost" style={{color:'white'}} >Add Post</NavLink> </Button>
            ):(<React.Fragment>
              <Button color="inherit"><a href="/login_home" style={{color:'white'}}>Login</a></Button>
              <Button color="inherit"> <a href="/register" style={{color:'white'}}>SignUp</a></Button>
              </React.Fragment>
            )}
          
         

        </Toolbar>
      </AppBar>

      
    </div>
  );
}
