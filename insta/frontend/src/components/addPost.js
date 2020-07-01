import React,{useState} from 'react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { CSRF_TOKEN } from "../common/csrf_token.js";
import LinearProgress from '@material-ui/core/LinearProgress';

function Addpost() {
    const [title,setTitle] = useState('')
    const [body,setBody] = useState('')
    const [picture, setPicture] = useState(null);
    const [message,setMessage] = useState('')
    const [loading,setLoading]= useState(false)

    const handlesubmit = (e)=>{
      e.preventDefault();
      setLoading(true);
      let form_data = new FormData();
      {picture?(form_data.append('pic', picture, picture.name)):null}
      
      form_data.append('title', title);
      
      form_data.append('body', body)
      let url = '/api/post/';
      axios.post(url, form_data, {
        headers: {
          'content-type': 'multipart/form-data',
          'X-CSRFTOKEN': CSRF_TOKEN
        }
      }).then(res => {
        console.log(res.data);setLoading(false);setMessage('successfully added');setTitle('');setBody('')
      }).catch(() => setLoading(false),setMessage('oops error,review the form'))
  };

    


    return (
        <Grid container spacing={6} justify="center" alignItems="center" direction="row" style={{marginTop:'3'}}>
            <Grid item lg={8} xs={11}>
            <Typography>Add new posts </Typography>
            
            <form >
            <TextField  required={true}  style={{margin:'5px'}} value={title} onChange={(e)=>setTitle(e.target.value)} multiline  fullWidth id="outlined-basic" label="Title (max 20 letters)" variant="outlined" />
            <TextField required={true} style={{margin:'5px'}} value={body} onChange={(e)=>setBody(e.target.value)} multiline fullWidth id="outlined-basic" label="Body (max 60 letters)" variant="outlined" />
            <Typography color="textSecondary">* required </Typography>
            <Grid item xs={11} lg={8} style={{margin:'5px'}} >
                <Typography color="primary">Upload an Image </Typography>
                <input type="file" accept="image/png, image/jpeg"  onChange={(e)=>{setPicture(e.target.files[0])}}  />
               
            </Grid>

         </form>
         <Button color="primary" style={{margin:'5px'}} variant="contained" onClick={handlesubmit}>submit</Button>
        {loading?( <LinearProgress variant="query" style={{margin:'5px'}} />):(null)}

    {message ? (<Typography style={{margin:'5px'}} color="secondary">{message}</Typography>):(null)}
         </Grid>
            


      </Grid>
    )
}

export default Addpost
