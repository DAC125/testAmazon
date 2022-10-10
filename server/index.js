const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
//const bodyParser = require('body-parser');

// app.use(express.json());
const  {mongoose} = require('./database');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(express.json({limit: '200mb'}));
app.use(morgan('dev'));
app.use(cors({origin: 'http://localhost:3001'}));


//Routes 
app.use("/api/request",require("./routes/request.routes"));
app.use("/api/auth",require("./routes/auth.routes"));

app.set('port', process.env.PORT || 3000);

//Starting server
app.listen(app.get('port'), () => {
    console.log('Server on port 3000');
});