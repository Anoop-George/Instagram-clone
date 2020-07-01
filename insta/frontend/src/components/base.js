import React from 'react';
import {Route,Switch} from 'react-router-dom'
import Profile from './Profile';
import ButtonAppBar from './d'
import SimpleCard from './Card';
import CardDetails from './cardDetails';
import Addpost from './addPost';
import Editpost from './editPost';
 
function Base() {
    return (
        
        <React.Fragment>
            <ButtonAppBar/>
            <Switch>
            <Route exact path="/" component={SimpleCard}/>
            <Route exact path="/profile" component={Profile}/>
            <Route exact path="/carddetails/:postid" component={CardDetails}/>
            <Route exact path="/addpost" component={Addpost}/>
            <Route exact path="/editpost/" component={Editpost}/>
            </Switch>
        </React.Fragment>
        )
}

export default Base
