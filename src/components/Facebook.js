import React, { Component } from "react";
import { directive } from "@babel/types";
import FacebookLogin from 'react-facebook-login'
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
        if(response.status != 'unknown'){
            window.close();
            this.setState({
                isLoggedIn : true,
                userID : response.userID,
                name : response.name,
                email : response.email,
                picture : response.picture.data.url || undefined
            });
            console.log('response', response);
        }else{
            this.setState({
                isLoggedIn: false
            });
            console.log('No');
        }
    }

    componentClicked = () => console.log('click');

    render() {
        let fbContent;

        if (this.state.isLoggedIn) {
            fbContent = (
                <div style={{
                    width: '400px',
                    margin: 'auto',
                    background: 'blue',
                    backgroundColor:'gray',
                    padding: '20px',
                    borderRadius: '25px'
                }}>
                <img src={this.state.picture} alt={this.state.name}/>
                    <h1>Welcome {this.state.name}</h1>
                    <h4>Email {this.state.email}</h4>
                    <a href="#" onClick={(e)=>{e.preventDefault(); window.FB.logout(); this.setState({isLoggedIn:false})}}>logout</a>
                </div>
            );
        } else {
            fbContent = (
                <FacebookLogin
                    appId="518654022260624"
                    autoLoad={false}
                    fields="name,email,picture"
                    onClick={this.componentClicked}
                    callback={this.responseFacebook} />
            );

        }
        return <div>{fbContent}</div>
    }
}