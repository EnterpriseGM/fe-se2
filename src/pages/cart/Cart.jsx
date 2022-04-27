import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Cart.css';

export default class Cart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        axios.defaults.headers.common = {'Authorization': `${this.props.token}`}
        axios.get(`${this.props.url}/api/cart/view-cart`)
        .then(res => {
            const products = res.data;
            this.setState({
                products
            })
        }).catch(err => {
            console.log(err);
        })
    }

    
    formatNum(num) {
        return (num*1000).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    changeQuantity(e){
        const quantity = e.target.value;
        const id = e.target.id;
        axios.get(`${this.props.url}/api/cart/change-quantity/${id}/${quantity}`)
        .then(res => {
            if(res.status === 200){
                window.alert("Quantity changed");
            }
        }).then(() => {
            return  axios.get(`${this.props.url}/api/cart/view-cart`)
        }).then(res => {
            const products = res.data;
            this.setState({
                products
            })
        }).catch(err => {
            console.log(err);
        })
    }

    deleteProduct(e){
        if(window.confirm("Product deleted") === true){
            axios.get(`${this.props.url}/api/cart/delete-from-cart/${e.target.id}`)
            .then(res => {
                if(res.status === 200){
                    window.alert("Deleted success");
                }
            }).then(() => {
                return  axios.get(`${this.props.url}/api/cart/view-cart`)
            }).then(res => {
                const products = res.data;
                this.setState({
                    products
                })
            }).catch(err => {
                console.log(err);
            })
        }
    }

    checkOut(){
        if(window.confirm("Are you sure to checkout?") === true){
            axios.post(`${this.props.url}/api/cart/check-out`).then(res => {
                if(res.status === 200){
                    window.alert("Order success");
                }else{
                    window.alert("Order failed");
                }
            }).then(() => {
                return  axios.get(`${this.props.url}/api/cart/view-cart`)
            }).then(res => {
                const products = res.data;
                this.setState({
                    products
                })
            }).catch(err => {
                console.log(err);
            })
        }
    }

    checkCart() {
        const products = this.state.products;
        const total = products.reduce((total, pd) => {
            return total + pd.quantity * pd.product.price;
        }, 0);
        if(this.state.products.length === 0) {
            return (
                <div className="cart-empty">
                    <p>Your cart is empty</p>
                </div>
            )
        }else {
            return (
                <>
                <div className="cart">

                    <ul className="cartWrap">
                        {
                            products.map((pd, index) => {
                                const product = pd.product;
                                if(!index%2){
                                    return (
                                        <li className="items odd" key={index}>
                        
                                            <div className="infoWrap"> 
                                                <div className="cartSection">
                                                <img src={product.imageName} alt="" className="itemImg" />
                                                <p className="itemNumber">{product.productId}</p>
                                                <h3>{product.name}</h3>
                                                
                                                <p> <input type="text" id={product.productId} className="qty" placeholder={pd.quantity} onChange={this.changeQuantity.bind(this)}/> x {this.formatNum(product.price)}</p>
                                                
                                                <p className="stockStatus"> In Stock</p>
                                                </div>  
                                            
                                                
                                                <div className="prodTotal cartSection">
                                                    <p>{this.formatNum(pd.quantity*product.price)}</p>
                                                </div>
                                                <div className="cartSection removeWrap">
                                                    <button id={product.productId} className="remove" onClick={this.deleteProduct.bind(this)}>x</button>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                }else {
                                    return (
                                        <li className="items even" key={index}>

                                            <div className="infoWrap"> 
                                                <div className="cartSection">
                                                
                                                <img src={product.imageName} alt="" className="itemImg" />
                                                <p className="itemNumber">{product.productId}</p>
                                                <h3>{product.name}</h3>
                                                
                                                <p> <input type="text"  className="qty" placeholder={pd.quantity} onChange={this.changeQuantity.bind(this)}/> x {this.formatNum(product.price)}</p>
                                                
                                                <p className="stockStatus"> In Stock</p>
                                                </div>  
                                            
                                                
                                                <div className="prodTotal cartSection">
                                                    <p>{this.formatNum(product.quantity*product.price)}</p>
                                                </div>
                                                    <div className="cartSection removeWrap">
                                                <button className="remove" id={product.productId} onClick={this.deleteProduct.bind(this)}>x</button>
                                                    </div>
                                            </div>
                                        </li>
                                    )
                                }
                            })
                        }
                    </ul>
                    </div>
                    <div className="promoCode"><label htmlFor="promo">Have A Promo Code?</label><input type="text" name="promo" placeholder="Enter Code" className="promote_input" />
                    <a href="#" className="c_btn"></a>
                    </div>

                    <div className="subtotal cf">
                    <ul>
                        <li className="totalRow"><span className="label">Subtotal</span><span className="value">{this.formatNum(total)} VND</span></li>
                        
                            <li className="totalRow"><span className="label">Shipping</span><span className="value">15,000 VND</span></li>
                            <li className="totalRow final"><span className="label">Total</span><span className="value">{this.formatNum(total+15)} VND</span></li>
                        <li className="totalRow"><button className="c_btn btn continue p-3" onClick={this.checkOut.bind(this)}>Checkout</button></li>
                    </ul>
                    </div>
                </>
            )
        }
    }

    render() {
        return (
            <div className="wrap cf">
                <h1 className="projTitle"> Shopping Cart</h1>
                <div className="heading cf">
                    <h1>My Cart</h1>
                    <Link to="/" className="continue">Continue Shopping</Link>
                </div>
                    {this.checkCart()}
            </div>
        )
    }
}