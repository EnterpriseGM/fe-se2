import './Product.css';
import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

export default class Product extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isRedirect: false
        }
    }

    formatNum(num) {
        return (num*1000).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    handleCLick(e) {
        axios.get(`http://localhost:8080/api/product/${this.props.product.productId}`).then(res => {
            if(res.status === 200) {
                this.setState({isRedirect: true});
            }
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        const product = this.props.product;
        const price = Math.round(product.price*1.2);
        const dis_price = product.price;
        const demo = product.description.substring(0, 50)+"...";

        if (this.state.isRedirect) {
            return <Redirect to = {{ pathname: `/product/${this.props.product.productId}` }} />;
        }
        return (
            
            <div className="row" id={product.category.id} onClick={this.handleCLick.bind(this)}>
                <div className="col-lg-3 col-md-6 col-sm-6">
                    <div id="ho_bo" className="our_products">
                        <div className="product" id={product.productId}>
                            <figure><img src={product.imageName} alt=""/></figure>
                        </div>

                        <h3>{product.name}</h3>

                        <p><del>{this.formatNum(price)} VND</del></p>
                        <span>{this.formatNum((dis_price))} VND</span>
                        <br/>
                        <br/>
                        <p>Quantity: {product.quantity}</p>
                        <br/>
                        <br/>
                        <p><i>{demo}</i></p>
                    </div>
                </div>
            </div>
        )
    }
}