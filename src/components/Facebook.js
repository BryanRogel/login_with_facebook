import React, { Component } from "react";
import { directive } from "@babel/types";
import FacebookLogin from 'react-facebook-login'; //Component necessary, install by: npm i react-facebook-login
import { styles } from "ansi-colors";

export default class Facebook extends Component { 
    constructor(props){
        super(props)
        this.state = {
            isLoggedIn : false,
            userID : "",
            name : "",
            email : "",
            picture : ""
        }

    }

    responseFacebook = async response => {
        // Status may come unknown because the windows is was closed before login.
        // If the status is diferent to unknown, the data is set in the variables. 
        if(response.status != 'unknown'){ 
            this.setState({
                isLoggedIn : true,
                userID : response.userID,
                name : response.name,
                email : response.email,
                picture : response.picture.data.url
            });
            console.log('response', response);
        }else{
            // If the status is unknown then not login.
            this.setState({
                isLoggedIn: false 
            });
            console.log('No');
        }
    }

    componentClicked = () => console.log('click');

    render() {
        let fbContent; // Will contain all the render of the buttom

        // If isLoggedIn change the state to true.
        if (this.state.isLoggedIn) {
            // It will look the information about the person login.
            fbContent = (
                <div style={{
                    width: '400px',
                    margin: 'auto',
                    background: 'blue',
                    backgroundColor:'gray',
                    padding: '20px',
                    borderRadius: '25px'
                }}>
                <img src={this.state.picture} alt={this.state.name}/> {/* Show the profile picture. */}
                    <h1>Welcome {this.state.name}</h1>  {/* Show the name. */}
                    <h4>Email {this.state.email}</h4>   {/* Show the email. */}
                    <a href="#" onClick={(e)=>{e.preventDefault(); window.FB.logout(); this.setState({isLoggedIn:false})}}>logout</a> {/* Closed the facebook profile.*/}
                </div>
            );
        } else {
            // If no, it will look a button to login.
            fbContent = (
                <FacebookLogin
                    appId="518654022260624" // Need the id in the page of Facebook Developer.
                    autoLoad={false}
                    fields="name,email,picture"
                    onClick={this.componentClicked}
                    callback={this.responseFacebook} />
            );

        }
        return <div>{fbContent}</div> // Show the content.
    }
}