import React from "react";
import axios from "axios";
import './OrderDetail.css';
import { ProgressBar } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import { Link } from "react-router-dom";

export default class OrderDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            order: {},
            isLoading: true,
            percentage: 0,
            confirmTime: "none",
            rejectTime: "none"
        };
    }

    componentDidMount() {
        axios.defaults.headers.common = {'Authorization': `${this.props.token}`}
        const id = this.props.match.params.id;
        axios.get(`${this.props.url}/api/order/view-order/${id}`, {
            headers: {
                'Authorization': `${this.props.token}`
            }
        })
        .then(res => {
            this.setState({
                order: res.data
            });
        }).then(() => {
            const order = this.state.order;
            if(order.rejectTime !== null){
                const rejectTime = order.rejectTime;
                this.setState({
                    rejectTime
                });
            }
    
            if(order.confirmTime !== null){
                const confirmTime = order.confirmTime;
                this.setState({
                    percentage: 50,
                    confirmTime
                })
            }
            this.setState({
                isLoading: false
            })
        }).catch(err => {
            console.log(err);
        });

    }

    formatNum(num) {
        return (num*1000).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    render() {
        const order = this.state.order;
        const products = order.orderItem;

        return(
            <>
            {(!this.state.isLoading) ?
                <>          
                    <div className="content-card p-3">
                        <div className="content-card__head pb-4">
                            <div className="d-flex justify-content-between">
                                <div className="">
                                    <h3 className="m-0">Order ID: <span className="px-2 fs-4 fw-normal">{order.id}</span></h3>
                                    <p className="">Status: <span className="px-2 text-danger">{order.status}</span></p>
                                </div>
                            </div>
                            <table className="w-100 ">
                                <tr className="text-center border-bottom-dash">
                                    <th className="p-2">Checkout</th>
                                    <th className="p-2">Confirm</th>
                                    <th className="p-2">Reject</th>
                                </tr>
                                <tr className="text-center border-bottom-dash">
                                    <td className="p-2">{order.checkOutTime}</td>
                                    <td className="p-2">{this.state.confirmTime}</td>
                                    <td className="p-2">{this.state.rejectTime}</td>
                                </tr>
                            </table>
                        </div>

                                      
                        <div className="content-card__head">

                            <div className="order-item content-card__head d-flex justify-content-between  py-2">
                                <p className="order-item-name fw-bolder">Name</p>
                                <p className="order-item-quantity fw-bolder">Quantity</p>
                                <p className="order-item-price fw-bolder">Price</p>
                            </div>
                                    
                            {products.map((pd, index) => {
                                const product = pd.product;
                                return (     
                                        <div className="order-item border-bottom-dash d-flex justify-content-between  py-2" key={index}>
                                            <p className="order-item-name">{product.name}</p>
                                            <p className="order-item-quantity">{pd.orderQuantity}</p>
                                            <p className="order-item-price">{this.formatNum(product.price)} VND</p>
                                        </div>
                                ) 
                            })}
                        </div>
                    </div>
                        <div className="pt-3">   
                            <div className="d-flex justify-content-between">
                                <h4 className="text-box">Shipment: </h4>
                                <h4 className="">15,000 VND</h4>
                            </div>
                            <div className="d-flex justify-content-between">
                                <h4 className="text-box">Total: </h4>
                                <h4 className="">{this.formatNum(order.totalPrice)} VND</h4>
                            </div>
                        </div>

                        <ProgressBar
                            percent={this.state.percentage}
                            filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
                        /> 

                    <div className="back-container text-center mt-2">
                        <div className="back-to-login-btn" >
                            <Link to="/order" className="external_link"> &lt; Back to Order </Link>
                        </div>
                    </div>
                </>
                :
                <div className="loading">
                    <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" alt=""/>
                </div>
            }
            </>
        ) 
    }
}