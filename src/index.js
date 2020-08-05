import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const title = 'React with Webpack and babel....';

ReactDOM.hydrate(
  <App title={title} />,
  document.getElementById('app'),
);

module.hot.accept();
