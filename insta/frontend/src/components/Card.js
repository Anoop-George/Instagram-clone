import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {apiService} from '../common/api.service'
import CardMedia from '@material-ui/core/CardMedia';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Input from '@material-ui/core/Input';
import SendIcon from '@material-ui/icons/Send';
import CardDetails from './cardDetails';
import {  Link } from 'react-router-dom';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    borderColor:"primary.main"
  },
  
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media:{
    width: '100%',
  maxWidth: '500px',
  height: 'auto',
  maxHeight:'600px'
  }
});

export default function SimpleCard() {
  const [posts,setPosts] = useState([]);
  const [domchange,setDomchange] = useState(1);
  const [open, setOpen] = React.useState(false);
const [comment,setComment] = useState('');
const [alertdata,setAlertdata] = useState('login first');
const [loading,setLoading]= useState(true)


  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(()=>{
    let endpoint = '/api/post/';
    apiService(endpoint).then(data=>setPosts(data))
    
    setLoading(false);
},[domchange]);

const likeclick=(id)=>{
let endpoint = `/api/post/${id}/like/`;
apiService(endpoint,'POST').then(data=>{
  if (data.detail=='Authentication credentials were not provided.'){
    setAlertdata('login to like');
    setOpen(true);
  } else{
    setLoading(true)
    setDomchange(prev=>prev+1);
    
  }   
});}

const dislikeclick=(id)=>{
let endpoint = `/api/post/${id}/like/`;
apiService(endpoint,'DELETE').then(data=>{
  if (data.detail=='Authentication credentials were not provided.'){
    setAlertdata('please login first');
    setOpen(true);
  }
  else{setLoading(true),setDomchange(prev=>prev+1)}})};

const addpost =(id)=>{
  const endpoint = `/api/post/${id}/comment/`;
  apiService(endpoint, "POST", { body: comment }).then(data=>{
    if (data.detail=='Authentication credentials were not provided.'){
      setAlertdata('login to comment');
      setOpen(true);
    }
    else{
      setAlertdata('comment added');
      setOpen(true);
          }
  })

};

const classes = useStyles();

  return (
    <Grid container   spacing={3}  justify="center" alignItems="center" direction="row">

      
      <Grid item xs={12} lg={5} >
      {loading?(<LinearProgress color="secondary" style={{marginTop:'14px'}}/>
):(null)}


{posts.map(post=>{ return <Card variant="outlined" key={post.id}>
  <CardContent>
    <Typography className={classes.title} color="textSecondary" gutterBottom>
    {post.title}
    </Typography>
    
    <Grid container justify="center" alignItems="center" direction="row">
      <Grid item xs={12} lg={12} >
        <img src={post.pic} className={classes.media} />
      </Grid>
    </Grid>
   <Grid item align="center">
    <Typography variant="body2" component="p">
      {post.body}
     
     <Link to={`/carddetails/:${post.id}`}>  
     
      <Button size="small" color='primary' variant="contained" position='right' style={{margin:'3px'}}>
        <DoubleArrowIcon />
        more..</Button> 
       
     </Link>
    
    </Typography> 
    </Grid>
  
<Grid item xs={12} lg={12}>
<Typography className={classes.title} color="textSecondary" gutterBottom>
    {post.likes_count} likes     {post.user_has_voted ? (<FavoriteIcon color='primary' onClick={()=>dislikeclick(post.id)}/>):(<FavoriteIcon color='disabled' onClick={()=>likeclick(post.id)}/>)}

    </Typography>

    {loading?(<LinearProgress color="secondary" style={{marginTop:'14px'}}/>
):(null)}
  
</Grid>
               
      
  </CardContent>
  <CardActions>

  <Input  type="text" margin="dense" placeholder="add comments" multiline={true}  fullWidth={true}  onChange={(e)=>setComment(e.target.value)}>
    </Input> 
    <SendIcon onClick={()=>addpost(post.id)} ></SendIcon>

  
  </CardActions>


  
  <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info">
         {alertdata}
        </Alert>
      </Snackbar>
</Card>
})}
        
    </Grid>
    </Grid>
  );
}
