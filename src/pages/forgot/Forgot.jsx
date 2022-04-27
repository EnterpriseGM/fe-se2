import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Forgot.css';

export default class Forgot extends React.Component {

    constructor(props){
        super(props)
        this.state({
            username: ""
        })
    }
    
    componentDidMount() {
        this.props.isLogin(true);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${this.props.url}/api/auth/forgot-password`, {
            username: e.target.username.value
        }).then(res => {
            if(res.status === 200){
                window.alert(res.data.message);
            }
        }).catch(err => {
            window.alert(err);
        })
    }

    handleSubmti(e){
        e.preventDefault();
        axios.post(`${this.props.url}/api/auth/forgot-password`, {
            username: this.state.username
        }).then(res => {
            if(res.status === 200){
                window.alert("Please check your email!");
            }
        }).catch((err) => {
            window.alert(err);
        })
    }

    setUsername(e){
        this.setState({
            username: e.target.username.value
        })
    }

    render() {
        return (
            <div className="login-body d-flex justify-content-center align-items-center">
                <div className="container-forgotten container-card ">
                    <form className="p-3 corner-5 forgotten-form" method="post" onSubmit={this.handleSubmit.bind(this)}>
                        <div>
                            <h1 className=" text-center text-light forgotten-text">Reset Password</h1>
                        </div>
                        <div className="forgotten-wrap p-3">
                            <label className="lb-ip text-info">Please enter your username</label>
                            <div className="">
                                <input type="name" value = {this.state.username}  onChange = {this.setUsername.bind(this)} className="form-control m-0 corner-5 border-normal" name="username" placeholder="Username" size="60" autoFocus required/>
                            </div>
                            <div className="text-center btn-confirm-container " >
                                <button className="h-25 corner-5 border-0 text-white text-uppercase btn-confirm primary-btn btn-confirm " name="confirm" type="submit">Confirm</button>
                            </div>
                            <div className="back-container text-center mt-2 pt-5">
                                <div className="back-to-login-btn">
                                    <Link to="/login" className="external_link "> &lt; Back to Login </Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}