import React from "react";
import axios from "axios";

export default class CartPreview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            product: this.props.product,
            num: -1
        }
    }

    componentDidMount() {
        axios.defaults.headers.common = {'Authorization': `${this.props.token}`}
    }

    formatNum(num) {
        return (num*1000).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    changeQuantity(e) {
        this.setState({
            num: e.target.value
        })
    }

    render() {
        const product = this.state.product;
        const pd = product.product;
        return(
            <div className="user-utilities__cart--preview-item d-flex px-2 py-2">
                <img src={pd.imageName} alt="" className="user-utilities__cart--preview-item__image col-3" width="100%" height="100%"/>

                <div className="user-utilities__cart--preview-item__content px-2 col-9">
                    <p className="user-utilities__cart--preview-item__name">Name: <span>{pd.name}</span> </p>
                    <p className="user-utilities__cart--preview-item__extra d-flex justify-content-between">
                        <span className="user-utilities__cart--preview-item__price">{this.formatNum(pd.price)}</span>
                        <span className="user-utilities__cart--preview-item__quantity px-3">Quantity: <span className="">{product.quantity}</span> </span>
                    </p>
                </div>
            </div>
        )
    }
}