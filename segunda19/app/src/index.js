import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';

// Import react router. 
import { BrowserRouter as Router } from 'react-router-dom';

import 'element-theme-default';

ReactDOM.render(
    <Router>
        <App />
    </Router>, 
    document.getElementById('root')
);

registerServiceWorker();
