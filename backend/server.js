const express = require('express');
const app = express();

const cors = require('cors');

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.listen(3333);