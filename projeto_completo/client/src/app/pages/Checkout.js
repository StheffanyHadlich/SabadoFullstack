import React, { Component } from 'react';
import CartService from '../services/cart';
import { Button, Message } from 'element-react';
import { ProductViewList } from '../components/ProductViews';

class Sell extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            cart: null
        }

        this.removeFromCart = this.removeFromCart.bind(this);
        this.checkout = this.checkout.bind(this);
        this.clearCart = this.clearCart.bind(this);
    }

    componentDidMount() {
        this.updateCart();
    }

    updateCart() {
        this.setState({ cart: CartService.get() });
    }

    removeFromCart(product) {
        CartService.remove(product)
            .then(result => this.updateCart());
    }

    checkout()
    {
        CartService.checkout()
            .then(result => {
                CartService.clear();
                Message("Produtos comprados!");
                this.updateCart();
                console.log(result);
            })
            .catch(err => {
                console.log(err);
                Message.error("Não foi possivel comprar!");
            });
    }

    clearCart() 
    {
        CartService.clear();
        this.updateCart();
    }

    render()
    {
        const { cart } = this.state;

        return <div className="page products">
            <div className="load" style={{justifyContent:'space-between', padding:16}}>
                <div>Total: R$ { CartService.total() }</div>
                <div>
                    <Button size="small" type="danger" onClick={this.clearCart}>limpar</Button>
                    <Button size="small" type="success" onClick={this.checkout}>Checkout</Button>
                </div>
            </div>
            { !cart && <div className="load">Loading..</div> }
            { cart && cart.map((p, i) => (
                <ProductViewList key={i} product={p} onClick={() => this.removeFromCart(p)} />
            )) }
        </div>;
    }
}

export default Sell;