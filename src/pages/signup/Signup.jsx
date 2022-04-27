import React from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



export default class Signup extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            fname: "",
            lname: "",
            username: "",
            email: "",
            phone: "",
            dob: "",
            password: "",
            address: ""
        }
    }

    componentDidMount(){
        this.props.isLogin(true);
    }

    handleChangeFN(e){
        this.setState({
            fname: e.target.value
        })
    }

    handleChangeLN(e){
        this.setState({
            lname: e.target.value
        })
    }

    handleChangeUN(e){
        this.setState({
            username: e.target.value
        })
    }

    handleChangeE(e){
        this.setState({
            email: e.target.value
        })
    }

    handleChangeP(e){
        this.setState({
            phone: e.target.value
        })
    }

    handleChangeA(e){
        this.setState({
            address: e.target.value
        })
    }

    handleChangePw(e){
        this.setState({
            password: e.target.value
        })
    }

    handleChangeDob(e){
        this.setState({
            dob: new Date(e).toISOString().substring(0, 10)
        })
    }
    
    handleSubmit(e){
        e.preventDefault();
        axios.post(`${this.props.url}/api/auth/signup`, {
            firstName: this.state.fname,
            lastName: this.state.lname,
            username: this.state.username,
            email: this.state.email,
            phoneNo: this.state.phone,
            address: this.state.address,
            dob: this.state.dob,
            password: this.state.password,
            confirmPassword: this.state.password
        }).then(res => {
            if(res.status === 200){
                this.props.history.push('/login');
            }else{
                window.alert("Fail to sign up!");
            }
        }).catch(err => {
            window.alert(err);
        })
    }

    ga(){
        console.log("Ngu");
    }

    render(){  

        return(
            <div className="login-body d-flex justify-content-center align-items-center">
                <div className="container-register container-card">
                
                    <div>
                        <h1 className=" text-center text-light register-text">Register</h1>
                    </div>
                    <div className="container register-wrap p-3">
                  
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <label className='text-info'>First Name
                            <input type="name" className="form-control m-0 corner-5 border-normal " name="fname" placeholder="First name" autoFocus required value={this.state.fname} onChange={this.handleChangeFN.bind(this)}/>
                        </label>
                        <label className='text-info'>Last Name
                            <input type="name" className="form-control m-0 corner-5 border-normal " name="lname" placeholder="Last name" autoFocus required value={this.state.lname} onChange={this.handleChangeLN.bind(this)}/>
                        </label>
                        <label className='text-info'>Username
                            <input type="name" className="form-control m-0 corner-5 border-normal " name="username" placeholder="Username" autoFocus required value={this.state.username} onChange={this.handleChangeUN.bind(this)}/>
                        </label>
                        <label className='text-info'>Email
                            <input type="email" className="form-control m-0 corner-5 border-normal " name="email" placeholder="Email" autoFocus required value={this.state.email} onChange={this.handleChangeE.bind(this)}/>
                        </label>
                        <label className='text-info'>Phone
                            <input type="phone" className="form-control m-0 corner-5 border-normal " name="phone" placeholder="Phone" autoFocus required value={this.state.phone} onChange={this.handleChangeP.bind(this)}/>
                        </label>
                        <label className='text-info'>Address
                            <input type="address" className="form-control m-0 corner-5 border-normal " name="address" placeholder="Address" autoFocus required value={this.state.address} onChange={this.handleChangeA.bind(this)}/>
                        </label>

                        <label className='text-info'>Password
                            <input type="password" className="form-control m-0 corner-5 border-normal " name="address" placeholder="Password" autoFocus required value={this.state.password} onChange={this.handleChangePw.bind(this)}/>
                        </label>

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Date of birth"
                                onChange={this.handleChangeDob.bind(this)}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>

                        <button type="submit" className='submit-btn'>Register</button>
                    </form>
                        <div className="back-to-login">
                            <Link to="/login" className="external_link"> &lt; Back to Login </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}