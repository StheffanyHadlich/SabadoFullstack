import React, { Component } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Produtos from './pages/Produtos';
import Carrinho from './pages/Carrinho';

const Routes = [
    { to: "/", name: "Home" },
    { to: "/produtos", name: "Produtos" },
    { to: "/carrinho", name: "Carrinho" }
]

class App extends Component
{
    render()
    {
        return <div>
            <header>
                { Routes.map( r => <NavLink key={r.to} to={r.to}>{r.name}</NavLink> ) }
            </header>

            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/produtos" component={Produtos} />
                <Route exact path="/carrinho" component={Carrinho} />
            </Switch>
        </div>
    }
}

export default App;