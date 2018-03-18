import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Header.css';

const SignedIn = ({user}) => (
    <NavLink to="/sell">{ user.name }</NavLink>
);

const NotSignIn = () => (
    <NavLink to="/sell">conta</NavLink>
);

const Routes = [
    {pathname: "/", state: { title: "Produtos" }},
    {pathname: "/sell", state: { title: "Vender" }},
    {pathname: "/checkout", state: { title: "Carrinho" }}
];

class Header extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            pathState: Routes[0].state
        };
    }

    componentDidMount()
    {
        let { state } = this.props.location;
        if(state) {
            this.setState({ pathState: state });
        }
    }

    render()
    {
        const { user } = this.props;

        return <header className="app-header">
            <div className="app-header-top">
                <div className="app-name">{ this.state.pathState.title }</div>
                { user ? <SignedIn user={user} /> : <NotSignIn />  }
            </div>
            
            <div className="app-header-tabs">
                <NavLink exact to={Routes[0]}>produtos</NavLink>
                <NavLink to={Routes[1]}>vender</NavLink>
                <NavLink to={Routes[2]}>carrinho</NavLink>
            </div>
        </header>;
    }
}

export default Header;