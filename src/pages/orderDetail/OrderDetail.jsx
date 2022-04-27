import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./OrderDetail.css";

export default class OrderDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            order: {},
            isLoading: true
        };
    }

    componentDidMount() {
        axios.defaults.headers.common = {'Authorization': `${this.props.token}`}
        axios.get(`${this.props.url}/api/order/view-order/${this.props.match.params.id}`).then(res => {
            this.setState({
                order: res.data
            });
        }).then(() => {
            this.setState({
                isLoading: false
            })
        }).catch(err => {
            console.log(err);
        });

    }

    render() {
        return(
            <>
            {(!this.state.isLoading) ?
                <>
                    
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