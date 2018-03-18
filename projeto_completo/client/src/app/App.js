import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';

import Header from './Header';
import Home from './pages/Home';
import Sell from './pages/Sell';
import Checkout from './pages/Checkout';

import '../styles/App.css';

const FakeUser = {
    user_id: 1, 
    name: "Paulo Pieczarka",
    email: "paulopieczarka@gmail.com",
    photoUrl: ""
}

class App extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            user: FakeUser
        }
    }

    render()
    {
        const { user } = this.state;
        const HeaderWithLocation = withRouter(Header);

        return <div>
            <Route path="/">
                <HeaderWithLocation user={user} />
            </Route>
            
            <main>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/sell" component={() => <Sell user={user} />} />
                    <Route path="/checkout" component={Checkout} />
                </Switch>
            </main>
        </div>;
    }
}

export default App;