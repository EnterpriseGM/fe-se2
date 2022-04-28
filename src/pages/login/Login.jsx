import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

export default class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    componentDidMount(){
        this.props.isLogin(true);
    }

    componentWillUnmount(){
        this.props.isLogin(false);
    }

    toHome = () => {
        this.props.isLogin(false);
        this.props.history.push('/');
    }

    handleSubmit(e){
        e.preventDefault();
        axios.post(`${this.props.url}/api/auth/login`, {
            username: this.state.username,
            password: this.state.password
        }).then(res => {
            if(res.status === 200){
                this.props.setToken(res.data.token);
                this.props.checkLogin(true);
                this.toHome();
            }
        }).catch(err => {
            window.alert(err);
        })
    }

    changeUsername(e){
        this.setState({
            username: e.target.value
        })
    }

    changePassword(e){
        this.setState({
            password: e.target.value
        })
    }


    render(){
        return(
            <div className="login-body d-flex justify-content-center align-items-center">
                <div className="container-login container-card">
                    <form className="p-3 corner-5 login-form" method="post" onSubmit={this.handleSubmit.bind(this)}>
                        <h1 className=" text-center text-light login-text">Login</h1>
                        <div className="login-wrap p-3">
                            <div className=" mt-3">
                                <label className='lb-ip text-info'>Username</label>
                                <input type="name" className="form-control m-0 corner-5 border-normal " name="username" placeholder="Username" size="60" height="100" value={this.state.username} autoFocus required onChange={this.changeUsername.bind(this)}/>
                            </div>
                            <div className="lb mt-3">
                                <label className='lb-ip text-info'>Password</label>
                                <input type="password" className="form-control m-0 corner-5 border-normal " name="password" placeholder="Password" value={this.state.password} required onChange={this.changePassword.bind(this)}/>
                            </div>
                            <div className="reform-login d-flex justify-content-between py-1 px-2 mt-3">
                                <Link to="signup" className="extra_link register d-inline-block">Register</Link>                          
                                <Link to="/forgot" className="extra_link forgot d-inline-block">Forgot password?</Link>
                            </div>
                            <div className="text-center btn-login-container pt-3">
                                <button className=" corner-5 border-0 text-white text-uppercase btn-confirm primary-btn btn-login h-25 " name="login" type="submit">Login</button>
                            </div>
                        </div>
                    </form>
                    <div className="back-container text-center mt-2">
                        <div className="back-to-login-btn" onClick={this.toHome.bind(this)} >
                            <Link to="/login" className="external_link"> &lt; Back to Home </Link>
                        </div>
                        <div className="back-to-login-btn" onClick={this.toHome.bind(this)} >
                            <Link to="/admin" className="external_link text-danger "> &lt; Login as Administrator </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}