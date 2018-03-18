import React, { Component } from 'react';
import { Button, Upload } from 'element-react';
import ProdutoService from '../services/produto';

const ProdutoSchema = [
    { type: "text", name: "name", label: "Nome" },
    { type: "number", name: "price", label: "Preço (R$)" },
    { type: "text", name: "description", label: "Descrição" }
];

class Produtos extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            image_id: null,
            name: null,
            description: null,
            price: null
        }

        this.onChange = this.onChange.bind(this);
        this.onUploadSuccess = this.onUploadSuccess.bind(this);
        this.addProduto = this.addProduto.bind(this);
    }

    onUploadSuccess(file)
    {
        if(!file) {
            return;
        }

        this.setState({ image_id: file.id });
    }

    addProduto()
    {
        ProdutoService.add(this.state)
        .then(result => this.setState({}));
    }

    onChange({target})
    {
        const { name, value } = target;
        this.setState({ [name]: value });
    }

    render()
    {
        // const {  } = this.state;

        return <div>
            <Upload
                className="upload-demo"
                action="http://10.31.33.113:3000/images"
                listType="picture"
                onSuccess={this.onUploadSuccess}
            >
                <Button size="small" type="primary">Click to upload</Button>
            </Upload>

            { ProdutoSchema.map(({label, ...props}) => (
                <div key={label}><br/><label>
                    <span>{label}</span>
                    <input 
                        {...props} 
                        onChange={this.onChange} 
                    />
                </label></div>
            )) }
            
            <br/>
            <Button type="primary" onClick={this.addProduto}>Salvar</Button>

            <pre>
                { JSON.stringify(this.state, null, 2) }
            </pre>
        </div>;
    }
}

export default Produtos;