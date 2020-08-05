import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './src/App';

function handleRender(req, res) {
  // Renders our App component into an HTML string
  const html = ReactDOMServer.renderToString(<App />);

  // Load contents of index.html
  fs.readFile('./dist/index.html', 'utf8', (err, data) => {
    if (err) throw err;

    // Inserts the rendered React HTML into our main div
    const document = data.replace(
      /<div id="app"><\/div>/,
      `<div id="app">${html}</div>`,
    );

    // Sends the response back to the client
    res.send(document);
  });
}

const app = express();

// Serve built files with static files middleware
app.use('/build', express.static(path.join(__dirname, 'build')));

// Serve requests with our handleRender function
app.get('*', handleRender);

// Start server
app.listen(3000);
