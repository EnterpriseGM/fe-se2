// create menu component
import React from 'react';
import {Link} from "react-router-dom";
import { withRouter } from 'react-router'; 
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CartPreview from '../cart-preview/CartPreview';
import RefreshIcon from '@material-ui/icons/Refresh';
import axios from 'axios';
import './Menu.css';

class Menu extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            button: <>
                        <div className="register-btn">
                            <Link to="/signup" className="register-btn__control d-inline-block btn text-white fw-bold px-4">Register</Link>
                        </div>
                        <div className="login-btn">
                            <Link to="/login" className="login-btn__control d-inline-block btn fw-bold text-white px-4">Log In</Link>
                        </div>
                    </>,
            cart_product: this.props.cart_product,
            all_products: [],
            user: {},
            total: 0,
            name: null,
            reload: false
        };
    }

    formatNum(num) {
        return (num*1000).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    reLoadCart(){
        this.setState({
            reload: true
        })
        if(this.state.reload){
            axios.get(`${this.props.url}/api/cart/view-cart`)
            .then((res) => {
                this.setState({
                    cart_product: res.data
                })
            }).then(() => {
                this.setState({
                    reload: false
                })
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    componentDidMount(){     
        axios.defaults.headers.common = {'Authorization': `${this.props.token}`}
        axios.get(`${this.props.url}/api/products`).then(res => {
            const all_products = res.data;
            this.setState({ all_products });
        }).then(() => {
            if(this.props.token !== null){
                return axios.get(`${this.props.url}/api/cart/view-cart`)
            }
        }).then((res) => {
            this.setState({
                cart_product: res.data
            })
        }).then(() => {
            if(this.props.token !== null){
                return axios.get(`${this.props.url}/api/client/client-detail`);
            }
        }).then(res => {
            this.setState({
                user: res.data
            })
        }).then(() => {
            const cart_product = this.state.cart_product;
            const user = this.state.user;
            let total = this.state.total;

            for(const product of cart_product){
                const quantity = product.quantity
                const pd = product.product
                total += quantity * pd.price;
            }

            if (this.props.checkLogin){
                this.setState({
                    button: <>
                            <div className="user-utilities__item user-utilities__cart border-0" onMouseOver={this.reLoadCart.bind(this)}>
                                <Link to="/cart" className="btn px-3 py-2 m-1 bg-white"><i className="fa-solid fa-cart-shopping cursor-pointer"></i></Link>
            
                                <div className="user-utilities__item-extra user-utilities__cart--preview border-thin corner-5 py-3 px-2 cursor-default">
    
                                <div className="d-flex user-utilities__cart--preview-heading cursor-default">
                                    <h3 className="user-utilities__cart--preview-title mx-2">List of products</h3>
                                    <RefreshIcon className="user-utilities__cart--preview-refresh cursor-pointer" onClick={this.reLoadCart.bind(this)}/>       
                                </div>
    
                            <div className="user-utilities__cart--preview-list">
    
                                {cart_product.map((product, index) => (
                                    <CartPreview key={index} product={product} token={this.props.token}/>
                                ))}
    
                                <div className="user-utilities__cart--preview-total p-2 d-flex justify-content-between align-items-center cursor-default">
                                    <div className=""> Total:  
                                        <span className=""> {this.formatNum(total)} VND</span>  
                                    </div>
    
                                    <div className="">
                                        <Link to ="/cart" className="btn user-utilities__cart--preview-submit border-normal">Make order</Link>
                                    </div>
                                </div>
    
                            </div>
            
                                </div>
                            </div>
            
                            <div className="user-utilities__item user-utilities__account">
                                <Link to="/profile" className=""><img src="https://be-pr2.000webhostapp.com/userImages/blank-profile-picture-973460_640.png" alt="" className="user-utilities__account--photo cursor-pointer"/></Link>
            
                                <div className="user-utilities__item-extra user-utilities__account--info py-3 px-2 corner-5">
                                    <div className="user-utilities__account--info-preview pb-2 px-2 border-bottom cursor-default">
                                        <p className="">Hello <span className="">{user.username}</span> !</p>
                                        <p className="">Balance: <span className="">***</span></p>
                                    </div>
            
                                    <div className="user-utilities__account--info-options">
                                        <div className="user-utilities__account--info-item px-1">
                                            <Link to="/profile" className="btn">Profile</Link>
                                        </div>
                                        <div className="user-utilities__account--info-item px-1">
                                            <Link to="/profile" className="btn">Wallet</Link>
                                        </div>
                                        <div className="user-utilities__account--info-item px-1">
                                            <Link to="/order" className="btn">Order</Link>
                                        </div>
                                    </div>
            
                                    <div className="user-utilities__account--info-item px-1">
                                        <a href="/#" className="btn text-danger" onClick={this.props.logout(false)}>Logout</a>
                                    </div>
                                </div>
                        </div>
                    </>
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    componentWillUnmount(){
        this.setState({
            cart: 0,
            button: <>
                    </>,
            all_products: [],
            name: null
        })
    }

    homeRedirect(){
        this.props.history.push('/');
    }

    productRedirect(event){
        if (event.key === 'Enter') {    
            this.props.history.push(`/product/${event.target.value.substring(0,event.target.value.indexOf(":"))}`);
        }
    }

    render(){
        const button = this.state.button;
        const {history} = this.props;
        const all_products = this.state.all_products;

        return (
            <div className="navbar d-flex py-3 justify-content-center">
                <div className="logo"  onClick={() => history.push('/')}>
                    <div></div>
                    <div></div>
                    <div></div><svg viewBox="0 0 200 200">
                        <path d="M103.7226715,142.5249634c7.0730667,1.6740265,14.5183868-1.3020172,21.9637146-8.7421417 	c10.4234619-10.4161987,18.2410431-20.4603577,23.6389008-29.7605286l-4.6533356-4.6500778 	c-5.5839844,7.6261444-13.9599762,16.9263077-25.1279678,28.0865097c-4.8394699,4.8360901-9.4927979,6.8821106-14.1461258,6.1381073 	s-10.981842-5.2080994-19.1717148-13.2062378l25.6863708-25.6684647c5.2117386-5.2080917,8.0037308-10.0441589,8.3759918-14.508255 	c0.372261-4.4640732-1.4890671-8.9281693-5.770134-13.2062454c-3.9088135-3.9060822-7.4453278-6.6961327-10.7957306-8.5561638 	c-3.3504028-1.8600349-6.3285141-2.9760628-8.9343948-3.3480644c-2.6058502-0.3720016-5.211731,0.1860123-8.1898422,1.4880295 	c-2.9781418,1.3020172-5.39785,2.9760666-7.6314697,4.6500854c-2.2335892,1.8600311-4.8394699,4.2780762-8.0037308,7.4401321 	c-4.8394699,4.8360901-8.375988,8.9281616-10.4234657,12.2762222c-2.0474739,3.3480682-3.350399,7.2541199-3.350399,11.5322037 	c-0.1861458,4.2780762,1.3029251,8.7421417,4.4671822,13.5782394s7.817585,10.4161987,14.3322411,16.9263153 	C87.5290985,134.3408356,96.6496048,140.8509521,103.7226715,142.5249634z M71.893898,105.3243103 	c-2.0474777-2.6040344-3.3504028-4.8360901-4.2810669-7.2541122c-0.9306641-2.2320328-1.3029251-4.2780838-1.3029251-5.9521027 	s0.372261-3.53405,1.4890671-5.5800934c1.1168137-2.046051,2.4197388-3.9060822,3.7226639-5.3940887 	c1.3029251-1.4880295,3.3504028-3.7200623,5.9562531-6.3240967c3.3504028-3.3480682,6.1424026-5.9521027,8.1898499-7.4401321 	c2.0474701-1.4880295,4.2810669-2.418045,6.700798-2.7900467c2.4197388-0.3720016,4.8394775,0.1860123,7.2591858,1.4880295 	c2.4197311,1.4880295,5.211731,3.9060822,8.5621338,7.2541199c2.4197311,2.418045,3.3503952,4.8360901,2.7919922,7.2541122 	c-0.558403,2.4180527-2.2335892,5.0220871-5.211731,7.9981461l-25.6863785,25.668457 	C76.547226,110.9044113,73.9413757,107.9283752,71.893898,105.3243103z"></path>
                    </svg>
                </div>
                <div className="search-bar d-flex justify-content-center flex-grow-2">
                    <div className="search-bar__control d-inline-block">
                    </div>
                    <div className="search-bar__input d-inline-block">
                    <Autocomplete   
                        id="search_box"
                        options={all_products.sort((a, b) => -b.name.localeCompare(a.name))}
                        renderInput={(params) => <TextField {...params} label="Search" />}
                        getOptionLabel={(product) => product.productId +": " +product.name}
                        onKeyDown={this.productRedirect.bind(this)}
                    />
                    </div>
                </div>
      
                <div className="user-utilities d-flex justify-content-end flex-grow-1">
                    
                    {button}
                    
                </div>
            </div>
        )
    }
}       

export default withRouter(Menu);