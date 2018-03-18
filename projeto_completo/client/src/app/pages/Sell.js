import React, { Component } from 'react';
import ProductService from '../services/products';
import { Input, Button, Upload } from 'element-react';
import { UPLOAD_URL } from '../services/api.conf';

const FormSchema = [
    { type: "text", name: "name", label: "Nome do produto" },
    { type: "number", name: "price", label: "Preço (R$)" },
    { type: "text", name: "description", label: "Descrição" }
];

class Sell extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            form: {
                image_id: null
            },
            isBtAddEnabled: true
        };

        this.onChange = this.onChange.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.handleUploadChange = this.handleUploadChange.bind(this);
    }

    onChange(value, name)
    {
        let { form } = this.state;
        form[name] = value;
        this.setState({ form: form });
    }

    addProduct()
    {
        this.setState({ isBtAddEnabled: false });
        ProductService.add( {user_id: this.props.user.user_id, ...this.state.form} )
            .then(result => {
                this.setState({ form: {} });
                this.setState({ isBtAddEnabled: true });
                console.log(result);
            })
            .catch(err => {
                console.log(err);
                this.setState({ isBtAddEnabled: true });
            });
    }

    handleUploadChange({target})
    {
        const file = target.files[0];
        ProductService.uploadImage(file)
            .then(result => {
                console.log(result)
            });
    }

    showImagePreview(result)
    {
        const { form } = this.state;
        form.image_id = result.id; 
        this.setState({ form: form});
    }

    render()
    {
        let { isBtAddEnabled } = this.state;
        isBtAddEnabled = this.state.form.image_id;

        return <div className="page">
            <div>
                <div className="form-item"><label>
                    <div className="form-item-label">Imagem do produto</div>
                    <Upload
                        className="upload-demo"
                        action={UPLOAD_URL}
                        onSuccess={this.showImagePreview.bind(this)}
                        multiple={false}
                        listType="picture"
                    >
                        <Button type="primary" style={{marginBottom:20}}>Clique para enviar a foto</Button>
                    </Upload>
                </label></div>

                
                {/* { imagePreview && <img height={50} src={imagePreview} alt="product preview"/> } */}

                { FormSchema.map(({label, ...rest}, i) => (
                    <div key={i} className="form-item"><label>
                        <div className="form-item-label">{label}</div>
                        <Input {...rest} onChange={(val) => this.onChange(val, rest.name)} /> 
                    </label></div>
                )) }

                <Button type="primary" disabled={!isBtAddEnabled} onClick={this.addProduct}>send</Button>
            </div>

            <div>
                <pre>
                    { JSON.stringify(this.state.form, null, 2) }
                </pre>
            </div>
        </div>;
    }
}

export default Sell;