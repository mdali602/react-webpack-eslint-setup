/* const path = require('path');
const fs = require('fs');
const React = require('react');
const express = require('express');

const ReactDOMServer = require('react-dom/server');
const App = require('../src/App');

const PORT = process.env.PORT || 3006;
const app = express(); */

import path from 'path';
import fs from 'fs';

import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';

import App from '../src/App';

const PORT = process.env.PORT || 3000;
const app = express();

// ...

app.get('/', (req, res) => {
  const html = ReactDOMServer.renderToString(<App />);

  const indexFile = path.resolve('./dist/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(
      data.replace(
        '<div id="app"></div>',
        `<div id="app">${html}</div>`,
      ),
    );
  });
});

app.use(express.static('./dist'));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
