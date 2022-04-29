//create homepage component
import React from 'react';
import axios from 'axios';
import './Homepage.css';
import Product from '../../components/product/Product';
import TextField from '@mui/material/TextField';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { Redirect } from 'react-router';
import video from "./bg.mp4";
    
export default class Homepage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            all_products: [],
            top_products: [],
            id: '',
            search: '',
            token: null,
            isLoading: true,
            isRedirect: false
        };
    }

    componentDidMount(){
        if(this.state.token !== null){
            this.props.checkLogin(true);
        } 

        axios.get(`${this.props.url}/api/products`).then(res => {
            const all_products = res.data;
            this.setState({ all_products });
        }).then(() => {
            return axios.get(`${this.props.url}/api/categories`)
        }).then(res =>{
            const categories = res.data;
            const filter_products = this.state.all_products.sort((a, b) => b.price*b.quantity - a.price*a.quantity);
            const top_products = filter_products.slice(0, 6);
            this.setState({ categories, top_products }); 
        }).then(() => {
            this.setState({ isLoading: false });
        }).catch(err => {
            console.log(err);
        })  
             
    }

    setSearchText(e){
        const search = e.target.value;
        this.setState({ search });
    }

    handleButton(e){
        e.preventDefault();
        this.setState({
            id: e.currentTarget.id,
            category: e.currentTarget.className,
            isRedirect: true
        })
    }

    ascPrice(e){
        e.preventDefault();
        const all_products = this.state.all_products;
        const asc_products = all_products.sort((a, b) => a.price - b.price);
        this.setState({ all_products: asc_products });
    }

    descPrice(e){
        e.preventDefault();
        const all_products = this.state.all_products;
        const desc_products = all_products.sort((a, b) => b.price - a.price);
        this.setState({ all_products: desc_products });
    }

    componentWillUnmount(){
        this.setState({
            id: '',
            category: '',
            isRedirect: false
        })
    }


    render(){
        const user = this.state.user;
        const categories = this.state.categories;
        const search = this.state.search;
        const filterProduct = [];

        for(const product of this.state.all_products){
            if(product.name.toLowerCase().includes(search.toLowerCase())){
                filterProduct.push(product);
            }
        }

        if (this.state.isRedirect) {
            const name = this.state.category.replace(/ /g, '');
            return <Redirect to = {{ pathname: `/category/${this.state.id}/${name}` }} />;
        }

        return(
            <>
            
            {
                !this.state.isLoading ?
                <>
                    <section className="banner_main">                   
                        <video id="video" autoPlay loop muted >
                            <source src={video} type="video/mp4"/>
                        </video>

                        <div className="container">
                            <div className="banner_po">
                                <div className="row">
                                    <div className="col-md-7">
                                        <div className="text_box">
                                        <span className="text-light">Welcome {user.name}</span>
                                        <h1><strong className="text-danger">What you need, we have!</strong> </h1>
                                        <a href="#all_product" className="read_more" role="button">All products</a>
                                        
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                    <div className="products">
                        <div className="container">
                            <div className="row">
                            <div className="col-md-7">
                                <div className="titlepage">
                                    <h2>Top Products</h2>
                                </div>
                            </div>
                            </div>

                            <div className="item_list">
                            {this.state.top_products.map(product => (
                                <Product key={product.productId} product={product}/>
                            ))}
                            </div>
                                             
                        </div>
                    </div>

                    
                    <div className="products">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-7">
                                    <div className="titlepage" id="all_product">
                                        <h2>All Products</h2>
                                        <div className="top_bar_menu">
                                            <ul className="standard_dropdown top_bar_dropdown">
                                                <li><p>Sort by:<i className="fas fa-chevron-down"/></p></li>
                                                <li> <p>Price<i className="fas fa-chevron-down"></i></p>
                                                    
                                                    <ul>
                                                        <li onClick={this.ascPrice.bind(this)}><p>Ascending</p></li>
                                                        <li onClick={this.descPrice.bind(this)}><p>Descending</p></li>
                                                    </ul>

                                                </li>
                                                <li> <p>Category<i className="fas fa-chevron-down"></i></p>
                                                    
                                                    <ul> 
                                                        {categories.map((category, index) => {
                                                            return (
                                                                <li key={index} className={category.name} id={category.id} onClick={this.handleButton.bind(this)}>
                                                                    <p >{category.name}</p>
                                                                </li>
                                                            )    
                                                        })}
                                                    </ul>
                                                    
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <TextField id="standard-basic" label="Search" variant="standard" 
                            InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">                                  
                                      <SearchIcon />
                                  </InputAdornment>
                                )
                            }}
                            onChange={this.setSearchText.bind(this)}/>

                            <div className="item_list">
                            {filterProduct.map(product => (
                                <Product key={product.productId} product={product}/>
                            ))}
                            </div>

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