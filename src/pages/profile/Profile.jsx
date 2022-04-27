import React from 'react';
import './Profile.css';
import axios from 'axios';
import RefreshIcon from '@material-ui/icons/Refresh';

export default class Profile extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            user: {},
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
            dob: "",
            username: "",
            opassword: "",
            password: "",
            cpassword: ""
        }
    }

    componentDidMount(){
        axios.defaults.headers.common = {'Authorization': `${this.props.token}`}
        axios.get(`${this.props.url}/api/client/client-detail`)
        .then(res => {
            const user = res.data
            this.setState({
                user,
                username: user.username,
            })
        }).then(() => {
            const user = this.state.user;
            this.setState({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phoneNo,
                address: user.address,
                dob: user.dob,
                username: user.username
            })
        }).catch(err => {
            console.log(err);
        })

    }

    editUser(e){
        e.preventDefault();
        axios.post(`${this.props.url}/api/client/edit-client`, {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phoneNo: this.state.phone,
            address: this.state.address,
            dob: this.state.dob,
        }).then(res => {
            if(res.status === 200){
                window.alert("Update successfully!");
            }
        }).then(() => {
            return axios.get(`${this.props.url}/api/client/client-detail`)
        }).then(res => {
            this.setState({
                user: res.data
            })
        }).catch(err => {
            console.log(err);
        })
    }

    handleChangeFn(e){
        this.setState({
            firstName: e.target.value
        })
    }

    handleChangeLn(e){
        this.setState({
            lastName: e.target.value
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

    handleChangeAd(e){
        this.setState({
            address: e.target.value
        })
    }

    handleChangeDob(e){
        this.setState({
            dob: e.target.value
        })
    }

    logOut(){
        this.props.checkLogin(false);
        this.props.setToken(null);
        this.props.history.push('/');
    }

    changeOp(e){
        this.setState({
            opassword: e.target.value
        })
    }

    changeP(e){
        this.setState({
            password: e.target.value
        })
    }

    changeCp(e){
        this.setState({
            cpassword: e.target.value
        })
    }

    changePassword(e){
        e.preventDefault();
        if(this.state.password === this.state.cpassword){
            axios.post(`${this.props.url}/api/client/change-password`, {
                oldPassword: this.state.opassword,
                newPassword: this.state.password,
                confirmPassword: this.state.cpassword
            }).then(res => {
                if(res.status === 200){
                    window.alert("Update successfully!");
                    this.setState({
                        opassword: "",
                        password: "",
                        cpassword: ""
                    })
                }
            }).catch(err => {
                window.alert(err);
            })
        }
    }

    changeUsername(){
        if(window.confirm("Do you want to change your username?")){
            axios.post(`${this.props.url}/api/client/edit-username`, {
                username: this.state.username
            }).then(res => {
                if(res.status === 200){
                    window.alert("Update successfully!");
                }
            }).then(() => {
                return axios.get(`${this.props.url}/api/client/client-detail`)
            }).then(res => {
                this.setState({
                    user: res.data
                })
            }).catch(err => {
                console.log(err);
            })
        }
    }

    changeStateUsername(e){
        this.setState({
            username: e.target.value
        })
    }

    render() {
        const user = this.state.user;

        return (
            <>
                <div className="profile_container">
                    <div className="profile-content row p-3">
                        <div className="leftSide col-3">
                            <div className="content-card p-3">
                                <div className="content-card__head p-2">
                                    <div className="image w-100 text-center mb-2">
                                        <img src="https://be-pr2.000webhostapp.com/userImages/blank-profile-picture-973460_640.png" alt="" className=""/>
                                        <button className="image_change p-2" disabled>
                                            <i className="fa-solid fa-camera cursor-pointer" ></i>
                                        </button>
                                    </div>
                                    <div className="user-name d-flex"> 
                                        <h4 className="m-0 text-center"><input type="text" class="form-control" defaultValue={this.state.username} onChange={this.changeStateUsername.bind(this)}/></h4>
                                        <RefreshIcon className="cursor-pointer h-25" id={user.username} onClick={this.changeUsername.bind(this)}/>
                                    </div>
                                    <div className="d-flex justify-content-between my-2">
                                            <p className="balance">Balance: <span className="">*** VND</span></p>
                                            <span className="cursor-pointer" id="show_currency">
                                                <i className="fa-solid fa-eye cursor-pointer"></i>
                                            </span>
                                        </div>
                                </div>

                                <div className="options p-2">
                                    <a href="#info" className="btn no-outline">Information</a>
                                    <a href="#payment" className="btn no-outline ">Payment</a>
                                    <a href="#change_password" className="btn no-outline">Change Password</a>
                                    <hr/>
                                    <button className="btn no-outline text-danger" onClick={this.logOut.bind(this)}>Log out</button>
                                </div>
                            </div>
                        </div>

                        <div className="rightSide col-9">

                            <div className="information content-card border-normal p-4 corner-8" id="info">
                                <div className="content-card__head pb-3">
                                    <h2 className="card-title m-0">Information</h2>
                                    <p className="card-sub-title m-0 ps-1">Manage your basic information</p>
                                </div>

                                <div className="content-card__content">
                                    <form action="post" className="p-2" onSubmit={this.editUser.bind(this)}>
                                        <table className="table info-table">
                                        <tbody>
                                            <tr>
                                                <td className="border-0 ">First Name</td>
                                                <td className="border-0" colSpan="3">
                                                    <input type="text" defaultValue={user.firstName} className="info-table_input w-100 px-2 py-1" onChange={this.handleChangeFn.bind(this)}/>
                                                </td>                                           
                                            </tr>
                                            <tr>
                                            <td className="border-0">Last Name</td>
                                                <td className="border-0" colSpan="3">
                                                    <input type="text" defaultValue={user.lastName} className="info-table_input w-100 px-2 py-1" onChange={this.handleChangeLn.bind(this)}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border-0">Email</td>
                                                <td className="border-0" colSpan="3">
                                                    <input type="email" defaultValue={user.email} className="info-table_input w-100 px-2 py-1" onChange={this.handleChangeE.bind(this)}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border-0">Phone</td>
                                                <td className="border-0" colSpan="3">
                                                    <input type="tel" defaultValue={user.phoneNo} className="info-table_input w-100 px-2 py-1" onChange={this.handleChangeP.bind(this)}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border-0">Address</td>
                                                <td className="border-0" colSpan="3">
                                                    <input type="text" defaultValue={user.address} className="info-table_input w-100 px-2 py-1" onChange={this.handleChangeAd.bind(this)}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border-0">Birthday</td>
                                                <td className="border-0">
                                                    <input type="date" name="dob" id="dob" className="px-2 w-25" defaultValue={user.dob} onChange={this.handleChangeDob.bind(this)}/>
                                                </td>
                                            </tr>
                                        </tbody>
                                        </table>
                                        <span className="d-block text-end">
                                            <button type="submit" className="primary-btn corner-5 px-3 py-2 h-25">Save</button>
                                        </span>
                                    </form>
                                </div>
                            </div>

                            <div className="payment content-card border-normal p-4 corner-8" id="payment">
                                <div className="content-card__head pb-3">
                                    <h2 className="card-title m-0">Payment method</h2>
                                    <p className="card-sub-title m-0 ps-1"></p>
                                </div>

                                <div className="content-card__content">
                                    <form action="#" className="p-2 text-end">
                                        <select name="fund" id="pay-method" className="w-100 p-2 corner-5 border-thin mb-2 cursor-pointer" required>
                                            <option value="--Choose a payment method--" disabled>--Choose a payment method--</option>
                                            <option value="bank">Bank</option>
                                            <option value="wallet">E-Wallet</option>
                                        </select>
                                        <input type="number" id="pay-acc" className="w-100 p-2 corner-5 border-thin mb-2" placeholder="Account number" required/>
                                        <input type="number" id="pay-amount" className="w-100 p-2 corner-5 border-thin mb-2" placeholder="Amount" required/>
                                        <input type="password" id="pay-pass" className="w-100 p-2 corner-5 border-thin mb-2" placeholder="Enter password password" required/>
                                        <button type="submit" className="primary-btn px-3 py-2 corner-5 h-25">Add fund</button>
                                    </form>
                                </div>
                            </div>

                            <div className="reset content-card border-normal p-4 corner-8" id="change_password">
                                <div className="content-card__head pb-3">
                                    <h2 className="card-title m-0">Change password</h2>
                                    <p className="card-sub-title m-0 ps-1">Please fill the form below!</p>
                                </div>

                                <form action="post" className="text-end p-2" onSubmit={this.changePassword.bind(this)}>
                                    <input type="password" value={this.state.opassword} id="change-old-pass" className="w-100 p-2 corner-5 border-thin mb-2" placeholder="Enter old password" required onChange={this.changeOp.bind(this)}/>
                                    <input type="password" value={this.state.password} id="change-new-pass" className="w-100 p-2 corner-5 border-thin mb-2" placeholder="Enter new password" required onChange={this.changeP.bind(this)}/>
                                    <input type="password" value={this.state.cpassword} id="change-confirm-pass" className="w-100 p-2 corner-5 border-thin mb-2" placeholder="Confirm new password" required onChange={this.changeCp.bind(this)}/>
                                    <button type="submit" className="primary-btn px-3 py-2 corner-5 h-25" id="change-btn">Confirm</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}