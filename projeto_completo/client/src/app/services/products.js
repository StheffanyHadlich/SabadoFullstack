import { API_URL } from './api.conf';

const ProductService =
{
    add(data)
    {
        return fetch(`${API_URL}/products`, {
            body: JSON.stringify({ product: data }),
            headers: {
                'content-type': 'application/json'
            },
            method: "POST",
            mode: 'cors'
        })
        .then(response => response.json());
    },

    get()
    {
        return fetch(`${API_URL}/products`, {
            method: "GET", 
            mode: 'cors'
        })
        .then(response => response.json());
    },

    delete(id)
    {
        return fetch(`${API_URL}/products/${id}`, {
            method: 'DELETE', 
            headers: {
                'access-control-allow-credentials': true,
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
            },
            mode: 'cors'
        });
    }
};

export default ProductService;