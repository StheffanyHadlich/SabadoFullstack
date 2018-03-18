import { URL_API } from './app.conf';

const ProdutoService =
{
    add(data)
    {
        console.log(data);
        return fetch(`${URL_API}/products`, {
            body: JSON.stringify({
                    product: data
            }),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
            mode: 'cors'
        })
        .then(response => response.json())
        .catch(err => console.log(err));
    },

    get()
    {
        return fetch(`${URL_API}/products`, {
            method: 'GET',
            mode: 'cors'
        })
        .then(response => response.json())
        .catch(err => console.log(err));
    },

    remove()
    {

    }
}

export default ProdutoService;