import React from 'react';
import axios from 'axios';
import './categoryProduct.css';
import Product from '../../components/product/Product';
import {Link} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { Redirect } from 'react-router';

export default class categoryProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            search: '',
            isLoading: true,
            isRedirect: false
        }
    }

    componentDidMount() { 
        axios.get(`${this.props.url}/api/category/${this.props.match.params.id}`).then(res => {
            const categories = res.data;
            this.setState({categories});
        }).then(() =>{
            this.setState({
                isLoading: false
            })
        })
        .catch(err => {
            console.log(err);
        });
    }

    setSearchText(e){
        const search = e.target.value;
        this.setState({ search });
    }

    handleButton(e){
        e.preventDefault();
        this.setState({
            isRedirect: true
        })
    }

    render() {
        const categories = this.state.categories;
        const search = this.state.search;
        const filterProduct = [];

        for(const product of categories){
            if(product.name.toLowerCase().includes(search.toLowerCase())){
                filterProduct.push(product);
            }
        }

        if (this.state.isRedirect) {
            return <Redirect to = {{ pathname: `/category/${this.props.match.params.id}` }} />;
        }
        return (
            <div className="products">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7">
                            <div className="titlepage" id="all_product">
                                <h2>Result for: {this.props.match.params.name}</h2>
                                <div className="top_bar_menu">
                                    <ul className="standard_dropdown top_bar_dropdown">
                                        <li><p>Sort by:<i className="fas fa-chevron-down"/></p></li>
                                        <li> <p>Price<i className="fas fa-chevron-down"></i></p>
                                            
                                            <ul>
                                                <li><p>Ascending</p></li>
                                                <li><p>Descending</p></li>
                                            </ul>

                                        </li>
                                        <li> <p>Category<i className="fas fa-chevron-down"></i></p>
                                            
                                            <ul> 
                                                {categories.map((category, index) => {
                                                    return (
                                                        <li key={index} id={category.id} value={category.name} onClick={this.handleButton.bind(this)}>
                                                            <Link to={`/category/${category.id}`}>
                                                            <p>{category.name}</p>
                                                            </Link>
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
        );
    }
}