import React,{useEffect,useState} from 'react'
import {apiService} from '../common/api.service';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { CSRF_TOKEN } from "../common/csrf_token.js";

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    img:{
        maxHeight:'200px',
        maxWidth:'150px'
    }
  });
  
function Profile() {
const classes = useStyles();

const [me,setMe] = useState({});
const [email,setEmail] = useState('');
const [phone,setPhone] = useState('');
const [picture, setPicture] = useState(null);
const [edit,setEdit] = useState(true);


useEffect(()=>{
    let endpoint = '/users/me/';
    apiService(endpoint,'GET').then(data=>setMe(data))
},[edit])

const editbutton=()=>{
    setEmail(me.email);
    setPhone(me.phone);
    setEdit(false);
    };


    const handlesubmit = (e)=>{
        e.preventDefault();
        let form_data = new FormData();
        
        form_data.append('email', email);
        
        form_data.append('phone', phone)
        {picture?(form_data.append('photo', picture, picture.name)):null}

        let url = '/users/me/';
        axios.put(url, form_data, {
          headers: {
            'content-type': 'multipart/form-data',
            'X-CSRFTOKEN': CSRF_TOKEN
          }
        }).then(res => {
          setEdit(true);
        })
    };
  


    return (
        <Grid container  direction="row" justify="center" alignItems="flex-start">
            {edit?(<Grid item xs={12} lg={5} style={{marginTop:15}}>
            <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
         Name:  {me.username}
        </Typography>
        {me.photo?(<React.Fragment>
            <img src={me.photo} className={classes.img}/>
        </React.Fragment>):( <AccountCircleIcon fontSize="large" style={{ color: '#f59842'}}/> )}
        
        <Typography  className={classes.pos} color="textSecondary">Phone {me.phone} </Typography>
        <Typography  className={classes.pos} color="textSecondary">Email {me.email} </Typography>
        
      </CardContent>
      <CardActions>
       <EditIcon style={{ color: '#d11372'}} onClick={editbutton} />
      </CardActions>
    </Card>
            </Grid>):(
                <Grid item xs={11} lg={5} style={{marginTop:15}} align="center"  >
                  <Typography varient='h6'>Edit your Profile </Typography>
                 <TextField value={email} onChange={(e)=>setEmail(e.target.value)} id="standard-basic" label="Edit Email" style={{margin:'5px'}} multiline  fullWidth/>
                    <TextField value={phone} onChange={(e)=>setPhone(e.target.value)} id="standard-basic" label="Edit Phone" style={{margin:'5px'}} multiline  fullWidth/>
                <Grid item xs={11} lg={5} style={{margin:'5px'}} >
                 <Typography color="primary">Upload an Image </Typography>
                <input type="file" accept="image/png, image/jpeg"  onChange={(e)=>{setPicture(e.target.files[0])}}  />
                <Grid container style={{marginTop:'15px'}} direction="row" justify="space-between" alignItems="flex-start">
                <Grid item xs={5} lg={4}>
                <Button onClick={handlesubmit} style={{margin:'5px'}} variant="contained" color="primary">update</Button>

                </Grid>
                <Grid item xs={5} lg={4}>
                <Button onClick={()=>setEdit(true)} style={{margin:'5px'}} variant="contained" color="secondary" >Cancel</Button>

                </Grid>
                </Grid>
                
                
                </Grid>
                </Grid>)}
            
                
       </Grid>
    )
}

export default Profile
