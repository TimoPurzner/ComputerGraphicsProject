const express = require('express');
const app = express();


app.use(express.static('public'))

app.listen(6543, () => console.log('App is listening on 65432!'))

