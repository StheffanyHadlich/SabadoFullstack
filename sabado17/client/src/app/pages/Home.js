import React, { Component } from 'react';
import ProdutoService from '../services/produto';

const ProdutoView = ({product}) => (
    <div>
        <div><img src="" alt=""/></div>
        <div>{ product.name }</div>
        <div>R$ { product.price }</div>
    </div>
);

class Home extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            products: null
        }
    }

    componentDidMount()
    {
        ProdutoService.get()
        .then(result => this.setState({ products: result }));
    }

    render()
    {
        return <div>
            { this.state.products && this.state.products.map(p => (
                <ProdutoView product={p} />
            )) }

            { !this.state.products && <div>Nenhum!</div> }
        </div>;
    }
}

export default Home;