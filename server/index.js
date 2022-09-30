const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.json());
const  {mongoose} = require('./database');

/*const cors = require('cors');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(express.json({limit: '10000mb'}));
app.use(cors({origin: 'http://localhost:4200'}));*/

//Routes 
app.use("/api/request",require("./routes/request.routes"));
app.use("/api/auth",require("./routes/auth.routes"));

app.set('port', process.env.PORT || 3000);

//Starting server
app.listen(app.get('port'), () => {
    console.log('Server on port 3000');
});