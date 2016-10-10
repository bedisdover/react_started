import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.jsx';
import Example from './Example.jsx';

ReactDOM.render(<App />, document.getElementById('app'));
ReactDOM.render(<Example name="bedisdover"/>, document.getElementById('example'));
