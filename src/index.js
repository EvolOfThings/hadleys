import React from 'react';
import { render } from 'react-dom';
import StorePicker from './components/StorePicker';
import './css/style.css';
import * as serviceWorker from './serviceWorker';


render(<StorePicker />, document.getElementById('root'));





// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
