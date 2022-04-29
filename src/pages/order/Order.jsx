import React from "react";
import axios from "axios";
import './Order.css';

export default class Order extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            orders: []
        }
    }

    componentDidMount() {
        axios.defaults.headers.common = {'Authorization': `${this.props.token}`}
        axios.get(`${this.props.url}/api/order/get-all-order`)
        .then(res => {
            const orders = res.data;
            this.setState({
                orders,
                isLoading: false
            })
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        })
    }

    moveToOrder(e) {
        this.props.history.push(`/order/${e.target.id}`);
    }

    formatNum(num) {
        return (num*1000).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    render() {
        const orders = this.state.orders;
        return (
            <>
            {
                !this.state.isLoading ?
                <>
                    <h1 className="text-center"><b>List of Orders</b></h1>
                    {orders.map((order, index) => {
                        const products = order.orderItem;
                        return (
                            <>
                                <div className="order-container d-flex justify-content-center mt-100" key={index}>
                                    
                                    <div className="modal" id="modal1">
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div className="modal-content">
                                            
                                                <div className="modal-header">
                                                    <h4 className="modal-title">Order ID: {order.id}</h4>
                                                </div>
                                                <div className="modal-body">
                                                    <div className="container">
                                                        <h6>Item Details</h6>
                                                        {
                                                            products.map((product) => {
                                                                const pd = product.product;
                                                                return (
                                                                    <div className="row" key={pd.productId}>
                                                                        <div className="w-25 p-3">
                                                                        <img className="img-fluid" src={pd.imageName} alt=""/> 
                                                                        </div>
                                                                        <div className="col-xs-6">
                                                                            <ul type="none">
                                                                                <li>Price: {this.formatNum(pd.price)}</li>
                                                                                <li>Name: {pd.name}</li>
                                                                                <li>Quantity: {product.orderQuantity}</li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                        <h6>Order Details</h6>
                                                        <div className="row">
                                                            <div className="col-xs-6">
                                                                <ul type="none">
                                                                    <li className="left">Order number:</li>
                                                                    <li className="left">Total price:</li>
                                                                    <li className="left">Date: </li>
                                                                    <li className="left">Status: </li>
                                                                </ul>
                                                            </div>
                                                            <div className="right-text col-xs-6">
                                                                <ul className="right" type="none">
                                                                    <li className="right">{order.id}</li>
                                                                    <li className="right">{this.formatNum(order.totalPrice)} VND</li>
                                                                    <li className="right">{order.checkOutTime}</li>
                                                                    <li className="right">{order.status}</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="modal-footer"> <button type="button" className="o-btn" id={order.id} onClick={this.moveToOrder.bind(this)}>Track order</button> </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )         
                    })}
                </>
            :
                <div className="loading">
                    <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" alt=""/>
                </div>
            }
            </>
    )}
}