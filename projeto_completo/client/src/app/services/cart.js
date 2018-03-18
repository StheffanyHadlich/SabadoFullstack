import { API_URL } from './api.conf';

const CartService =
{
    add(product)
    {
        const cart = this.get();
        cart.push(product);
        window.localStorage.setItem('cart', JSON.stringify(cart));
    },

    get()
    {
        let cart = window.localStorage.getItem('cart');
        return cart? JSON.parse(cart) : [];
    },

    remove(product)
    {
        return new Promise((resolve, reject) => {
            const cart = this.get();
            cart.every((p, i) => {
                if(p.id === product.id) {
                    cart.splice(i, 1);
                    return false;
                }

                return true;
            });

            window.localStorage.setItem('cart', JSON.stringify(cart));
            resolve(true);
        })
        
    },

    total()
    {   
        let total = 0;
        const cart = this.get();
        cart.forEach(p => total += parseFloat(p.price));
        return total;
    },

    clear() {
        window.localStorage.clear();
    },

    checkout(data)
    {
        const cart = this.get();
        return fetch(`${API_URL}/sales`, {
            body: JSON.stringify({ sale: { buyer_id: 1, price: this.total(), cart: cart }  }),
            headers: {
                'content-type': 'application/json'
            },
            method: "POST",
            mode: 'cors'
        })
        .then(response => response.json());
    }
};

export default CartService;