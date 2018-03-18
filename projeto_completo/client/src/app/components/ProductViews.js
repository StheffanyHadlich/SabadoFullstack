import React from 'react';
import { IMG_URL } from '../services/api.conf';
import { Button } from 'element-react';

const ProductViewList = ({onClick, product}) => (
    <div className="prod" onClick={onClick}>
        { product['images'][0] && 
        <div className="prod-img" style={{backgroundImage:`url(${`${IMG_URL}/${product.images[0].id}?thumb=true`})`}}></div> }
        <span>{ product.name }</span>
        <span>{ product.price }</span>
    </div>
);

const ProductView = ({addToCart, deleteProduct, product}) => (
    <div>
        { product['images'][0] && 
        <img src={`${IMG_URL}/${product.images[0].id}?thumb=true`} alt="product preview"/> }<br/><br/>

        <h2>R$ { product.price }</h2><br/>

        <h3>Descrição</h3>
        <div>{ product.description }</div><br/>

        <h3>Status</h3>
        <div>{ product.status }</div><br/>

        <h3>Vendedor</h3>
        <div>{ product.user.name }</div><br/><br/><br/>

        <Button type="success" onClick={() => addToCart(product)}>Adicionar ao carrinho</Button>
        <Button type="danger" onClick={() => deleteProduct(product.id)}>Deletar</Button>
    </div>
);

export { ProductViewList, ProductView }