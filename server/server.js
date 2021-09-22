'use strict';

const express = require('express');
const indexRouter = require('./routes/index')
const errorHandler = require('express-json-errors')

// константы
const port = 3000;
const host = '0.0.0.0';

// приложение
const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next()
})
app.use(errorHandler())
app.use(express.json({limit: '100mb', extended: true}));
app.use(express.urlencoded({limit: '100mb', extended: true}));

app.use('/',  indexRouter)

app.use((req, res, next) => {
  res.error({
    code: 404,
    title: 'That resource was not found',
    description: 'I could not find the resource ' + req.url
  });
})

app.listen(port, host);
console.log(`running on http://${host}:${port}`);

