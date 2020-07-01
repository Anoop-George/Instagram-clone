import React,{useState,useEffect} from 'react'
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {apiService} from '../common/api.service';
import Input from '@material-ui/core/Input';
import SendIcon from '@material-ui/icons/Send';

function Comment({props,setDomchange}) {
   const posts = props;
   const [edit,setEdit]=useState(null);
   const [editcomment,setEditcomment]=useState('')
    

    const deletecomment=(id)=>{
        const endpoint = `/api/comment/${id}/`;
        apiService(endpoint, "DELETE").then(
         ()=> {setDomchange(prev=>prev+1)}
        )
      };

      const updatecomment=()=>{
        const endpoint = `/api/comment/${edit}/`;
        apiService(endpoint, "PUT",{body:editcomment}).then(
         ()=> {setEdit(null),setDomchange(prev=>prev+1)}
        )
      }

    return (

        <React.Fragment>
            {edit?(<Grid item xs={12} lg={12} style={{marginTop:8}}>
            <Input id="outlined-secondary" onChange={(e)=>setEditcomment(e.target.value)} value={editcomment} color="secondary" variant="outlined" type="text" margin="dense" placeholder="Edit comment" multiline={true}  fullWidth={true}  >
            </Input> 
            <Button variant="contained" color="primary" onClick={updatecomment} style={{margin:'4px'}}>update</Button>
            <Button variant="contained" color="secondary" onClick={()=>setEdit(false)} style={{margin:'4px'}}>Cancel</Button>
            </Grid>):(  
         
        <List>
            
            <Button   color="primary">
                 comments
            </Button>
           
            {posts.map(comment=>{
                return  <ListItem key={comment.id}>
                <ListItemIcon>
                    <Box color="text.primary" style={{backgroundColor:'#E8E8E8	',padding:'6'}}>
                    {comment.author}
                    </Box>
                </ListItemIcon>
                <ListItemText  style={{backgroundColor:'#F8F8F8',padding:'2'}}>
                    {comment.body}
                </ListItemText>
                <ListItemIcon>
                    {comment.isLoggedinuser?(
                        <React.Fragment>
                                 <DeleteIcon onClick={()=>deletecomment(comment.id)}/>
                                 <EditIcon onClick={()=>{setEdit(comment.id),setEditcomment(comment.body)} }/>
                        </React.Fragment>
                    ):(null)}
                   
                </ListItemIcon>
            </ListItem>
            })}
           
        </List>
)}
                </React.Fragment>
    )
}

export default Comment
