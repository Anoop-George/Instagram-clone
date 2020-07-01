import React,{useEffect,useState} from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import SendIcon from '@material-ui/icons/Send';
import {apiService} from '../common/api.service';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Comment from './comment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Editpost from './editPost';
import {  Link } from 'react-router-dom';
import  { Redirect } from 'react-router-dom'

const useStyles = makeStyles({
    root: {
      maxWidth:600,
    },
    bullet: {
     
    },
    title: {
      fontSize: 14,
    },
    pos: {
      
    },
    media:{
        width: '100%',
      maxWidth: '400px',
      height: 'auto',
      maxHeight:'400px',

      
      
      }
  });
  
function CardDetails(props) {
const  postid  = parseInt(props.match.params.postid.substring(1),10)



const [post,setPost]=useState({})
const [alertdata,setAlertdata] = useState('login first');
const [open, setOpen] = React.useState(false);
const [domchange,setDomchange] = useState(1);
const [comment,setComment] = useState('');
const [deleteaction,setDeleteaction]=useState(false);
const [redirect,setRedirect]=useState(false)

useEffect(()=>{
    let endpoint = `/api/post/${postid}`;
    apiService(endpoint).then(data=>setPost(data))
    
},[domchange]);

const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


const likeclick=(id)=>{
    let endpoint = `/api/post/${id}/like/`;
    apiService(endpoint,'POST').then(data=>{
      if (data.detail=='Authentication credentials were not provided.'){
        setAlertdata(' login to like');
        setOpen(true);
      } else{
        setDomchange(prev=>prev+1)}   
    });}
    
    const dislikeclick=(id)=>{
    let endpoint = `/api/post/${id}/like/`;
    apiService(endpoint,'DELETE').then(data=>{
      if (data.detail=='Authentication credentials were not provided.'){
        setAlertdata('login to dislike');
        setOpen(true);
      }
      else{setDomchange(prev=>prev+1)}})};
    


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
            setComment('');
            setDomchange(prev=>prev+1);
          }
        })
      
      };
      
      const handledelete=()=>{
        const endpoint = `/api/post/${postid}/`;
        apiService(endpoint, "DELETE").then(
         ()=> {setRedirect(true) }
        )
      };

const classes = useStyles();

    return (
        
        
        <Grid container  style={{marginTop:5}} alignItems="flex-start" justify="center"  direction="row">
            <Grid item xs={12} lg={6} >
            <Card className={classes.root} variant="outlined">
              {redirect?(<Redirect to='/' />):(null)}
      <CardContent>
        <Typography className={classes.title}  gutterBottom>
          {post.title}
        </Typography>
        <Grid container justify="center" alignItems="center" direction="row">
            <Grid item xs={12} lg={12} align="center" >
                 <img src={post.pic} className={classes.media} />
            </Grid>
         </Grid>
         <Typography variant="body2" component="p">
         {post.likes_count} likes   {post.user_has_voted ? (<FavoriteIcon color='primary' onClick={()=>dislikeclick(post.id)}/>):(<FavoriteIcon color='disabled' onClick={()=>likeclick(post.id)}/>)}

        </Typography>
        <Typography >
          {post.body}
        </Typography>

        <Grid container direction="row" justify="space-between"  alignItems="baseline">
          <Grid item xs={6} lg={4} >
          <Typography  color="textSecondary">pub_date  : {post.publication_date}</Typography>
          </Grid>
          <Grid item xs ={3} lg={3} >
            {post.isLoggedinuser?(<React.Fragment>
              <Link to={{pathname:'/editpost/',state:{post:post}}}><EditIcon  color="secondary"/></Link>
              
              <DeleteIcon color="secondary" onClick={()=>setDeleteaction(true)} />
            </React.Fragment>):(null)}
            
        
     
          </Grid>
        </Grid>
        {deleteaction?( <Grid item align='center' >    
       <Typography color="error">Are you sure ? </Typography>
       <Button variant="outlined" style={{marginRight:'10px'}} onClick={handledelete} >yes</Button>
        <Button variant="outlined" color="primary" onClick={()=>setDeleteaction(false)} >Cancel</Button>
       </Grid> 
       ):(null)}
        
      </CardContent>
      

      <CardActions>
      <Input type="text" margin="dense" placeholder="add comment,(max 40 letters)" multiline={true}  fullWidth={true} value={comment} onChange={(e)=>setComment(e.target.value)}>
    </Input> 
    <SendIcon onClick={()=>addpost(post.id)} ></SendIcon>

      </CardActions>
    </Card>


    <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info">
         {alertdata}
        </Alert>
      </Snackbar>
      
            </Grid>

            <Grid item xs={12} lg={5} style={{borderColor:'red'}}>
               {post.comment ? (
                    <Comment props={post.comment} setDomchange={setDomchange} />
               ):(
                <Typography color="textSecondary" > no comments </Typography>

               )} 
               
            </Grid>
        </Grid>

            
        
    )
}

export default CardDetails
