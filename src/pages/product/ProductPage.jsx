import './ProductPage.css';
import React from 'react';
import axios from 'axios';

export default class ProductPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            product: {},
            isRender: false,
            id: -1,
            num: 1
        }
    }

    componentDidMount() {
        axios.defaults.headers.common = {'Authorization': `${this.props.token}`}
        axios.get(`${this.props.url}/api/product/${this.props.match.params.id}`).then(res => {
            const product = res.data;
            this.setState({
                product,
                id: product.productId
            });
        }).then(() =>{
            this.setState({
                isRender: true
            })
        })
        .catch(err => {
            console.log(err);
        });
    }

    decreaseNum() {
        axios.get(`${this.props.url}/api/cart/change-quantity/${this.state.id}/${this.state.num-1}`)
        .then(res => {
            if(res.status === 200){
                if(this.state.num > 1) {
                    this.setState({
                        num: this.state.num - 1
                    })
                }else{
                    window.alert("Quantity can not smaller than 1")
                } 
            }
        }).catch((err) => {
            window.alert(err)
        })
        
    }

    increaseNum() {
        axios.get(`${this.props.url}/api/cart/change-quantity/${this.state.id}/${this.state.num+1}`)
        .then(res => {
            if(res.status === 200){
                if(this.state.num <= this.state.product.quantity) {
                    this.setState({
                        num: this.state.num + 1
                    })
                }else{
                    window.alert(`Quantity can not bigger than ${this.state.product.quantity}`)
                }
            }
        }).catch((err) => {
            window.alert(err)
        })        
    }

    formatNum(num) {
        return (num*1000).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    addToCart(e){
        if(this.props.token !== null){
            axios.post(`${this.props.url}/api/cart/add-to-cart`,{               
                productId: this.state.id,
                quantity: this.state.num
            }).then(res => {
                window.alert(res.data);
                e.target.classList.add("success")
            }).catch((err) => {
                window.alert(err);
            })
        }else{
            window.alert("Please login first!");
        }
    }

    render() {
        const product = this.state.product;
        const price = product.price;
        const category = product.category;
        const num = this.state.num;

        return(
            <>
            {
                this.state.isRender
                ?
                <div className="product-container">
                    <div className="left-column">
                        <figure><img src={product.imageName} alt=""/></figure>
                    </div>    
                    <div className="right-column">
                    
                        <div className="product-description">  
                            <span>{category.name}</span>
                            <br />
                            <br />
                            <h1>{product.name}</h1>
                            <br />
                            <p>{product.description}</p>
                        </div>
                    
                        <div className="product-configuration">
                            <div className="cable-config">
                                <span>Quantity: {product.quantity}</span>
                                <br />
                            </div>
                        </div>
                        <div className="number">
                            <button className="minus" onClick={this.decreaseNum.bind(this)}>&#45;</button>
                            <input type="text" value={num}/>
                            <button className="plus" onClick={this.increaseNum.bind(this)}>&#43;</button>
                        </div>
                        <br />
                        <div className="product-price">
                            <span>{this.formatNum(price)} VND</span>             
                            <button className="cart-btn" onClick={this.addToCart.bind(this)}>Add to cart</button>
                        </div>
                    </div> 
                </div>
                :
                <div className="loading">
                    <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" alt=""/>
                </div>
            }
            </>
        )
    }
}