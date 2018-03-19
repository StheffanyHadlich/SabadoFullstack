import React, { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import { Button } from 'element-react';

import '../styles/App.css';

const Home = ({changeHeaderColor}) => (
    <div>
        <h2>This is home!</h2>
        <p>And we sure love your home.</p>

        <br/><br/>

        <Button type="primary" onClick={changeHeaderColor}>Troca cor</Button>
    </div>
);

const About = () => (
    <div>
        <h2>This is about!</h2>
        <p>And we sure love your about.</p>
        <ul>
            <li>Yes!</li>
            <li>Banana is good for you boy.</li>
        </ul>
    </div>
);

class App extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            headerColor: getRandomGradient()
        };

        this.changeHeaderColor = this.changeHeaderColor.bind(this);
    }

    changeHeaderColor() {
        this.setState({ headerColor: getRandomGradient() });
    }

    render()
    {
        return <div>
            <header style={{ background: this.state.headerColor }}>
                <h1>Hello, World!</h1>
                <nav>
                    <NavLink exact to="/">index</NavLink>
                    <NavLink to="/about">sobre</NavLink>
                </nav>
            </header>

            <main>
                <Switch>
                    <Route exact path="/" component={() => <Home changeHeaderColor={this.changeHeaderColor} />} />
                    <Route path="/about" component={About} />
                </Switch>
            </main>
        </div>;
    }
}

function getRandomGradient() 
{
    let colors = ['#9900CC', '#9900FF', '#6600FF', '#CC0099', '#CC00CC', 
                  '#FF00FF', '#FF0066', '#FF0099', '#FF6633', '#FF6666', 
                  '#FF6699', '#FF66CC', '#FF66FF', '#CC0066', '#999966', 
                  '#996633', '#666699'];
    
    let angle = Math.floor(Math.random()*360);
    let color = () => colors[Math.floor(Math.random()*colors.length)];
    return `linear-gradient(${angle}deg, ${color()}, ${color()})`;
}

export default App;