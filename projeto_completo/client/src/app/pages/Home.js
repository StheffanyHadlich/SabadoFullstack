import React, { Component } from 'react';
import ProductService from '../services/products';
import { Dialog, Message } from 'element-react';
import CartService from '../services/cart';
import { ProductViewList, ProductView } from '../components/ProductViews';
import '../../styles/Home.css';

class Home extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            products: null,
            selectProduct: null
        };

        this.openProduct = this.openProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    componentDidMount() {
        this.updateProductList();
    }

    updateProductList()
    {
        ProductService.get()
            .then(result => {
                this.setState({ products: result });
            })
            .catch(err => console.log(err));
    }

    openProduct(product) {
        this.setState({ selectProduct: product });
    }

    addToCart(product) 
    {
        Message("Produto adicionado ao carrinho.");
        this.setState({ selectProduct: null });
        CartService.add(product);
    }

    deleteProduct(id)
    {
        ProductService.delete(id)
            .then(result => {
                this.setState({ selectProduct: null });
                this.updateProductList();
            });
    }

    render()
    {
        const { products, selectProduct } = this.state;

        return <div className="page products">
            { !products && <div className="load">Loading..</div> }
            { products && products.map(p => (
                <ProductViewList key={p.id} product={p} onClick={() => this.openProduct(p)} />
            )) }

            <Dialog
                title={(selectProduct?selectProduct.name:"")}
                visible={selectProduct!==null}
                size="full"
                onCancel={ () => this.setState({ selectProduct: null }) }
            >
                <Dialog.Body>
                    { selectProduct && <ProductView 
                        product={selectProduct} 
                        deleteProduct={this.deleteProduct} 
                        addToCart={this.addToCart}
                    /> }
                </Dialog.Body>
            </Dialog>
        </div>;
    }
}

export default Home;