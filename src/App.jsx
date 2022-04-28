import React from 'react';
import HomePage from './pages/homepage/Homepage';
import { Route, Switch } from "react-router";
import Menu from './components/menu/Menu.jsx';
import ProductPage from './pages/product/ProductPage.jsx';
import Login from './pages/login/Login.jsx';
import Signup from './pages/signup/Signup.jsx';
import Profile from './pages/profile/Profile.jsx';
import Footer from './components/footer/Footer';
import Forgot from './pages/forgot/Forgot.jsx';
import CategoryProduct from './pages/categoryProduct/categoryProduct.jsx';
import Cart from './pages/cart/Cart.jsx';
import Order from './pages/order/Order.jsx';
import OrderDetail from './pages/orderDetail/OrderDetail';
import './App.css';

export default class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isLogin: false,
            checkLogin: false,
            username: "",
            userId: "",
            URL: "https://se2-be-main.herokuapp.com",
            token: null
            
        }
    }

    handleCallback = (childData) => {
        this.setState({checkLogin: childData})
    }

    isLogging = (childData) => {
        this.setState({isLogin: childData})
    }

    checkLogging = (childData) => {
        this.setState({checkLogin: childData})
    }

    homeRedirect(){
        this.props.history.push("/");
    }

    setToken(token){
        this.setState({token: `Bearer ${token}`});
    }

    render(){
        const url = this.state.URL;
        const token = this.state.token;
            return<> 
                <main>
                    {!this.state.isLogin ?
                        <Menu checkLogin={this.state.checkLogin} logout={this.handleCallback} url={url} token={token}/>
                    :
                        <></>
                    }
                    <Switch>
                        <Route exact path="/">
                            <HomePage checkLogin = {this.handleCallback} url={url}/>
                        </Route>

                        <Route exact path="/product/:id" render={(props) => 
                            <ProductPage url={url} token={token} {...props} />} />

                        <Route exact path="/category/:id/:name" render={(props) => 
                            <CategoryProduct url={url} token={token} {...props} />} />

                        <Route exact path="/login" render={(props) => 
                            <Login isLogin = {this.isLogging.bind(this)} checkLogin = {this.checkLogging.bind(this)} url={url} token={token} setToken={this.setToken.bind(this)} {...props}/> } />

                        <Route exact path="/cart" render={(props) => 
                            <Cart isLogin = {this.isLogging.bind(this)} url={url} token={token} {...props}/> } />

                        <Route exact path="/order" render={(props) => 
                            <Order isLogin = {this.isLogging.bind(this)} url={url} token={token} {...props}/> } />

                        <Route exact path="/order/:id" render={(props) => 
                            <OrderDetail url={url} token={token} {...props} />} />

                        <Route exact path="/signup">
                            <Signup isLogin = {this.isLogging.bind(this)} url={url}/>
                        </Route>

                        <Route exact path="/profile"  render={(props) => 
                            <Profile checkLogin = {this.checkLogging.bind(this)} setToken = {this.setToken.bind(this)} login = {this.state.checkLogin} url={url} token={token} {...props}/> } />

                        <Route exact path="/forgot" render={(props) => 
                            <Forgot isLogin = {this.isLogging.bind(this)} url={url} {...props}/> } />

                    </Switch>
                </main>
                <Footer/>
            </>;
    }
}
